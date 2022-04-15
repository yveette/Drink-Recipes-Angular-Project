import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, startWith, switchMap } from 'rxjs';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipeList: IRecipe[];

  searchControl = new FormControl('', { updateOn: 'blur' });

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // search for word with at least 3 characters
    this.searchControl.valueChanges.pipe(
      filter(searchTerm => searchTerm.length > 2),
      startWith(''),
      // tap(searchTerm => console.log(searchTerm)),
      switchMap(searchTerm => this.recipeService.loadRecipeList(searchTerm))
      // switchMap => stop previous requests and takes the last
      // mergeMap => return the result from the observable
    )
      .subscribe(recipeList => {
        this.recipeList = recipeList;
      });


    // this.recipeService.loadRecipeList().subscribe(recipeList => {
    //   // console.log(recipeList)
    //   this.recipeList = recipeList;
    // });
  }

}
