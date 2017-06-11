import React from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './RecipeList.component';

describe('RecipeList component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeList />, div);
  });
});
