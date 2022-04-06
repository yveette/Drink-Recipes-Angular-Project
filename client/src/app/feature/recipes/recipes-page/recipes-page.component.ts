import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  isLoggedIn$: Observable<boolean>  = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
