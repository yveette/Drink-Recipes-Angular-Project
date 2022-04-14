import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { IAuthModuleState } from '../+store';
import { initializeLoginState, loginProcessError, startLoginProcess } from '../+store/actions';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage$: Observable<string> = this.store.select(s => s.auth.login.errorMessage);
  isLoginPending$: Observable<boolean> = this.store.select(s => s.auth.login.isLoginPending);

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, emailValidator]),
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService,
    private store: Store<IAuthModuleState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(initializeLoginState());
  }

  handleLogin(): void {
    this.store.dispatch(startLoginProcess());

    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: user => {
        this.router.navigate(['/home']);

        this.messageBus.notifyForMessage({
          text: 'User successfully logged in!',
          type: MessageType.Success
        })
      },
      error: (err) => {
        this.store.dispatch(loginProcessError({ errorMessage: err.error.message }));
      }
    });
  }
}