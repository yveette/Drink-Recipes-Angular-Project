import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesListItemComponent } from './recipes-list-item/recipes-list-item.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesDetailPageComponent } from './recipes-detail-page/recipes-detail-page.component';



@NgModule({
  declarations: [
    RecipesListComponent,
    RecipesListItemComponent,
    RecipesPageComponent,
    RecipesDetailPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
