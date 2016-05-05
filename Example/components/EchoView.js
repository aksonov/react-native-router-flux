import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});


export default class extends React.Component {
    render(){
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

