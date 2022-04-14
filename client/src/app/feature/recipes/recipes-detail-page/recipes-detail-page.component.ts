import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IRecipe, IUser } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-recipes-detail-page',
  templateUrl: './recipes-detail-page.component.html',
  styleUrls: ['./recipes-detail-page.component.css']
})
export class RecipesDetailPageComponent implements OnInit {

  recipe: IRecipe;
  recipeId: string;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  // TODO: implement canLike and disabled buttons

  user: IUser;
  isAuthor: boolean = false;

  makeUpdate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((e) => this.user = e);

    this.activatedRoute.params.subscribe(params => {
      this.recipeId = params['recipeId'];
    })

    this.recipeService.loadRecipeById(this.recipeId).subscribe(recipe => {
      // console.log(this.recipeId);
      // console.log(recipe)
      this.recipe = recipe;

      if (this.user?._id == this.recipe.userId._id) {
        this.isAuthor = true;
      } else {
        this.isAuthor = false
      }
    })
  }

  updateRecipe() {
    this.makeUpdate = true;
  }


  deleteRecipeHandler() {
    // console.log('try to delete')
    if (window.confirm(`Are you sure you want to delete - ${this.recipe.recipeName} ?`)) {
      this.recipeService.deleteRecipe(this.recipeId)
        .subscribe((res: any) => {
          this.router.navigate(['/recipes']);
        })
    }
  }

  likeRecipe() {
    // console.log('like recipe');

    this.recipeService.likeRecipe(this.recipeId).subscribe( updatedRecipe=> {
      
      this.recipe = updatedRecipe;
    })

    this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/recipes', this.recipeId]);
    });
  }

  dislikeRecipe() {
    // console.log('dislike recipe');

    this.recipeService.dislikeRecipe(this.recipeId).subscribe( updatedRecipe=> {
      this.recipe = updatedRecipe;
    })

    this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/recipes', this.recipeId]);
    });
  }
}
