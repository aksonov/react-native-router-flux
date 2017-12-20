import React from 'react';
import { Text } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Router from '../src/Router';
import Scene from '../src/Scene';
import navigationStore from '../src/navigationStore';

const B = () => <Text>Hello world!</Text>;
const router = (<Router><Scene>
  <Scene key="b">
    <Scene key="a" component={B} param="1" />
    <Scene key="c" component={B} param="2" />
  </Scene>
</Scene></Router>);

test('renders correctly', done => {
  renderer.create(router);
  console.log('STATE:', JSON.stringify(navigationStore.state));
  navigationStore.c({ data: 'abc' });
  navigationStore.refresh({ data: 'abcde' });
  console.log('STATE:', JSON.stringify(navigationStore.state));
  navigationStore.pop();
  console.log('STATE:', JSON.stringify(navigationStore.state));
  navigationStore.refresh({ a: 3 });
  console.log('STATE:', JSON.stringify(navigationStore.state));
  done();
});
