# React Native Router [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Router for React Native based on new React Native Navigation API.

## Features
- Define your scenes transitions in one central location
- Use simple syntax to call transitions anywhere in your code (e.g. `Actions.login`)
- Eliminates the need to pass navigator objects to your screens
- (new) Ability to show/hide navigation bar as well as customize it for each scene or even different state of scene (Edit/Save navbar for edit mode, for example)
- Support for managing a tab bar, using [react-native-tabs](https://github.com/aksonov/react-native-tabs) (see demo)
- Support for nested navigators. For example, each tab can have its own navigator, nested in a root navigator.
- (new) Ability to add own custom scene renderers for action sheet, native TabBarIOS or anything else, see built-in `Modal` renderer (to display popups) as example.
- (new) Dynamically choose scene to render depending from application state (`Switch` renderer, useful for authentication)
- (new) Possibility to use own reducer for navigation state.

## Beta status
- This version is beta, for more stable work use 2.x version from `2.x` branch,
[README for 2.x](https://github.com/aksonov/react-native-router-flux/blob/2.x/README.md)

## IMPORTANT! Breaking changes comparing with 2.x version:
- `Router` is root container now and should not be nested. For nested scenes you should use `Scene` element
- `Route` became `Scene`, now unique `key` attribute is required for each scene (it was `name` attribute before)
- Define all your scenes on top-level, not within `Router` as before (see Example)
- No `Schema` element is supported for now (for simplicity), maybe later it could be added
- No ActionSheet support
- Custom scene renderers are used instead of 'custom' types (like 'modal'), so 'modal' scenes are pushed as usual, but custom renderer will render them as popup. No `dismiss`, just usual `pop` to close such popups.
- No old navigator.sceneConfig support (instead the component uses React Native NavigationAnimatedView for better transitions)
- No onPush/onPop/etc handlers because they are doesn't need now. If navigation state is changed, container will be re-renderer with changed navigationState property, see `Modal` as Example.

## Installation
```
npm i react-native-router-flux --save
```

## Usage
1. In top-level index.js, define your scenes using `Scene` element and create actions using `Actions.create(scenes)` like:
```
import {Actions, Scene} from 'react-native-router-flux';

const scenes = Actions.create(
        <Scene key="root">
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="home" component={Home}/>
        </Scene>);

```
2. Use `Router` within your root React Native element with created actions from step #1:
```
    render(){
        return <Router scenes={scenes}/>;
    }
```
3. In any app screen:
    * import {Actions} from 'react-native-router-flux'
    * Actions.ACTION_NAME(PARAMS) will call appropriate action and params will be passed to the scene.
    * Actions.pop() will pop the current screen.
    * Actions.refresh(PARAMS) will update the properties of current screen.

## Available imports
- Router
- Scene
- Modal
- TabBar
- getInitialState
- Reducer
- DefaultRenderer
- Switch
- Actions

## Configuration

##### Router:
| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| scenes | object | null | required scenes for Router|
| reducer | object | Reducer({initialState:getInitialState(scenes), scenes})| optional user-defined reducer for scenes|

##### Scene:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| key | string | required | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| component | React.Component | semi-required | The `Component` to be displayed. Not required when defining a nested `Scene`, see example. If it is defined for 'container' scene, it will be used as custom container `renderer` |
| type | string | optional | Defines how the new screen is added to the navigator stack. One of `push` or `replace`
| tabs| bool | false | Defines 'TabBar' scene container, so child scenes will be displayed as 'tabs'. If no `component` is defined, built-in `TabBar` is used as renderer.
| initial | bool | false | Set to `true` if this is the initial scene |
| title | string | null | The title to be displayed in the navigation bar |
| hideNavBar | bool | false | hides navigation bar for this scene |
| hideTabBar | bool | false | hides tab bar for this scene (if built-in TabBar component is used as parent renderer)|
| navigationBarStyle | View style |  | optional style override for the navigation bar |
| titleStyle | Text style |  | optional style override for the title element |
| renderTitle | Closure | | optional closure to render the title element |
| leftTitle | string | | optional string to display on the left if the previous route does not provide `renderBackButton` prop. `renderBackButton` > `leftTitle` > <previous route's `title`> |
| renderLeftButton | Closure | | optional closure to render the left title / buttons element |
| renderBackButton | Closure | | optional closure to render back text or button if this route happens to be the previous route |
| leftButtonStyle | View style | | optional style override for the container of left title / buttons |
| leftButtonTextStyle | Text style | | optional style override for the left title element |
| onLeft | Closure | | function will be called when right navBar button is pressed |
| rightTitle | string | | optional string to display on the right. `onRight` must be provided for this to appear. |
| onRight | Closure | | function will be called when right navBar button is pressed |
| renderRightButton | Closure | | optional closure to render the right title / buttons element |
| rightButtonStyle | View style | | optional style override for the container of right title / buttons |
| rightButtonTextStyle | Text style | | optional style override for the right title element |

## Example
![launch](https://cloud.githubusercontent.com/assets/1321329/11692367/7337cfe2-9e9f-11e5-8515-e8b7a9f230ec.gif)

```javascript
import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from './components/Register'
import Login from './components/Login'
import Login2 from './components/Login2'
import {Scene, Router, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import Error from './components/Error'
import Home from './components/Home'
import TabView from './components/TabView'

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

class Header extends React.Component {
    render(){
        return <Text>Header</Text>
    }
}

const scenes = Actions.create(
    <Scene key="modal" component={Modal}  >
        <Scene key="root" hideNavBar={true}>
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="register2" component={Register} title="Register2" duration={1}/>
            <Scene key="home" component={Home} title="Replace" type="replace"/>
            <Scene key="launch" component={Launch} title="Launch" initial={true}/>
            <Scene key="login" type="replace">
                <Scene key="loginModal" component={Login} schema="modal" title="Login"/>
                <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
            </Scene>
            <Scene key="tabbar" component={TabBar} tabs={true}>
                <Scene key="tab1"  title="Tab #1" icon={TabIcon} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'white'}}>
                    <Scene key="tab1_1" component={TabView} title="Tab #1_1" onRight={()=>alert("Right button")} rightTitle="Right" />
                    <Scene key="tab1_2" component={TabView} title="Tab #1_2" titleStyle={{color:'black'}}/>
                </Scene>
                <Scene key="tab2" initial={true} title="Tab #2" icon={TabIcon}>
                    <Scene key="tab2_1" component={TabView} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
                    <Scene key="tab2_2" component={TabView} title="Tab #2_2"/>
                </Scene>
                <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar={true} icon={TabIcon}/>
                <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={true} icon={TabIcon}/>
                <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon}/>
            </Scene>
        </Scene>
        <Scene key="error" component={Error}/>
    </Scene>
);
export default class Example extends React.Component {
    render() {
        return <Router scenes={scenes}/>;
    }
}
```

components/Launch.js (initial screen)

```javascript
import React, {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'

class Launch extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={Actions.error('error message')}>Show error popup</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;
```

## Modals
To display a modal use `Modal` as root renderer, so it will render first element as `normal` scene and all others as popups (when they are pushed), see Example for more details.

## Redux/Flux
This component doesn't depend from any redux/flux library. It uses new React Native Navigation API and provide own reducer for its navigation state.
You may provide own one if you need.

## Custom nav bar for individual scene or even different state of scene (new feature):
Your scene class could implement _static_ renderNavigationBar(props) method that could return different navbar depending from component props

## Switch (new feature)
New feature for 3.x release is custom scene renderer that should be used together with tabs={true} property. It allows to select `tab` scene to show depending from app state.
It could be useful for authentication, restricted scenes, etc. Usually you should wrap `Switch` with redux `connect` to pass application state to it:
Following example chooses scene depending from sessionID using Redux:
```
        <Scene key="root" component={connect(state=>({profile:state.profile}))(Switch)} tabs={true}
               selector={props=>props.profile.sessionID ? "main" : "signUp"}>
            <Scene key="signUp" component={SignUp}/>
            <Scene key="main" component={Main}>
        </Scene>
```
