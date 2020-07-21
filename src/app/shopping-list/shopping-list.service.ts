import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IngredientModel } from '../recipes/model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  shoppingListSubject = new BehaviorSubject([]);
  shoppingList: IngredientModel[] = [];

  constructor() {}

  update(ingredient: IngredientModel) {
    this.shoppingList[ingredient.id] = ingredient;
    this.shoppingListSubject.next(this.shoppingList);
  }

  delete(ingredient: IngredientModel) {
    this.shoppingList.splice(ingredient.id, 1);
    this.shoppingListSubject.next(this.shoppingList);
  }

  add(ingredient: IngredientModel) {
    const sentIngredient = {...ingredient};
    const isIngredientExisting = this.shoppingList.some((element) => element.name === sentIngredient.name);

    if (isIngredientExisting) {
      const indexFound = this.shoppingList.findIndex((element) => element.name === sentIngredient.name);
      this.shoppingList[indexFound].amount += sentIngredient.amount;
    } else {
      this.shoppingList.push(sentIngredient);
    }

    this.shoppingListSubject.next(this.shoppingList);
  }
}

