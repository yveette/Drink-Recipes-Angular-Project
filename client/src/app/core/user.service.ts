import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
import { StorageService } from './storage.service';

export interface CreateUserDto {
  username: string, email: string, password: string
}

@Injectable()
export class UserService {

  isLogged = false;
  constructor(private storage: StorageService, private httpClient: HttpClient) {
    this.isLogged = this.storage.getItem('isLogged');
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/register`, userData, { withCredentials: true });
  }

  login(): void {
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
  }

  logout(): void {
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
  }
}
