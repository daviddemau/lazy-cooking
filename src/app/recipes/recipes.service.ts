import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeModel } from './model/recipe.model';
import { IngredientModel } from './model/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from '../authentication/user.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesSubject = new BehaviorSubject(null);
  recipes: RecipeModel[];

  baseUrl = 'https://lazy-cooking.firebaseio.com/';

  constructor(private slService: ShoppingListService,
              private http: HttpClient) { }

  saveRecipes(user: User) {
    this.http.put(this.baseUrl + 'recipes.json', this.recipes,
      { params: new HttpParams().set('auth', user.token) }).subscribe((response) => {
      console.log('SAVED RECIPES', response);
    });
  }

  fetchRecipes(user: User) {
    if (user) {
      return this.http.get<RecipeModel[]>(this.baseUrl + 'recipes.json',
        { params: new HttpParams().set('auth', user.token) }).pipe(
        map(recipes => {
          if (recipes) {
            return recipes.map(
              recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
              });
          }
        }),
        tap(recipes => {
          recipes ? this.recipes = recipes : this.recipes = [];
          this.recipesSubject.next(this.recipes);
        }));
    }
  }

  get(id): RecipeModel {
    if (this.recipes) {
      return this.recipes[id];
    }
  }

  update(recipe, id) {
    this.recipes[id] = recipe;
    this.recipesSubject.next(this.recipes);
  }

  delete(id) {
    this.recipes.splice(id, 1);
    this.recipesSubject.next(this.recipes);
  }

  add(recipe) {
    this.recipes.push(recipe);
    this.recipesSubject.next(this.recipes);
  }

  toShoppingList(ingredients: IngredientModel[]) {
    ingredients.forEach(ingredient => this.slService.add(ingredient));
  }
}

