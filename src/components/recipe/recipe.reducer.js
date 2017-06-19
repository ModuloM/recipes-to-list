// @flow
import { createReducer, arrayToDictionary } from '../../commons/reducers.commons';

import type { State } from '../../types/State.type';
import type { Recipe } from '../../types/Recipe.type';
import type {
  RECIPE_LIST_SUCCESS_ACTION,
  RECIPE_LIST_UPDATE_ACTION
} from './recipe.actions';

export type SelectedRecipe = { id: number, selected: boolean };
export type SelectedRecipes = { [id: number]: SelectedRecipe };

type RecipeState = {
  entities: { 
    [id: number]: Recipe
  },
  loading: boolean,
  selectedRecipes: SelectedRecipes
};

// FIXME despite this example https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability
// it is not working
// type RecipeState = {
//   +entities: {
//     [id: number]: Recipe
//   },
//   +loading: boolean,
//   +selectedId: ?number
// };

const defaultState: RecipeState = {
  entities: {},
  loading: false,
  selectedRecipes: {}
};

// selectors
export const getSelectedRecipes = (state: State): SelectedRecipes => {
  return state.recipe.selectedRecipes;
};

export const getRecipes = (state: State): Array<Recipe> => {
  return state.recipe.entities;
};

// I had to do this because of https://github.com/facebook/flow/issues/2221
export const getRecipesList = (state: State): Array<mixed> => {
  return Object.values(state.recipe.entities);
};


// case reducers
const loadRecipes = (recipeState: RecipeState, action: RECIPE_LIST_SUCCESS_ACTION) => {
  return {
    entities: arrayToDictionary(action.recipes),
    loading: false,
    selectedRecipes: {}
  };
};

const updateRecipes = (recipeState: RecipeState, action: RECIPE_LIST_UPDATE_ACTION) => {
  return {
    ...recipeState,
    selectedRecipes: {
      ...recipeState.selectedRecipes,
      [action.recipe.id]: action.recipe
    }
  };
};

// reducer
export const recipe = createReducer(defaultState, {
  "[RECIPE LIST] SUCCESS": loadRecipes,
  "[RECIPE LIST] UPDATE": updateRecipes
});
