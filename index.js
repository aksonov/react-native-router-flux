/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react-native';
const {View, Navigator, Text, StyleSheet} = React;
import ExNavigator from '@exponent/react-native-navigator';
import Animations from './Animations';
import Button from 'react-native-button';
import Tabs from 'react-native-tabs';

function filterParam(data){
    if (typeof(data)!='object')
        return data;
    if (!data){
        return;
    }
    var proto = (data||{}).constructor.name;
    // avoid passing React Native parameters
    if (proto != 'Object'){
        data = {};
    }
    if (data.data){
        data.data = filterParam(data.data);
    }
    return data;
}

function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/***
 * Class represents navigation 'actions' (push, pop, replace, switch) and also allows to add custom actions
 */
class ActionContainer {
    constructor(){
        this.onPush = null;
        this.onPop = null;
        this.onReplace = null;
        this.onSwitch = null;
        this.navs = {};
        this.nav = null;
        this.push = this.push.bind(this);
        this.pop = this.pop.bind(this);
        this.replace = this.replace.bind(this);
    }

    /***
     * Sets navigator instance for action with given name
     * @param name action name
     * @param nav navigator instance
     */
    setNavigator(name, nav){
        this.navs[name] = nav;
    }

    /**
     * Add new action with given name, props and schemas
     * @param name action name
     * @param props route props
     * @param schemas route schemas
     */
    addAction(name, props, schemas){
        if (!name) {
            throw Error("No name is defined for the router");
        }
        if (!props) {
            throw Error("No props is defined for the route=" + name);
        }
        const self = this;
        this[name] = function(data) {
            if (typeof(data) != 'object') {
                data = {data: data};
            }
            data = filterParam(data);
            const route = new ExRoute({...props, ...data, name}, schemas);
            var action = route.getType();
            if (!self[action]){
                throw Error("No action="+action+" exist for route="+route.getName());
            }
            self[action](route);

        }
    }

    /***
     * Push new route to current nav stack
     * @param route defined route
     */
    push(route){
        const name = route.getName();
        const navigator = this.navs[name];
        // set latest navigator
        this.nav = navigator;

        if (this.onPush){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onPush(navigator, route)){
                return;
            }
        }
        navigator.push(route);
    }

    /***
     * Replace current route with defined route
     * @param route defined route
     */
    replace(route){
        const name = route.getName();
        const navigator = this.navs[name];
        if (this.onReplace){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onReplace(navigator, route)){
                return;
            }
        }
        navigator.replace(route);
    }

    /***
     * Switch to defined route (so it will jump to existing route if it exists within nav stack or push otherwise), usable for tab bar.
     * @param route defined route
     */
    switch(route){
        const name = route.getName();
        const navigator = this.navs[name];
        if (this.onSwitch){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onSwitch(navigator, route)){
                return;
            }
        }
        const routes = navigator.getCurrentRoutes();
        const exist = routes.filter(el=>el.getName()==route.getName());
        if (exist.length){
            navigator.jumpTo(exist[0]);
        } else {
            navigator.push(route);

        }
        // set navigator accordingly
        this.nav = navigator;

    }

    /***
     * Pop current scene from navigator, data could be number indicates number of screens to pop
     * @param data
     */
    pop(data){
        data = filterParam(data);
        const number = isNumeric(data) ? data : 1;
        let navigator = this.nav;
        let routes = navigator.getCurrentRoutes();
        // ignore 'switch' routes
        while (routes.length > 0 && routes[routes.length-1].getType() === 'switch' && navigator.parentNavigator){
            navigator = navigator.parentNavigator;
            routes = navigator.getCurrentRoutes();
        }
        while (routes.length <= number){
            // try parent navigator if we cannot pop current one
            if (navigator.parentNavigator){
                navigator = navigator.parentNavigator;
                routes = navigator.getCurrentRoutes();
            } else {
                throw new Error("Cannot pop navigator with less than "+number+" screens");
            }
        }
        const route = routes[routes.length-number-1];
        if (this.onPop){
            // don't do action if it is not allowed (onPop returned false)
            if (!this.onPop(navigator, route)){
                return;
            }
        }
        const name = route.getName();// name of route
        // set navigator accordingly
        this.nav = this.navs[name];
        navigator.popToRoute(routes[routes.length-number-1]);
    }
}

const Actions = new ActionContainer();


