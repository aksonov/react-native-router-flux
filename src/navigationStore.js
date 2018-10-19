import React from 'react';
import {
  StatusBar, Image, Animated, Easing,
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  NavigationActions,
  StackActions,
  DrawerActions,
} from 'react-navigation';
import {
  createTabNavigator as DEPRECATED_createTabNavigator,
  TabBarTop as DEPRECATED_TabBarTop,
  TabBarBottom as DEPRECATED_TabBarBottom,
} from 'react-navigation-deprecated-tab-navigator';
import PropTypes from 'prop-types';
import createReducer from './Reducer';
import * as ActionConst from './ActionConst';
import { OnEnter, OnExit, assert } from './Util';
import { LeftButton, RightButton, BackButton } from './NavBar';
import LightboxRenderer from './LightboxRenderer';
import _drawerImage from '../images/menu_burger.png';
import Scene from './Scene';
import { getActiveState, getParent, getRouteNameByKey } from './State';
import Modal from './Modal';
import Lightbox from './Lightbox';
import Drawer from './Drawer';
import Tabs from './Tabs';
import LegacyTabs from './LegacyTabs';
import Overlay from './Overlay';
import OverlayRenderer from './OverlayRenderer';
import createStackNavigatorHOC from './createStackNavigatorHOC';
import createTabNavigatorHOC from './createTabNavigatorHOC';

let RightNavBarButton;
let LeftNavBarButton;
let BackNavBarButton;
let counter = 0;

export const actionMap = {
  [ActionConst.JUMP]: 'jump',
  [ActionConst.PUSH]: 'push',
  [ActionConst.REPLACE]: 'replace',
  [ActionConst.BACK]: 'pop',
  [ActionConst.BACK_ACTION]: 'pop',
  [ActionConst.POP_TO]: 'popTo',
  [ActionConst.REFRESH]: 'refresh',
  [ActionConst.RESET]: 'reset',
  [ActionConst.PUSH_OR_POP]: 'push',
};

const reservedKeys = [
  'addRef',
  'back',
  'children',
  'create',
  'dispatch',
  'drawerClose',
  'drawerOpen',
  'execute',
  'left',
  'leftButton',
  'navBar',
  'navigate',
  'on',
  'onEnter',
  'onExit',
  'onLeft',
  'onRight',
  'pop',
  'popTo',
  'push',
  'refresh',
  'refs',
  'removeRef',
  'renderLeftButton',
  'renderRightButton',
  'renderTitle',
  'replace',
  'right',
  'rightButton',
  'run',
  'setParams',
  'title',
];

const dontInheritKeys = [
  'backToInitial',
  'children',
  'component',
  'contentComponent',
  'drawer',
  'hideNavBar',
  'hideTabBar',
  'key',
  'lightbox',
  'modal',
  'navigator',
  'navTransparent',
  'overlay',
  'ref',
  'style',
  'tabBarComponent',
  'tabs',
  'title',
  'type',
];

function getValue(value, params) {
  return value instanceof Function ? value(params) : value;
}

