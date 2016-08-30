// typings for react-native-router-flux@3.26.16
// created by bang88 (https://github.com/bang88)

import * as React from 'react';
import * as ReactNative from 'react-native';


declare namespace RNRF {

  export interface SceneProps {
    // Scene
    /**
     * Will be used to call screen transition, for example, Actions.name(params). Must be unique.
     */
    key: string,
    /**
     * The Component to be displayed. Not required when defining a nested Scene, see example. If it is defined for 'container' scene, it will be used as custom container renderer
     */
    component?: React.ReactNode,
    /**
     * Set to true if this is the initial scene
     */
    initial?: boolean,
    /**
     * Defines how the new screen is added to the navigator stack. One of push, jump, replace, reset. If parent container is tabbar (tabs=true), jump will be automatically set.
     */
    type?: 'push' | 'jump' | string,
    /**
     * Scenes marked with clone will be treated as templates and cloned into the current scene's parent when pushed. See example.
     */
    clone?: boolean,
    /**
     * Pass all own props (except style, key, name, component, tabs) to children. Note that passProps is also passed to children.
     */
    passProps?: boolean,

    // Animation

    /**
     * optional. acts as a shortcut to writing an applyAnimation function with Animated.timing for a given duration (in ms).
     */
    duration?: number,
    /**
     * direction of animation horizontal/vertical
     */
    direction?: 'vertical' | 'horizontal',
    /**
     * optional if provided overrides the default spring animation
     */
    applyAnimation?: Function,

    // Scene styles

    /**
     * optional style override for the Scene's component
     */
    sceneStyle?: ReactNative.ViewStyle,
    /**
     * Optionally override the styles for NavigationCard's Animated.View rendering the scene. Receives first argument of NavigationSceneRendererProps and second argument of {hideNavBar,hideTabBar,isActive} (see Example app).
     */
    getSceneStyle?: Function,


    // Tabs

    /**
     * Defines 'TabBar' scene container, so child scenes will be displayed as 'tabs'. If no component is defined, built-in TabBar is used as renderer. All child scenes are wrapped into own navbar.
     */
    tabs?: boolean,
    /**
     * optional style override for the Tabs component
     */
    tabBarStyle?: ReactNative.ViewStyle,
    /**
     * hides tab bar for this scene and any following scenes until explicitly reversed (if built-in TabBar component is used as parent renderer)
     */
    hideTabBar?: boolean,


    // Navigation Bar


    /**
     * hides the navigation bar for this scene and any following scenes until explicitly reversed
     */
    hideNavBar?: boolean,
    /**
     * optional style override for the navigation bar
     */
    navigationBarStyle?: ReactNative.ViewStyle,
    /**
     * optional custom NavBar for the scene. Check built-in NavBar of the component for reference
     */
    navBar?: React.ReactNode,
    /**
     * Simple way to override the drawerImage in the navBar
     */
    drawerImage?: ReactNative.Image,

    // Navigation Bar: Title

    /**
     * The title to be displayed in the navigation bar
     */
    title?: string,
    /**
     * Optionally closure to return a value of the title based on state
     */
    getTitle?: Function,
    /**
     * Optionally closure to render the title
     */
    renderTitle?: Function,
    /**
     * optional style override for the title element
     */
    titleStyle?: ReactNative.TextStyle,

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
    backButtonImage?: ReactNative.Image,
    /**
     * optional style override for the back title element
     */
    backButtonTextStyle?: ReactNative.TextStyle,


    // Navigation Bar: Left button

    /**
     * optional string to display on the left if the previous route does not provide renderBackButton prop. renderBackButton > leftTitle >
     */
    leftTitle?: string,
    /**
     * optional closure to render the left title / buttons element
     */
    renderLeftButton?: Function,
    /**
     * function will be called when left navBar button is pressed
     */
    onLeft?: Function,
    /**
     * Image for left button
     */
    leftButtonImage?: ReactNative.Image,
    /**
     * Image style for left button
     */
    leftButtonIconStyle?: ReactNative.ViewStyle,
    /**
     * optional style override for the container of left title / buttons
     */
    leftButtonStyle?: ReactNative.ViewStyle,
    /**
     * optional style override for the left title element
     */
    leftButtonTextStyle?: ReactNative.TextStyle,


    // Navigation Bar: Right button

    /**
     * optional string to display on the right. onRight must be provided for this to appear.
     */
    rightTitle?: string,
    /**
     * optional closure to render the right title / buttons element
     */
    renderRightButton?: Function,
    /**
     * function will be called when right navBar button is pressed
     */
    onRight?: Function,
    /**
     * Image for right button
     */
    rightButtonImage?: ReactNative.Image,
    /**
     * Image style for right button
     */
    rightButtonIconStyle?: ReactNative.ViewStyle,
    /**
     * optional style override for the container of right title / buttons
     */
    rightButtonStyle?: ReactNative.ViewStyle,
    /**
     * optional style override for the right title element
     */
    rightButtonTextStyle?: ReactNative.TextStyle,
    /**
     * optional wrappert
     */
    wrapBy?: ()=>any,
  }

