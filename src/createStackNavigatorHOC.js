/* @flow */

import { createNavigator, createNavigationContainer, StackRouter } from 'react-navigation';

export default NavigationView => (routeConfigs, navigationConfig = {}) => {
  const router = StackRouter(routeConfigs, navigationConfig);
  return createNavigationContainer(createNavigator(NavigationView, router, navigationConfig));
};
