"use strict";

var React = require("react-native");
var {View, Text} = React;
var Button = require("react-native-button");
var Actions = require("react-native-router-flux").Actions;

var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});


class Login extends React.Component {
    render(){

        return (
            <View style={styles.container}>
                <Text>Login2 page: {this.props.data}</Text>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}

module.exports = Login;