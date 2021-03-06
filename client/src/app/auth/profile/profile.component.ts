import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IRecipe, IUser } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';
import { UserService } from 'src/app/core/user.service';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profilePageInitialize, updateProfileStarted } from '../+store/actions';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('itemAnimation', [
      transition('* => *', [
        query('div', style({ transform: 'translateX(-100%)' })),
        query('div',
          stagger('100ms', [
            animate('300ms', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser$: Observable<IUser> = this.store.select(state => state.auth.profile.currentProfile)
  // or:
  // currentUser: IUser;
  // .pipe(tap(profile => this.currentUser = profile));

  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorHappened: Observable<boolean> = this.store.select(state => state.auth.profile.errorHappened);

  userRecipes: IRecipe[] = [];

  isShowRecipes: boolean = false;

  isLikedShow: boolean = false;
  likedRecipes: IRecipe[] = [];

  isDisabled: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<IAuthModuleState>
  ) { }


  ngOnInit(): void {
    this.store.dispatch(profilePageInitialize());

    this.hasErrorHappened.subscribe((hasError) => {
      if (hasError) {
        this.router.navigate(['/login']);
      }
    })

    // this.userService.getProfile$().subscribe({
    //   next: (user) => {
    //     this.store.dispatch(profileLoaded({ profile: user }));
    //   },
    //   error: (error) => {
    //     this.router.navigate(['/login']);
    //   }
    // })
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

  showUserRecipes(currentUser: IUser, action: string) {

    if (action == 'show') {
      // console.log(this.currentUser._id)
      this.recipeService.getAllRecipesByUser$(currentUser._id).subscribe({
        next: (recipes) => {
          // console.log(recipes)
          this.userRecipes = recipes;
          this.isShowRecipes = !this.isShowRecipes;
          this.isDisabled = !this.isDisabled;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (action == 'hide') {
      this.isShowRecipes = !this.isShowRecipes;
      this.isDisabled = !this.isDisabled;
    }
  }

  updateProfile(): void {
    // console.log(this.editProfileForm.value);

    this.store.dispatch(updateProfileStarted({
      user: {
        username: this.editProfileForm.value.username,
        email: this.editProfileForm.value.email
      }
    }));

    this.store.dispatch(exitEditMode());
  }

  showLikedByUserRecipes(currentUser: IUser, action: string) {
    if (action == 'show') {
      this.recipeService.getAllLikedByUser$(currentUser._id).subscribe({
        next: (recipes) => {
          console.log(recipes)
          this.likedRecipes = recipes;
          this.isLikedShow = !this.isLikedShow;
          this.isDisabled = !this.isDisabled;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (action == 'hide') {
      this.isLikedShow = !this.isLikedShow;
      this.isDisabled = !this.isDisabled;
    }
  }
}
