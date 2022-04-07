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
}
