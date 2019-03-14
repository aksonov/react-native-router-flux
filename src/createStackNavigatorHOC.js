/* @flow */

import { createNavigator, StackRouter } from 'react-navigation';

export default NavigationView => (routeConfigs, navigationConfig = {}) => {
  const router = StackRouter(routeConfigs, navigationConfig);
  return createNavigator(NavigationView, router, navigationConfig);
};
