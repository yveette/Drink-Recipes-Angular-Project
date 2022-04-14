import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
import { StorageService } from './storage.service';

export interface IUpdateUserDto {
  username: string, email: string
}

export interface CreateUserDto {
  username: string, email: string, password: string
}

@Injectable()
export class UserService {

  constructor(private storage: StorageService, private httpClient: HttpClient) {

  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile$(newUser: IUpdateUserDto): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, newUser, { withCredentials: true })
  }
}
