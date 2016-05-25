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
        borderWidth: 2,
        borderColor: 'red',
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    smaller: {
        marginBottom: 5,
        fontSize: 12,
    },
});


export default class extends React.Component {
    render(){
        return (
            <View style={[styles.container, this.props.sceneStyle]}>
                <Text style={styles.instructions}>key: {this.props.navigationState.key}</Text>
                <Text style={styles.instructions}>sceneKey: {this.props.navigationState.sceneKey}</Text>
                <Button
                  onPress={() => Actions.echo()}
                  style={styles.smaller}
                >
                  push new scene hideNavBar=inherit hideTabBar=inherit
                </Button>
                <Button
                  onPress={() => Actions.echo({ hideNavBar: true, hideTabBar: true })}
                  style={styles.smaller}
                >
                  push new scene hideNavBar=true hideTabBar=true
                </Button>
                <Button
                  onPress={() => Actions.echo({ hideNavBar: true, hideTabBar: false })}
                  style={styles.smaller}
                >
                  push new scene hideNavBar=true hideTabBar=false
                </Button>
                <Button
                  onPress={() => Actions.echo({ hideNavBar: false, hideTabBar: true })}
                  style={styles.smaller}
                >
                  push new scene hideNavBar=false hideTabBar=true
                </Button>
                <Button
                  onPress={() => Actions.echo({ hideNavBar: false, hideTabBar: false })}
                  style={styles.smaller}
                >
                  push new scene hideNavBar=false hideTabBar=false
                </Button>
                <Button onPress={Actions.pop}>pop</Button>
            </View>
        );
    }
}

