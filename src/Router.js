import React from 'react';
import { observer } from 'mobx-react/native';
import { ViewPropTypes, BackHandler, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';
import navigationStore from './navigationStore';
import pathParser from './pathParser';

@observer
class App extends React.Component {
  static propTypes = {
    navigator: PropTypes.func,
    backAndroidHandler: PropTypes.func,
    uriPrefix: PropTypes.string,
    onDeepLink: PropTypes.func,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress);

    // If the app was "woken up" by an external route.
    Linking.getInitialURL().then((url) => this.parseDeepURL(url));
    // Add an event listener for further deep linking.
    Linking.addEventListener('url', this.handleDeepURL);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress);
    Linking.removeEventListener('url', this.handleDeepURL);
  }

  onBackPress = () => navigationStore.pop();

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

    if (this.props.onDeepLink) {
      this.props.onDeepLink({ url, action: actionKey, params });
    } else if (actionKey && navigationStore[actionKey]) {
      // Call the action associated with the scene's path with the parsed parameters.
      navigationStore[actionKey](params);
    }
  };

  render() {
    const AppNavigator = this.props.navigator;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch: navigationStore.dispatch, state: navigationStore.state })} />
    );
  }
}

const Router = ({ createReducer, sceneStyle, scenes, uriPrefix, navigator, getSceneStyle, children, state, dispatch, onDeepLink, wrapBy = props => props, ...props }) => {
  const data = { ...props };
  if (getSceneStyle) {
    data.cardStyle = getSceneStyle(props);
  }
  if (sceneStyle) {
    data.cardStyle = sceneStyle;
  }
  const AppNavigator = scenes || navigator || navigationStore.create(children, data, wrapBy);
  navigationStore.reducer = createReducer && createReducer(props);
  if (dispatch && state) {
    // set external state and dispatch
    navigationStore.setState(state);
    navigationStore.dispatch = dispatch;
    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state })} uriPrefix={uriPrefix} />;
  }
  return <App {...props} onDeepLink={onDeepLink} navigator={AppNavigator} uriPrefix={uriPrefix} />;
};
Router.propTypes = {
  createReducer: PropTypes.func,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  scenes: PropTypes.func,
  navigator: PropTypes.func,
  wrapBy: PropTypes.func,
  getSceneStyle: PropTypes.func,
  sceneStyle: ViewPropTypes.style,
  children: PropTypes.element,
  uriPrefix: PropTypes.string,
  onDeepLink: PropTypes.func,
};

export default Router;
