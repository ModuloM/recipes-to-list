// @flow
import type { Ingredient } from './Ingredient.type';

export type Recipe = {
  id: number,
  title: string,
  image_name: string,
  instructions: string,
  servings: 4,
  ingredients: Ingredient[]
}
