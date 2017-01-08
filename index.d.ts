// typings for react-native-router-flux@3.37.0
// created by bang88 (https://github.com/bang88)

import * as React from 'react';
import * as ReactNative from 'react-native';

/**
 * Optionally override the styles for NavigationCard's Animated.View rendering the scene. Receives first argument of NavigationSceneRendererProps and second argument of {hideNavBar,hideTabBar,isActive} (see Example app).
 */
export type GetSceneStyle = (props?: React.NavigationSceneRendererProps, computedProps?: ComputedProps & BaseProps) => React.ViewStyle;

export type ActionConsts = 'jump' | 'push' | 'replace' | 'back' | 'BackAction' | 'popAndReplace' | 'popTo' | 'refresh'| 'reset' | 'focus' | string;

export interface BaseProps {
  /**
   * hides the navigation bar for this scene and any following scenes until explicitly reversed
   */
  hideNavBar?: boolean;
  /**
   * hides tab bar for this scene and any following scenes until explicitly reversed (if built-in TabBar component is used as parent renderer)
   */
  hideTabBar?: boolean;
  /**
   * Defines how the new screen is added to the navigator stack. One of push, jump, replace, reset. If parent container is tabbar (tabs=true), jump will be automatically set.
   */
  type?: ActionConsts | 'transitionToTop' | 'switch';
  /**
   * Scenes marked with clone will be treated as templates and cloned into the current scene's parent when pushed. See example.
   */
  clone?: boolean;
  /**
   * Pass all own props (except style, key, name, component, tabs) to children. Note that passProps is also passed to children.
   */
  passProps?: boolean;

  unmountScenes?: boolean;

  // Animation

  /**
   * optional. acts as a shortcut to writing an applyAnimation function with Animated.timing for a given duration (in ms).
   */
  duration?: number;
  /**
   * direction of animation horizontal/vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * optional if provided overrides the default spring animation
   */
  applyAnimation?: Function;

  // Scene styles

  /**
   * optional style override for the Scene's component
   */
  sceneStyle?: ReactNative.ViewStyle;
  /**
   * Optionally override the styles for NavigationCard's Animated.View rendering the scene. Receives first argument of NavigationSceneRendererProps and second argument of {hideNavBar,hideTabBar,isActive} (see Example app).
   */
  getSceneStyle?: GetSceneStyle;


  // Tabs

  /**
   * Defines 'TabBar' scene container, so child scenes will be displayed as 'tabs'. If no component is defined, built-in TabBar is used as renderer. All child scenes are wrapped into own navbar.
   */
  tabs?: boolean;
  /**
   * optional style override for the Tabs component
   */
  tabBarStyle?: ReactNative.ViewStyle;


  // Navigation Bar


  /**
   * optional style override for the navigation bar
   */
  navigationBarStyle?: ReactNative.ViewStyle;
  /**
   * optional custom NavBar for the scene. Check built-in NavBar of the component for reference
   */
  navBar?: React.ReactNode;
  /**
   * Simple way to override the drawerImage in the navBar
   */
  drawerImage?: ReactNative.Image;

  // Navigation Bar: Title

  /**
   * The title to be displayed in the navigation bar
   */
  title?: string;
  /**
   * Optionally closure to return a value of the title based on state
   */
  getTitle?: (navigationState: NavigationState) => string;
  /**
   * Optionally closure to render the title
   */
  renderTitle?: Function;
  /**
   * optional style override for the title element
   */
  titleStyle?: ReactNative.TextStyle;

  // Navigation Bar: Back button

  /**
   * optional string to display with back button
   */
  backTitle?: string
  /**
   * optional closure to render back text or button if this route happens to be the previous route
   */
  renderBackButton?: Function
  /**
   * 	'./back_chevron.png'	Simple way to override the back button in the navBar
   */
  backButtonImage?: ReactNative.Image;
  /**
   * optional style override for the back title element
   */
  backButtonTextStyle?: ReactNative.TextStyle;


  // Navigation Bar: Left button

  /**
   * optional string to display on the left if the previous route does not provide renderBackButton prop. renderBackButton > leftTitle >
   */
  leftTitle?: string;
  /**
   * optional closure to render the left title / buttons element
   */
  renderLeftButton?: Function;
  /**
   * function will be called when left navBar button is pressed
   */
  onLeft?: Function;
  /**
   * Image for left button
   */
  leftButtonImage?: ReactNative.Image;
  /**
   * Image style for left button
   */
  leftButtonIconStyle?: ReactNative.ViewStyle;
  /**
   * optional style override for the container of left title / buttons
   */
  leftButtonStyle?: ReactNative.ViewStyle;
  /**
   * optional style override for the left title element
   */
  leftButtonTextStyle?: ReactNative.TextStyle;


  // Navigation Bar: Right button

  /**
   * optional string to display on the right. onRight must be provided for this to appear.
   */
  rightTitle?: string;
  /**
   * optional closure to render the right title / buttons element
   */
  renderRightButton?: Function;
  /**
   * function will be called when right navBar button is pressed
   */
  onRight?: Function;
  /**
   * Image for right button
   */
  rightButtonImage?: ReactNative.Image;
  /**
   * Image style for right button
   */
  rightButtonIconStyle?: ReactNative.ViewStyle;
  /**
   * optional style override for the container of right title / buttons
   */
  rightButtonStyle?: ReactNative.ViewStyle;
  /**
   * optional style override for the right title element
   */
  rightButtonTextStyle?: ReactNative.TextStyle;
  /**
   * optional style override for the View that contains each tab icon
   */
  tabBarIconContainerStyle?: React.ViewStyle;
  /**
   * optional background image for the Tabs component
   */
  tabBarBackgroundImage?: ReactNative.Image;
  /**
   * optional background image for the navigation bar
   */
  navigationBarBackgroundImage?: ReactNative.Image;
  /**
   * optional style override for the title wrapper
   */
  titleWrapperStyle?: React.ViewStyle;
  /**
   * 	Any other properties to be set on the title component
   */
  titleProps?: Object;
}

