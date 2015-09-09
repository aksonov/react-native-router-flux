'use strict';

var React = require('react-native');
var Actions = require('./actions');
var Store = require('./ContainerStore');
var {View, Navigator, Text} = React;
var Animations = require('./Animations');
var alt = require('./alt');

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
        this.navRoutes = {};
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
        console.log(page.name);
        var route = this.routes[page.name];
        // check if route exists
        if (!this.navRoutes[page.name]){
            this.refs.nav.push(this.getRoute(route, page.data));
        } else {
            this.refs.nav.jumpTo(this.navRoutes[page.name]);
        }

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
        var sceneConfig = route.sceneConfig || Animations.None;
        var NavBar = route.navBar;
        var navBar;
        if (NavBar){
            navBar = <NavBar {...schema} {...route} {...data} />
        }
        this.navRoutes[route.name] = {
            name: route.name,
            component: route.component,
            sceneConfig: {
                ...sceneConfig,
                gestures: {}
            },
            navigationBar: route.hideNavBar ? null : navBar,
            passProps: { ...route, ...data }
        }
        return this.navRoutes[route.name];
    }

    render(){
        return (
            <Navigator
                renderScene={this.renderScene}
                configureScene={(route) => { return route.sceneConfig;}}
                ref="nav"
                initialRoute={this.getRoute(this.initialRoute)}
                />
        );
    }
}

Container.Item = Item;

module.exports = Container;