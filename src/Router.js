import React from 'react';
import {observable, autorun, computed, toJS} from 'mobx';
import {observer} from 'mobx-react/native';
import navigationStore from './navigationStore';
import Scene from './Scene';
import {OnEnter, OnExit,assert } from './Util';
import {TabNavigator, DrawerNavigator, StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import {renderRightButton, renderLeftButton, renderBackButton} from './NavBar';
import {Text} from 'react-native';

const reservedKeys = [
  'children',
  'navigate',
  'currentState',
  'refresh',
  'dispatch',
  'push',
  'setParams',
  'run',
  'onEnter',
  'onRight',
  'onLeft',
  'left',
  'back',
  'right',
  'rightButton',
  'leftButton',
  'on',
  'onExit',
  'pop',
  'renderLeftButton',
  'renderRightButton',
  'navBar',
  'title',
  'drawerOpen',
  'drawerClose'
];

const dontInheritKeys = [
  'component',
  'modal',
  'drawer',
  'tabs',
  'navigator',
  'children',
  'key',
  'ref',
  'style',
  'title',
  'hideNavBar',
  'hideTabBar',
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

function createTabBarOptions({tabBarStyle, activeTintColor, inactiveTintColor, activeBackgroundColor, inactiveBackgroundColor, showLabel, labelStyle, tabStyle}) {
  return {style:tabBarStyle, activeTintColor, inactiveTintColor, activeBackgroundColor, inactiveBackgroundColor, showLabel, labelStyle, tabStyle};
}
function createNavigationOptions(params) {
  const {title, backButtonImage, navTransparent, hideNavBar, hideTabBar, backTitle, right, rightButton, left, leftButton,
    navigationBarStyle, headerStyle, navBarButtonColor, tabBarLabel, tabBarIcon, icon,
    headerTitleStyle, titleStyle, navBar, onRight, onLeft, rightButtonImage, leftButtonImage, init, back} = params;
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
    };
    if (NavBar) {
      res.header = (props) => <NavBar navigation={navigation} {...params} />
    }

    if (tabBarLabel) {
      res.tabBarLabel = tabBarLabel;
    }

    if (tabBarIcon || icon) {
      res.tabBarIcon = tabBarIcon || icon;
    }

    if (rightButtonImage || onRight) {
      res.headerRight = getValue((navigationParams.right) || right || rightButton || params.renderRightButton,
          {...navigationParams, ...screenProps}) || renderRightButton({...params, ...navigationParams});
    }

    if (leftButtonImage || onLeft || backButtonImage) {
      res.headerLeft = getValue((navigationParams.left) || left || leftButton || params.renderLeftButton, {...navigationParams, ...screenProps})
        || renderLeftButton({...params, ...navigationParams}) || (init ? null : renderBackButton({...params, ...navigationParams}));
    }

    if (back) {
      res.headerLeft = renderBackButton({...params, ...navigationParams});
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

function createWrapper(Component) {
  if (!Component) {
    return null;
  }
  return observer(({navigation, ...props}) => {
    return <Component {...props} {...navigation.state.params} name={navigation.state.routeName} />
  });
}


const App = observer(props =>{
  const AppNavigator = props.navigator;
  return (
    <AppNavigator navigation={addNavigationHelpers({
      dispatch: navigationStore.dispatch,
      state: navigationStore.state,
    })} />
  );
});

function processScene(scene: Scene, inheritProps = {}) {
  assert(scene.props, 'props should be defined');
  if (!scene.props.children) {
    throw `children property should be defined`;
  }
  const res = {};
  const order = [];
  const {tabs, modal, navigator, wrap, drawerWidth, drawerPosition, contentOptions, contentComponent, lazy, drawer, ...parentProps} = scene.props;

  const commonProps = { ...parentProps, ...inheritProps};
  // add inherit props
  for (const pkey of Object.keys(commonProps)) {
    if (dontInheritKeys.indexOf(pkey) !== -1) {
      delete commonProps[pkey];
    }
  }

  if (drawer && !commonProps.left && !commonProps.leftButtonImage && !commonProps.leftTitle && !commonProps.back) {
    commonProps.leftButtonImage = require('./menu_burger.png');
    commonProps.onLeft = navigationStore.drawerOpen;
  }

  const children = !Array.isArray(parentProps.children) ? [parentProps.children] : parentProps.children;
  let initialRouteName, initialRouteParams;
  for (const child of children) {
    assert(child.key, `key should be defined for ${child}`);
    const key = child.key;
    const init = key === children[0].key;
    if (reservedKeys.indexOf(key) !== -1) {
      throw `Scene name cannot be reserved word: ${child.key}`;
    }
    const {component, type = 'push', onEnter, onExit, on, failure, success, ...props} = child.props;
    if (!navigationStore.states[key]){
      navigationStore.states[key] = {};
    }
    for (const transition of Object.keys(props)) {
      if (reservedKeys.indexOf(transition) === -1 && (transition[props] instanceof Function)) {
        navigationStore.states[key][transition] = props[transition];
      }
    }
    delete props.children;
    if (success) {
      navigationStore.states[key].success = success instanceof Function ? success : ()=>{console.log(`Success ${key}, go to state=${success}`);navigationStore[success]()};
    }
    if (failure) {
      navigationStore.states[key].failure = failure instanceof Function ? failure : ()=>{console.log(`Failure ${key}, go to state=${failure}`);navigationStore[failure]();}
    }
    //console.log(`KEY ${key} DRAWER ${drawer} TABS ${tabs} WRAP ${wrap}`, JSON.stringify(commonProps));
    const screen = {
      screen: createWrapper(component) || processScene(child, commonProps),
      navigationOptions: createNavigationOptions({...commonProps, ...child.props, init })
    };

    // wrap component inside own navbar for tabs/drawer parent controllers
    const wrapNavBar = drawer || tabs || wrap;
    //console.log("SCENE:", key, wrapNavBar);
    if (component && wrapNavBar) {
      const inner = {};
      inner['_' + key ] = screen;
      res[key] = {screen: StackNavigator(inner, {  navigationOptions: createNavigationOptions(parentProps) }),
        navigationOptions: createNavigationOptions({...commonProps, ...child.props, init: true })};
    } else {
      res[key] = screen;
    }

    // a bit of magic, create all 'actions'-shortcuts inside navigationStore
    props.init = true;
    if (!navigationStore[key]) {
      navigationStore[key] = new Function('actions', 'props', 'type', `return function ${key}(params){ actions[type]('${key}', props, params)}`)(navigationStore, props, type);
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
    return TabNavigator(res, {lazy, initialRouteName, initialRouteParams, order, tabBarOptions:createTabBarOptions(parentProps), navigationOptions: createNavigationOptions(parentProps) });
  } else if (drawer) {
    return DrawerNavigator(res, {initialRouteName, contentComponent, order, backBehavior:'none'});
  } else {
    if (navigator){
      return navigator(res, {lazy, initialRouteName, initialRouteParams, order, ...parentProps, navigationOptions: createNavigationOptions(parentProps) });
    } else {
      return StackNavigator(res, { mode, initialRouteParams, initialRouteName, navigationOptions: createNavigationOptions(parentProps) });
    }
  }
}

export default (props) => {
  const scene: Scene = props.children;
  const AppNavigator = processScene(scene);
  navigationStore.router = AppNavigator.router;

  return <App navigator={AppNavigator} />;
}
