import React from 'react';
import { observer } from 'mobx-react/native';
import { BackHandler } from 'react-native';
import navigationStore from './navigationStore';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';

@observer
class App extends React.Component {
  static propTypes = {
    navigator: PropTypes.func,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    navigationStore.pop();
    return navigationStore.currentScene !== navigationStore.prevScene;
  };

  render() {
    const AppNavigator = this.props.navigator;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch: navigationStore.dispatch, state: navigationStore.state })} />
    );
  }
}

const Router = ({ createReducer, scenes, navigator, getSceneStyle, children, state, dispatch, wrapBy = props => props, ...props }) => {
  const data = { ...props };
  if (getSceneStyle) {
    data.cardStyle = getSceneStyle();
  }
  const AppNavigator = scenes || navigator || navigationStore.create(children, data, wrapBy);
  navigationStore.reducer = createReducer && createReducer(props);
  if (dispatch && state) {
    // set external state and dispatch
    navigationStore.setState(state);
    navigationStore.dispatch = dispatch;
    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state })} />;
  }
  return <App navigator={AppNavigator} />;
};
Router.propTypes = {
  createReducer: PropTypes.func,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  scenes: PropTypes.element,
  navigator: PropTypes.func,
  wrapBy: PropTypes.func,
  getSceneStyle: PropTypes.func,
  children: PropTypes.element,
};

export default Router;
