'use strict';

import type { Component } from 'react-native';
import type * as ExNavigator from './ExNavigator';

export type ExRoute = {
  getTitle?: (navigator: ExNavigator, index: number, state: Object) => ?string;
  renderTitle?: (navigator: ExNavigator, index: number, state: Object) => ?Component;
  renderLeftButton?: (navigator: ExNavigator, index: number, state: Object) => ?Component;
  renderRightButton?: (navigator: ExNavigator, index: number, state: Object) => ?Component;
  getBackButtonTitle?: (navigator: ExNavigator, index: number, state: Object) => ?string;
  renderBackButton?: (navigator: ExNavigator, index: number, state: Object) => ?Component;
  getSceneClass?: () => typeof Component;
  configureScene?: () => typeof Navigator.SceneConfigs.PushFromRight;
  renderScene?: (navigator: ExNavigator) => Component;
};
