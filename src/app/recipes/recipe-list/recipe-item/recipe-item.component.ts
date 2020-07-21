import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RecipeModel } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: RecipeModel;
  @Input() selectedRecipe: RecipeModel;

  constructor() { }

}
