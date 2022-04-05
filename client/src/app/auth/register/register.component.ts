import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)]),
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleRegister() {
    // console.log(this.registerFormGroup.value);
    const { username, email, passwords } = this.registerFormGroup.value;

    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password
    }

    // send body to Back-end
    // console.log(body);
    this.userService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

}
