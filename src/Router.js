import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';

import navigationStore from './navigationStore';

export default class Router extends React.Component {
  static propTypes = {
    createReducer: PropTypes.func,
    dispatch: PropTypes.func,
    state: PropTypes.object,
    scenes: PropTypes.func,
    navigator: PropTypes.func,
    wrapBy: PropTypes.func,
    getSceneStyle: PropTypes.func,
    sceneStyle: PropTypes.object,
    children: PropTypes.element,
  }

  constructor(...args) {
    super(...args);

    const { createReducer, sceneStyle, scenes, navigator, getSceneStyle, children, state, dispatch, wrapBy = props => props, ...props } = this.props;

    const data = { ...props };

    if (getSceneStyle) {
      data.cardStyle = getSceneStyle(props);
    }
    if (sceneStyle) {
      data.cardStyle = sceneStyle;
    }

    this.AppNavigator = scenes || navigator || navigationStore.create(children, data, wrapBy);

    // TODO: Build this. Also... make sure it works when scenes or navigator are passed in (when is that actually valid????)
    navigationStore.integrateNavigator(this.AppNavigator);

    navigationStore.reducer = createReducer && createReducer(props);

    if (dispatch && state) {
      // TODO: Make sure this works with the new way
      // set external state and dispatch
      navigationStore.setState(state);
      navigationStore.dispatch = dispatch;
    }
  }

  componentDidMount() {
    if (!navigationStore.dispatch) {
      navigationStore.dispatch = this.navigator._navigation.dispatch;
      navigationStore.getState = () => this.navigator._navigation.state;
    }
  }

  render() {
    const { dispatch, state } = this.props;
    const AppNavigator = this.AppNavigator;

    return (
      <AppNavigator
        ref={r => { this.navigator = r; }}
        navigation={dispatch && state ? addNavigationHelpers({ dispatch, state }) : null}
        onNavigationStateChange={navigationStore.onNavigationStateChange}
      />
    );
  }
}
