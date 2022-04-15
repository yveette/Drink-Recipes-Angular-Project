import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IRecipe, IUser } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-recipes-detail-page',
  templateUrl: './recipes-detail-page.component.html',
  styleUrls: ['./recipes-detail-page.component.css']
})
export class RecipesDetailPageComponent implements OnInit {

  refreshRecipeRequest$ = new BehaviorSubject(undefined);
  recipe: IRecipe;
  currentUser?: IUser;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canLike: boolean = false;
  isUserAuthor: boolean = false;

  makeUpdate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const recipeId = params['recipeId'];
            return this.refreshRecipeRequest$.pipe(mergeMap(() => this.recipeService.loadRecipeById(recipeId)));
          })
        ),
      this.authService.currentUser$
    ])
      .subscribe(([recipe, user]) => {
        this.currentUser = user;
        this.recipe = recipe;
        this.canLike = user && !this.recipe.likes.includes(user?._id);
        this.isUserAuthor = user && this.recipe.userId._id == user._id;
      })

  }

  updateRecipe() {
    this.makeUpdate = true;
  }


  deleteRecipeHandler() {
    // console.log('try to delete')
    if (window.confirm(`Are you sure you want to delete - ${this.recipe.recipeName} ?`)) {

      this.messageBus.notifyForMessage({
        text: `You delete recipe - ${this.recipe.recipeName} !`,
        type: MessageType.Success
      })

      this.recipeService.deleteRecipe(this.recipe._id)
        .subscribe((res: any) => {
          this.router.navigate(['/recipes']);
        })
    }
  }

  likeRecipe() {
    // console.log('like recipe');

    this.recipeService.likeRecipe(this.recipe._id)
      .subscribe(() => this.refreshRecipeRequest$.next(undefined));

    this.messageBus.notifyForMessage({
      text: 'You liked this recipe!',
      type: MessageType.Success
    })
  }

  dislikeRecipe() {
    // console.log('dislike recipe');

    this.recipeService.dislikeRecipe(this.recipe._id)
      .subscribe(() => this.refreshRecipeRequest$.next(undefined));

    this.messageBus.notifyForMessage({
      text: 'You disliked this recipe!',
      type: MessageType.Success
    })
  }
}
