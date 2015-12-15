/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react-native';
const {View, Navigator, Text, StyleSheet, TouchableOpacity, InteractionManager} = React;
import ExNavigator from '@exponent/react-native-navigator';
import Animations from './Animations';
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
        this.push = this.push.bind(this);
        this.pop = this.pop.bind(this);
        this.replace = this.replace.bind(this);
        this.currentRoute = null;
        this.navsParent = {};
    }

    onDidFocus(name, isLeaf) {
        let routeName = name;
        while (this.navsParent[routeName]) {
            //console.log("GETTING LATEST SCENE FOR " + name);
            const routes = this.navsParent[routeName].getCurrentRoutes();
            routeName = routes[routes.length - 1].getName();
        }

        //console.log("SETTING CURRENT ROUTE TO "+routeName);
        this.currentRoute = routeName;
    }

    /***
     * Sets navigator instance for action with given name
     * @param name action name
     * @param nav navigator instance
     */
    setNavigator(name, nav){
        //console.log("SETTING NAV "+nav.props._parent+" TO NAME="+name);
        this.navs[name] = nav;
        this.navsParent[nav.props._parent || 'root'] = nav;
    }

    /**
     * Add new action with given name, props and schemas
     * @param name action name
     * @param props route props
     * @param schemas route schemas
     */
    addAction(name, props, schemas, router){
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
            self[action](route, router);

        }
    }

    isFocused(navigator){
        // get current route
        const routes = navigator.getCurrentRoutes();
        const curRoute = routes[routes.length - 1];
        return curRoute.focused;
    }

    /***
     * Push new route to current nav stack
     * @param route defined route
     */
    push(route){
        const name = route.getName();
        let navigator = this.navs[name];
        console.log("PUSH TO"+name+" "+route.isLeaf());
        // if route is leaf, push it from latest route navigator, not from root navigator
        if (route.isLeaf()){
            navigator = this.navs[this.currentRoute];
            this.navs[name] = navigator;// save it for future pop()

        }

        if (!this.isFocused(navigator)){
            return;
        }

        if (this.onPush){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onPush(navigator, route)){
                return;
            }
        }
        if (route.onEnter){
            if (!route.onEnter(route)){
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
        let navigator = this.navs[name];
        // if route is leaf, push it from latest route navigator, not from root navigator
        if (route.isLeaf()){
            navigator = this.navs[this.currentRoute];
            this.navs[name] = navigator;// save it for future pop()
        }

        if (!this.isFocused(navigator)){
            return;
        }

        if (this.onReplace){
            // don't do action if it is not allowed (onReplace returned false)
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
    switch(route, router){
        const name = route.getName();
        const navigator = this.navs[name];

        if (this.onSwitch){
            // don't do action if it is not allowed (onSwitch returned false)
            if (!this.onSwitch(navigator, route)){
                return;
            }
        }
        if (router && router.onSwitch){
            router.onSwitch(route);
        }

        const routes = navigator.getCurrentRoutes();
        const exist = routes.filter(el=>el.getName()==route.getName());
        if (exist.length){
            navigator.jumpTo(exist[0]);
        } else {
            navigator.push(route);

        }
    }

    /***
     * Pop current scene from navigator, data could be number indicates number of screens to pop
     * @param data
     */
    pop(data){
        data = filterParam(data);
        const number = isNumeric(data) ? data : 1;
        let navigator = this.navs[this.currentRoute];
        //console.log("LATEST NAV:"+this.navs[this.currentRoute].props._parent);
        let routes = navigator.getCurrentRoutes();
        //console.log("NAV LATEST SCENE:"+routes[routes.length-1].getName()+" "+routes.length);
        while (routes.length <= number || routes[routes.length-1].getType() === 'switch'){
            // try parent navigator if we cannot pop current one
            if (navigator.parentNavigator){
                //console.log("pop to parent navigator");
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
        navigator.popToRoute(routes[routes.length-number-1]);
    }
}

const Actions = new ActionContainer();
class Container extends React.Component {
    render(){
        return <View {...this.props}/>;
    }
}
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
    constructor(props, schemas) {
        if (!props) {
            throw new Error("No props is defined for this Route");
        }
        if (!props.name) {
            throw new Error("No name is defined for this Route");
        }
        if (props.schema && (!schemas || !schemas[props.schema])) {
            throw new Error("No schema=" + props.schema + " is defined for route=" + props.name);
        }
        const schema = schemas ? schemas[props.schema || 'default'] || {} : {};
        const {name, type, title, hideNavBar, navigationBarStyle, backButtonStyle, rightButtonStyle, rightButtonTextStyle,
            onEnter, onLeave, wrapRouter, sceneConfig, renderLeftButton, renderTitle,
            onRight, rightTitle, header, renderRightButton, renderBackButton, footer, component, children} = {...schema, ...props};
        if (!component && !children) {
            throw new Error("Component class or scene instance (child) should be passed");
        }
        this.title = title;
        this.onRight = onRight;
        this.rightTitle = rightTitle;
        this.sceneConfig = sceneConfig;
        this.wrapRouter = wrapRouter;
        this.props = props;
        this.type = type;
        this.focused = false;
        this.name = name;
        this.header = header;
        this.footer = footer;
        this.hideNavBar = hideNavBar;
        this.schemas = schemas;
        this.component = component;
        this.children = children;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.backButtonStyle = backButtonStyle;
        this.rightButtonStyle = rightButtonStyle;
        this.rightButtonTextStyle = rightButtonTextStyle;
        this.navigationBarStyle = navigationBarStyle;
        if (renderRightButton){
            this.renderRightButton = renderRightButton.bind(this, this);
        }
        if (renderBackButton){
            this.renderBackButton = renderBackButton.bind(this, this);
        }
        if (renderLeftButton){
            this.renderLeftButton = renderLeftButton.bind(this, this);
        }
        if (renderTitle){
            this.renderTitle = renderTitle.bind(this, this);
        }
        this.leaf = this.component && !(this.getType() === 'switch' || this.wrapRouter);
    }

    onDidFocus(event){
        this.focused = true;
//        console.log("FOCUS "+this.getName());
        Actions.onDidFocus(this.getName(), this.isLeaf());
    }

    onWillBlur(event){
        this.focused = false;
        if (this.onLeave){
            this.onLeave(this, event);
        }
        //console.log("LOSE FOCUS!"+this.getName());
    }

    isLeaf(){
        return this.leaf;
    }

    configureScene() {
        return this.getType() === 'switch' ? Animations.None : this.sceneConfig || Animations.None;
    }

    renderScene(navigator) {
        const Component = this.component;
        const Header = this.header;
        const Footer = this.footer;
        let child;
        if (Component){
            // separate processing for 'switch' routes - they should be wrapped into separate Router
            if (!this.isLeaf()){
                child = (<Router _parent={this.props.name} {...this.props} navigator={navigator} schemas={this.schemas} >
                    <Route {...this.props} name={"_"+this.props.name} type="push" wrapRouter={false}/>
                </Router>);
            } else {
                child = <Component key={this.name} {...this.props} navigator={navigator} schemas={this.schemas} _parent={this.props.name}/>
                this.leaf = true;
            }
        } else {
            child = React.Children.only(this.children);
            child = React.cloneElement(child, {navigator, schemas: this.schemas, _parent:this.props.name});
        }
        return (
            <Container style={styles.transparent} route={this.getName()}>
                {Header && <Header navigator={navigator} {...this.props}/>}
                {child}
                {Footer && <Footer navigator={navigator} {...this.props}/>}
            </Container>
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

    getBackButtonTitle(navigator, index, state){
        let previousIndex = index - 1;
        let previousRoute = state.routeStack[previousIndex];
        let title = previousRoute.getTitle(navigator, previousIndex, state);
        return title.length>10 ? null : title;
    }

    renderRightButton() {
        if (this.onRight && this.rightTitle){
            return (<TouchableOpacity
                touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
                onPress={() => this.onRight(this.props)}
                style={[ExNavigator.Styles.barRightButton, this.rightButtonStyle]}>
                <Text style={[ExNavigator.Styles.barRightButtonText, this.rightButtonTextStyle]}>{this.rightTitle}</Text>
            </TouchableOpacity>);
        } else {
            return null;
        }
    }
}

class TabBar extends React.Component {
    constructor(props){
        super(props);
    }
    onSelect(el){
        if (!Actions[el.props.name]){
            throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(Actions)));
        }
        Actions[el.props.name](el.props);
        InteractionManager.runAfterInteractions(() =>
                        this.setState({hideTabBar: el.props.hideTabBar}));
        return {selected: true};
    }
    getChildrenState(selectedRoute){
        var self = this;
        let selected = false;
        var children = [];
        React.Children.forEach(this.props.children, function(el, index){
            const schema = self.props.schemas && el.props.schema && self.props.schemas[el.props.schema] ? self.props.schemas[el.props.schema] : {};
            let props = {...schema, ...el.props};
            if (!el.props.name)
                console.error("No name is defined for element");
            if (selectedRoute){
                if (selectedRoute == el.props.name){
                    props.selected = true;
                } else {
                    props.selected = false;
                }
            }

            var Icon = props.icon || console.error("No icon class is defined for "+el.name);
            children.push(<Icon key={el.props.name} {...props}/>);
            if (props.selected || index === 0){
                selected = el;
            }
        });
        return {children, hideTabBar: selected.props.hideTabBar};
    }
    componentWillMount(){
        if (!this.props.children){
            return;
        }
        this.state = this.getChildrenState(this.props.selected);

    }

    componentWillReceiveProps({selected}){
        //console.log("TABBAR "+selected);
        InteractionManager.runAfterInteractions(() =>
            this.setState(this.getChildrenState(selected)));
    }
    render(){
        if (this.state.hideTabBar){
            return <View/>
        }
        return (
            <Tabs style={{backgroundColor:'white'}} onSelect={this.onSelect.bind(this)} {...this.props}>
                {this.state.children}
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
        this.initial = this.props.initialRoutes || []; // Initial names array

        const self = this;
        React.Children.forEach(this.props.children, function (child, index) {
            const name = child.props.name;
            if (child.type.prototype.className() === "Schema") {
                self.schemas[name] = child.props;
            }
        });
        this.first = null;
        React.Children.forEach(this.props.children, function (child, index) {
            const name = child.props.name;
            if (child.type.prototype.className() === "Route") {
                if (!self.first){
                    self.first = name;
                }
                if (child.props.initial) {
                    self.initial.push(name);
                }
                // declare function with null navigator to avoid undefined Actions
                Actions.addAction(name, child.props, self.schemas, self)
                self.routes[name] = child.props;
            }
        });
        // add first route as initial if no initial attribute set
        if (!this.initial.length && this.first){
            this.initial.push(this.first);
        }
        this.state = {initial: this.initial};
    }

    onSwitch(route){
        //console.log("SWITCHED TO"+route.getName());
        this.setState({selected: route.getName()});
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
        if (!this.state.initial.length){
            console.error("No initial attribute!");
        }
        const initialRoutes =  this.state.initial.map((name) => this.routes[name]);
        if (!initialRoutes.length) {
            console.error("No initial routes!"+JSON.stringify(this.routes));
        }

        const Header = this.props.header;
        const header = Header ? <Header {...this.props} {...this.state}/> : null;

        const Footer = this.props.footer;
        const footer = Footer ? <Footer {...this.props} {...this.state}/> : null;

        return (
            <View style={styles.transparent}>
                {header}
                <ExNavigator ref="nav"
                             initialRouteStack={initialRoutes.map((route) => new ExRoute(route, this.schemas))}
                             style={styles.transparent}
                             sceneStyle={{ paddingTop: 0 }}
                             showNavigationBar={!this.props.hideNavBar}
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
    },
    barTitleText: {
        fontFamily: '.HelveticaNeueInterface-MediumP4',
        fontSize: 17,
        marginTop: 11,
    },

});

module.exports = {Router, Actions, Route, Schema, TabBar, ExNavigator, Animations}
