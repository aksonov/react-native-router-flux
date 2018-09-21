import { AppRegistry } from 'react-native';

import Example from './Example';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

AppRegistry.registerComponent('Example', () => Example);
