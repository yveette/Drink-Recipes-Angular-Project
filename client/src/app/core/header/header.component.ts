import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';
import { MessageBusService, MessageType } from '../message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  errorMessage: string;
  isMessageError: boolean;

  private isLoggingOut: boolean = false;
  private subscription: Subscription;

  constructor(public authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      this.errorMessage = newMessage?.text || '';
      this.isMessageError = newMessage?.type === MessageType.Error;

      if (this.errorMessage) {
        setTimeout(() => {
          this.messageBus.clear();
        }, 5000);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
