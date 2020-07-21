import { IngredientModel } from './ingredient.model';

export interface RecipeModel {
  name: string;
  description: string;
  imagePath: string;
  ingredients: IngredientModel[];
}
