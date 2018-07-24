/* @flow */

import { createNavigator, createNavigationContainer, StackRouter } from 'react-navigation';

export default NavigationView => (routeConfigs, navigationConfig = {}) =>
  createNavigationContainer(createNavigator(NavigationView, StackRouter(routeConfigs, navigationConfig), navigationConfig));
