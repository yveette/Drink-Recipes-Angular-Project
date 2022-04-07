import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  user: IUser | undefined;
  isAuthor: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((e) => this.user = e);

    this.activatedRoute.params.subscribe(params => {
      this.recipeId = params['recipeId'];
    })

    this.recipeService.loadRecipeById(this.recipeId).subscribe(recipe => {
      // console.log(this.recipeId);
      this.recipe = recipe;

      if (this.user?._id == this.recipe.userId._id) {
        this.isAuthor = true;
      } else {
        this.isAuthor = false
      }
    })
  }
}
