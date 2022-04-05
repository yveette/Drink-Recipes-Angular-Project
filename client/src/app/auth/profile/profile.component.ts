import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IRecipe, IUser } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm!: NgForm;

  currentUser!: IUser;

  isInEditMode: boolean = false;

  userRecipes: IRecipe[] = [];

  isShowRecipes: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private recipeService: RecipeService
  ) { }


  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        this.router.navigate(['/login']);
      }
    })
  }

  enterEditMode(): void {
    this.isInEditMode = true;

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        email: this.currentUser.email,
        username: this.currentUser.username
      })
    });
  }

  showUserRecipes() {
    // console.log(this.currentUser._id)
    this.recipeService.getAllRecipesByUser$(this.currentUser._id).subscribe({
      next: (recipes) => {
        // console.log(recipes)
        this.userRecipes = recipes;
        this.isShowRecipes = true;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateProfile(): void {
    // console.log(this.editProfileForm.value);
    // TODO update profile
    this.isInEditMode = false;
  }

}
