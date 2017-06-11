// @flow

import React from 'react';
import styled from 'styled-components';

import type { Recipe } from '../../types/Recipe.type';
import { media } from '../../commons/styles.commons';

const RecipeItemWrapper = styled.div`
  flex: 0 1 auto;
  text-align: center;
  cursor: pointer;
  background: ${props => props.selected ? '#eee' : 'transparent'};
  &:hover {
    background: #eee;
  }

  /* TODO fix media query
  width: 20%;
  ${media.desktop`width: 25%;`}
  ${media.tablet`width: 50%;`}
  ${media.phone`width: 100%;`}
  */
`;

const RecipeTitle = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
`;

const RecipeImageWrapper = styled.div`
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
`;

const RecipeImage = styled.img`
  display: inline-block;
  width: 80%;
`;

const RecipeInstructions = styled.div`
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
`;

const RecipeItem = ({
  data,
  onRecipeSelected,
  selected
}: {
  data: Recipe,
  onRecipeSelected: (selectedRecipe: {id: number, selected: boolean}) => {id: number, selected: boolean},
  selected: boolean
}) => (
  <RecipeItemWrapper
    onClick={ (e: MouseEvent): {id: number, selected: boolean} => onRecipeSelected({
      id: data.recipe_id,
      selected: !selected
    }) }
    selected={ selected }
  >
    <RecipeTitle>
      { data.title } <br/>
      For { data.servings } person{ data.servings > 1 ? 's' : '' }
    </RecipeTitle>
    <RecipeImageWrapper>
      <RecipeImage
        // Dynamic require is not officially supported by Webpack, but it work for now
        // I've tried with dynamic import new ES proposal, but can't manage to use it with flow 
        src={ require(`../../assets/images/recipes/${data.image_name}`) }
        alt={ data.title }
      />
    </RecipeImageWrapper>
    <RecipeInstructions>
      { data.instructions }
    </RecipeInstructions>
  </RecipeItemWrapper>
)



export default RecipeItem;
