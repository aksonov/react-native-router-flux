"use strict";

var React = require("react-native");
var {View, Text, StyleSheet} = React;

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
        );
    }
}

module.exports = TabIcon;