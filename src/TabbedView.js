import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

class TabbedView extends Component {
  
  static propTypes = {
    navigationState: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired,
  };

  renderScene = (navigationState, index) => {
    var isSelected = index === this.props.navigationState.index;
    return (
      <View
        key={navigationState.key}
        pointerEvents={isSelected ? 'auto' : 'none'}
        style={[
          styles.scene,
          {opacity: isSelected ? 1 : 0},
        ]}>
        {this.props.renderScene(navigationState, index)}
      </View>
    );
  };

  render() {
    return (
      <View
        style={this.props.style}>
        {this.props.navigationState.children.map(this.renderScene)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  scene: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default TabbedView;
