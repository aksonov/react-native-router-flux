import React from 'react';
import { AppRegistry } from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Router, Scene} from 'react-native-router-flux';

import Launch from './components/Launch';
import Login from './components/Login';
import Login2 from './components/Login2';
import TabView from './components/TabView';

// const SimpleApp = TabNavigator({
//   Home: { screen: Launch },
//   TabView: {screen: TabView}
//
// },{
//   navigationOptions: {header: null, tabBarVisible: false}
//
// });
//

const App = Router(<Scene hideTabBar tabs>
  <Scene key="launch" component={Launch} />
  <Scene key="loginContainer" modal>
    <Scene key="login" component={Login} title="Login!!!"/>
    <Scene key="login2" component={Login} title="Login2"/>
  </Scene>
</Scene>);


AppRegistry.registerComponent('Example', () => App);
