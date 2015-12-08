'use strict';

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
var TabIcon = require('./components/TabIcon');

class Example extends React.Component {
    render() {
        return (
                <Router showNavigationBar={false}>
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>
                    <Schema name="tab" type="switch"/>

                    <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch"/>
                    <Route name="register" component={Register} title="Register"/>
                    <Route name="home" component={Home} title="Home" type="replace"/>
                    <Route name="login" schema="modal">
                        <Router>
                            <Route name="loginModal" component={Login} title="Login" schema="modal"/>
                            <Route name="loginModal2" component={Login2} title="Login2"/>
                        </Router>
                    </Route>
                    <Route name="register2" component={Register} schema="withoutAnimation"/>
                    <Route name="tabbar">
                        <Router footer={TabBar} showNavigationBar={false}>
                            <Route name="tab1" icon={TabIcon} schema="tab" title="Tab #1" >
                                <Router>
                                    <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                    <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                                </Router>
                            </Route>
                            <Route name="tab2" icon={TabIcon} schema="tab" title="Tab #2" >
                                <Router>
                                    <Route name="tab2_1" component={TabView} title="Tab #2" />
                                </Router>
                            </Route>
                            <Route name="tab3" icon={TabIcon} schema="tab" title="Tab #3" >
                                <Router>
                                    <Route name="tab3_1" component={TabView} title="Tab #3" />
                                </Router>
                            </Route>
                            <Route name="tab4" icon={TabIcon} schema="tab" title="Tab #4" >
                                <Router>
                                    <Route name="tab4_1" component={TabView} title="Tab #4" />
                                </Router>
                            </Route>
                            <Route name="tab5" icon={TabIcon} schema="tab" title="Tab #5" >
                                <Router>
                                    <Route name="tab5_1" component={TabView} title="Tab #5" />
                                </Router>
                            </Route>
                        </Router>
                    </Route>
                </Router>
        );
    }
}

AppRegistry.registerComponent('Example', () => Example);
