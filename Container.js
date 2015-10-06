'use strict';

var React = require('react-native');
var Actions = require('./actions');
var Store = require('./ContainerStore');
var {View, Navigator, Text} = React;
var Animations = require('./Animations');
var alt = require('./alt');
var AltNativeContainer = require('alt/AltNativeContainer');

class Item extends React.Component {
    render(){
        return null;
    }
}
class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.routes = {};
        this.initial = props.initial;
        var self = this;

        React.Children.forEach(props.children, function (child, index){
            var name = child.props.name;
            // check initial route
            if (child.props.initial || !self.initial || name==props.initial) {
                self.initial = name;
            }
            // add action
            Actions[name] = alt.createAction(name, function(data){
                Actions.switch({name: name, data:data});
            });
            self.routes[name] = child.props;

        });
        this.initialRoute = this.routes[this.initial];
    }

    componentDidMount(){
        this.unlisten = Store.listen(this.onChange.bind(this))
    }

    componentWillUnmount() {
        this.unlisten();
    }

    onChange({page}){
        //console.log(page.name);
        if (!this.routes[page.name]){
            console.error("No route for page:"+page.name);
        }
        var route = this.getRoute(this.routes[page.name], page.data)
        var found = false;
        var self = this;
        // check if route exists
        this.refs.nav.getCurrentRoutes().forEach(function(navRoute){
            if (navRoute.name == route.name){
                self.refs.nav.jumpTo(navRoute);
                found = true;
                return;
            }
        });

        if (!found){
            this.refs.nav.push(route);
        }

    }

    renderScene(route, navigator) {
        var Component = route.component;
        var navBar = route.navigationBar;
        var footer = route.footer;

        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
                navigator: navigator,
                route: route
            });
        }
        if (footer){
            footer = React.addons.cloneWithProps(footer, {
                navigator: navigator,
                route: route
            });
        }
        var child = Component ?  <Component key={route.name} navigator={navigator} route={route} {...route.passProps}/>
            : React.Children.only(this.routes[route.name].children);

        // wrap with AltNativeContainer if 'store' is defined
        if (this.routes[route.name].store ){
            child = (<AltNativeContainer key={route.name+"alt"}  store={this.routes[route.name].store} {...child.props}>
                {child}
            </AltNativeContainer>);
        }

        return (
            <View style={{flex:1,backgroundColor: "transparent"}}>
                {navBar}
                {child}
                {footer}
            </View>
        )
    }

    getRoute(route, data) {
        if (!route){
            console.error("No route for DATA:"+JSON.stringify(data));
        }
        var schema = this.props.schemas[route.schema || 'default'] || {};
        var sceneConfig = Animations.None;
//        var sceneConfig = route.sceneConfig || schema.sceneConfig || Animations.None;
        var NavBar = route.navBar || schema.navBar;
        var Footer = route.footer || schema.footer;

        var navBar;
        if (NavBar){
            navBar = <NavBar prevTitle=" " {...schema} {...route} {...data}/>
        }

        var footer;
        if (Footer){
            footer = <Footer {...schema} {...route} {...data} />
        }
        return {
            name: route.name,
            component: route.component,
            sceneConfig: {
                ...sceneConfig,
                gestures: {}
            },
            footer: footer,
            navigationBar: route.hideNavBar ? null : navBar,
            passProps: { ...route, ...data }
        }
    }

    render(){
        var Component = this.props.component;
        if (!this.initialRoute) {
            console.error("No initial route!");
            return <View/>;
        }

        return (
            <View style={{flex:1,backgroundColor: "transparent"}}>
                <Navigator
                    renderScene={this.renderScene.bind(this)}
                    configureScene={(route) => { return route.sceneConfig;}}
                    ref="nav"
                    initialRoute={this.getRoute(this.initialRoute)}
                    />
                {Component && <Component {...this.props}/>}
            </View>
        );
    }
}

Container.Item = Item;

module.exports = Container;