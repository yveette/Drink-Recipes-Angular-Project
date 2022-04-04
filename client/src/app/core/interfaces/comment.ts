import { IBase } from './base';
import { IRecipe } from './recipe';
import { IUser } from './user';

export interface IComment extends IBase {
  likes: string[];
  text: string;
  userId: IUser;
  recipeId: IRecipe;
}
