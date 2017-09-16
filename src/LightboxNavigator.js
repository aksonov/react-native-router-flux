/* @flow */

import React from 'react';
import { addNavigationHelpers, createNavigationContainer, createNavigator, TabRouter } from 'react-navigation';
import { View } from 'react-native';

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
  )(({ navigation }) => {
    const { state, dispatch } = navigation;
    const { routes, index } = state;

    // Figure out what to render based on the navigation state and the router:
    const Component = routeConfigs[tabsConfig.initialRouteName].screen;
    let initialIndex = 0;
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.routeName === tabsConfig.initialRouteName) {
        initialIndex = i;
      }
    }
    const Popup = index !== initialIndex ? routeConfigs[routes[index].routeName].screen : null;

    return (<View style={{ flex: 1 }}>
      <Component navigation={addNavigationHelpers({ dispatch, state: routes[initialIndex] })} />
      {Popup && <Popup navigation={addNavigationHelpers({ dispatch, state: routes[index] })} />}
    </View>);
  });

  return createNavigationContainer(navigator, tabsConfig.containerOptions);
};

export default LightboxNavigator;
