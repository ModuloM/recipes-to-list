// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import type { Recipe } from '../../types/Recipe.type';
import RecipeItem from './RecipeItem.component';
import data from '../../assets/data/recipes.json';

const RecipeListWrapper = styled.div`
  flex: 1 1 auto;
`;

class RecipeList extends Component {
  state: {
    recipes: Array<Recipe>,
    selectedRecipes: Object
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      recipes: data,
      selectedRecipes: {}
    };
  }

  componentWillMount() {
    // TODO will normally receive data in this hook
  }

  handleSelectRecipe = (selectedRecipe: {id: number, selected: boolean}): any => {
    this.setState({
      selectedRecipes: {
        ...this.state.selectedRecipes,
        [selectedRecipe.id]: selectedRecipe
      }
    });
  }

  render() {
    return (
      <RecipeListWrapper>
        { this.state.recipes &&
          this.state.recipes.map(recipe => (
            <RecipeItem key={ recipe.recipe_id }
              data={ recipe }
              onRecipeSelected={ this.handleSelectRecipe }
              selected={
                this.state.selectedRecipes[recipe.recipe_id] ?
                  this.state.selectedRecipes[recipe.recipe_id].selected :
                  false
              }
            />
          ))
        }
      </RecipeListWrapper>
    );
  }
}

export default RecipeList;
