import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { RecipeModel } from '../model/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel;
  recipeId: number;

  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipeId = +params['id'];
          this.recipe = this.recipeService.get(this.recipeId);
        }
      );
  }

  goToEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  delete() {
    this.recipe = null;
    this.recipeService.delete(this.recipeId);
  }

  addToShoppingList() {
    this.recipeService.toShoppingList(this.recipe.ingredients);
  }
}
