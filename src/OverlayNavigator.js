/* @flow */

import React from 'react';
import { createNavigationContainer, createNavigator, TabRouter } from 'react-navigation';
import { View } from 'react-native';

const OverlayNavigator = (
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
    const { routes } = state;

    // Figure out what to render based on the navigation state and the router:
    const Component = routeConfigs[tabsConfig.initialRouteName].screen;
    let initialIndex = 0;
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.routeName === tabsConfig.initialRouteName) {
        initialIndex = i;
      }
    }
    const initialRouteName = tabsConfig.initialRouteName || routes[initialIndex].routeName;
    const overlays = [];
    for (let i = 0; i < tabsConfig.order.length; i++) {
      const routeName = tabsConfig.order[i];
      if (initialRouteName !== routeName) {
        const Overlay = routeConfigs[routeName].screen;
        overlays.push(<Overlay key={routeName} navigation={{ dispatch, state }} />);
      }
    }
    const ContentComponent = tabsConfig.contentComponent || View;
    return (<ContentComponent style={{ flex: 1 }}>
      <Component navigation={{ dispatch, state: routes[initialIndex] }} />
      {overlays}
    </ContentComponent>);
  });

  return createNavigationContainer(navigator, tabsConfig.containerOptions);
};

export default OverlayNavigator;
