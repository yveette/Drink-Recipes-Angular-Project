import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipe } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  loadRecipeList(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(
      `${apiUrl}/recipes`
    );
  }
}
