import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesListItemComponent } from './recipes-list-item/recipes-list-item.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesDetailPageComponent } from './recipes-detail-page/recipes-detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesNewPageComponent } from './recipes-new-page/recipes-new-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    RecipesListComponent,
    RecipesListItemComponent,
    RecipesPageComponent,
    RecipesDetailPageComponent,
    RecipesNewPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class RecipesModule { }
