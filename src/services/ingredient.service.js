// @flow
import R from 'ramda';

import type { Ingredient } from '../types/Ingredient.type';
import type { Recipe } from '../types/Recipe.type';

// TODO UT
export function unifiyIngredientUnits(ingredient: Ingredient): Ingredient {
  const parsedIngredient = {};
  switch (ingredient.unit) {
    case "kg":
      parsedIngredient.quantity = Math.round(ingredient.quantity / 1000);
      parsedIngredient.unit = "g";
      break;
    default:
      break;
  }
  return {
    ...ingredient,
    ...parsedIngredient
  }
}

export function quantitiesForOnePerson(servings: number, ingredients: Array<Ingredient>): Array<Ingredient> {
  if (servings <= 1) {
    return ingredients;
  } else {
    return ingredients;
  }
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

// export function getIngredients(recipes: { [id: number]: Recipe }): Array<Ingredient> {
export function getIngredients(recipes: any): any {
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
  getSelectedRecipeIds,
  getSelectedRecipesObjects,
  getIngredients,
  getIngredientsByName,
  getIngredientsByUnit,
  getIngredientsByDepartment,
  computeIngredients,
  computeIngredientQuantities
};
