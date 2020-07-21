import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeModel } from '../model/recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  recipesSub$: Subscription;
  selectedRecipe: RecipeModel;

  constructor(private recipeService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipesSub$ = this.recipeService.recipesSubject
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  selectRecipe(id, recipe) {
    this.router.navigate([id], {relativeTo: this.route});
    this.selectedRecipe = recipe;
  }

  addRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipesSub$.unsubscribe();
  }
}
