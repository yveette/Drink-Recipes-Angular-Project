import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CommentService } from 'src/app/core/comment.service';
import { IRecipe, IUser } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-recipes-new-comment',
  templateUrl: './recipes-new-comment.component.html',
  styleUrls: ['./recipes-new-comment.component.css']
})
export class RecipesNewCommentComponent implements OnInit {

  @Input() recipeId: string;
  @Input() recipe: IRecipe;

  comments: any[];

  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private router: Router,
    private commentService: CommentService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.recipeService.loadRecipeById(this.recipeId).subscribe(recipe => {
      this.comments = recipe.comments;
      // console.log('comments are: ',recipe.comments)
    })
  }

  submitComment(text: string): void {
    // console.log(text);
    this.commentService.addComment$(text, this.recipeId).subscribe({
      next: (comment) => {
        // console.log('returned comment: ', comment);
        // this.router.navigate(['/recipes', this.recipeId])
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
