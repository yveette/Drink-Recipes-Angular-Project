import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRecipe } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { RecipeService } from 'src/app/core/recipe.service';
import { ingredientsValidator, urlValidator } from '../utils';

@Component({
  selector: 'app-recipes-new-page',
  templateUrl: './recipes-new-page.component.html',
  styleUrls: ['./recipes-new-page.component.css']
})
export class RecipesNewPageComponent implements OnInit {

  @Input() makeUpdate: boolean;
  @Input() recipeToUpdate: IRecipe;

  formName: string;
  formBtnName: string;

  recipeFormGroup: FormGroup = this.formBuilder.group({
    'recipeName': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'imgUrl': new FormControl('', [Validators.required, urlValidator]),
    'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'ingredients': new FormControl('', [Validators.required, ingredientsValidator])
  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private recipeService: RecipeService,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    // console.log(this.makeUpdate)
    // console.log(this.recipeToUpdate)

    if (this.makeUpdate) {
      this.formName = 'Edit Recipe';
      this.formBtnName = 'Save';
      this.recipeFormGroup.controls['recipeName'].setValue(this.recipeToUpdate.recipeName);
      this.recipeFormGroup.controls['imgUrl'].setValue(this.recipeToUpdate.imgUrl);
      this.recipeFormGroup.controls['description'].setValue(this.recipeToUpdate.description);
      this.recipeFormGroup.controls['ingredients'].setValue(this.recipeToUpdate.ingredients.join(', '));
    } else {
      this.formName = 'Add New Recipe';
      this.formBtnName = 'Add Recipe';
    }
  }


  handleCreateRecipe() {

    if (this.makeUpdate) {
      console.log('update');
      console.log(this.recipeFormGroup.value);

      // Transform ingridients to array
      if (this.recipeFormGroup.value.ingredients.includes(', ')) {
        this.recipeFormGroup.value.ingredients = this.recipeFormGroup.value.ingredients.split(', ');
      }
      this.recipeFormGroup.value.recipeName = this.recipeFormGroup.value.recipeName.trim();
      this.recipeFormGroup.value.description = this.recipeFormGroup.value.description.trim();
      this.recipeFormGroup.value.imgUrl = this.recipeFormGroup.value.imgUrl.trim();

      console.log("after", this.recipeFormGroup.value);

      this.recipeService.updateRecipe$(this.recipeToUpdate._id, this.recipeFormGroup.value).subscribe({
        next: recipe => {
          // console.log('User is ', user);
          this.router.navigate(['/recipes', this.recipeToUpdate._id])
            .then(() => {
              window.location.reload();
            })

          this.messageBus.notifyForMessage({
            text: 'User successfully updated recipe!',
            type: MessageType.Success
          })
        },
        complete: () => {
          // console.log('update completed');
        },
        error: (err) => {
          console.log('Error is ', err.error.message)
          // this.errorMessage = err.error.message;
        }

      })
    } else {
      // console.log('form: ', this.recipeFormGroup.value);

      // Transform ingridients to array
      if (this.recipeFormGroup.value.ingredients.includes(', ')) {
        this.recipeFormGroup.value.ingredients = this.recipeFormGroup.value.ingredients.split(', ');
      }
      this.recipeFormGroup.value.recipeName = this.recipeFormGroup.value.recipeName.trim();
      this.recipeFormGroup.value.description = this.recipeFormGroup.value.description.trim();
      this.recipeFormGroup.value.imgUrl = this.recipeFormGroup.value.imgUrl.trim();

      this.recipeService.addRecipe$(this.recipeFormGroup.value).subscribe({
        next: (recipe) => {
          // console.log(recipe);
          // this.router.navigate(['/recipes'])
          //   .then(()=> {
          //     window.location.reload();
          //   })

          this.messageBus.notifyForMessage({
            text: 'User successfully create new recipe!',
            type: MessageType.Success
          })
        },
        complete: () => {

        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
