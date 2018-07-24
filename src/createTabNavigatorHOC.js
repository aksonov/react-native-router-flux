/* @flow */

import { createNavigator, createNavigationContainer, TabRouter } from 'react-navigation';

export default NavigationView => (routeConfigs, navigationConfig = {}) =>
  createNavigationContainer(createNavigator(NavigationView, TabRouter(routeConfigs, navigationConfig), navigationConfig));
