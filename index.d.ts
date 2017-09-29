/// <reference types="react"/>
/// <reference types="react-native"/>

import { Image, ViewStyle, TextStyle, ImageStyle } from "react-native";


export var Router: RouterStatic;
export type Router = RouterStatic;

// Router 
interface RouterProps extends React.Props<Router> {
    sceneStyle?: ViewStyle;
}
interface RouterStatic extends React.ComponentClass<RouterProps> { }

// Scene
export var Scene: SceneStatic;
export type Scene = SceneStatic;
interface SceneProps extends React.Props<Scene> {
    key: string;
    component: React.Component;
    back?: boolean;
    init?: boolean;
    clone?: boolean;
    contentComponent?: React.Component;
    drawer?: boolean;
    failure?: () => void;
    headerBackTitle?: string;
    headerMode?: HeaderModeType;
    hideNavBar?: boolean;
    hideTabBar?: boolean;
    initial?: boolean;
    leftButtonImage?: Image;
    modal?: boolean;
    navigationBarTitleImage?: Image;
    navigationBarTitleImageStyle?: ImageStyle;
    navTransparent?: boolean;
    on?: (props: any) => void;
    onEnter?: (props: any) => void;
    onExit?: (props: any) => void;
    onLeft?: (props: any) => void;
    onRight?: (props: any) => void;
    renderTitle?: React.Component;
    renderLeftButton?: React.Component;
    renderRightButton?: React.Component;
    rightButtonImage?: Image;
    rightButtonTextStyle?: TextStyle;
    success?: () => void;
    tabs?: boolean;
    title?: string;
    titleStyle?: TextStyle; // Todo ReactNative.Style
    type?: NavigationType;
    [name: string]: any; // These are passed through to the scenes
}
interface TabSceneProps extends React.Props<Scene> {
    icon?: React.Component;
    tabBarLabel?: string;
}
interface SceneStatic extends React.ComponentClass<SceneProps & TabsProps & TabSceneProps & DrawerProps & ModalProps> { }
export type HeaderModeType = "float" | "screen";
export type NavigationType = "push" | "replace";

// Tabs
export var Tabs: TabsStatic;
export type Tabs = TabsStatic;
interface TabsProps extends React.Props<Tabs> {
    wrap?: boolean;
    activeBackgroundColor?: string;
    activeTintColor?: string;
    inactiveBackgroundColor?: string;
    inactiveTintColor?: string;
    labelStyle?: TextStyle;
    lazy?: boolean;
    tabBarComponent?: React.Component;
    tabBarPosition?: TabBarPositionType;
    tabBarStyle?: ViewStyle;
    tabStyle?: ViewStyle;
    showLabel?: boolean;
    swipeEnabled?: boolean;
}
interface TabsStatic extends React.ComponentClass<SceneProps & TabsProps> { }
export type TabBarPositionType = "top" | "bottom";

// Drawer
export var Drawer: DrawerStatic;
export type Drawer = DrawerStatic;
interface DrawerProps extends React.Props<Drawer> {
    drawerImage?: Image;
    drawerIcon?: React.Component;
    drawerPosition?: DrawerPositionType;
}
interface DrawerStatic extends React.ComponentClass<SceneProps & DrawerProps> { }
export type DrawerPositionType = "right" | "left";

// Modal
export var Modal: ModalStatic;
export type Modal = ModalStatic;
interface ModalProps extends React.Props<Modal> { }
interface ModalStatic extends React.ComponentClass<SceneProps & ModalProps> { }

// Lighbox
export var Lighbox: LighboxStatic;
export type Lighbox = LighboxStatic;
interface LighboxProps extends React.Props<Modal> { }
interface LighboxStatic extends React.ComponentClass<LighboxProps> { }

// Stack
export var Stack: StackStatic;
export type Stack = StackStatic;
interface StackProps extends React.Props<Stack> { }
interface StackStatic extends React.ComponentClass<StackProps> { }

export var Actions: ActionsStatic & ActionsGenericStatic;
export type Actions = ActionsStatic & ActionsGenericStatic;
interface ActionsStatic {
    currentScene: () => string;
    jump: (sceneKey: string, props?: any) => void;
    pop: () => void;
    popAndPush: (sceneKey: string, props?: any) => void;
    popTo: (sceneKey: string, props?: any) => void;
    push: (sceneKey: string, props?: any) => void;
    refresh: (props?: any) => void;
    replace: (sceneKey: string, props?: any) => void;
    reset: (sceneKey: string, props?: any) => void;
    drawerOpen?: () => void;
    drawerClose?: () => void;

}
interface ActionsGenericStatic {
    [key: string]: (props?: any) => void;
}