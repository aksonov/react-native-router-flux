'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

class Error extends React.Component {
    render(){
        return (
            <View style={{width:300,height:300,justifyContent: 'center',
        alignItems: 'center',backgroundColor:'white'}}>
                <Text>{this.props.data}</Text>
                <Button onPress={Actions.dismiss}>Close</Button>
            </View>
        );
    }
}


module.exports = Error;