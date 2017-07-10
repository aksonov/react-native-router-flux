import React from 'react';
import { observer } from 'mobx-react/native';
import { View, Image } from 'react-native';
import navigationStore from './navigationStore';
import Scene from './Scene';
import PropTypes from 'prop-types';
import { OnEnter, OnExit, assert } from './Util';
import { TabNavigator, DrawerNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';
import { renderRightButton, renderLeftButton, renderBackButton } from './NavBar';
import LightboxNavigator from './LightboxNavigator';
import _drawerImage from '../images/menu_burger.png';

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
  'drawerClose',
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

function getValue(value, params) {
  return value instanceof Function ? value(params) : value;
}

function createTabBarOptions({ tabBarStyle, activeTintColor, inactiveTintColor, activeBackgroundColor, inactiveBackgroundColor, showLabel, labelStyle, tabStyle, ...props }) {
  return { ...props, style: tabBarStyle, activeTintColor, inactiveTintColor, activeBackgroundColor, inactiveBackgroundColor, showLabel, labelStyle, tabStyle };
}
function createNavigationOptions(params) {
  const { title, backButtonImage, navTransparent, hideNavBar, hideTabBar, backTitle, right, rightButton, left, leftButton,
    navigationBarStyle, headerStyle, navBarButtonColor, tabBarLabel, tabBarIcon, icon, getTitle, renderTitle, panHandlers,
    navigationBarTitleImage, navigationBarTitleImageStyle,
    headerTitleStyle, titleStyle, navBar, onRight, onLeft, rightButtonImage, leftButtonImage, init, back, ...props } = params;
  const NavBar = navBar;
  return ({ navigation, screenProps }) => {
    const navigationParams = navigation.state.params || {};
    const res = {
      ...props,
      headerTintColor: navBarButtonColor,
      headerTitleStyle: headerTitleStyle || titleStyle,
      title: getValue((navigationParams.title) || title || getTitle, { navigation, ...navigationParams, ...screenProps }),
      headerBackTitle: getValue((navigationParams.backTitle) || backTitle, { navigation, ...navigationParams, ...screenProps }),
      headerRight: getValue((navigationParams.right) || right || rightButton || params.renderRightButton, { navigation, ...navigationParams, ...screenProps }),
      headerLeft: getValue((navigationParams.left) || left || leftButton || params.renderLeftButton, { navigation, ...navigationParams, ...screenProps }),
      headerTitle: getValue((navigationParams.renderTitle) || renderTitle || params.renderTitle, { navigation, ...navigationParams, ...screenProps }),
      headerStyle: getValue((navigationParams.headerStyle || headerStyle || navigationBarStyle), { navigation, ...navigationParams, ...screenProps }),
      headerBackImage: navigationParams.backButtonImage || backButtonImage,
    };
    if (NavBar) {
      res.header = (data) => <NavBar navigation={navigation} {...data} {...params} />;
    }

    if (panHandlers === null) {
      res.gesturesEnabled = false;
    }

    if (navigationBarTitleImage) {
      res.headerTitle = <Image source={navigationBarTitleImage} style={navigationBarTitleImageStyle} />;
    }

    if (tabBarLabel) {
      res.tabBarLabel = tabBarLabel;
    }

    if (tabBarIcon || icon) {
      res.tabBarIcon = tabBarIcon || icon;
    }

    if (rightButtonImage || onRight) {
      res.headerRight = getValue((navigationParams.right) || right || rightButton || params.renderRightButton,
          { ...navigationParams, ...screenProps }) || renderRightButton({ ...params, ...navigationParams });
    }

    if (leftButtonImage || onLeft || backButtonImage) {
      res.headerLeft = getValue((navigationParams.left) || left || leftButton || params.renderLeftButton, { ...navigationParams, ...screenProps })
        || renderLeftButton({ ...params, ...navigationParams }) || (init ? null : renderBackButton({ ...params, ...navigationParams }));
    }

    if (back) {
      res.headerLeft = renderBackButton({ ...params, ...navigationParams });
    }

    if (hideTabBar) {
      res.tabBarVisible = false;
    }
    if (hideNavBar) {
      res.header = null;
    }

    if (navTransparent) {
      res.headerStyle = { position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 };
    }
    return res;
  };
}

function createWrapper(Component) {
  if (!Component) {
    return null;
  }
  return observer(({ navigation, ...props }) => <Component {...props} navigation={navigation} {...navigation.state.params} name={navigation.state.routeName} />);
}


const App = observer(props => {
  const AppNavigator = props.navigator;
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch: navigationStore.dispatch, state: navigationStore.state })} />
  );
});

