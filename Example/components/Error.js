'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

class Error extends React.Component {
    render(){
        return (
            <View style={[styles.container,{backgroundColor:'rgba(52,52,52,0.5)'}]}>
            <View style={{width:250,height:250,justifyContent: 'center',
        alignItems: 'center',backgroundColor:'white'}}>
                <Text>{this.props.data}</Text>
                <Button onPress={Actions.dismiss}>Close</Button>
            </View>
                </View>
        );
    }
}


module.exports = Error;

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

