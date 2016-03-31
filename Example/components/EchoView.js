"use strict";

var React = require("react-native");
var {StyleSheet} = React;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: "center",
        color: '#333333',
        marginBottom: 5,
    },
});


class EchoView extends React.Component {
    render(){
        var {View, Text, StyleSheet} = React;
        var Button = require("react-native-button");
        var Actions = require("react-native-router-flux").Actions;
        return (
            <View style={[styles.container, this.props.sceneStyle]}>
                <Text style={styles.instructions}>key: {this.props.navigationState.key}</Text>
                <Text style={styles.instructions}>sceneKey: {this.props.navigationState.sceneKey}</Text>
                <Button onPress={Actions.echo}>push new scene</Button>
                <Button onPress={Actions.pop}>pop</Button>
            </View>
        );
    }
}

module.exports = EchoView;
