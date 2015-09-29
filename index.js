'use strict';
var React = require('react-native');
var {View, Navigator, Text, StyleSheet} = React;
var alt = require('./alt');
var PageStore = require('./store');
var Actions = require('./actions');
var Animations = require('./Animations');
var Container = require('./Container');
var AltNativeContainer = require('alt/AltNativeContainer');

// schema class represents schema for routes and it is processed inside Router component
class Schema extends React.Component {
    className(){
        return "Schema";
    }
    render(){
        return null;
    }
}

// action class represents simple action which will be handled by user-defined stores
class Action extends React.Component {
    className(){
        return "Action";
    }
    render(){
        return null;
    }
}

// route class processed inside Router component
class Route extends React.Component {
    className(){
        return "Route";
    }
    render(){
        return null;
    }

}

class Router extends React.Component {
    constructor(props){
        super(props);
        this.routes = {};
        this.schemas = {};

        var self = this;
        var RouterActions = props.actions || Actions;
        var RouterStore = props.store|| PageStore;
        this.initial = props.initial;

        React.Children.forEach(props.children, function (child, index){
            var name = child.props.name;
            if (child.type.prototype.className() == "Schema") {
                self.schemas[name] = child.props;
            } else if (child.type.prototype.className() == "Route") {
//                console.log("Added route: " + name);
                if (child.props.initial || !self.initial) {
                    self.initial = name;
                }
                if (!(RouterActions[name])) {
                    RouterActions[name] = alt.createAction(name, function (data) {
                        if (typeof(data)!='object'){
                            data={data:data};
                        }
                        var args = {name: name, data:data};
                        RouterActions.push(args);
                    });
                }
                self.routes[name] = child.props;
                if (!child.props.component && !child.props.children){
                    console.error("No route component is defined for name: "+name);
                    return;
                }

            } else  if (child.type.prototype.className() == "Action") {
                //console.log("Added action: " + name);
                if (!(RouterActions[name])) {
                    RouterActions[name] = alt.createAction(name, function(data){
                        RouterActions.custom({name, props: child.props, data:data})});
                }
            }
        });
        this.initialRoute =  this.routes[this.initial] || console.error("No initial route "+this.initial);
        this.state = {initial: this.initial};
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
            // check if route is popup
            if (route.schema=='popup'){
                var element = React.createElement(route.component, Object.assign({}, route, page.data));
                if (route.store){
                    element = (<AltNativeContainer store={route.store} {...element.props}>
                        {element}
                    </AltNativeContainer>);
                }
                this.setState({modal: element});
            } else {
                //console.log("PUSH");
                this.refs.nav.push(this.getRoute(route, page.data))
            }
        }
        if (page.mode=='pop'){
            var num = page.num || 1;
            var routes = this.refs.nav.getCurrentRoutes();
            // pop only existing routes!
            if (num < routes.length) {
                this.refs.nav.popToRoute(routes[routes.length - 1 - num]);
            } else {
                if (this.props.onExit){
                    this.props.onExit(routes[0], page.data || {});
                }
            }
        }
        if (page.mode=='dismiss') {
            this.setState({modal: null});
        }

        if (page.mode=='reset'){
            // reset navigation stack
            this.refs.nav.immediatelyResetRouteStack([this.getRoute(this.routes[page.initial], {})])
        }
    }

    componentDidMount(){
        var RouterStore = this.props.store|| PageStore;
        Actions.init(this.initial);
        this.routerUnlisten = RouterStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount() {
        this.routerUnlisten();
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
        var child = null;
        if (Component){
            child = <Component key={route.name} navigator={navigator} route={route} {...route.passProps}/>
        } else {
            child = React.Children.only(this.routes[route.name].children);
            child = React.addons.cloneWithProps(child, {schemas: this.schemas});
        }

        // wrap with AltNativeContainer if 'store' is defined
        if (this.routes[route.name].store ){
            if (!this.routes[route.name]){
                console.error("Cannot found route for name: "+ route.name);
                return;
            }
            child = (<AltNativeContainer key={route.name+"alt"}  store={this.routes[route.name].store} {...child.props}>
                {child}
                </AltNativeContainer>);
        }

        return (
            <View style={styles.transparent}>
                {navBar}
                {child}
            </View>
        )
    }

    extend(destination, source) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    getRoute(route, data) {
        var proto = (data||{}).constructor.name;
        // avoid passing React Native parameters 
        if (proto != 'Object'){
            data = {};
        }
        var schema = this.schemas[route.schema || 'default'] || {};
        var sceneConfig = route.sceneConfig || schema.sceneConfig || Animations.None;
        var NavBar = route.navBar || schema.navBar;
        var navBar;
        if (NavBar){
            navBar = <NavBar {...schema} {...route} {...data} />
        }
        var props = this.extend({}, route);
        props = this.extend(props, data);
        return {
            name: route.name,
            component: route.component,
            sceneConfig: {
                ...sceneConfig,
                gestures: {}
            },
            navigationBar: route.hideNavBar ? null : navBar,
            passProps: props
        }
    }

    render(){
        this.initialRoute =  this.routes[this.props.initial || this.initial];

        var modal = null;
        if (this.state.modal){
            modal = (<View style={styles.container}>
                    <View style={[styles.container,{backgroundColor:'black',opacity:0.5},this.props.popupStyle]}/>
                    {this.state.modal}

                </View>
            );
        }
        return (
            <View style={styles.transparent}>
                <Navigator
                    renderScene={this.renderScene.bind(this)}
                    configureScene={(route) => { return route.sceneConfig;}}
                    ref="nav"
                    initialRoute={this.getRoute(this.initialRoute)}
                    />
                {modal}
            </View>
        );

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
    transparent: {
      flex:1,
      backgroundColor: "transparent"
    }
});

module.exports = {Router, Container, Actions, Action, PageStore, Route, Animations, Schema, alt}
