import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { PagesModule } from './feature/pages/pages.module';
import { RecipesModule } from './feature/recipes/recipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './core/user.service';
import { RecipeService } from './core/recipe.service';
import { CommentService } from './core/comment.service';
import { storageServiceProvider } from './core/storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    RecipesModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    RecipeService,
    storageServiceProvider,
    CommentService,
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
