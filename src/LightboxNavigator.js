/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {
  // addNavigationHelpers,
  // createNavigationContainer,
  createStackNavigator,
  TabRouter,
} from 'react-navigation';
import { View } from 'react-native';
// import navigationStore from './navigationStore';

const NavigationView = ({ navigationConfig }) => {
// const NavigationView = ({
//   navigation, screenProps, navigationConfig, descriptors,
// }) => {
  // const { state, dispatch } = navigation;
  // const { routes, index } = state;

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

NavigationView.propTypes = {
  // navigation: PropTypes.shape().isRequired,
  // screenProps: PropTypes.object,
  navigationConfig: PropTypes.object,
  // descriptors: PropTypes.object,
};

const LightboxNavigator = (routeConfigs, tabsConfig = {}) => {
  const router = TabRouter(routeConfigs, tabsConfig);

  return createStackNavigator(NavigationView, router, tabsConfig);
};

LightboxNavigator.propTypes = {
  routeConfigs: PropTypes.shape({
    navigationOptions: PropTypes.object,
    path: PropTypes.string,
  }),
};

export default LightboxNavigator;
