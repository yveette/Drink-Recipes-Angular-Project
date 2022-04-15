import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  recipeList: IRecipe[] = [];
  recipeMostLiked: IRecipe;
  recipeMostCommented: IRecipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.loadMostLiked$().subscribe(recipeList => {
      this.recipeMostLiked = recipeList[0];
      // console.log('liked:',recipeList)
    });
    this.recipeService.loadMostComment$().subscribe(recipeList => {
      this.recipeMostCommented = recipeList[0];
      // console.log('commented:',recipeList)
    });
  }

}
