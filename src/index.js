import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory';

import type { Store } from 'types/Store.type';
import App from './components/app/App.component';
import RecipeList from './components/recipe/RecipeList.component';
import List from './components/list/List.component';
import { recipe } from './components/recipe/recipe.reducer';
import { list } from './components/list/list.reducer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const reducers = {
  recipe,
  list
};
export type Reducers = typeof reducers;
const rootReducer = combineReducers(reducers);

const configureStore = (): Store => createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={history}>
      <App>
        <Route exact path="/"
          component={RecipeList}
        />
        <Route exact path="/list"
          component={List}
        />
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
