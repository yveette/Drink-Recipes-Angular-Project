import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-recipes-detail-page',
  templateUrl: './recipes-detail-page.component.html',
  styleUrls: ['./recipes-detail-page.component.css']
})
export class RecipesDetailPageComponent implements OnInit {

  recipe!: IRecipe;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const recipeId = params['recipeId'];
      this.recipeService.loadRecipeById(recipeId).subscribe(recipe => {
        // console.log(recipe);
        this.recipe = recipe;
      })
    })
  }
}
