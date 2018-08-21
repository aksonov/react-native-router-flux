import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  smaller: {
    marginBottom: 5,
    fontSize: 12,
  },
});

export default class extends React.Component {
  onEnter() {
    console.log('EchoView onEnter');
  }

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text style={styles.instructions}>routeName: {this.props.name}</Text>
        <Button onPress={Actions.pop}>pop</Button>
      </View>
    );
  }
}
