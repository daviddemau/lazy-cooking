import { RecipeModel } from '../recipes/model/recipe.model';

export class RecipesData {
  static getHttp(): RecipeModel[] {
    return [
      {
        name: 'Tasty Schnitzel',
        description: 'A super-tasty Schnitzel - just awesome!',
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        ingredients: [
          {
            name: 'eggs',
            amount: 2
          },
          {
            name: 'rice',
            amount: 1
          }
        ]
      },
      {
        name: 'Big Fat Burger',
        description:  'What else you need to say?',
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        ingredients: [
          {
            name: 'meat',
            amount: 1
          },
          {
            name: 'salad',
            amount: 2
          },
          {
            name: 'tomato',
            amount: 2
          }
        ]
      },
    ]
  }
}

