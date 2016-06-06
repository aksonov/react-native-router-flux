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

export default class extends React.Component {
    constructor() {
        super();
        this.title = "Hello world!";

        this.increaseTitleLength = this.increaseTitleLength.bind(this);
        this.decreaseTitleLength = this.decreaseTitleLength.bind(this);
        this.setNumberOfLines = this.setNumberOfLines.bind(this);
        this.unsetNumberOfLines = this.unsetNumberOfLines.bind(this);
    }

    render(){
        return (
            <View style={[styles.container, this.props.style]}>
                <Text>Title page</Text>
                <Button onPress={this.increaseTitleLength}>Increase title length</Button>
                <Button onPress={this.decreaseTitleLength}>Decrease title length</Button>
                <View style={{ height: 16 }}/>
                <Button onPress={this.unsetNumberOfLines}>Unset numberOfLines</Button>
                <Button onPress={()=>this.setNumberOfLines(1)}>Set numberOfLines to 1</Button>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }

    increaseTitleLength() {
        this.title += "Hello World!";

        Actions.refresh({title: this.title});
    }

    decreaseTitleLength() {
        if(this.title.length > 12) {
            this.title = this.title.slice(0, -12);
        }

        Actions.refresh({title: this.title});
    }

    unsetNumberOfLines() {
        Actions.refresh({titleNumberOfLines: null});
    }

    setNumberOfLines(numberOfLines) {
        Actions.refresh({titleNumberOfLines: numberOfLines});
    }
}
