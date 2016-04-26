# React Native Router [![react-native-router-flux](http://img.shields.io/npm/dm/react-native-router-flux.svg)](https://www.npmjs.org/package/react-native-router-flux) [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/grade/c6d869e2367a4fb491efc9de228c5ac6)](https://www.codacy.com/app/aksonov-github/react-native-router-flux) [![npm version](https://badge.fury.io/js/react-native-router-flux.svg)](http://badge.fury.io/js/react-native-router-flux)


Router for React Native based on new React Native Navigation API.

## Features
- Define your scene transitions in one central location
- Use simple syntax to call transitions anywhere in your code (e.g. `Actions.login()`)
- Eliminates the need to pass navigator objects to your screens
- (new) Ability to show/hide navigation bar as well as customize it for each scene or even a different state of a scene (Edit/Save navbar for edit mode, for example)
- Support for managing a tab bar, using [react-native-tabs](https://github.com/aksonov/react-native-tabs) (see demo)
- Support for nested navigators. For example, each tab can have its own navigator, nested in a root navigator.
- (new) Ability to add own custom scene renderers for action sheet, native TabBarIOS or anything else, see built-in `Modal` renderer (to display popups) as example. Feel free to submit PR with custom renderers for ActionSheet, Drawer, etc. Let's make awesome library!
- (new) Dynamically choose scene to render depending from application state (`Switch` renderer, useful for authentication)
- (new) Possibility to use own reducer for navigation state.
- (new) Add action `reset` to clear the entire history stack. Prevents going 'back'.
- (new) Support for different states inside same screen. For example "View My Account" could allow in-place edit of fields and "Save", "Cancel" navigation bar buttons should appear.

## Change log
- 3.22.17 allow jump & push together - now you could call Actions.tab2_2() (`tab2_2` is next scene after `tab2`) even if `tab2` is not active
- 3.22.16 simplified syntax for sub-states
- 3.22.15 introduces support for different states inside the same screen.
- 3.22.10 simplifies customization of own NavBar. From now you could import built-in NavBar from the component and customize it. You could set it globally to all scenes by setting `navBar` property for `Router` component.
For all other scenes you may pass rightButton, leftButton for custom buttons or rightTitle & onRight, leftTitle & onLeft for text buttons.

## IMPORTANT! Breaking changes comparing with 2.x version:
- React Native 0.22 is required
- `Router` is root container now and should not be nested. For nested scenes you should use `Scene` element
- `Route` became `Scene`, now unique `key` attribute is required for each scene (it was `name` attribute before)
- Define all your scenes on top-level, not within `Router` as before (see Example)
- No `Schema` element is supported for now (for simplicity), maybe later it could be added
- No ActionSheet support
- Custom scene renderers are used instead of 'custom' types (like 'modal'), so 'modal' scenes are pushed as usual, but custom renderer will render them as popup. No `dismiss`, just usual `pop` to close such popups.
- No old navigator.sceneConfig support (instead the component uses React Native NavigationAnimatedView for better transitions)
- No onPush/onPop/etc handlers because they are not needed now. If navigation state is changed, container will be re-rendered with changed navigationState property, see `Modal` as Example.
- No header/footer properties are supported for Scene currently - you may include them into Scene component.

## Installation
```
npm i react-native-router-flux --save
```

## Usage
1. In top-level index.js, define your scenes using `Scene` element and pass it to `Router`:
```javascript
import {Actions, Scene, Router} from 'react-native-router-flux';

class App extends React.Component {
    render() {
        return <Router>
            <Scene key="root">
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="register" component={Register} title="Register"/>
                <Scene key="home" component={Home}/>
            </Scene>
        </Router>
    }
}
```
Alternatively you could define all your scenes during compile time and use it later within `Router`:
```javascript
const scenes = Actions.create(
            <Scene key="root">
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="register" component={Register} title="Register"/>
                <Scene key="home" component={Home}/>
            </Scene>
);
///
class App extends React.Component {
    render() {
        return <Router scenes={scenes}/>
    }
}
```

2. In any app screen:
    * `import {Actions} from 'react-native-router-flux'`
    * `Actions.ACTION_NAME(PARAMS)` will call the appropriate action and params will be passed to the scene.
    * `Actions.pop()` will pop the current screen.
    * `Actions.refresh(PARAMS)` will update the properties of the current screen.

## Available imports
- `Router`
- `Scene`
- `Modal`
- `TabBar`
- `getInitialState`
- `Reducer`
- `DefaultRenderer`
- `Switch`
- `Actions`
- `NavBar`

## Configuration

##### Router:
| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| reducer | function | | optional user-defined reducer for scenes, you may want to use it to intercept all actions and put your custom logic |
| createReducer | function | | function that returns a reducer function for {initialState, scenes} param, you may wrap Reducer(param) with your custom reducer, check Flux usage section below|
| other props | | | all properties that will be passed to all your scenes |
| children | | required (if no scenes property passed)| Scene root element |
| scenes | object | optional | scenes for Router created with Actions.create. This will allow to create all actions BEFORE React processing. If you don't need it you may pass Scene root element as children |
| getSceneStyle | function | optional | Optionally override the styles for NavigationCard's Animated.View rendering the scene. |
##### Scene:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| key | string | required | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| component | React.Component | semi-required | The `Component` to be displayed. Not required when defining a nested `Scene`, see example. If it is defined for 'container' scene, it will be used as custom container `renderer` |
| type | string | 'push' or 'jump' | Defines how the new screen is added to the navigator stack. One of `push`, `jump`, `replace`, `reset`. If parent container is tabbar (tabs=true), jump will be automatically set.
| tabs| bool | false | Defines 'TabBar' scene container, so child scenes will be displayed as 'tabs'. If no `component` is defined, built-in `TabBar` is used as renderer. All child scenes are wrapped into own navbar.
| initial | bool | false | Set to `true` if this is the initial scene |
| duration | number | | optional. acts as a shortcut to writing an `applyAnimation` function with `Animated.timing` for a given duration (in ms). |
| direction | string | 'horizontal' | direction of animation horizontal/vertical |
| applyAnimation | function | | optional if provided overrides the default spring animation |
| title | string | null | The title to be displayed in the navigation bar |
| navBar | React.Component | | optional custom NavBar for the scene. Check built-in NavBar of the component for reference |
| hideNavBar | bool | false | hides the navigation bar for this scene |
| hideTabBar | bool | false | hides tab bar for this scene (if built-in TabBar component is used as parent renderer)|
| navigationBarStyle | View style |  | optional style override for the navigation bar |
| titleStyle | Text style |  | optional style override for the title element |
| leftTitle | string | | optional string to display on the left if the previous route does not provide `renderBackButton` prop. `renderBackButton` > `leftTitle` > <previous route's `title`> |
| renderLeftButton | Closure | | optional closure to render the left title / buttons element |
| drawerImage | Image | `'./menu_burger.png'` | Simple way to override the drawerImage in the navBar |
| backButtonImage | Image | `'./back_chevron.png'` | Simple way to override the back button in the navBar |
| backTitle | string | | optional string to display with back button |
| backButtonTextStyle | Text style | | optional style override for the back title element |
| renderBackButton | Closure | | optional closure to render back text or button if this route happens to be the previous route |
| leftButtonImage | Image |  | Image for left button |
| leftButtonIconStyle | View style |  | Image style for left button |
| leftButtonStyle | View style | | optional style override for the container of left title / buttons |
| leftButtonTextStyle | Text style | | optional style override for the left title element |
| onLeft | Closure | | function will be called when left navBar button is pressed |
| rightTitle | string | | optional string to display on the right. `onRight` must be provided for this to appear. |
| onRight | Closure | | function will be called when right navBar button is pressed |
| renderRightButton | Closure | | optional closure to render the right title / buttons element |
| rightButtonStyle | View style | | optional style override for the container of right title / buttons |
| rightButtonTextStyle | Text style | | optional style override for the right title element |
| rightButtonImage | Image |  | Image for right button |
| rightButtonIconStyle | View style |  | Image style for right button |
| clone | bool | | Scenes marked with `clone` will be treated as templates and cloned into the current scene's parent when pushed. See example. |
| tabBarStyle | View style |  | optional style override for the Tabs component |
| sceneStyle | View style | { flex: 1 } | optional style override for the Scene's component |
| other props | | | all properties that will be passed to your component instance |
| getSceneStyle | function | optional | Optionally override the styles for NavigationCard's Animated.View rendering the scene. |
| renderTitle | function | optional | Optionally closure to render the title
## Example
![launch](https://cloud.githubusercontent.com/assets/1321329/11692367/7337cfe2-9e9f-11e5-8515-e8b7a9f230ec.gif)

```javascript
import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from './components/Register'
import Login from './components/Login'
import Login2 from './components/Login2'
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'
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

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class Example extends React.Component {
    render() {
        return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="register2" component={Register} title="Register2" duration={1}/>
                    <Scene key="home" component={Home} title="Replace" type="replace"/>
                    <Scene key="launch" component={Launch} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
                    <Scene key="login" direction="vertical">
                        <Scene key="loginModal" component={Login} schema="modal" title="Login"/>
                        <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
                    </Scene>
                    <Scene key="tabbar" tabs={true} >
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
                        <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
                    </Scene>
                </Scene>
                <Scene key="error" component={Error}/>
            </Scene>
        </Router>;
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
To display a modal use `Modal` as root renderer, so it will render the first element as `normal` scene and all others as popups (when they are pushed), see Example for more details.

## Redux/Flux
This component doesn't depend on any redux/flux library. It uses new React Native Navigation API and provide own reducer for its navigation state.
You may provide your own reducer if needed. To avoid the creation of initial state, you may pass a reducer creator.
Also all actions will pass themselves to Redux dispatch method if it is passed (i.e. if Router is `connect`ed with Redux)

The following example will dispatch the `focus` action when a new scene comes into focus. The current scene will be available to components via the `props.scene` property.

##### Step 1

First create a reducer for the routing actions that will be dispatched by RNRF.

```javascript
// reducers/routes.js

const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case "focus":
      return {
        ...state,
        scene: action.scene,
      };

    // ...other actions

    default:
      return state;
  }
}
```

##### Step 2

Combine this reducer with the rest of the reducers from your app.

```javascript
// reducers/index.js

