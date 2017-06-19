import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import App from './App.component';

// run into some problems with last enzyme warnings like
// https://github.com/airbnb/enzyme/issues/879
// ... don't have time to pursue for this test
describe.skip('App component', () => {
  const mockStore = configureStore()
  let store,container
  const initialState = { 
    recipe: {
      entities: {},
      loading: false
    },
    list: {
      entities: [],
      loading: false
    }
  };

  beforeEach(() => {
    store = mockStore(initialState)
    container = shallow(<App store={store} /> )
  })

  it('renders without crashing', () => {
    expect(container).exists();
  });
});
