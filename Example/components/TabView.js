import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ViewPropTypes} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

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

class TabView extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle ]}>
        <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
        <Text>Tab data:{this.props.data}</Text>
        {this.props.name === 'tab1_1' &&
        <Button onPress={()=>Actions.tab1_2()}>next screen for tab1_1</Button>
        }
        {this.props.name === 'tab2_1' &&
        <Button onPress={()=>Actions.tab2_2()}>next screen for tab2_1</Button>
        }
        <Button onPress={Actions.pop}>Back</Button>
        <Button onPress={() => { Actions.tab1(); }}>Switch to tab1</Button>
        <Button onPress={() => { Actions.tab2(); }}>Switch to tab2</Button>
        <Button onPress={() => { Actions.tab3(); }}>Switch to tab3</Button>
        <Button onPress={() => { Actions.tab4(); }}>Switch to tab4</Button>
        <Button onPress={() => { Actions.tab5({ data: 'test!' }); }}>Switch to tab5 with data</Button>
        <Button onPress={() => { Actions.echo(); }}>push clone scene (EchoView)</Button>
        <Button onPress={() => { Actions.echo(); }}>push clone scene (EchoView)</Button>
      </View>
    );
  }
}
TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
