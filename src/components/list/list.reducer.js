// @flow
import { createReducer } from '../../commons/reducers.commons';

import type { State } from '../../types/State.type';
import type { Ingredient } from '../../types/Ingredient.type';
import type { INGREDIENTS_COMPUTE_ACTION } from './list.actions';
import { getIngredientsByDepartment } from '../../services/ingredient.service';

type ListState = {
  entities: Array<Ingredient>,
  loading: boolean
}

type Action =
  | INGREDIENTS_COMPUTE_ACTION;

const defaultState: ListState = {
  entities: [],
  loading: false
};

// selectors
export const getIngredientList = (state: State): Array<Ingredient> => {
  return state.list.entities;
};

export const getIngredientListByDepartment = (state: State): { [department: string]: Array<Ingredient> } => {
  return getIngredientsByDepartment(state.list.entities);
};

export const getIngredientsDepartments = (state: State): Array<string> => {
  return Object.keys(getIngredientListByDepartment(state));
};

// case reducers
const updateList = (listState: ListState, action: Action) => {
  return {
    entities: action.ingredients,
    loading: false
  }
};

// reducer
export const list = createReducer(defaultState, {
  // flow check don't work here...
  "[INGREDIENTS] COMPUTE": updateList
});
