import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  isLoggedIn: boolean = this.userService.isLogged;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
