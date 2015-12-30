/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react-native';
import Router from './Router';
import Route from './Route';
import * as Components from './Common';
import ExNavigator from '@exponent/react-native-navigator';
import Animations from './Animations';
const {TouchableOpacity, NavigatorIOS, StyleSheet, View, Text} = React;
import ReactRouter from './ReactRouter';

class RouteIOS extends React.Component {
    constructor(props){
        super(props);
        this.route = this.props.route;
    }
    render(){
        const Component = this.route.component;
        const child = Component ?
            !this.route.wrapRouter ? <Component key={this.route.name} name={this.route.name} {...this.route.props} {...this.props} route={this.route}/>:
                <ReactRouter name={this.route.name+"Router"} {...this.route.props} {...this.props} route={this.route} router={RouterIOS} >
                    <Components.Route {...this.route.props}  {...this.props} component={Component} name={"_"+this.route.name} type="push" wrapRouter={false}/>
                </ReactRouter>
            :
            React.cloneElement(React.Children.only(this.route.children), {...this.route.props, data:this.props, route:this.route});

        if (!child){
            throw new Error("Cannot render route="+this.route.name);
        }
        return child;
    }
}
export default class RouterIOS extends React.Component {
    router: Router;

    constructor(props){
        super(props);
        this.onPop = this.onPop.bind(this);
        this.onPush = this.onPush.bind(this);
        this.onReplace = this.onReplace.bind(this);
        this.onJump = this.onJump.bind(this);
    }

    onPush(route: Route, props:{ [key: string]: any}):boolean {
        this.refs.nav.push({...route, component:RouteIOS, passProps:{...props, route: route}});
        return true;
    }

    onReplace(route: Route, props:{ [key: string]: any}):boolean {
        this.refs.nav.replace({...route, component:RouteIOS, passProps:{...props, route: route}});
        return true;
    }

    onJump(route: Route, props:{ [key: string]: any}):boolean {
        const navigator = this.refs.nav;
        const routes = navigator.getCurrentRoutes();
        const exist = routes.filter(el=>el.getName()==route.name);
        if (exist.length){
            navigator.jumpTo(exist[0]);
        } else {
            navigator.push({...route, component:RouteIOS, passProps:{...props, route: route}});

        }
        this.setState({selected: route.name});
        return true;
    }

    onPop(num: number){
        this.refs.nav.pop();
        return true;
    }

    render() {
        const router = this.props.router;
        const Header = this.props.header;
        const header = Header ? <Header {...this.props} {...this.state}/> : null;

        const Footer = this.props.footer;
        const footer = Footer ? <Footer {...this.props} {...this.state}/> : null;

        return (
                <NavigatorIOS ref="nav" initialRoute={router.currentRoute}
                             style={styles.transparent}
                             sceneStyle={{ paddingTop: 0 }}
                              navigationBarHidden={this.props.hideNavBar}
                    {...this.props}
                />
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