function getProperties(component = {}) {
  const res = {};
  for (const key of reservedKeys) {
    if (component[key]) {
      res[key] = component[key];
    }
  }
  delete res.children;
  return res;
}
function createTabBarOptions({
  tabBarStyle, activeTintColor, inactiveTintColor, activeBackgroundColor, inactiveBackgroundColor, showLabel, labelStyle, tabStyle, ...props
}) {
  return {
    ...props,
    style: tabBarStyle,
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
    showLabel,
    labelStyle,
    tabStyle,
  };
}
function createNavigationOptions(params) {
  const {
    back,
    backButtonImage,
    backButtonTextStyle,
    backTitle,
    backTitleEnabled,
    backToInitial,
    legacy,
    component,
    drawerIcon,
    drawerImage,
    drawerPosition,
    getTitle,
    headerLayoutPreset,
    headerStyle,
    headerTitleStyle,
    hideDrawerButton,
    hideNavBar,
    hideTabBar,
    icon,
    init,
    left,
    leftButton,
    leftButtonImage,
    leftButtonTextStyle,
    leftTitle,
    navBar,
    navBarButtonColor,
    navigationBarStyle,
    navigationBarTitleImage,
    navigationBarTitleImageStyle,
    navTransparent,
    onLeft,
    onRight,
    panHandlers,
    renderBackButton,
    renderNavigationBar,
    renderTitle,
    right,
    rightButton,
    rightButtonImage,
    rightButtonTextStyle,
    rightTitle,
    tabBarIcon,
    tabBarLabel,
    title,
    titleStyle,
    ...props
  } = params;
  const NavBar = renderNavigationBar || navBar;
  if (component && component.navigationOptions) {
    return component.navigationOptions;
  }
  return ({ navigation, screenProps }) => {
    const navigationParams = navigation.state.params || {};
    const state = {
      navigation,
      ...params,
      ...navigationParams,
      ...screenProps,
    };
    const res = {
      ...props,
      headerBackImage: navigationParams.backButtonImage || backButtonImage,
      headerBackTitle: getValue(navigationParams.backTitle || backTitle, state),
      headerBackTitleEnabled: navigationParams.backTitleEnabled || backTitleEnabled,
      headerLayoutPreset: navigationParams.headerLayoutPreset || headerLayoutPreset,
      headerLeft: getValue(navigationParams.left || left || leftButton || params.renderLeftButton, state),
      headerRight: getValue(navigationParams.right || right || rightButton || params.renderRightButton, state),
      headerStyle: getValue(navigationParams.headerStyle || headerStyle || navigationBarStyle, state),
      headerTintColor: navBarButtonColor || props.tintColor || navigationParams.tintColor || navigationParams.headerTintColor,
      headerTitle: getValue(navigationParams.renderTitle || renderTitle || params.renderTitle, state),
      headerTitleStyle: headerTitleStyle || titleStyle,
      title: getValue(navigationParams.title || title || getTitle, state),
    };

    const NavBarFromParams = navigationParams.renderNavigationBar || navigationParams.navBar;
    if (NavBarFromParams != null) {
      if (NavBarFromParams) {
        res.header = data => <NavBarFromParams navigation={navigation} {...state} {...data} />;
      }
    } else if (NavBar) {
      res.header = data => <NavBar navigation={navigation} {...state} {...data} />;
    }

    if (typeof navigationParams.panHandlers !== 'undefined') {
      if (navigationParams.panHandlers === null) {
        res.gesturesEnabled = false;
      }
    } else if (panHandlers === null) {
      res.gesturesEnabled = false;
    }

    if (navigationBarTitleImage) {
      res.headerTitle = <Image source={navigationBarTitleImage} style={navigationBarTitleImageStyle} />;
    }

    if (tabBarLabel) {
      res.tabBarLabel = tabBarLabel;
    }

    if (tabBarIcon || icon) {
      const Icon = tabBarIcon || icon;
      res.tabBarIcon = data => <Icon {...state} {...data} />;
    }
    const componentData = {};
    // copy all component static functions
    if (component) {
      for (const key of [
        'onRight',
        'onLeft',
        'rightButton',
        'leftButton',
        'leftTitle',
        'rightTitle',
        'rightButtonImage',
        'leftButtonImage',
        'rightButtonTextStyle',
        'leftButtonTextStyle',
        'rightButtonIconStyle',
        'leftButtonIconStyle',
        'leftButtonTintColor',
        'rightButtonTintColor',
      ]) {
        if (component[key]) {
          componentData[key] = component[key];
        }
      }
    }

    if (
      rightButtonImage
      || rightTitle
      || params.renderRightButton
      || onRight
      || navigationParams.onRight
      || navigationParams.rightTitle
      || navigationParams.rightButtonImage
      || rightButtonTextStyle
      || ((drawerImage || drawerIcon) && !hideDrawerButton && drawerPosition === 'right')
    ) {
      res.headerRight = getValue(navigationParams.right || navigationParams.rightButton || params.renderRightButton, { ...navigationParams, ...screenProps }) || (
        <RightNavBarButton navigation={navigation} {...params} {...navigationParams} {...componentData} />
      );
    }

    if (
      leftButtonImage
      || backButtonImage
      || backTitle
      || leftTitle
      || params.renderLeftButton
      || leftButtonTextStyle
      || renderBackButton
      || backButtonTextStyle
      || onLeft
      || navigationParams.leftTitle
      || navigationParams.onLeft
      || navigationParams.leftButtonImage
      || navigationParams.backButtonImage
      || navigationParams.backTitle
      || ((drawerImage || drawerIcon) && !hideDrawerButton && drawerPosition !== 'right')
    ) {
      const leftButton = navigationParams.left || navigationParams.leftButton || params.renderLeftButton;
      res.headerLeft = getValue(leftButton, { ...params, ...navigationParams, ...screenProps })
        || (((onLeft && (leftTitle || navigationParams.leftTitle || leftButtonImage || navigationParams.leftButtonImage)) || drawerImage || drawerIcon) && (
          <LeftNavBarButton navigation={navigation} {...params} {...navigationParams} {...componentData} />
        ))
        || res.headerLeft
        || (init ? null : (!leftButton && renderBackButton && renderBackButton(state)) || (!leftButton && <BackNavBarButton navigation={navigation} {...state} />))
        || null;
    }

    if (back) {
      res.headerLeft = (renderBackButton && renderBackButton(state)) || <BackNavBarButton navigation={navigation} {...state} />;
    }

    if (typeof navigationParams.left !== 'undefined' || typeof navigationParams.leftButton !== 'undefined' || typeof navigationParams.renderLeftButton !== 'undefined') {
      if (navigationParams.left === null || navigationParams.leftButton === null || navigationParams.renderLeftButton === null) {
        res.headerLeft = null;
      }
    }

    // currect dynamic navigation params has priority over static scene params
    // but taking them into account only if they are explicitly set (not null or undefined)
    const routeParams = navigation.state.routes && navigation.state.routes[navigation.state.index].params;
    if (navigationParams.hideTabBar != null) {
      if (navigationParams.hideTabBar) {
        res.tabBarVisible = false;
      }
    } else if (hideTabBar) {
      res.tabBarVisible = false;
    } else if (routeParams && routeParams.hideTabBar) {
      res.tabBarVisible = false;
    }

    if (navigationParams.hideNavBar != null) {
      if (navigationParams.hideNavBar) {
        res.header = null;
      }
    } else if (hideNavBar) {
      res.header = null;
    }

    if (navTransparent) {
      res.headerTransparent = true;
      res.headerStyle = { marginTop: StatusBar.currentHeight };
    }

    if (!legacy && backToInitial) {
      const userDefinedTabBarOnPress = res.tabBarOnPress;
      res.tabBarOnPress = (data) => {
        if (userDefinedTabBarOnPress) {
          console.warn('backToInitial and tabBarOnPress were both defined and might cause unexpected navigation behaviors. I hope you know what you are doing ;-)');
          userDefinedTabBarOnPress(data);
        }
        if (data.navigation && data.navigation.state.index !== 0) {
          data.navigation.dispatch(StackActions.popToTop());
        } else {
          data.defaultHandler();
        }
      };
    }
    return res;
  };
}
function originalRouteName(routeName) {
  if (routeName.startsWith('_')) {
    return routeName.substring(1);
  }
  return routeName;
}
function isStatelessComponent(Component) {
  return !Component.prototype || typeof Component.prototype.render !== 'function';
}
function extendProps(props, store: NavigationStore) {
  if (!props) {
    return {};
  }
  const res = { ...props };
  for (const transition of Object.keys(props)) {
    if (
      reservedKeys.indexOf(transition) === -1
      && transition.startsWith('on')
      && transition.charAt(2) >= 'A'
      && transition.charAt(2) <= 'Z'
      && typeof props[transition] === 'string'
    ) {
      if (store[props[transition]]) {
        res[transition] = params => store[props[transition]](params);
      }
    }
  }
  return res;
}
// eslint no-param-reassign: "error"
function createWrapper(Component, wrapBy, store: NavigationStore) {
  if (!Component) {
    return null;
  }
  const wrapper = wrapBy || (props => props);

  // detect if the component is not functional stateless
  // not sure if Component can be string-defined ("div") here
  // may be there is a better way to detect stateless function component, but this should work
  if (!isStatelessComponent(Component)) {
    class Wrapped extends React.Component {
      static propTypes = {
        navigation: PropTypes.shape().isRequired,
      };

      constructor() {
        super();
        this.onRef = this.onRef.bind(this);
      }

      componentDidMount() {
        const { navigation } = this.props;
        if (this.ref && navigation && navigation.state && navigation.state.routeName) {
          store.addRef(originalRouteName(navigation.state.routeName), this.ref);
        }
        if (this.ref && this.ref.onEnter) {
          this.ref.onEnter(navigation && navigation.state);
        }
      }

      componentWillUnmount() {
        const { navigation } = this.props;
        if (this.ref && navigation && navigation.state && navigation.state.routeName) {
          store.deleteRef(originalRouteName(navigation.state.routeName));
        }
        if (this.ref && this.ref.onExit) {
          this.ref.onExit(navigation && navigation.state);
        }
        this.ref = null;
      }

      onRef(ref) {
        this.ref = ref;
      }

      render() {
        const { navigation } = this.props;
        if (!navigation || !navigation.state) {
          return <Component ref={this.onRef} {...this.props} />;
        }
        return <Component ref={this.onRef} {...this.props} {...extendProps(navigation.state.params, store)} name={navigation.state.routeName} />;
      }
    }
    return wrapper(Wrapped);
  }

  // if component is statless function, ref is not supported
  function StatelessWrapped({ navigation, ...props }) {
    return <Component {...props} navigation={navigation} {...extendProps(navigation.state.params, store)} name={navigation.state.routeName} />;
  }
  StatelessWrapped.propTypes = {
    navigation: PropTypes.shape().isRequired,
  };
  return wrapper(StatelessWrapped);
}

