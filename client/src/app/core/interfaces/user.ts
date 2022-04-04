import { IBase } from './base';

export interface IUser extends IBase {
  recipes: string[];
  comments: string[];
  email: string;
  username: string;
  password: string;
}