class ExRoute {
    /**
     * All properties for this route. name field is required and should be unique for the route
     * 'title' represents title
     *
     * @param name
     * @param title
     * @param onRightButton
     * @param rightButtonTitle
     * @param header
     * @param footer
     * @param component
     * @param child
     * @param props
     * @param schemas
     */
    constructor(props, schemas){
        if (!props){
            throw new Error("No props is defined for this Route");
        }
        if (!props.name){
            throw new Error("No name is defined for this Route");
        }
        if (props.schema && (!schemas || !schemas[props.schema])){
            throw new Error("No schema="+props.schema+" is defined for route="+props.name);
        }
        const schema = schemas ? schemas[props.schema || 'default'] || {} : {};
        const {name, type, title, sceneConfig, onRightButton, rightButtonTitle, header, footer, component, children} = {...schema, ...props};
        if (!component && !children){
            throw new Error("Component class or scene instance (child) should be passed");
        }
        this.title = title;
        this.onRightButton = onRightButton;
        this.rightButtonTitle = rightButtonTitle;
        this.sceneConfig = sceneConfig;
        this.props = props;
        this.type = type;
        this.name = name;
        this.header = header;
        this.footer = footer;
        this.schemas = schemas;
        this.component = component;
        this.children = children;
    }

    configureScene() {
        return this.sceneConfig;
    }

    renderScene(navigator) {
        const Component = this.component;
        const Header = this.header;
        const Footer = this.footer;
        let child;
        if (Component){
            // separate processing for 'switch' routes - they should be wrapped into separate Router
            if (this.getType()==='switch'){
                child = (<Router navigator={navigator} schemas={this.schemas}>
                    <Route {...this.props} name={"_"+this.props.name} type="push"/>
                </Router>);
            } else {
                child = <Component key={this.name} navigator={navigator} {...this.props} schemas={this.schemas}/>
            }
        } else {
            child = React.Children.only(this.children);
            child = React.cloneElement(child, {navigator, schemas: this.schemas});
        }
        return (
            <View style={styles.transparent}>
                {Header && <Header navigator={navigator} {...this.props}/>}
                {child}
                {Footer && <Footer navigator={navigator} {...this.props}/>}
            </View>
        )
    }

    getName(){
        return this.name;
    }

    getTitle() {
        return this.title || "";
    }

    getType() {
        return this.type || "push";
    }

    renderRightButton() {
        if (this.onRightButton && this.rightButtonTitle){
            this.onRightButton(this.props);
        } else {
            return null;
        }
    }
}

class TabBar extends React.Component {
    onSelect(el){
        if (!Actions[el.props.name]){
            throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(Actions)));
        }
        Actions[el.props.name](el.props);
        return {selected: true};
    }
    render(){
        var children = [];
        React.Children.forEach(this.props.children, function(el){
            if (!el.props.name)
                console.error("No name is defined for element");
            var Icon = el.props.icon || console.error("No icon class is defined for "+el.name);
            children.push(<Icon key={el.props.name} {...el.props}/>);
        });

        return (
            <Tabs style={{backgroundColor:'white'}} onSelect={this.onSelect.bind(this)} {...this.props}>
                {children}
            </Tabs>
        );
    }
}



// schema class represents schema for routes and it is processed inside Router component
class Schema extends React.Component {
    className(){
        return "Schema";
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
    constructor(props) {
        super(props);
        this.routes = {};
        this.schemas = {...props.schemas};
        this.initial = props.initial;

        const self = this;
        React.Children.forEach(this.props.children, function (child, index) {
            const name = child.props.name;
            if (child.type.prototype.className() === "Schema") {
                self.schemas[name] = child.props;
            }
        });
        React.Children.forEach(this.props.children, function (child, index) {
            const name = child.props.name;
            if (child.type.prototype.className() === "Route") {
                if (child.props.initial || !self.initial) {
                    self.initial = name;
                }
                // declare function with null navigator to avoid undefined Actions
                Actions.addAction(name, child.props, self.schemas)
                self.routes[name] = child.props;
            }
        });
        this.state = {initial: this.initial};
    }

    componentDidMount() {
        const self = this;
        React.Children.forEach(this.props.children, function (child, index) {
            const name = child.props.name;
            if (child.type.prototype.className() === "Route") {
                Actions.setNavigator(name, self.refs.nav);
            }
        });
    }

    render(){
        if (!this.state.initial){
            console.error("No initial attribute!");
        }
        const initialRoute =  this.routes[this.state.initial];
        if (!initialRoute) {
            console.error("No initial route!"+JSON.stringify(this.routes));
        }

        const Footer = this.props.footer;
        const footer = Footer ? <Footer {...this.props}/> : null;

        return (
            <View style={styles.transparent}>
                <ExNavigator ref="nav"
                    initialRoute={new ExRoute(initialRoute, this.schemas)}
                    style={styles.transparent}
                    sceneStyle={{ paddingTop: this.props.showNavigationBar ? 44 : 0}}
                    {...this.props}
                />
                {footer}
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

module.exports = {Router, Animations, Actions, Route, Schema, TabBar, ExNavigator}
