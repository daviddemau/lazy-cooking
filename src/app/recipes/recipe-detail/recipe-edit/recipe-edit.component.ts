import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../model/recipe.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: RecipeModel;
  recipeId: number;
  editForm: FormGroup;
  ingredientsArray = new FormArray([]);

  constructor(private fb: FormBuilder,
              private recipeService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['id'];
    this.router.url.includes('new') ?
      this.recipe = null :
      this.recipe = this.recipeService.get(this.recipeId);
    this.createForm();
  }

  createForm() {
    if (this.recipe?.ingredients) {
      for (const ingredient of this.recipe.ingredients) {
        this.ingredientsArray.push(
          this.fb.group({
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, Validators.required]
          })
        );
      }
    }

    this.editForm = this.fb.group({
      name: [this.recipe ? this.recipe.name : null, Validators.required],
      description: [this.recipe ? this.recipe.description : null, Validators.required],
      imagePath: [this.recipe ? this.recipe.imagePath : null],
      ingredients: this.ingredientsArray
    });
  }

  addIngredient() {
    this.ingredientsArray.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required]
      })
    );
  }

  removeIngredient(index) {
    this.ingredientsArray.removeAt(index);
  }

  save() {
    if (this.editForm.valid) {
      this.router.url.includes('new') ? this.recipeService.add(this.editForm.value)
        : this.recipeService.update(this.editForm.value, this.recipeId);
      this.router.navigate(['/recipes']);
    }
  }

  cancelEdit() {
    this.router.navigate(['/recipes']);
  }
}
