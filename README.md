# React Native Router [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Router for React Native based on [exNavigator](https://github.com/exponentjs/ex-navigator)

## Features
- Define your screens ("routes") and animation transitions in one central location
- Use simple syntax to call transitions anywhere in your code (e.g. `Actions.login`)
- Eliminates the need to pass navigator objects to your screens
- Use a `Schema` to define common properties for a group of screens. For example, you can define a "modal" `Schema` for screens that animate from the bottom of the screen.
- Ability to show/hide navigation bar (see limitations)
- Support for managing a tab bar, using [react-native-tabs](https://github.com/aksonov/react-native-tabs) (see demo)
- Support for nested navigators. For example, each tab can have its own navigator, nested in a root navigator. Transition actions will automatically use the top navigator.

## Installation
```
npm i react-native-router-flux --save
```

## Usage
1. In top-level index.js, define a `Router` and child `Route` elements for your screens.
    * If some of your screens have common attributes, consider defining a `Schema` element to reduce repetition
2. In any app screen:
    * import {Actions} from 'react-native-router-flux'
    * Actions.ACTION_NAME(PARAMS) will call appropriate action and params will be passed to the route

## Configuration

##### Router:
| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| header | object | null | optional header view |
| footer | object | null | optional footer view (e.g. tab bar) |
| hideNavBar | bool | false | hides navigation bar |

##### Route:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| name | string | required | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| component | React.Component | semi-required | The `Component` to be displayed. Not required when defining a nested `Router` or child, see example |
| type | string | optional | Defines how the new screen is added to the navigator stack. One of `push`, `replace`, `switch`.  Default is 'push'. `replace` tells navigator to replace current route with new route. `switch` is used for tab screens. |
| initial | bool | false | Set to `true` if this is the initial screen |
| title | string | null | The title to be displayed in the navigation bar |
| schema | string | optional | Set this property to the name of a previously defined `Schema` to inherit its properties |
| wrapRouter | bool | false | If `true`, the route is automatically nested in its own `Router`. Useful for modal screens. |
| sceneConfig | Navigator.SceneConfigs | optional | Defines the transition animation.  |

##### Schema:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| name | string | required | The name of the schema, to be referenced in the route as `schema={"name"}` |
| property | - |  - | A `Schema` can have any property that you want the `Route` to inherit  |


## Example
![launch](https://cloud.githubusercontent.com/assets/1321329/11692367/7337cfe2-9e9f-11e5-8515-e8b7a9f230ec.gif)

```javascript
import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from './components/Register'
import Login from './components/Login'
import Login2 from './components/Login2'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
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

export default class Example extends React.Component {
    render() {
        return (
            <Router hideNavBar={true}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                <Schema name="withoutAnimation"/>
                <Schema name="tab" type="switch" icon={TabIcon} />

                <Route name="launch" component={Launch} initial={true} wrapRouter={true} title="Launch"/>
                <Route name="register" component={Register} title="Register"/>
                <Route name="home" component={Home} title="Replace" type="replace"/>
                <Route name="login" schema="modal">
                    <Router>
                        <Route name="loginModal" component={Login} title="Login" schema="modal"/>
                        <Route name="loginModal2" component={Login2} title="Login2"/>
                    </Router>
                </Route>
                <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                <Route name="tabbar">
                    <Router footer={TabBar} showNavigationBar={false}>
                        <Route name="tab1" schema="tab" title="Tab #1" >
                            <Router>
                                <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                            </Router>
                        </Route>
                        <Route name="tab2" schema="tab" title="Tab #2" component={TabView} />
                        <Route name="tab3" schema="tab" title="Tab #3" component={TabView} />
                        <Route name="tab4" schema="tab" title="Tab #4" component={TabView} />
                        <Route name="tab5" schema="tab" title="Tab #5" component={TabView} />
                    </Router>
                </Route>
            </Router>
        );
    }
}
```

components/Launch.js (initial screen)
```
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

## Redux/Flux support
This component is not opinionated and does not depend on any implementation of Flux or Redux.

All route actions can be hooked by adding handlers for `Actions.onPush`, `Actions.onReplace`, `Actions.onPop` in your store(s).

If a handler returns false, the route action is ignored. For Redux, you will need to 'connect' your component to your store.

For example, instead of 
```
<Route name="register" component={Register} title="Register"/>
```

you might write:

```
<Route name="register" component={connect(selectFnForRegister)(Register)} title="Register"/>
```

## Limitations
### Nested Routers
* Showing and hiding navigation bars and tab bars is only possible on the root `Router`. For example, if you have a tab bar where each tab has its own `Router`, it would not be possible for to show the navigation bar on tab 1, and then push another screen onto the child navigator without the navigation bar shown. In order to get this behavior you will have to manage your own navigation bar component. 
* Although you can pass data into a `Route` (e.g. `Actions.login({user_id: '3'})`), this is currently not working for `Route` inside of a nested `Router`.
* If you are using a tab bar where each tab has its own `Router`, modal screens will have to be presented from the root navigator in order to cover the tab bar. To do this, the modal screen should be defined in the root router, and should have the `wrapRouter={true}` property as in the example below.
```
        <Router>
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Route name="myModal" component={myModal} title="Modal" schema="modal" wrapRouter={true} />
          <Route name="tabbar">
            <Router footer={TabBar}>
              <Route name="tab1" schema="tab" title="Tab 1" component={Tab1}/>
            </Router>
          </Route>
        </Router>
```

