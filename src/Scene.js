/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class extends React.Component {

  // @todo - should all props be documented/specified here?

  static propTypes = {
    tabBarStyle: View.propTypes.style,
    tabBarSelectedItemStyle: View.propTypes.style,
    tabBarIconContainerStyle: View.propTypes.style,
    tabBarShadowStyle: View.propTypes.style,
    tabSceneStyle: View.propTypes.style,
    tabStyle: View.propTypes.style,
    tabTitleStyle: Text.propTypes.style,
    tabSelectedTitleStyle: Text.propTypes.style,
    tabTitle: PropTypes.string,
  };

  render() {
    return null;
  }
}
