import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import navigationStore from './navigationStore';
import pathParser from './pathParser';

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
    uriPrefix: PropTypes.string,
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

    navigationStore.integrateNavigator(this.AppNavigator);

    navigationStore.reducer = createReducer && createReducer(props);

    if (dispatch) {
      // set external state and dispatch
      navigationStore.dispatch = dispatch;
      navigationStore.getState = () => state;

      navigationStore.dispatch(NavigationActions.init());
    }
  }

  componentDidMount() {
    if (!navigationStore.dispatch) {
      navigationStore.dispatch = this.navigator._navigation.dispatch;
      navigationStore.getState = () => this.navigator._navigation.state;

      // NOTE: This is here because onNavigationStateChange is not called when you first launch
      // a react-navigation app.
      navigationStore.onNavigationStateChange({}, navigationStore.getState());
    } else {
      navigationStore.getState = () => this.props.state;
    }

    // If the app was "woken up" by an external route.
    Linking.getInitialURL().then((url) => this.parseDeepURL(url));
    // Add an event listener for further deep linking.
    Linking.addEventListener('url', this.handleDeepURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepURL);
  }

  handleDeepURL = (e) => this.parseDeepURL(e.url);

  parseDeepURL = (url) => {
    // If there is no url, then return.
    if (!url) { return; }

    // Clean the url with the given prefix.
    const cleanUrl = this.props.uriPrefix ? url.split(this.props.uriPrefix)[1] : url;
    // Build an array of paths for every scene.
    const allPaths = Object.values(navigationStore.states).map(obj => obj.path).filter(path => path);
    // Try to match the url against the set of paths and parse the url parameters.
    const parsedPath = pathParser(cleanUrl, allPaths);

    // If the url could not be matched, then return.
    if (!parsedPath) { return; }

    // Destructure the matched path and the parsed url parameters.
    const { path, params } = parsedPath;

    // Get the action from the scene associated with the matched path.
    const actionKey = Object.entries(navigationStore.states)
      .filter(([, value]) => value.path === path)
      .map(([key]) => key)
      .find(key => key);

    if (actionKey && navigationStore[actionKey]) {
      // Call the action associated with the scene's path with the parsed parameters.
      navigationStore[actionKey](params);
    }
  };

  render() {
    const { dispatch, state } = this.props;
    const AppNavigator = this.AppNavigator;

    const appNavigatorProps = {};

    if (dispatch) {
      if (!state) return null;

      appNavigatorProps.navigation = addNavigationHelpers({ dispatch, state });
    } else {
      appNavigatorProps.onNavigationStateChange = navigationStore.onNavigationStateChange;
    }

    return (
      <AppNavigator
        ref={r => { this.navigator = r; }}
        {...appNavigatorProps}
      />
    );
  }
}
