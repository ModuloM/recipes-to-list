// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled, { keyframes } from 'styled-components';

import logo from '../../assets/images/rtl-logo.png';
import type { INGREDIENTS_COMPUTE_ACTION } from '../list/list.actions';
import { computeIngredients } from '../list/list.actions';
import type { Recipe } from '../../types/Recipe.type';
import { getRecipes, getSelectedRecipes } from '../recipe/recipe.reducer';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1 1 auto;
  width: 100%;
`;

const animatedLogo = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
`;

const AppLogo = styled.img`
  animation: ${animatedLogo} normal 1s linear;
  height: 80px;
`;

const AppHeader = styled.div`
  flex: 1 1 auto;
  text-align: center;
  background-color: hsla(192, 88%, 73%, 0.63);
  height: 150px;
  padding: 20px;
  color: #333;
`;

const AppActions = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70px;
  background: rgb(148, 210, 222);
  button {
    color: #333;
    background: transparent;
    height: 3rem;
    font-size: 1rem;
    border: #333 2px solid;
    border-radius: .5rem;
    cursor: pointer;
    &:hover {
      color: rgb(148, 210, 222);
      background: #333;
    }
  }
`;

const AppContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

class App extends React.Component {
  props: {
    children: any,
    location: any,
    history: any,
    recipes: { [id: number]: Recipe },
    selectedRecipes: { [id: number]: { id: number, selected: boolean } },
    computeIngredients: () => INGREDIENTS_COMPUTE_ACTION
  }

  handleSwitch = () => {
    const { location, history, recipes, selectedRecipes, computeIngredients } = this.props;
    computeIngredients(recipes, selectedRecipes);
    // FIXME don't work anymore ... component does not re render
    location.pathname === '/' ? history.push('/list') : history.push('/');
  }

  render() {
    const { children } = this.props;
    return (
      <AppWrapper>
        <AppHeader>
          <AppLogo src={logo} alt="logo"/>
          <h2>Recipes to List - Yummy!</h2>
        </AppHeader>
        <AppActions>
          <button onClick={ this.handleSwitch }>To Recipes &#8644; To List</button>
        </AppActions>
        <AppContent>
          { children }
        </AppContent>
      </AppWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: getRecipes(state),
    selectedRecipes: getSelectedRecipes(state)
  }
}

export default connect(
  mapStateToProps,
  {
    computeIngredients
  }
)(withRouter(App));
