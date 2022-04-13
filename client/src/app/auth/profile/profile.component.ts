import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IRecipe, IUser } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';
import { UserService } from 'src/app/core/user.service';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profileLoaded } from '../+store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  
  currentUser$: Observable<IUser> = this.store.select(state => state.auth.profile.currentProfile)
  // or:
  // currentUser: IUser;
  // .pipe(tap(profile => this.currentUser = profile));

  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  userRecipes: IRecipe[] = [];

  isShowRecipes: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<IAuthModuleState>
  ) { }


  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.store.dispatch(profileLoaded({ profile: user }));
      },
      error: (error) => {
        this.router.navigate(['/login']);
      }
    })
  }

  enterEditMode(currentUser: IUser): void {
    this.store.dispatch(enterEditMode());

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        email: currentUser.email,
        username: currentUser.username
      })
    });
  }

  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }

  showUserRecipes(currentUser: IUser) {
    // console.log(this.currentUser._id)
    this.recipeService.getAllRecipesByUser$(currentUser._id).subscribe({
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
    this.store.dispatch(exitEditMode());
  }

}
