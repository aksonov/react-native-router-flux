# react-native-router-flux
React Native Router using Flux architecture

## Why I need to use it?
- Use Flux actions to push/pop screens with easy syntax like Actions.login for navigation to login screen
- Forget about passing navigator object to all React elements, use actions from anywhere in your UI code.
- Configure all of your screens ("routes") once (define animations, nav bars, etc.), at one place and then just use short actions commands. For example if you use some special animation for Login screen, you don't need to code it anywhere where an user should be redirected to login screen.
- Use route "schemas" to define common property for some screens. For example some screens are "modal" (i.e. have animation from bottom and have Cancel/Close nav button), so you could define group for them to avoid any code repeatition.
- Use popup with Flux actions (see Error popup within Example project)

## Example
![demo-2](https://cloud.githubusercontent.com/assets/1321329/9466261/de64558e-4b33-11e5-8ada-0fcd49442769.gif)


```
'use strict';

var React = require('react-native');
var {AppRegistry, StyleSheet,Text,View} = React;

var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var {Router, Route, Actions, Animations, Schema} = require('react-native-router-flux');
var {NavBar, NavBarModal} = require('./components/NavBar');
var Error = require('./components/Error');

var Example = React.createClass({
    render: function() {
        return (
            <Router>
                <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal} />
                <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar} />

                <Route name="launch" component={Launch} initial={true} hideNavBar={false} title="Launch"/>
                <Route name="register" component={Register} title="Register" />
                <Route name="login" component={Login} schema="modal"/>
                <Route name="error" component={Error} schema="popup" />
            </Router>
        );
    }
});

AppRegistry.registerComponent('Example', () => Example);
```

## Getting started
1. `npm install react-native-router-flux --save`
2. Define Route for each screen.
