import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { Scene, Actions, Router } from 'react-native-router-flux';
import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';

import Home from './home';
import Page from './page';
import reducer from './a-reducer';

const AppNavigator = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="home" component={Home} />
    <Scene key="page" component={Page} />
  </Scene>,
);

// default nav reducer
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('home'));
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
  reducer,
});

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const ReduxNavigator = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const ReduxRouter = connect(mapStateToProps)(Router);
const store = createStore(appReducer, applyMiddleware(middleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxRouter navigator={ReduxNavigator} />
      </Provider>
    );
  }
}
