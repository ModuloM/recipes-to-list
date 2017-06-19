// @flow
import R from 'ramda';

import type { Ingredient } from '../types/Ingredient.type';
import type { Recipe } from '../types/Recipe.type';

export function cleanRecipesIngredientsUnits(recipes: Array<Recipe>): Array<Recipe> {
  return R.reduce(
          (cleanedRecipes, recipe) => {
            return [
              ...cleanedRecipes,
              {
                ...recipe,
                ingredients: cleanIngredientsUnits(recipe.ingredients)
              }
            ];
          },
          [],
          recipes
        );
}

export function cleanIngredientsUnits(ingredients: Array<Ingredient>): Array<Ingredient> {
  return R.map(
          ingredient => cleanIngredientUnits(ingredient),
          ingredients);
}

export function cleanIngredientUnits(ingredient: Ingredient): Ingredient {
  const parsedIngredient = {};
  switch (ingredient.unit) {
    case "kg":
      parsedIngredient.quantity = Math.round(ingredient.quantity * 1000);
      parsedIngredient.unit = "g";
      break;
    case "cloves":
      // we suppose a all garlic have 6 cloves average
      parsedIngredient.quantity = ingredient.quantity / 8;
      parsedIngredient.unit = "";
      break;
    case "ml":
      parsedIngredient.quantity = Math.round(ingredient.quantity);
      parsedIngredient.unit = "ml";
      break;
    default:
      break;
  }
  return R.omit(
    ['display_index'],
    {
      ...ingredient,  
      ...parsedIngredient
    }
  )
}

// In case we want to change servings number: not used for now
export function computeRecipesIngredientsForOnePerson(recipes: Array<Recipe>): Array<Recipe> {
  return R.reduce(
          (computedRecipes, recipe) => {
            return [
              ...computedRecipes,
              {
                ...recipe,
                ingredients: quantitiesForOnePerson(recipe.servings, recipe.ingredients)
              }
            ]
          },
          [],
          recipes
        );
}

// In case we want to change servings number: not used for now
export function quantitiesForOnePerson(servings: number, ingredients: Array<Ingredient>): Array<Ingredient> {
  return R.reduce(
          (onePersonIngredients, ingredient) => {
            return [
              ...onePersonIngredients,
              {
                ...ingredient,
                quantity: ingredient.quantity / servings
              }
            ]
          },
          [],
          ingredients
        );
}

export function getSelectedRecipeIds(selectedRecipes: { [id: number]: { id: number, selected: boolean } }): { [id: number]: { id: number } } {
  return R.map(
          R.omit(['selected']),
          R.filter(
            selectedRecipe => selectedRecipe.selected,
            selectedRecipes
          )
        );
}

export function getSelectedRecipesObjects(selectedRecipesIds: { [id: number]: { id: number } }, recipes: { [id: number]: Recipe }): { [id: number]: Recipe } {
  return R.pickAll(
          Object.keys(selectedRecipesIds),
          recipes
        );
}

export function getIngredients(recipes: { [id: number]: Recipe }): Array<Ingredient> {
  return R.chain(
          R.prop('ingredients'),
          Object.values(recipes)
        );
}

const getIngredientBy = R.curry(
  (property, list) => R.groupBy(
    (element) => element[property].trim(),
    list
  )
);

export function getIngredientsByName(ingredients: Array<Ingredient>): { [name: string]: Array<Ingredient> } {
  return getIngredientBy('name', ingredients);
}

export function getIngredientsByUnit(ingredients: Array<Ingredient>): { [unit: string]: Array<Ingredient> } {
  return getIngredientBy('unit', ingredients);
}

export function getIngredientsByDepartment(ingredients: Array<Ingredient>): { [department: string]: Array<Ingredient> } {
  return getIngredientBy('department', ingredients);
}

export function computeIngredientQuantities(ingredients: Array<Ingredient>): Ingredient {
  return R.reduce(
          (newIngredient, ingredient) => {
            return {
              ...ingredient,
              quantity: R.add(ingredient.quantity, newIngredient.quantity)
            };
          },
          { quantity: 0 },
          ingredients
        );
}

export function computeIngredients(ingredients: Array<Ingredient>): Array<Ingredient> {
  const ingredientsByName = getIngredientsByName(ingredients);
  
  /// TODO use chain?
  return R.flatten(
          R.map(
            ingredientGroupName => {
              const ingredientByUnit = getIngredientsByUnit(ingredientGroupName)
              
              return R.map(
                ingredientGroupUnit => computeIngredientQuantities(ingredientGroupUnit),
                Object.values(ingredientByUnit)
              );
            },
            Object.values(ingredientsByName)
          )
        );
}

// TODO filter some specifics ingredients
// salt, pepper, olive oil, sesame seeds, etc.

export default {
  cleanRecipesIngredientsUnits,
  cleanIngredientsUnits,
  cleanIngredientUnits,
  computeRecipesIngredientsForOnePerson,
  quantitiesForOnePerson,
  getSelectedRecipeIds,
  getSelectedRecipesObjects,
  getIngredients,
  getIngredientsByName,
  getIngredientsByUnit,
  getIngredientsByDepartment,
  computeIngredients,
  computeIngredientQuantities
};
