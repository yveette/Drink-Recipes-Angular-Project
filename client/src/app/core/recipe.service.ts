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

  addRecipe$(body: CreateRecipeDto): Observable<IRecipe> {
    return this.http.post<IRecipe>(`${apiUrl}/recipes`, body, { withCredentials: true });
  }

  getAllRecipesByUser$(userId: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${apiUrl}/users/profile/${userId}`, { withCredentials: true });
  }
}
