'use strict';
var React = require('react');

var ReactNative = React;
ReactNative.StyleSheet = {
    create: function(styles) {
        return styles;
    }
};
class View extends React.Component {
    render(){
        return <div {...this.props}/>
    }
}

class Navigator extends React.Component {
    constructor(props){
        super(props);
        this._currentRoutes = [props.initialRoute];
        this.state = {route : props.initialRoute};
    }
    getCurrentRoutes(){
        return this._currentRoutes;
    }
    push(route){
        this._currentRoutes.push(route);
        this.setState({route: route});
    }
    immediatelyResetRouteStack(routes){
        this._currentRoutes = routes;
    }
    popToRoute(route){
        while (this._currentRoutes[this._currentRoutes.length-1] != route){
            this._currentRoutes.pop();
        }
        this.setState({route: route});
    }
    render(){
        return this.props.renderScene(this.state.route, this);
    }
}
ReactNative.View = View;
ReactNative.Navigator = Navigator;

module.exports = ReactNative;