import { combineReducers } from 'redux';
import routes from './routes';
// ... other reducers

export default combineReducers({
  routes,
  // ... other reducers
});

```

##### Step 3

Create your store, wrap your routes with the redux `Provider` component and connect your Router


```js
// app.js

import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';
// other imports...

// create store...
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);


class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
            // your scenes here
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
```

##### Step 4

Now you can access the current scene from any connected component.

```js
// components/MyComponent.js
import React, { PropTypes, Text } from 'react-native';
import { connect } from 'react-redux';

class MyComponent extends React.Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    return (
      <Text>
        The current scene is titled {this.props.routes.scene.title}.
      </Text>
    );
  }
}

export default connect(({routes}) => ({routes}))(MyComponent);
```

## Tabbar
Every tab has its own navigation bar. However, if you do not set its parent `<Scene tabs={true} />` with `hideNavBar={true}`, the tabs' navigation bar will be overrided by their parient.

## Custom nav bar for individual scene or even different state of scene (new feature):
Your scene `component` class could implement _static_ renderNavigationBar(props) method that could return different navbar depending from component props

## Switch (new feature)
New feature for 3.x release is custom scene renderer that should be used together with tabs={true} property. It allows to select `tab` scene to show depending from app state.
It could be useful for authentication, restricted scenes, etc. Usually you should wrap `Switch` with redux `connect` to pass application state to it:
Following example chooses scene depending from sessionID using Redux:
```javascript
<Scene key="root" component={connect(state=>({profile:state.profile}))(Switch)} tabs={true}
       selector={props=>props.profile.sessionID ? "main" : "signUp"}>
    <Scene key="signUp" component={SignUp}/>
    <Scene key="main" component={Main}>
