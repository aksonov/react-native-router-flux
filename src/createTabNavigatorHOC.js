/* @flow */

import { createNavigator, createNavigationContainer, TabRouter } from 'react-navigation';

export default NavigationView => (routeConfigs, navigationConfig = {}) => {
  const router = TabRouter(routeConfigs, navigationConfig);
  return createNavigationContainer(createNavigator(NavigationView, router, navigationConfig));
};
