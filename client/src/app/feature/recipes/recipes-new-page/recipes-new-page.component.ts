import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/core/recipe.service';
import { ingredientsValidator } from '../utils';

@Component({
  selector: 'app-recipes-new-page',
  templateUrl: './recipes-new-page.component.html',
  styleUrls: ['./recipes-new-page.component.css']
})
export class RecipesNewPageComponent implements OnInit {
  
  recipeFormGroup: FormGroup = this.formBuilder.group({
    'recipeName': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'ingredients': new FormControl('', [Validators.required, ingredientsValidator ])
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }


  handleCreateRecipe() {
    // console.log('form: ', this.recipeFormGroup.value);

    // Transform ingridients to array
    if( this.recipeFormGroup.value.ingredients.includes(', ')){
      this.recipeFormGroup.value.ingredients = this.recipeFormGroup.value.ingredients.split(', ');
    }
    this.recipeFormGroup.value.recipeName = this.recipeFormGroup.value.recipeName.trim();
    this.recipeFormGroup.value.description = this.recipeFormGroup.value.description.trim();

    this.recipeService.addRecipe$(this.recipeFormGroup.value).subscribe({
      next: (recipe) => {
        // console.log(recipe);
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
