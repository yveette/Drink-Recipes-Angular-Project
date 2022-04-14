import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CommentService } from 'src/app/core/comment.service';
import { IComment, IRecipe, IUser } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
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
  canLikeComment: boolean;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  canLikeComment$: Observable<boolean>;

  currUser?: IUser;

  constructor(private router: Router,
    private commentService: CommentService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {

    this.recipeService.loadRecipeById(this.recipeId).subscribe(recipe => {
      this.comments = recipe.comments;

      // get user and check if user._id includes in each comment likes array
      this.comments.forEach(c => {
        this.currentUser$.subscribe(user => this.currUser = user);
        this.canLikeComment = c.likes.includes(this.currUser._id)
        c.canLike = c.likes.includes(this.currUser._id)
      })

      // console.log(this.comments);
    })
  }

  submitComment(text: string): void {
    // console.log(text);
    this.commentService.addComment$(text, this.recipeId).subscribe({
      next: (comment) => {
        // console.log('returned comment: ', comment);
        // this.router.navigate(['/recipes', this.recipeId])

        this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
          this.router.navigate(['/recipes', this.recipeId]);
        });
        this.messageBus.notifyForMessage({
          text: 'User successfully add new comment!',
          type: MessageType.Success
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  likeComment(comment: IComment | any) {
    console.log('like comment', comment)
    this.commentService.likeComment(comment.recipeId, comment._id).subscribe(res => {
      // console.log(res.message)
      this.messageBus.notifyForMessage({
        text: res.message,
        type: MessageType.Success
      })
    })

    this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/recipes', this.recipeId]);
    });
  }

  dislikeComment(comment) {
    console.log('dislike comment');
    this.commentService.dislikeComment(comment.recipeId, comment._id).subscribe(res => {
      this.messageBus.notifyForMessage({
        text: res.message,
        type: MessageType.Success
      })
    })

    this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/recipes', this.recipeId]);
    });
  }

}
