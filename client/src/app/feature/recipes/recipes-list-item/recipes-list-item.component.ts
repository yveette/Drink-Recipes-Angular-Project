import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';

@Component({
  selector: 'app-recipes-list-item',
  templateUrl: './recipes-list-item.component.html',
  styleUrls: ['./recipes-list-item.component.css']
})
export class RecipesListItemComponent implements OnInit {

  @Input() recipe: IRecipe;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.recipe)
  }

}
