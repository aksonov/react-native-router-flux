import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';
import TabNavigator from 'react-native-tab-navigator';
import Util from './Util';

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
    tabBarStyle: View.propTypes.style,
    tabSceneStyle: View.propTypes.style,
  };

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
    const selected = state.children[state.index];
    const hideTabBar = Util.deepestExplicitValueForKey(state, 'hideTabBar');

    const tabBarStyle = {};
    const tabSceneStyle = {};

    if (hideTabBar) {
      tabBarStyle.opacity = 0;
      tabBarStyle.height = 0;
      tabSceneStyle.paddingBottom = 0;
    }

    return (
      <View
        style={{ flex: 1 }}
      >
        <TabNavigator
          tabBarStyle={[this.props.tabBarStyle, tabBarStyle]}
          sceneStyle={[this.props.tabSceneStyle, tabSceneStyle]}
        >
          {state.children.map(el => {
            const isSelected = el.sceneKey === selected.sceneKey;
            const Icon = el.icon || this.props.tabIcon;
            return (
              <TabNavigator.Item
                key={el.key}
                selected={isSelected}
                title={el.tabTitle}
                renderIcon={() => <Icon {...this.props} {...el} />}
                renderSelectedIcon={() => <Icon {...this.props} {...el} selected />}
                onPress={() => this.onSelect(el)}
                tabStyle={el.tabStyle}
                titleStyle={el.tabTitleStyle}
                selectedTitleStyle={el.tabSelectedTitleStyle}
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
