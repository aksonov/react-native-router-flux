/* @flow */

import React from 'react';
import { addNavigationHelpers, createNavigationContainer, createNavigator, TabRouter } from 'react-navigation';
import { View } from 'react-native';
import navigationStore from './navigationStore';

const NavigationView = ({ navigation, screenProps, navigationConfig, descriptors }) => {
  const { state, dispatch } = navigation;
  const { routes, index } = state;

  console.log('DATA:', JSON.stringify(navigationConfig));
  return <View style={{ flex: 1 }} />;

  // // Figure out what to render based on the navigation state and the router:
  // const Component = descriptors[
  //   navigationConfig.initialRouteName
  // ].getComponent();
  // let initialIndex = 0;
  // for (let i = 0; i < routes.length; i++) {
  //   const route = routes[i];
  //   if (route.routeName === tabsConfig.initialRouteName) {
  //     initialIndex = i;
  //   }
  // }
  // const Popup =
  //   index !== initialIndex
  //     ? routeConfigs[routes[index].routeName].screen
  //     : null;

  // return (
  //   <View style={{ flex: 1 }}>
  //     <Component
  //       navigation={addNavigationHelpers({
  //         dispatch,
  //         state: routes[initialIndex],
  //         addListener: navigationStore.addListener
  //       })}
  //     />
  //     {Popup && (
  //       <Popup
  //         navigation={addNavigationHelpers({
  //           dispatch,
  //           state: routes[index],
  //           addListener: navigationStore.addListener
  //         })}
  //       />
  //     )}
  //   </View>
  // );
};

const LightboxNavigator = (routeConfigs, tabsConfig = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig);

  return createNavigator(NavigationView, router, tabsConfig);
};

export default LightboxNavigator;
