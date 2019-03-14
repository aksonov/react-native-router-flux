/* @flow */

import { createNavigator, TabRouter } from 'react-navigation';

export default NavigationView => (routeConfigs, navigationConfig = {}) => {
  const router = TabRouter(routeConfigs, navigationConfig);
  return createNavigator(NavigationView, router, navigationConfig);
};
