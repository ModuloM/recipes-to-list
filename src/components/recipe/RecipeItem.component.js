// @flow
import React from 'react';
import styled from 'styled-components';

import { media, spacingDefault } from '../../commons/styles.commons';

const RecipeItemWrapper = styled.div`
  flex: 0 1 auto;
  text-align: center;
  cursor: pointer;
  padding: ${spacingDefault};
  border: calc(${spacingDefault} / 2) solid #fff;
  background: ${props => props.selected ? '#e4e9ea' : 'transparent'};
  &:hover {
    background: ${props => props.selected ? '#e4e9ea' : '#eee'};
  }

  width: calc((25% - (${spacingDefault} * 3)));
  ${media.desktop`width: calc((33% - (${spacingDefault} * 2.9)));`}
  ${media.tablet`width: calc((50% - (${spacingDefault} * 3)));`}
  ${media.phone`width: 100%;`}
`;

const RecipeTitle = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const RecipeImageWrapper = styled.div`
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
`;

const RecipeImage = styled.img`
  display: inline-block;
  width: 100%;
`;

const RecipeInstructions = styled.div`
  font-size: 1rem;
  text-align: left;
  max-height: 250px;
  overflow: auto;
`;

const RecipeItem = ({
  id,
  image,
  title,
  onRecipeSelected,
  instructions,
  selected,
  servings
}: {
  id: number,
  image: string,
  title: string,
  onRecipeSelected: (selectedRecipe: {id: number, selected: boolean}) => {id: number, selected: boolean},
  instructions: string,
  selected: boolean,
  servings: number
}) => (
  <RecipeItemWrapper
    onClick={ (e: MouseEvent): {id: number, selected: boolean} => onRecipeSelected({
      id,
      selected: !selected
    }) }
    selected={ selected }
  >
    <RecipeImageWrapper>
      <RecipeImage
        // Dynamic require is not officially supported by Webpack, but it work for now
        // I've tried with dynamic import new ES proposal, but can't manage to use it with flow 
        src={ require(`../../assets/images/recipes/${image}`) }
        alt={ title }
      />
    </RecipeImageWrapper>
    <RecipeTitle>
      { title } <br/>
      For { servings } person{ servings > 1 ? 's' : '' }
    </RecipeTitle>
    <RecipeInstructions
      dangerouslySetInnerHTML={{
        __html: instructions.replace(/\r\n/g, '<br/>')
      }}
    />
  </RecipeItemWrapper>
)

export default RecipeItem;
