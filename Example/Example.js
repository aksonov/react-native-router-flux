'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var Login2 = require('./components/Login2');
var {Route, Stack, Router, Schema, Actions} = require('react-native-router-flux');
var Error = require('./components/Error');
var Home = require('./components/Home');
var TabView = require('./components/TabView');
var ReactNativeModalBox = require('./components/ReactNativeModalBox');

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

const routes = Actions.create(
    <Stack key="root" hideNavBar={true}>
        <Route key="register" component={Register} title="Register"/>
        <Route key="register2" component={Register} title="Register2" duration={1}/>
        <Route key="home" component={Home} title="Replace" type="replace"/>
        <Route key="launch" component={Launch} title="Launch" initial={true}/>
        <Stack key="login">
            <Route key="loginModal" component={Login} schema="modal" title="Login"/>
            <Route key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
        </Stack>
    </Stack>
);
export default class Example extends React.Component {
    render() {
        return (
                <Router hideNavBar={true} name="root" routes={routes}/>
        );
    //    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
    //    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
    //<Schema name="withoutAnimation"/>
    //        <Schema name="tab" type="switch" icon={TabIcon} />
    //
        //<Route name="showActionSheet" type="actionSheet" title="What do you want to do?" options={['Delete', 'Save', 'Cancel']} cancelButtonIndex={2} destructiveButtonIndex={0}/>
        //<Route name="home" component={Home} title="Replace" type="replace"/>
        //    <Route name="login" schema="modal">
        //    <Router name="loginRouter">
        //    <Route name="loginModal" component={Login} schema="modal"/>
        //    <Route name="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
        //    </Router>
        //    </Route>
        //    <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
        //    <Route name="error" type="modal" component={Error}/>
        //    <Route name="modalBox" type="modal" component={ReactNativeModalBox}/>
        //    <Route name="launch" header={Header} initial={true} component={Launch} wrapRouter={true} title="Launch" hideNavBar={true}/>
        //<Route name="tabbar">
        //    <Router footer={TabBar} hideNavBar={true}>
        //        <Route name="tab1" schema="tab" title="Tab #1" >
        //            <Router onPop={()=>{console.log("onPop is called!"); return true} }>
        //                <Route name="tab1_1" component={TabView} title="Tab #1_1" />
        //                <Route name="tab1_2" component={TabView} title="Tab #1_2" />
        //            </Router>
        //        </Route>
        //        <Route name="tab2" schema="tab" title="Tab #2" hideNavBar={true} initial={true}>
        //            <Router onPop={()=>{console.log("onPop is called!"); return true} }>
        //                <Route name="tab2_1" component={TabView} title="Tab #2_1" />
        //                <Route name="tab2_2" component={TabView} title="Tab #2_2" />
        //            </Router>
        //        </Route>
        //        <Route name="tab3" schema="tab" title="Tab #3" component={TabView} hideTabBar={true}/>
        //        <Route name="tab4" schema="tab" title="Tab #4" component={TabView} />
        //        <Route name="tab5" schema="tab" title="Tab #5" component={TabView} />
        //    </Router>
        //</Route>
    }
}
