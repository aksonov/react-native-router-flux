# react-native-tabs
React Native platform-independent tabs. Could be used for bottom tab bars as well as sectioned views (with tab buttons)

## Why I need to use it?
- Decouple content views from tab bar
- Platform-indepedent
- Possibility to use Flux actions with react-native-router-flux to switch between content views
- Suitable for both bottom tab bar as well as upper sectioned buttons (you just need to define style properly)
- Custom views for each tab icon
- Dynamically change properties of icons after selection (check onSelect within Example above)

## How it works?
Component just iterates over all its children and makes them touchable ('name' is only required attribute of each child).
onSelect method should return changed properties of selected icon view - for example if icon view is a text, you could return {style: {color: 'red'}} to make that text red.
For more complex cases (like different views for selected/unselected) you could just return {selected: true} and define different views within your icon class depending from its selected property.

## Example
Example makes selected icon color red and change the state of example view. To switch to other views you may use react-native-router-flux component or own navigation controller
![demo-2](https://cloud.githubusercontent.com/assets/1321329/10188030/adf5532c-675c-11e5-8447-227ec38fa24f.gif)

```
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var Tabs = require('react-native-tabs');

class Example extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    var self = this;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Selected page: {this.state.page}
        </Text>
        <Tabs selected="second" style={{backgroundColor:'white'}}
              onSelect={function(el){self.setState({page: el.props.name});return {style:{color:'red'}}}}>
            <Text name="first">First</Text>
            <Text name="second">Second</Text>
            <Text name="third">Third</Text>
            <Text name="fourth">Fourth</Text>
            <Text name="fifth">Fifth</Text>
        </Tabs>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
```
