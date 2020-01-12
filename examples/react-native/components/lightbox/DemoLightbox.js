import React from 'react';
import {Text} from 'react-native';

import Lightbox from './BaseLightbox';

const DemoLightbox = ({data, children}) => (
  <Lightbox verticalPercent={0.5} horizontalPercent={0.9}>
    <Text>Demo Lightbox: {data}</Text>
    <Text>Allows transparency for background</Text>
  </Lightbox>
);

export default DemoLightbox;
