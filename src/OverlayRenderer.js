/* @flow */

import React from 'react';
import { View } from 'react-native';

export default ({ navigationConfig, descriptors }) => {
  const { initialRouteName, order, contentComponent } = navigationConfig;
  const ContentComponent = contentComponent || View;
  const descriptor = descriptors[initialRouteName];
  const Component = descriptor.getComponent();

  const overlays = [];
  for (let i = 0; i < order.length; i += 1) {
    const routeName = order[i];
    if (initialRouteName !== routeName) {
      const Overlay = descriptors[routeName].getComponent();
      overlays.push(<Overlay key={routeName} navigation={descriptors[routeName].navigation} />);
    }
  }
  return (
    <ContentComponent style={{ flex: 1 }}>
      <Component navigation={descriptor.navigation} />
      {overlays}
    </ContentComponent>
  );
};
