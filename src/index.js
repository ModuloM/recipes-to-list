import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/app/App.component';
import Recipes from './components/recipe/RecipeList.component';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Router>
    <App>
      <Route exact path="/"
        component={Recipes}
      />
    </App>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
