// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import type { State } from '../../types/State.type';
import type { Recipe } from '../../types/Recipe.type';
import type { SelectedRecipe, SelectedRecipes } from './recipe.reducer';
import { requestRecipeList, updateSelectedRecipes } from './recipe.actions';
import type {
  RECIPE_LIST_SUCCESS_ACTION,
  RECIPE_LIST_UPDATE_ACTION
} from './recipe.actions';
import { getRecipesList, getSelectedRecipes } from './recipe.reducer';
import RecipeItem from './RecipeItem.component';

const RecipeListWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
`;

class RecipeList extends React.Component {
  props: {
    recipes: Array<Recipe>,
    selectedRecipes: SelectedRecipes,
    requestRecipeList: () => RECIPE_LIST_SUCCESS_ACTION,
    updateSelectedRecipes: () => RECIPE_LIST_UPDATE_ACTION
  };

  componentWillMount() {
    const { recipes, requestRecipeList } = this.props;
    // load ones
    if (recipes.length === 0) {
      requestRecipeList();
    }
  }

  handleSelectRecipe = (selectedRecipe: SelectedRecipe): any => {
    const { updateSelectedRecipes } = this.props;
    // flow check do not work here
    updateSelectedRecipes(selectedRecipe);
  }

  render() {
    const { recipes, selectedRecipes } = this.props;

    return (
      <RecipeListWrapper>
        { recipes &&
          recipes.map(recipe => (
            <RecipeItem key={ recipe.id }
              id={ recipe.id }
              image={ recipe.image_name }
              title={ recipe.title }
              onRecipeSelected={ this.handleSelectRecipe }
              instructions={ recipe.instructions }
              selected={
                selectedRecipes[recipe.id] ?
                  selectedRecipes[recipe.id].selected :
                  false
              }
              servings={ recipe.servings }
            />
          ))
        }
      </RecipeListWrapper>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    recipes: getRecipesList(state),
    selectedRecipes: getSelectedRecipes(state)
  }
}

export default connect(
  mapStateToProps,
  {
    requestRecipeList,
    updateSelectedRecipes
  }
)(RecipeList);
