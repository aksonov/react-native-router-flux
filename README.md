# react-native-router-flux
React Native Router Actions based on exNavigator (https://github.com/exponentjs/ex-navigator)

## Why?
- Use Actions to replace/push/pop screens with easy syntax like Actions.login for navigation to login screen
- Forget about passing navigator object to all React elements, use actions from anywhere in your UI code.
- Configure all of your screens ("routes") once (define animations, nav bars, etc.), at one place and then just use short actions commands. For example if you use some special animation for Login screen, you don't need to code it anywhere where an user should be redirected to login screen.
- Use route "schemas" to define common property for some screens. For example some screens are "modal" (i.e. have animation from bottom and have Cancel/Close nav button), so you could define group for them to avoid any code repeatition.
- Hide nav bar for some screens easily
- Use built-in tab bar for some screens (see demo)
- Nested Navigators are supported (i.e. separate navigator for each tab view inside root navigator). push/pop actions will automatically use latest navigator.

## Redux or other Flux support
The component doesn't depend from any Flux implementation and allows to intercept all route actions by adding Actions.onPush/onReplace/onPop handlers from your store(s).
If handler returns false route action is ignored. For Redux Don't forget to 'connect' your component to your store.


## Example
![demo-2](https://cloud.githubusercontent.com/assets/1321329/9466261/de64558e-4b33-11e5-8ada-0fcd49442769.gif)


```javascript
var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var Login2 = require('./components/Login2');
var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');
var Error = require('./components/Error');
var Home = require('./components/Home');
var TabView = require('./components/TabView');

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
'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

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

## Getting started
1. `npm install react-native-router-flux --save`
2. In top-level index.js:
    * Define Route for each app screen. Its 'type' attribute is 'push' by default, but you also could define 'replace', so navigator will replace current route with new route.
    'switch' type represents tab screen.
'component' attribute is React component class which will be created for this route and all route attributes will be passed to it.
'wrapRouter' - wraps Route inside new navigator.
'name' is unique name of Route.
    * If some your Routes have common attributes, you may define Schema element and just use 'schema' attribute for 'route'
    * If you want to define some your custom actions, just add 'Action' element inside Router. That action will not be processed by the component, it will call Actions.custom({name:ACTION_NAME, ...params}) so you could handle it in your stores. It allows to add Fetch actions (which downloads web content), etc.
3. In any app screen:
    * var {Actions} = require('react-native-router-flux');
    * Actions.ACTION_NAME(PARAMS) will call appropriate action and params will be passed to next screen.