function filterParam(data = {}) {
  if (data.toString() !== '[object Object]') {
    return { data };
  }
  const proto = (data || {}).constructor.name;
  // avoid passing React Native parameters
  if (!data || proto !== 'Object') {
    return {};
  }
  return data;
}

function uniteParams(routeName, params) {
  let res = {};
  for (const param of params) {
    if (param) {
      res = { ...res, ...filterParam(param) };
    }
  }
  res.routeName = routeName;
  return res;
}

const defaultSuccess = () => {};
const defaultFailure = () => {};

class NavigationStore {
  getStateForAction = null;

  reducer = null;

  _navigator = null;

  externalDispatch = null;

  externalState = null;

  prevState = null;

  externalAction = {};

  refs = {};

  states = {};

  currentScene;

  prevScene;

  currentParams;

  onStateChange;

  set externalState(state) {
    if (state && this.externalDispatch) {
      this.onNavigationStateChange(this.state, state, this.externalAction);
      this.state = state;
    }
  }

  setCustomReducer = (Navigator) => {
    this.getStateForAction = Navigator.router.getStateForAction;
    const reducer = createReducer();
    Navigator.router.getStateForAction = (cmd, state) => (this.reducer ? this.reducer(state, cmd) : reducer(state, cmd));
  };

  onEnterHandler = async (currentScene) => {
    if (this.states[currentScene]) {
      const handler = this[currentScene + OnEnter];
      const success = this.states[currentScene].success || defaultSuccess;
      const failure = this.states[currentScene].failure || defaultFailure;
      if (handler) {
        try {
          const res = await handler(this.currentParams, this.state);
          if (res) {
            success(res);
          } else {
            failure();
          }
        } catch (e) {
          failure({ error: e.message });
        }
      }
    }
  };

