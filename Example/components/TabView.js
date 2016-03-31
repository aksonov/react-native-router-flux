"use strict";

var React = require("react-native");
var {View, Text, StyleSheet} = React;
var Button = require("react-native-button");
var Actions = require("react-native-router-flux").Actions;


class TabView extends React.Component {
    render(){
        const drawer = this.context.drawer;
        return (
            <View style={[styles.container, this.props.sceneStyle]}>
                <Text>Tab {this.props.title}</Text>
                {this.props.name === "tab1_1" &&
                <Button onPress={Actions.tab1_2}>next screen for tab1_1</Button>
                }
                {this.props.name === "tab2_1" &&
                <Button onPress={Actions.tab2_2}>next screen for tab2_1</Button>
                }
                <Button onPress={Actions.pop}>Back</Button>
                <Button onPress={()=>{drawer.close();Actions.tab1()}}>Switch to tab1</Button>
                <Button onPress={()=>{drawer.close();Actions.tab2()}}>Switch to tab2</Button>
                <Button onPress={()=>{drawer.close();Actions.tab3()}}>Switch to tab3</Button>
                <Button onPress={()=>{drawer.close();Actions.tab4()}}>Switch to tab4</Button>
                <Button onPress={()=>{drawer.close();Actions.tab5()}}>Switch to tab5</Button>
                <Button onPress={()=>{drawer.close();Actions.echo()}}>push new scene</Button>
            </View>
        );
    }
}

TabView.contextTypes = {
    drawer: React.PropTypes.object
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = TabView;
