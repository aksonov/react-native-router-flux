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
import Actions from './actions';
import ExNavigator from '@exponent/react-native-navigator';
import ExRoute from './route';
import Animations from './Animations';
import TabBar from './TabBar';

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