export interface ComputedProps {
  isActive?: boolean;
}

export type ComponentConstructor<Props> = (props: Props) => JSX.Element | React.ReactNode;

export interface SceneProps<OwnProps> extends BaseProps, React.TouchableWithoutFeedbackProperties {
  // Scene
  /**
   * Will be used to call screen transition, for example, Actions.name(params). Must be unique.
   */
  key: string;
  /**
   * The Component to be displayed. Not required when defining a nested Scene, see example. If it is defined for 'container' scene, it will be used as custom container renderer
   */
  component?: React.ReactNode | ComponentConstructor<OwnProps & BaseProps>;
  /**
   * Set to true if this is the initial scene
   */
  initial?: boolean;
  /**
   * optional wrappert
   */
  wrapBy?: ()=>any;
  /**
   * hides tab bar when another tabs scene is added to the navigation stack.
   */
  hideOnChildTabs?: boolean;
  /**
   * the opacity when clicking on the tab
   */
  pressOpacity?: number;
  selector?: <T>(props?: T) => string;
  icon?: React.ReactNode;
  /** Allow own props like save, editMode, etc */
  [index: string]: any;
}

/**
 * Scene
 */
export class Scene<OwnProps> extends React.Component<SceneProps<OwnProps> & OwnProps, {}> {

}

// Router
export interface RouterProps<OwnProps> extends React.Props<Router<OwnProps>>, BaseProps {
  reducer?: Function;
  createReducer?: Function;
  scenes?: any;
}
export class Router<OwnProps> extends React.Component<RouterProps<OwnProps> & OwnProps, {}>{ }

// Actions
export interface RNRFActions {
  pop(props?: Object): void;
  jump(props: Object): void;
  refresh(props: Object): void;
  focus(props: Object): void;
  create(scene: React.ReactNode, wrapBy?: () => any): Object;
  [sceneKey: string]: (props?: Object) => void;
}
export const Actions: RNRFActions;

// ActionsConst
export interface RNRFActionConst {
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_JUMP' shorthand: 'jump' */
  JUMP: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_PUSH' shorthand: 'push' */
  PUSH: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_REPLACE' shorthand: 'replace' */
  REPLACE: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_BACK' shorthand: 'back' */
  BACK: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION' shorthand: 'BackAction' */
  BACK_ACTION: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_POP_AND_REPLACE' shorthand: 'popAndReplace' */
  POP_AND_REPLACE: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_POP_TO' shorthand: 'popTo' */
  POP_TO: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_REFRESH' shorthand: 'refresh' */
  REFRESH: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_RESET' shorthand: 'reset' */
  RESET: string;
  /** internal: 'REACT_NATIVE_ROUTER_FLUX_FOCUS' shorthand: 'focus' */
  FOCUS: string;
}
export const ActionConst: RNRFActionConst;

export interface NavigationState extends SceneProps<any> {
  children?: React.ReactNode;
  [index: string]: any;
}

// DefaultRenderer
export interface DefaultRendererProps<OwnProps> extends React.Props<DefaultRenderer<OwnProps>> {
  navigationState: NavigationState;
  onNavigate: Function;
}
export class DefaultRenderer<OwnProps> extends React.Component<DefaultRendererProps<OwnProps> & OwnProps, {}>{ }

// Modal
export interface ModalProps<OwnProps> extends React.Props<Modal<OwnProps>> {
  navigationState: NavigationState;
  onNavigate: Function;
}
export class Modal<OwnProps> extends React.Component<ModalProps<OwnProps> & OwnProps, {}>{

}

// navbar
export interface NavBarProps<OwnProps> extends React.Props<NavBar<OwnProps>> {
  navigationState?: NavigationState;
  backButtonImage?: number;
  backButtonTextStyle?: ReactNative.TextStyle;
  leftButtonStyle?: ReactNative.ViewStyle
  leftButtonIconStyle?: ReactNative.ImageStyle;
  getTitle?: (navigationState: NavigationState) => string;
  titleStyle?: ReactNative.TextStyle;
  position?: Object;
  navigationBarStyle?: ReactNative.ViewStyle;
  renderTitle?: any;
}
export class NavBar<OwnProps> extends React.Component<NavBarProps<OwnProps> & OwnProps, {}>{

}

// Reducer

export type ReducerFunction<T, S> = (state: T, scene: S) => any
export class Reducer {

}

// Switch
export interface SwitchProps<OwnProps> extends React.Props<Switch<OwnProps>> {
  navigationState?: NavigationState;
  onNavigate?: Function;
  selector?: Function;
}
export class Switch<OwnProps> extends React.Component<SwitchProps<OwnProps> & OwnProps, {}>{

}

// TabBar
export interface TabBarProps<OwnProps> extends React.Props<TabBar<OwnProps>> {
  navigationState?: Object;
  tabIcon?: any;
  onNavigate?: Function;
}
export class TabBar<OwnProps> extends React.Component<TabBarProps<OwnProps> & OwnProps, {}>{

}

// getInitialState
export const getInitialState: (scenes: any) => Object;

// Util
export interface Util {
  deepestExplicitValueForKey(navigationState: NavigationState, key: string): any;
  assert(expr: boolean, failDescription: any): void;
}