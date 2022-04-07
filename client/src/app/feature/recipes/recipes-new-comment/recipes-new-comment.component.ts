import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/core/comment.service';
import { IComment } from 'src/app/core/interfaces';

@Component({
  selector: 'app-recipes-new-comment',
  templateUrl: './recipes-new-comment.component.html',
  styleUrls: ['./recipes-new-comment.component.css']
})
export class RecipesNewCommentComponent implements OnInit {

  @Input() recipeId: string;

  comment: IComment;

  constructor(private router: Router, private commentService: CommentService) { }

  ngOnInit(): void {
    console.log(this.recipeId);
  }

  submitComment(text: string): void {
    // console.log(text);
    this.commentService.addComment$(text, this.recipeId).subscribe({
      next: (comment) => {
        console.log('returned comment: ', comment);
        // this.router.navigate(['/recipes', this.recipeId])
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