  onExitHandler = (prevScene) => {
    if (prevScene) {
      const exitHandler = this[prevScene + OnExit];
      if (exitHandler) {
        try {
          const res = exitHandler(this.state);
          if (res instanceof Promise) {
            res.then(defaultSuccess, defaultFailure);
          }
        } catch (e) {
          console.error('Error during onExit handler:', e);
        }
      }
    }
  };

  onNavigationStateChange = async (prevState, currentState, action) => {
    this.state = currentState;
    this.prevState = prevState;
    const activeState = getActiveState(this.state);
    const currentScene = activeState.routeName;
    this.currentParams = { ...activeState.params, ...action.params };
    this.currentScene = currentScene;
    this.prevScene = this.prevState ? getActiveState(this.prevState).routeName : null;
    if (this.currentScene !== this.prevScene) {
      // run onExit for old scene
      this.onExitHandler(this.prevScene);
      setTimeout(() => this.dispatch({
        type: ActionConst.FOCUS,
        routeName: this.currentScene,
        params: this.currentParams,
      }));
      this.onEnterHandler(currentScene);
    } else {
      const routeName = getRouteNameByKey(this.state, action.key);
      if (action.type === 'Navigation/DRAWER_OPENED') {
        this.onEnterHandler(routeName);
      } else if (action.type === 'Navigation/DRAWER_CLOSED') {
        this.onExitHandler(routeName);
      }
    }
    if (this.onStateChange) {
      this.onStateChange(prevState, currentState, action);
    }
  };

