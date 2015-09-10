'use strict';
var React = require('react-native');
var {View, Navigator, Text, StyleSheet} = React;
var alt = require('./alt');
var PageStore = require('./store');
var Actions = require('./actions');
var Animations = require('./Animations');
var Container = require('./Container');

// schema class represents schema for routes and it is processed inside Router component
class Schema extends React.Component {
    render(){
        return null;
    }
}

// action class represents simple action which will be handled by user-defined stores
class Action extends React.Component {
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

/* Returns the class name of the argument or undefined if
 it's not a valid JavaScript object.
 */
function getClassName(obj) {
    if (obj.toString) {
        var arr = obj.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return undefined;
}

let SchemaClassName = getClassName(Schema);
let RouteClassName = getClassName(Route);
let ActionClassName = getClassName(Action);

class Router extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.routes = {};
        this.schemas = {};

        var self = this;
        var RouterActions = props.actions || Actions;
        var RouterStore = props.store|| PageStore;
        var initial = null;

        React.Children.forEach(props.children, function (child, index){
            var name = child.props.name;
            if (child.type.name == SchemaClassName) {
                self.schemas[name] = child.props;
            } else if (child.type.name == RouteClassName) {
                if (child.props.initial || !initial || name==props.initial) {
                    initial = child.props;
                    self.initialRoute =  child.props;
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

            } else  if (child.type.name == ActionClassName) {
                if (!(RouterActions[name])) {
                    RouterActions[name] = alt.createAction(name, function(data){
                        //console.log("DATA:"+JSON.stringify(data));
                        return {name, props: child.props, data:data}});
                }
            }
        });
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
                this.setState({modal: React.createElement(route.component, {data: page.data})});
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
    }

    componentDidMount(){
        var RouterStore = this.props.store|| PageStore;
        this.routerUnlisten = RouterStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount() {
        this.routerUnlisten();
    }

    renderScene(route, navigator) {
        console.log("ROUTE: "+route.name)
        var Component = route.component;
        var navBar = route.navigationBar;

        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
                navigator: navigator,
                route: route
            });
        }
        var child = Component ?  <Component navigator={navigator} route={route} {...route.passProps}/>
            : React.Children.only(this.routes[route.name].children);
        return (
            <View style={styles.transparent}>
                {navBar}
                {child}
            </View>
        )
    }

    getRoute(route, data) {
        var schema = this.schemas[route.schema || 'default'] || {};
        var sceneConfig = route.sceneConfig || schema.sceneConfig || Animations.None;
        var NavBar = route.navBar || schema.navBar;
        var navBar;
        if (NavBar){
            navBar = <NavBar {...schema} {...route} {...data} />
        }
        return {
            name: route.name,
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
