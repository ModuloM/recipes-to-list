// @flow
import type { Recipe } from '../../types/Recipe.type';
import data from '../../assets/data/recipes.json';
import { cleanRecipesIngredientsUnits } from '../../services/ingredient.service';

export type RECIPE_LIST_SUCCESS_ACTION = {
  type: "[RECIPE LIST] SUCCESS",
  recipes: Array<Recipe>
};

export function requestRecipeList(): RECIPE_LIST_SUCCESS_ACTION {
  return {
    type: "[RECIPE LIST] SUCCESS",
    recipes: cleanRecipesIngredientsUnits(data)
  }  
}

export type RECIPE_LIST_UPDATE_ACTION = {
  type: "[RECIPE LIST] UPDATE",
  recipe: {id: number, selected: boolean}
};

export function updateSelectedRecipes(recipe: {id: number, selected: boolean}): RECIPE_LIST_UPDATE_ACTION {
  return {
    type: "[RECIPE LIST] UPDATE",
    recipe
  }
}