  setTopLevelNavigator = (navigatorRef) => {
    this._navigator = navigatorRef;
  };

  addRef = (name, ref) => {
    this.refs[name] = ref;
  };

  deleteRef = (name) => {
    delete this.refs[name];
  };

  create = (scene: Scene, params = {}, wrapBy = props => props) => {
    assert(!Array.isArray(scene), 'Router should contain only one scene, please wrap your scenes with root Scene ');
    RightNavBarButton = wrapBy(RightButton);
    LeftNavBarButton = wrapBy(LeftButton);
    BackNavBarButton = wrapBy(BackButton);
    const Navigator = this.processScene(scene, params, [], wrapBy);
    // set initial state
    this.onNavigationStateChange(null, Navigator.router.getStateForAction(NavigationActions.init()), NavigationActions.init());
    this.setCustomReducer(Navigator);

    return Navigator;
  };

  processScene = (scene: Scene, inheritProps = {}, clones = [], wrapBy) => {
    assert(scene.props, 'props should be defined');
    if (!scene.props.children) {
      return null;
    }
    const res = {};
    const order = [];
    const {
      navigator, renderer, contentComponent, drawerWidth, drawerLockMode, tabBarPosition, lazy, duration, ...parentProps
    } = scene.props;
    let {
      legacy, tabs, modal, lightbox, overlay, drawer, transitionConfig, tabBarComponent,
    } = parentProps;
    if (scene.type === Modal) {
      modal = true;
    } else if (scene.type === Drawer) {
      drawer = true;
    } else if (scene.type === Lightbox) {
      lightbox = true;
    } else if (scene.type === Tabs) {
      tabs = true;
    } else if (scene.type === LegacyTabs) {
      tabs = true;
      legacy = true;
    } else if (scene.type === Overlay) {
      overlay = true;
    }

    if (duration !== undefined && !transitionConfig) {
      transitionConfig = () => ({
        transitionSpec: {
          duration,
          timing: Animated.timing,
          easing: Easing.step0,
        },
      });
    }

    const commonProps = { ...inheritProps, ...parentProps };
    delete commonProps.children;
    delete commonProps.component;
    // add inherit props
    for (const pkey of Object.keys(commonProps)) {
      if (dontInheritKeys.includes(pkey) && (pkey === 'type' || pkey === 'hideNavBar' || !parentProps[pkey])) {
        delete commonProps[pkey];
      }
    }

    if (drawer) {
      commonProps.drawerImage = commonProps.drawerImage || _drawerImage;
    }

    const children = !Array.isArray(parentProps.children) ? [parentProps.children] : [].concat(...parentProps.children);
    // add clone scenes
    if (!drawer && !tabs && !overlay) {
      children.push(...clones);
    }
    // add all clones
    for (const child of children) {
      if (child && child.props.clone) {
        if (clones.indexOf(child) === -1) {
          clones.push(child);
        }
      }
    }
    let initialRouteName;
    let initialRouteParams;
    for (const child of children) {
      // allow null/false child, useful for conditionals
      if (!child) {
        continue;
      }
      const key = child.key || `key${(counter += 1)}`;
      const init = key === children[0].key;
      assert(reservedKeys.indexOf(key) === -1, `Scene name cannot be reserved word: ${child.key}`);
      const {
        component, type = tabs || drawer ? 'jump' : 'push', path, onEnter, onExit, on, failure, success, wrap, initial = false, ...props
      } = child.props;
      if (!this.states[key]) {
        this.states[key] = {};
      }
      for (const transition of Object.keys(props)) {
        if (reservedKeys.indexOf(transition) === -1 && props[transition] instanceof Function) {
          this.states[key][transition] = props[transition];
        }
      }
      delete props.children;
      if (success) {
        this.states[key].success = success instanceof Function
          ? success
          : (args) => {
            // console.log(`Transition to state=${success}`);
            this[success](args);
          };
      }
      if (failure) {
        this.states[key].failure = failure instanceof Function
          ? failure
          : (args) => {
            // console.log(`Transition to state=${failure}`);
            this[failure](args);
          };
      }
      if (path) {
        this.states[key].path = path;
      }
      // console.log(`KEY ${key} LEGACY {legacy} PATH ${path} DRAWER ${drawer} TABS ${tabs} WRAP ${wrap}`, JSON.stringify(commonProps));
      const screen = {
        screen: createWrapper(component, wrapBy, this) || this.processScene(child, commonProps, clones) || (lightbox && (() => null)),
        navigationOptions: createNavigationOptions({
          ...commonProps,
          hideNavBar: parentProps.hideNavBar,
          ...getProperties(component),
          ...child.props,
          init,
          component,
        }),
      };

      // wrap component inside own navbar for tabs/drawer parent controllers
      // don't wrap child scenes for custom navigators/renderers
      let wrapNavBar = drawer || (tabs && !navigator && !renderer) || wrap;
      if (wrap === false || commonProps.wrap === false) {
        wrapNavBar = false;
      }
      if (component && wrapNavBar) {
        res[key] = {
          screen: this.processScene(
            {
              key,
              props: {
                children: {
                  key: `_${key}`,
                  props: { ...child.props, wrap: false },
                },
              },
            },
            commonProps,
            clones,
            wrapBy,
          ),
          navigationOptions: createNavigationOptions({
            ...commonProps,
            ...child.props,
            hideNavBar: true,
          }),
        };
      } else {
        res[key] = screen;
      }

      // a bit of magic, create all 'actions'-shortcuts inside navigationStore
      props.init = true;
      if (!this[key]) {
        this[key] = new Function(
          'actions',
          'props',
          'type',
          `return function ${
            key.replace(/\W/g, '_') // eslint-disable-line no-new-func
          }(params){ actions.execute(type, '${key}', props, params)}`,
        )(this, { error: '', ...commonProps, ...props }, type);
      }

      if ((onEnter || on || (component && component.onEnter)) && !this[key + OnEnter]) {
        this[key + OnEnter] = onEnter || on || component.onEnter;
      }

      if ((onExit || (component && component.onExit)) && !this[key + OnExit]) {
        this[key + OnExit] = onExit || component.onExit;
      }

      order.push(key);
      if (initial || child.props.initial || !initialRouteName) {
        initialRouteName = key;
        initialRouteParams = { ...commonProps, ...props };
      }
    }
    const mode = modal ? 'modal' : 'card';
    const navigationConfig = {
      lazy,
      initialRouteName,
      initialRouteParams,
      contentComponent,
      order,
      ...commonProps,
      navigationOptions: createNavigationOptions(commonProps),
    };
    if (navigator) {
      return navigator(res, navigationConfig);
    }
    if (renderer) {
      return tabs ? createTabNavigatorHOC(renderer)(res, navigationConfig) : createStackNavigatorHOC(renderer)(res, navigationConfig);
    }
    if (lightbox) {
      return createStackNavigatorHOC(LightboxRenderer)(res, {
        mode,
        initialRouteParams,
        initialRouteName,
        ...commonProps,
        navigationOptions: createNavigationOptions(commonProps),
      });
    }

    if (tabs) {
      let createTabNavigator = createMaterialTopTabNavigator;
      if (legacy) {
        createTabNavigator = DEPRECATED_createTabNavigator;
        if (!tabBarComponent) {
          tabBarComponent = tabBarPosition === 'top' ? props => <DEPRECATED_TabBarTop {...props} {...commonProps} /> : props => <DEPRECATED_TabBarBottom {...props} {...commonProps} />;
        }
      } else if (tabBarPosition !== 'top') {
        createTabNavigator = createBottomTabNavigator;
      }

      return createTabNavigator(res, {
        lazy,
        tabBarComponent,
        initialRouteName,
        initialRouteParams,
        tabBarPosition,
        order,
        ...commonProps,
        tabBarOptions: createTabBarOptions(commonProps),
        navigationOptions: createNavigationOptions(commonProps),
      });
    }

    if (drawer) {
      const config = {
        initialRouteName,
        contentComponent,
        order,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        ...commonProps,
      };
      if (drawerWidth) {
        config.drawerWidth = drawerWidth;
      }
      if (drawerLockMode) {
        config.drawerLockMode = drawerLockMode;
      }
      return createDrawerNavigator(res, config);
    }

    if (overlay) {
      return createTabNavigatorHOC(OverlayRenderer)(res, {
        lazy,
        initialRouteName,
        contentComponent,
        initialRouteParams,
        order,
        ...commonProps,
        tabBarOptions: createTabBarOptions(commonProps),
        navigationOptions: createNavigationOptions(commonProps),
      });
    }
    return createStackNavigator(res, {
      mode,
      initialRouteParams,
      initialRouteName,
      ...commonProps,
      transitionConfig,
      navigationOptions: createNavigationOptions(commonProps),
    });
  };

