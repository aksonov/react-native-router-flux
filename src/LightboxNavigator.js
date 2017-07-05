/* @flow */

import React from 'react';
import {createNavigationContainer, createNavigator, StackRouter, TabRouter, TabView, TabBarTop, TabBarBottom} from 'react-navigation';
import {View, Text} from 'react-native';

const LightboxNavigator = (
  routeConfigs,
  tabsConfig = {}
) => {
  const router = TabRouter(routeConfigs, tabsConfig);

  const navigator = createNavigator(
    router,
    routeConfigs,
    tabsConfig,
    'react-navigation/STACK'
  )(({navigation, ...props}) => {
    const { state, dispatch } = navigation;
    const { routes, index } = state;

    // Figure out what to render based on the navigation state and the router:
    const Component = routeConfigs[tabsConfig.initialRouteName].screen;
    const Popup = index ? routeConfigs[routes[index].routeName].screen : null;

    return <View style={{flex:1}}>
      <Component navigation={{ dispatch, state: routes[0] }} />
      {Popup && <Popup navigation={{ dispatch, state: routes[index] }} />}
    </View>
  });

  return createNavigationContainer(navigator, tabsConfig.containerOptions);
};

export default LightboxNavigator;
