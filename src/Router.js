import React from 'react';
import { observer } from 'mobx-react/native';
import { BackHandler, Linking, ViewPropTypes } from 'react-native';
import navigationStore from './navigationStore';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';

@observer
class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress);
    Linking.addEventListener('url', ({ url }: { url: string }) => {
      this._handleOpenURL(url);
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress);
  }
  onBackPress = () => {
    navigationStore.pop();
    return navigationStore.currentScene !== navigationStore.prevScene;
  };
  _urlToPathAndParams(url: string) {
    const params = {};
    const delimiter = this.props.uriPrefix || '://';
    let path = url.split(delimiter)[1];
    if (!path) {
      path = url;
    }
    return {
      path,
      params,
    };
  }

  _handleOpenURL = (url: string) => {
    const parsedUrl = this._urlToPathAndParams(url);
    if (parsedUrl) {
      const { path, params } = parsedUrl;
      const action = navigationStore.router.getActionForPathAndParams(path, params);
      console.log('HANDLE URL:', url, action, path, params);
      if (action) {
        navigationStore.dispatch(action);
      }
    }
  };
  render() {
    const AppNavigator = this.props.navigator;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch: navigationStore.dispatch, state: navigationStore.state })} />
    );
  }
}

App.propTypes = {
  navigator: PropTypes.func,
  backAndroidHandler: PropTypes.func,
  uriPrefix: PropTypes.string,
};

const Router = ({ createReducer, uriPrefix, sceneStyle, scenes, navigator, getSceneStyle, children, state, dispatch, wrapBy = props => props, ...props }) => {
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
  return <App {...props} navigator={AppNavigator} uriPrefix={uriPrefix} />;
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
};

export default Router;