  dispatch = (action) => {
    if (this.externalDispatch) {
      this.externalAction = action;
      this.externalDispatch(action);
    } else if (this._navigator) {
      this._navigator.dispatch(action);
    }
  };

  execute = (actionType, routeName, ...params) => {
    const res = uniteParams(routeName, params);
    const overridenType = res.type || actionType;
    const type = actionMap[overridenType] || overridenType;
    if (type === 'pop') {
      this[type](res);
    } else {
      this[type](routeName, res);
    }
  };

  push = (routeName, data) => {
    const params = filterParam(data);
    this.dispatch({ type: StackActions.PUSH, routeName, params });
  };

  jump = (routeName, data) => {
    const params = filterParam(data);
    this.dispatch({ type: NavigationActions.NAVIGATE, routeName, params });
  };

  drawerOpen = () => {
    this.dispatch(DrawerActions.openDrawer());
  };

  drawerClose = () => {
    this.dispatch(DrawerActions.closeDrawer());
  };

  drawerToggle = () => {
    this.dispatch(DrawerActions.toggleDrawer());
  };

  refresh = (data, sceneKey = null) => {
    const params = filterParam(data);
    const { key } = getActiveState(this.state);
    this.dispatch(
      NavigationActions.setParams({
        key: sceneKey || key,
        params,
      }),
    );
  };

  pop = ({ timeout, key, ...params } = {}) => {
    const res = filterParam(params);
    if (timeout) {
      setTimeout(() => this.pop(params), timeout);
    } else {
      this.dispatch(NavigationActions.back({ key }));
      if (res.refresh) {
        this.refresh(res.refresh);
      }
    }
    return true;
  };

  popTo = (routeName, data) => {
    const params = filterParam(data);
    this.dispatch({ type: ActionConst.POP_TO, routeName, params });
  };

  popAndPush = (routeName, data) => {
    const params = filterParam(data);
    this.dispatch({ type: ActionConst.POP_AND_PUSH, routeName, params });
  };

  replace = (routeName, data) => {
    const params = filterParam(data);
    this.dispatch({ type: ActionConst.REPLACE, routeName, params });
  };

  reset = (routeName, data) => {
    const params = filterParam(data);
    const parent = getParent(this.state, routeName);
    this.dispatch(
      StackActions.reset({
        index: 0,
        key: parent ? parent.key : null,
        actions: [
          NavigationActions.navigate({
            routeName,
            params,
          }),
        ],
      }),
    );
  };
}

export default new NavigationStore();
