import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment$(text: string, id: string): Observable<IComment> {
    // console.log(text)
    return this.http.post<IComment>(`${apiUrl}/recipes/${id}`, { text }, { withCredentials: true });
  }

  likeComment(recipeId: string, commentId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${apiUrl}/recipes/${recipeId}/comments/${commentId}/like`, {}, { withCredentials: true });
  }

  dislikeComment(recipeId: string, commentId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${apiUrl}/recipes/${recipeId}/comments/${commentId}/dislike`, {}, { withCredentials: true });
  }
}
