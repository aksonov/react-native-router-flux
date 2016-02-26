'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

var Modal   = require('react-native-modalbox');

// Example integration with react-native-modalbox (https://github.com/maxs15/react-native-modalbox)
// For those people who don't want to animate their own modal
class ReactNativeModalBox extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        this.setState({isOpen: true});
    }
    render(){
        return (
            <Modal  animationDuration={200}
                    swipeThreshold={100}
                    style={styles.modal} 
                    position={"center"} 
                    isOpen={this.state.isOpen}
                    onClosed={Actions.dismiss}>
                <Text style={styles.text}>
                    ReactNativeModalBox
                </Text>
                <Text>
                    (swipe down to close)
                </Text>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
    },
    text: {
        color: "black",
        fontSize: 22
    },
});

module.exports = ReactNativeModalBox;
