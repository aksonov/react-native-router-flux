import React, { PropTypes } from 'react';
import { View, NavigationExperimental } from 'react-native';
import Tabs from 'react-native-tabs';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';
const {
  View: NavigationView,
} = NavigationExperimental;

const propTypes = {
  navigationState: PropTypes.object,
  tabIcon: PropTypes.any,
};

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    Actions[el.props.name]();
  }

  renderScene(props) {
    if (props.layout) {
            // for 0.24+, props is /*NavigationSceneRendererProps*/
            // (add flow def above when phasing out < 0.24 support)
      return (
        <DefaultRenderer
          key={props.scene.navigationState.key}
          navigationState={props.scene.navigationState}
        />
      );
    }
    // for < 0.24
    return <DefaultRenderer key={props.key} navigationState={props} />;
  }

  render() {
    const state = this.props.navigationState;
    let selected = state.children[state.index];
    while (selected.hasOwnProperty('children')) {
      selected = selected.children[selected.index];
    }
    const hideTabBar = state.hideTabBar || selected.hideTabBar;
    return (
      <View
        style={{ flex: 1 }}
      >
        <NavigationView
          navigationState={this.props.navigationState}
          style={{ flex: 1 }}
          renderScene={this.renderScene}
        />
          {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
            <Tabs
              style={[{ backgroundColor: 'white' }, state.tabBarStyle]}
              onSelect={this.onSelect} {...state}
              selected={state.children[state.index].sceneKey}
            >
              {state.children.filter(el => el.icon || this.props.tabIcon).map(el => {
                const Icon = el.icon || this.props.tabIcon;
                return <Icon {...this.props} {...el} />;
              })}
            </Tabs>}
      </View>
    );
  }
}

TabBar.propTypes = propTypes;

export default TabBar;
