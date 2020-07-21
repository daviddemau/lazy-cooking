import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RecipesService } from './recipes.service';
import { RecipeModel } from './model/recipe.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<RecipeModel[]> {
  constructor(private recipesService: RecipesService, private authenticationService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const connectedUser = this.authenticationService.connectedUser.getValue();
    const recipes = this.recipesService.recipesSubject.getValue();

    if (!recipes) {
      return this.recipesService.fetchRecipes(connectedUser);
    } else {
      return recipes;
    }
  }
}
