import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
