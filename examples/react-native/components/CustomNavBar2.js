import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: 'green',
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default class CustomNavBar extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  _renderLeft() {
    return (
      <TouchableOpacity onPress={Actions.pop} style={[styles.navBarItem, { paddingLeft: 10 }]}>
        <Image style={{ width: 30, height: 50 }} resizeMode="contain" source={{ uri: 'https://image.flaticon.com/icons/png/512/0/340.png' }} />
      </TouchableOpacity>
    );
  }

  _renderMiddle() {
    return (
      <View style={styles.navBarItem}>
        <Text>{this.props.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLeft()}
        {this._renderMiddle()}
      </View>
    );
  }
}
