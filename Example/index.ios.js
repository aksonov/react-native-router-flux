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
            <View style={{flex:1}}>
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                <Router>
                    <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal} />
                    <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar} />
                    <Schema name="withoutAnimation" navBar={NavBar} />

                    <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch"/>
                    <Route name="register" component={Register} title="Register" />
                    <Route name="login" component={Login} schema="modal"/>
                    <Route name="register2" component={Register} schema="withoutAnimation" />
                    <Route name="error" component={Error} schema="popup"/>
                </Router>

            </View>
        );
    }
});

AppRegistry.registerComponent('Example', () => Example);
