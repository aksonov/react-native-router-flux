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
});

export default class extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Login2 page: {this.props.data}</Text>
                <Button onPress={Actions.pop}>Back</Button>
                <Button onPress={Actions.loginModal3}>Login 3</Button>
            </View>
        );
    }
}
