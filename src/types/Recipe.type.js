import type { Ingredient } from './Ingredient.type';

export type Recipe = {
  recipe_id: number,
  title: string,
  image_name: string,
  instructions: string,
  servings: 4,
  ingredients: Ingredient[]
}
