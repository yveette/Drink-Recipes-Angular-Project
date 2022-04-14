import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipe } from './interfaces';

const apiUrl = environment.apiUrl;

export interface CreateRecipeDto {
  recipeName: string, ingredients: string[], description: string
}

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  loadRecipeList(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(
      `${apiUrl}/recipes`
    );
  }

  loadRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${apiUrl}/recipes/${id}`);
  }

  loadMostLiked$(): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${apiUrl}/recipes/likes`);
  }

  loadMostComment$(): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${apiUrl}/recipes/comments`);
  }

  addRecipe$(body: CreateRecipeDto): Observable<IRecipe> {
    return this.http.post<IRecipe>(`${apiUrl}/recipes`, body, { withCredentials: true });
  }

  getAllRecipesByUser$(userId: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${apiUrl}/users/profile/${userId}`, { withCredentials: true });
  }

  updateRecipe$(id: string, body: CreateRecipeDto) {
    return this.http.put(`${apiUrl}/recipes/${id}/edit`, body, { withCredentials: true });
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${apiUrl}/recipes/${id}`, { withCredentials: true });
  }

  likeRecipe(recipeId: string): Observable<IRecipe> {
    return this.http.put<IRecipe>(`${apiUrl}/recipes/${recipeId}/like`, {}, { withCredentials: true });
  }

  dislikeRecipe(recipeId: string): Observable<IRecipe> {
    return this.http.put<IRecipe>(`${apiUrl}/recipes/${recipeId}/dislike`, {}, { withCredentials: true });
  }
}