function processScene(scene: Scene, inheritProps = {}, clones = []) {
  assert(scene.props, 'props should be defined');
  if (!scene.props.children) {
    return null;
  }
  const res = {};
  const order = [];
  const { tabs, modal, lightbox, navigator, wrap, contentComponent, lazy, drawer, ...parentProps } = scene.props;

  const commonProps = { ...parentProps, ...inheritProps };
  // add inherit props
  for (const pkey of Object.keys(commonProps)) {
    if (dontInheritKeys.indexOf(pkey) !== -1) {
      delete commonProps[pkey];
    }
  }

  if (drawer && !commonProps.left && !commonProps.leftButtonImage && !commonProps.leftTitle && !commonProps.back) {
    commonProps.leftButtonImage = commonProps.drawerImage || _drawerImage;
    commonProps.onLeft = navigationStore.drawerOpen;
  }

  const children = !Array.isArray(parentProps.children) ? [parentProps.children] : [...parentProps.children];
  // add clone scenes
  if (!drawer && !tabs) {
    children.push(...clones);
  }
  let initialRouteName;
  let initialRouteParams;
  for (const child of children) {
    assert(child.key, `key should be defined for ${child}`);
    const key = child.key;
    const init = key === children[0].key;
    assert(reservedKeys.indexOf(key) === -1, `Scene name cannot be reserved word: ${child.key}`);
    const { component, type = 'push', onEnter, onExit, on, failure, success, ...props } = child.props;
    if (child.props.clone) {
      if (clones.indexOf(child) === -1) {
        clones.push(child);
      }
    }
    if (!navigationStore.states[key]) {
      navigationStore.states[key] = {};
    }
    for (const transition of Object.keys(props)) {
      if (reservedKeys.indexOf(transition) === -1 && (transition[props] instanceof Function)) {
        navigationStore.states[key][transition] = props[transition];
      }
    }
    delete props.children;
    if (success) {
      navigationStore.states[key].success = success instanceof Function ? success : args => { console.log(`Transition to state=${success}`); navigationStore[success](args); };
    }
    if (failure) {
      navigationStore.states[key].failure = failure instanceof Function ? failure : args => { console.log(`Transition to state=${failure}`); navigationStore[failure](args); };
    }
    // console.log(`KEY ${key} DRAWER ${drawer} TABS ${tabs} WRAP ${wrap}`, JSON.stringify(commonProps));
    const screen = {
      screen: createWrapper(component) || processScene(child, commonProps, clones) || (lightbox && View),
      navigationOptions: createNavigationOptions({ ...commonProps, ...child.props, init }),
    };

    // wrap component inside own navbar for tabs/drawer parent controllers
    const wrapNavBar = drawer || tabs || wrap;
    // console.log("SCENE:", key, wrapNavBar);
    if (component && wrapNavBar) {
      res[key] = { screen: processScene({ key, props: { children: { key: `_${key}`, props: child.props } } }, commonProps, clones) };
    } else {
      res[key] = screen;
    }

    // a bit of magic, create all 'actions'-shortcuts inside navigationStore
    props.init = true;
    if (!navigationStore[key]) {
      navigationStore[key] = new Function('actions', 'props', 'type', // eslint-disable-line no-new-func
        `return function ${key}(params){ actions[type]('${key}', props, params)}`)(navigationStore, { ...commonProps, ...props }, type);
    }

    if ((onEnter || on) && !navigationStore[key + OnEnter]) {
      navigationStore[key + OnEnter] = onEnter || on;
    }

    if (onExit && !navigationStore[key + OnExit]) {
      navigationStore[key + OnExit] = onExit;
    }

    order.push(key);
    if (child.props.initial || !initialRouteName) {
      initialRouteName = key;
      initialRouteParams = { ...commonProps, ...props };
    }
  }
  const mode = modal ? 'modal' : 'card';
  if (lightbox) {
    return LightboxNavigator(res, { mode, initialRouteParams, initialRouteName, navigationOptions: createNavigationOptions(parentProps) });
  } else if (tabs) {
    return TabNavigator(res, { lazy, initialRouteName, initialRouteParams, order, ...parentProps,
      tabBarOptions: createTabBarOptions(parentProps), navigationOptions: createNavigationOptions(parentProps) });
  } else if (drawer) {
    return DrawerNavigator(res, { initialRouteName, contentComponent, order, backBehavior: 'none', ...parentProps });
  }
  if (navigator) {
    return navigator(res, { lazy, initialRouteName, initialRouteParams, order, ...parentProps, navigationOptions: createNavigationOptions(parentProps) });
  }
  return StackNavigator(res, { mode, initialRouteParams, initialRouteName, ...parentProps, navigationOptions: createNavigationOptions(parentProps) });
}

const Router = ({ createReducer, ...props }) => {
  const scene: Scene = props.children;
  const AppNavigator = processScene(scene, props);
  navigationStore.router = AppNavigator.router;
  navigationStore.reducer = createReducer && createReducer(props);

  return <App navigator={AppNavigator} />;
};
Router.propTypes = {
  createReducer: PropTypes.func,
  children: PropTypes.element,
};

export default Router;
