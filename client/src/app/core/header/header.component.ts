import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private isLoggingOut: boolean = false;

  constructor(public authService: AuthService, private router: Router) {

  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    console.log('logout called');

    this.authService.logout$().subscribe({
      // Http -> return response and then complete
      // next: args => {
      //   console.log(args);
      // },
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
        // handle error
      }
    })
  }
}
