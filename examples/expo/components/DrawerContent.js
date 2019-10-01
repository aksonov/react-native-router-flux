import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={Actions.pop}>Back</Button>
        <Button onPress={Actions.main_home}>Switch to Home</Button>
        <Button onPress={Actions.main_links}>Switch to Links</Button>
        <Button onPress={Actions.main_settings}>Switch to Settings</Button>
      </View>
    );
  }
}

export default DrawerContent;
