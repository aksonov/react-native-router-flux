/* @flow */

import React from 'react';
import { View } from 'react-native';

export default ({ navigation, descriptors }) => {
  const { state } = navigation;
  const descriptor = descriptors[state.routes[0].key]; // base component to render
  const Component = descriptor.getComponent();
  const popupDescriptor = descriptors[state.routes[state.index].key];
  const Popup = state.index !== 0 ? popupDescriptor.getComponent() : null;
  return (
    <View style={{ flex: 1 }}>
      <Component navigation={descriptor.navigation} />
      {Popup && <Popup navigation={popupDescriptor.navigation} />}
    </View>
  );
};
