'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;

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
