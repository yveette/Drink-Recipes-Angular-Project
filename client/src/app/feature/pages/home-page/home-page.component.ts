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
  recipeMoastLiked: IRecipe;
  recipeMoastCommented: IRecipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.loadMostLiked$().subscribe(recipeList => {
      this.recipeMoastLiked = recipeList[0];
      console.log('liked:',recipeList)
    });
    this.recipeService.loadMostComment$().subscribe(recipeList => {
      this.recipeMoastCommented = recipeList[0];
      console.log('commented:',recipeList)
    });
  }

}
