import React from 'react';
import {observable, autorun, computed, toJS} from 'mobx';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import navigationStore from './navigationStore';
import Scene from './Scene';
import {OnEnter, OnExit,assert } from './Util';
import {TabNavigator, DrawerNavigator, StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import {renderRightButton, renderLeftButton, renderBackButton} from './NavBar';

const reservedKeys = [
  'navigate',
  'currentState',
  'refresh',
  'dispatch',
  'push',
  'setParams',
  'back',
  'onEnter',
  'onRight',
  'onLeft',
  'left',
  'right',
  'rightButton',
  'leftButton',
  'on',
  'onExit',
  'pop',
  'renderLeftButton',
  'renderRightButton',
  'navBar',
  'title'
];

const dontInheritKeys = [
  'component',
  'children',
  'key',
  'ref',
  'style',
  'title',
  'hideNavBar',
  'hideTabBar',
  'navTransparent',
];

function filterParam(data) {
  if (data.toString() !== '[object Object]') {
    return {data};
  }
  const proto = (data || {}).constructor.name;
  // avoid passing React Native parameters
  if (!data || (proto !== 'Object')) {
    return {};
  }
  return data;
}


function getValue(value, params) {
  return value instanceof Function ? value(params) : value;
}

function createNavigationOptions(params) {
  const {title, backButtonImage, navTransparent, hideNavBar, hideTabBar, backTitle, right, rightButton, left, leftButton,
    navigationBarStyle, headerStyle, navBarButtonColor,
    headerTitleStyle, titleStyle, navBar, onRight, onLeft, rightButtonImage, leftButtonImage} = params;
  let NavBar = navBar;
  return ({navigation, screenProps}) => {
    const navigationParams = navigation.state.params || {};
    const res = {
      headerTintColor: navBarButtonColor,
      headerTitleStyle : headerTitleStyle || titleStyle,
      title: getValue((navigationParams.title) || title, {...navigationParams, ...screenProps}),
      headerBackTitle: getValue((navigationParams.backTitle) || backTitle, {...navigationParams, ...screenProps}),
      headerRight: getValue((navigationParams.right) || right || rightButton || params.renderRightButton, {...navigationParams, ...screenProps}),
      headerLeft: getValue((navigationParams.left) || left || leftButton || params.renderLeftButton, {...navigationParams, ...screenProps}),
      headerStyle: getValue((navigationParams.headerStyle || headerStyle || navigationBarStyle), {...navigationParams, ...screenProps}),
      headerBackImage: navigationParams.backButtonImage || backButtonImage,
    }
    if (NavBar) {
      res.header = (props) => <NavBar navigation={navigation} {...params} />
    }

    if (rightButtonImage || onRight) {
      res.headerRight = getValue((navigationParams.right) || right || rightButton || params.renderRightButton, {...navigationParams, ...screenProps}) || renderRightButton({...params, ...navigationParams});
    }

    if (leftButtonImage || onLeft || backButtonImage) {
      res.headerLeft = getValue((navigationParams.left) || left || leftButton || params.renderLeftButton, {...navigationParams, ...screenProps}) || renderLeftButton({...params, ...navigationParams}) || renderBackButton({...params, ...navigationParams});
    }

    if (hideTabBar) {
      res.tabBarVisible = false
    }
    if (hideNavBar) {
      res.header = null;
    }

    if (navTransparent) {
      res.headerStyle = { position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 }
    }
    return res;
  }
}

@observer
class Renderer extends React.Component {
  render() {
    const Component = this.props.router.screen;
    return <Component navigation={addNavigationHelpers({state: this.props.router.state, dispatch: this.props.router.dispatch})}/>
  }
}

@observer
class App extends React.Component {

  render() {
    const AppNavigator = this.props.navigator;
    //console.log("NEW STATE:", JSON.stringify(navigationStore._state), JSON.stringify(navigationStore.currentState()));
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: navigationStore.dispatch,
        state: navigationStore.state,
      })} />
    );
  }
}

function processScene(scene: Scene, inheritProps = {}) {
  assert(scene.props, 'props should be defined');
  if (!scene.props.children) {
    throw `children property should be defined`;
  }
  const res = {};
  const order = [];
  const {tabs, modal, lazy, drawer, ...parentProps} = scene.props;

  const commonProps = { ...parentProps, ...inheritProps};
  // add inherit props
  for (const key of Object.keys(commonProps)) {
    if (dontInheritKeys.indexOf(key) !== -1)
      delete commonProps[key];
  }

  const children = !Array.isArray(parentProps.children) ? [parentProps.children] : parentProps.children;
  let initialRouteName, initialRouteParams;
  for (const child of children) {
    assert(child.key, `key should be defined for ${child}`);
    const key = child.key;
    if (reservedKeys.indexOf(key) !== -1) {
      throw `Scene name cannot be reserved word: ${child.key}`;
    }
    const {component, children, onEnter, onExit, on, failure, success, ...props} = child.props;
    if (!navigationStore.states[key]){
      navigationStore.states[key] = {};
    }
    for (const transition of Object.keys(props)) {
      if (reservedKeys.indexOf(transition) === -1 && (transition[props] instanceof Function)) {
        navigationStore.states[key][transition] = props[transition];
      }
    }
    if (success) {
      navigationStore.states[key].success = success instanceof Function ? success : ()=>navigationStore[success]();
    }
    if (failure) {
      navigationStore.states[key].failure = failure instanceof Function ? failure : ()=>{console.log(`Failure ${key}, go to state=${failure}`);navigationStore[failure]();}
    }
    res[key] = {
      screen: component || processScene(child, parentProps),
      navigationOptions: createNavigationOptions({...child.props, ...commonProps})
    };

    // a bit of magic, create all 'actions'-shortcuts inside navigationStore
    if (!navigationStore[key]) {
      navigationStore[key] = new Function('actions', 'props', `return function ${key}(params){ actions.push('${key}', Object.assign({}, props, params))}`)(navigationStore, props);
    }

    if ((onEnter || on) && !navigationStore[key+OnEnter]) {
      navigationStore[key+OnEnter] = onEnter || on;
    }

    if (onExit && !navigationStore[key+OnExit]) {
      navigationStore[key+OnExit] = onExit;
    }

    order.push(key);
    if (child.props.initial || !initialRouteName) {
      initialRouteName = key;
      initialRouteParams = props;
    }
  }
  const mode = modal ? 'modal' : 'card';
  if (tabs) {
    return TabNavigator(res, {lazy, initialRouteParams, order, navigationOptions: createNavigationOptions(parentProps) });
  } else if (drawer) {
    return DrawerNavigator(res);
  } else {
    return StackNavigator(res, { mode, initialRouteParams, initialRouteName, navigationOptions: createNavigationOptions(parentProps) });
  }
}

export default (scene: Scene) => {
  const AppNavigator = processScene(scene);
  navigationStore.router = AppNavigator.router;

  return ()=> <App navigator={AppNavigator} />;
}
