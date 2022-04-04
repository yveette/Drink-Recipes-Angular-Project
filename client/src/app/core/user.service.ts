import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
// import { Observable } from 'rxjs';

// export interface CreateUserDto {
//   username: string, email: string, password: string
// }

@Injectable()
export class UserService {

  isLogged = false;
  constructor(private storage: StorageService) {
    this.isLogged = this.storage.getItem('isLogged');
  }

  // constructor(private storage: StorageSer ,private httpClient: HttpClient) {

  // }

  // register$(userData: CreateUserDto): Observable<IUser> {

  // }

  login(): void {
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
  }

  logout(): void {
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
  }
}
