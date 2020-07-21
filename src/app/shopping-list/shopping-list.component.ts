import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngredientModel } from '../recipes/model/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: IngredientModel[];
  shoppingListSub: Subscription;
  selectedIg: IngredientModel;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListSub = this.slService.shoppingListSubject.subscribe(
      (list) => {
        this.shoppingList = list;
      }
    );
  }

  ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe();
  }
}
