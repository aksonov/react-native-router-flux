'use strict';
var React = require('react-native');
var {View, Navigator, Text, StyleSheet} = React;
var alt = require('./alt');
var PageStore = require('./store');
var Actions = require('./actions');
var FetchActions = require('./FetchActions');
var FetchStore = require('./FetchStore');
var Animations = require('./Animations');

// schema class represents schema for routes and it is processed inside Router component
class Schema extends React.Component {
    render(){
        return null;
    }
}

// schema class represents fetch call
class API extends React.Component {
    render(){
        return null;
    }
}

// route class processed inside Router component
class Route extends React.Component {
    render(){
        return null;
    }

}
class Router extends React.Component {
    constructor(props){
        super(props);
        this.state  = {initialRoute: null};
        this.routes = {};
        this.apis = {};
        this.schemas = {};
    }

    onChange(page){
        if (page.mode=='push'){
            if (!page.name){
                alert("Page name is not defined for action");
                return;
            }
            var route = this.routes[page.name];
            if (!route){
                alert("No route is defined for name: "+page.name);
                return;
            }
            if (!route.component){
                alert("No route component is defined for name: "+page.name);
                return;
            }
            // check if route is popup
            if (route.schema=='popup'){
                this.setState({modal: React.createElement(route.component, {data: page.data})});
            } else {
                console.log("PUSH");
                this.refs.nav.push(this.getRoute(route, page.data))
            }
        }
        if (page.mode=='pop'){
            var num = page.num || 1;
            var routes = this.refs.nav.getCurrentRoutes();
            // pop only existing routes!
            if (routes.length-1-num>=0) {
                this.refs.nav.popToRoute(routes[routes.length - 1 - num]);
            } else {
                if (this.props.onExit){
                    this.props.onExit();
                }
            }
        }
        if (page.mode=='dismiss') {
            this.setState({modal: null});
        }
    }

    componentDidMount(){
        var self = this;
        var RouterActions = this.props.actions || Actions;
        var RouterStore = this.props.store|| PageStore;
        var initial = null;

        // iterate schemas
        React.Children.forEach(this.props.children, function (child, index){
            if (child.type.name == 'Schema') {
                var name = child.props.name;
                self.schemas[name] = child.props;
            }
        });

        // iterate routes
        React.Children.forEach(this.props.children, function (child, index){
            if (child.type.name == 'Route') {
                var name = child.props.name;
                self.routes[name] = child.props;
                if (child.props.initial || !initial) {
                    initial = child.props;
                    self.setState({initialRoute: child.props});
                }
                if (!(RouterActions[name])) {
                    RouterActions[name] = function (data) {
                        if (typeof(data)!='object'){
                            data={data:data};
                        }
                        var args = {name: name, data:data};
                        RouterActions.push(args);
                    }
                }
            }
        });


        // iterate fetches
        React.Children.forEach(this.props.children, function (child, index){
            if (child.type.name == 'API') {
                var name = child.props.name;
                self.apis[name] = child.props;

                // generate sugar actions like 'login'
                if (!(RouterActions[name])) {
                    RouterActions[name] = function (data) {
                        if (typeof(data)!='object'){
                            data={data:data};
                        }
                        FetchActions.fetch(name, data);
                    }
                }
            }
        });
        // load all APIs to FetchStore
        FetchActions.load(this.apis);

        RouterStore.listen(this.onChange.bind(this));
        FetchStore.listen(this.onFetchChange.bind(this));
    }

    onFetchChange(state){

    }

    componentWillUnmount() {
        var RouterStore = this.props.store || Store;
        RouterStore.unlisten(this.onChange);
    }

    renderScene(route, navigator) {
        var Component = route.component;
        var navBar = route.navigationBar;

        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
                navigator: navigator,
                route: route
            });
        }
        return (
            <View style={{flex:1}}>
                {navBar}
                <Component navigator={navigator} route={route} {...route.passProps}/>
            </View>
        )
    }

    getRoute(route, data) {
        var schema = this.schemas[route.schema || 'default'] || {};
        var sceneConfig = route.sceneConfig || schema.sceneConfig || Animations.FlatFloatFromRight;
        var NavBar = route.navBar || schema.navBar;
        var navBar;
        if (NavBar){
            navBar = <NavBar {...route} {...data} />
        }
        return {
            component: route.component,
            sceneConfig: {
                ...sceneConfig,
                gestures: {}
            },
            navigationBar: route.hideNavBar ? null : navBar,
            passProps: { ...route, ...data }
        }
    }

    render(){
        var modal = null;
        if (this.state.modal){
            modal = (<View style={styles.container}>
                    <View style={[styles.container,{backgroundColor:'black',opacity:0.5}]}/>
                    {this.state.modal}
                </View>
            );
        }
        if (this.state.initialRoute){
            return (
                <View style={{flex:1}}>
                    <Navigator
                        renderScene={this.renderScene}
                        configureScene={(route) => { return route.sceneConfig;}}
                        ref="nav"
                        initialRoute={this.getRoute(this.state.initialRoute)}
                        />
                    {modal}
                </View>
            );
        } else {
            return <View/>
        }

    }

}

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = {Router, Actions, API, PageStore, Route, Animations, Schema, FetchStore, FetchActions, alt}
