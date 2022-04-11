import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, emailValidator]),
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.errorMessage = '';
    // console.log(this.loginFormGroup.value);

    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: user => {
        // console.log('User is ', user);
        this.router.navigate(['/home']);

        this.messageBus.notifyForMessage({
          text: 'User successfully logged in!',
          type: MessageType.Success
        })
      },
      complete: () => {
        // console.log('login stream completed');
      },
      error: (err) => {
        // console.log('Error is ', err.error.message)
        this.errorMessage = err.error.message;
      }
    });

  }

}