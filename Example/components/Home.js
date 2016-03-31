"use strict";

var React = require("react-native");
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

class Home extends React.Component {
    render(){
        var {View, Text} = React;
        var Button = require("react-native-button");
        var Actions = require("react-native-router-flux").Actions;

        return (
            <View style={styles.container}>
                <Text>Replace screen</Text>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}

module.exports = Home;
