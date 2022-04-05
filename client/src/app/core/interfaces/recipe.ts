import { IBase } from './base';
import { IUser } from './user';

export interface IRecipe extends IBase {
  likes: string[];
  comments: string[];
  recipeName: string;
  ingredients: string[];
  description: string,
  imgUrl: string,
  userId: IUser;
}