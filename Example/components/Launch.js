import React, {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    }
});

class Launch extends React.Component {
    render(){
        return (
            <View {...this.props}  style={[styles.container, this.props.sceneStyle]}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
            </View>
        );
    }
}

module.exports = Launch;