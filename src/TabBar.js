import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';
import TabNavigator from 'react-native-tab-navigator';

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(el) {
    if (!Actions[el.sceneKey]) {
      throw new Error(
        `No action is defined for sceneKey=${el.sceneKey} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    Actions[el.sceneKey]();
  }

  render() {
    const state = this.props.navigationState;
    let selected = state.children[state.index];
    // @todo not sure about this
    // while (selected.hasOwnProperty('children')) {
    //   selected = selected.children[selected.index];
    // }
    const hideTabBar = state.hideTabBar || selected.hideTabBar;

    // @todo document/correct various tab props

    return (
      <View
        style={{ flex: 1 }}
      >
        <TabNavigator
          tabBarStyle={this.props.tabBarStyle}
          sceneStyle={this.props.sceneStyle}
        >
          {state.children.map(el => {
            const isSelected = el.sceneKey === selected.sceneKey;
            const Icon = el.icon || this.props.tabIcon;
            return (
              <TabNavigator.Item
                key={el.key}
                selected={isSelected}
                title={el.title}
                renderIcon={() => <Icon {...this.props} {...el} />}
                renderSelectedIcon={() => <Icon {...this.props} {...el} selected={true} />}
                onPress={() => this.onSelect(el)}
                tabStyle={el.tabStyle}
                titleStyle={el.titleStyle}
                selectedTitleStyle={el.selectedTitleStyle}
              >
                <DefaultRenderer
                  key={el.key}
                  onNavigate={this.props.onNavigate}
                  navigationState={el}
                />
              </TabNavigator.Item>
              
            );
          })}
        </TabNavigator>
      </View>
    );
  }

}

export default TabBar;
