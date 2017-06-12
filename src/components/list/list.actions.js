// @flow
import type { Ingredient } from '../../types/Ingredient.type';
import type { Recipe } from '../../types/Recipe.type';
import {
  getSelectedRecipeIds,
  getSelectedRecipesObjects,
  getIngredients
} from '../../services/ingredient.service';

export type INGREDIENTS_COMPUTE_ACTION = {
  type: "[INGREDIENTS] COMPUTE",
  ingredients: Array<Ingredient>
};


// FIXME flow: can't import SelectedRecipes type ... don't know why
export function computeIngredients(recipes: { [id: number]: Recipe }, selectedRecipes: { [id: number]: { id: number, selected: boolean } }): INGREDIENTS_COMPUTE_ACTION {
  console.log('recipe', recipes)
  const selectedRecipesIds = getSelectedRecipeIds(selectedRecipes);
  console.log('selectedRecipesIds', selectedRecipesIds)
  const selectedRecipesObjects = getSelectedRecipesObjects(selectedRecipesIds, recipes);
  console.log('selectedRecipesObjects', selectedRecipesObjects)
  const ingredients = getIngredients(selectedRecipesObjects);
  
  return {
    type: "[INGREDIENTS] COMPUTE",
    ingredients
  }
}