  /**
   * Scene
   */
  export class Scene extends React.Component<SceneProps, {}> {

  }


  // Router
  interface RouterProps extends React.Props<Router> {
    reducer?: Function,
    createReducer?: Function,
    scenes?: any,
    /**
     * optional Scene's props that can be used in Router
     */
    type?: 'push' | 'jump' | string,
    clone?: boolean,
    passProps?: boolean,
    duration?: number,
    direction?: 'vertical' | 'horizontal',
    applyAnimation?: Function,
    sceneStyle?: ReactNative.ViewStyle,
    getSceneStyle?: Function,
    tabs?: boolean,
    tabBarStyle?: ReactNative.ViewStyle,
    hideTabBar?: boolean,
    hideNavBar?: boolean,
    navigationBarStyle?: ReactNative.ViewStyle,
    navBar?: React.ReactNode,
    drawerImage?: ReactNative.Image,
    title?: string,
    getTitle?: Function,
    renderTitle?: Function,
    titleStyle?: ReactNative.TextStyle,
    backTitle?: string,
    renderBackButton?: Function,
    backButtonImage?: ReactNative.Image,
    backButtonTextStyle?: ReactNative.TextStyle,
    leftTitle?: string,
    renderLeftButton?: Function,
    onLeft?: Function,
    leftButtonImage?: ReactNative.Image,
    leftButtonIconStyle?: ReactNative.ViewStyle,
    leftButtonStyle?: ReactNative.ViewStyle,
    leftButtonTextStyle?: ReactNative.TextStyle,
    rightTitle?: string,
    renderRightButton?: Function,
    onRight?: Function,
    rightButtonImage?: ReactNative.Image,
    rightButtonIconStyle?: ReactNative.ViewStyle,
    rightButtonStyle?: ReactNative.ViewStyle,
    rightButtonTextStyle?: ReactNative.TextStyle
  }
  export class Router extends React.Component<RouterProps, {}>{ }


  // Actions
   type props = Object;

  interface RNRFActions {
    pop(props?: props): void,
    jump(props: props): void,
    refresh(props: props): void,
    focus(props: props): void,
    create(scene: React.ReactNode, wrapBy?: () => any): Object
  }

  export var Actions: RNRFActions;
  
  // ActionsConst
  interface RNRFActionConst {
    JUMP: string,
    PUSH: string,
    PUSH_OR_POP: string,
    REPLACE: string,
    BACK: string,
    BACK_ACTION: string,
    POP_TO: string,
    REFRESH: string,
    RESET: string,
    FOCUS: string,
  }
  export var ActionConst: RNRFActionConst;

  // DefaultRenderer
  interface DefaultRendererProps extends React.Props<DefaultRenderer> {
    navigationState: Object,
    onNavigate: Function
  }
  export class DefaultRenderer extends React.Component<DefaultRendererProps, {}>{ }

  // Modal
  interface ModalProps extends React.Props<Modal> {
    navigationState: Object,
    onNavigate: Function
  }
  export class Modal extends React.Component<ModalProps, {}>{ }


  // navbar
  interface NavBarProps extends React.Props<NavBar> {
    navigationState?: Object,
    backButtonImage?: number,
    backButtonTextStyle?: ReactNative.TextStyle,
    leftButtonStyle?: ReactNative.ViewStyle
    leftButtonIconStyle?: ReactNative.ImageStyle,
    getTitle?: Function,
    titleStyle?: ReactNative.TextStyle,
    position?: Object,
    navigationBarStyle?: ReactNative.ViewStyle,
    renderTitle?: any,
  }
  export class NavBar extends React.Component<NavBarProps, {}>{ }



  // Reducer
  export var Reducer: (state: {}, scence: {}) => any;


  // Switch
  interface SwitchProps extends React.Props<Switch> {
    navigationState?: Object,
    onNavigate?: Function,
    selector?: Function,
  }
  export class Switch extends React.Component<SwitchProps, {}>{ }


  // TabBar
  interface TabBarProps extends React.Props<TabBar> {
    navigationState?: Object,
    tabIcon?: any,
    onNavigate?: Function,
  }
  export class TabBar extends React.Component<TabBarProps, {}>{ }


  // getInitialState
  export var getInitialState: (scenes: any) => Object

  // Util
  export interface Util {
    deepestExplicitValueForKey(navigationState: Object, key: string): any,
    assert(expr: boolean, failDescription: any): void
  }

}

export = RNRF;