</Scene>
```

## Split your scenes to smaller parts if needed
Scenes concept is similar to iOS storyboard where you describe all your app screens in one place. However for some large apps, you may want to split it, like iOS app could have several iOS storyboards for different areas of the app. 
Luckily, you could easy split Scenes using NodeJS built-in require calls:
```
            <Router>
                    {require("./scenesForTabBar")}
                    {require("./scenesForAnotherPart")}
            </Router>
```

scenesForTabBar.js:
```
import React from 'react-native';
import {Scene} from 'react-native-router-flux';

module.exports = <Scene key="tabbar" tabs={true}>
   // scenes here
</Scene>;
```

## Drawer (side menu) integration
Example of Drawer custom renderer based on react-native-drawer. Note that the build-in NavBar component supports toggling of drawer. The Drawer implementation just needs to have a function: toggle();

```javascript
import React from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {DefaultRenderer} from 'react-native-router-flux';

export default class extends Component {
    render(){
        const children = this.props.navigationState.children;
        return (
            <Drawer
                ref="navigation"
                type="displace"
                content={<TabView />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
                <DefaultRenderer navigationState={children[0]} />
            </Drawer>
        );
    }
}

/// then wrap your tabs scene with Drawer:
            <Scene key="drawer" component={Drawer}>
                <Scene key="main" tabs={true} >
                        ....
                </Scene>
            </Scene>

```
## Sub-scenes support
You could create 'sub-scene' actions by putting them as children for needed 'base' scene without `component` prop and call such action anywhere - 'base' Scene will be updated accordingly.
Example for 'My Account' screen with edit possibility (`MyAccount` component should call `Actions.editAccount()` to enable edit mode and process `save`, `editMode` properties accordingly - display edit controls, save data, etc.):

```
<Scene key="myAccount" component={MyAccount} title="My Account">
    <Scene key="viewAccount" />
    <Scene key="editAccount" editMode rightTitle="Save" onRight={()=>Actions.saveAccount()} leftTitle="Cancel" onLeft={()=>Actions.viewAccount()} />
    <Scene key="saveAccount" save />
</Scene>
```
Note, that almost empty `viewAccount` sub-state here is needed to reset MyAccount to initial params defined for this scene (remove `save`, `editMode` and other properties from original state)
Sure it could be done using Redux, however it will require more coding and programmatic setting NavBar buttons using `refresh`.


## Production Apps using react-native-router-flux
+ GuavaPass.com ([iOS](https://itunes.apple.com/en/app/guavapass-one-pass-fitness/id1050491044?l=en&mt=8), Android) - offers convenient access to top classes at boutique fitness studios across Asia.

## Support
Thanks to all who submitted PRs to 2.x release. If you like the component and want to support it, feel free to donate any amount or help with issues.
