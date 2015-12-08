'use strict';

import React, {
  StyleSheet,
} from 'react-native';

import Colors from './Colors';
import Layout from './Layout';

let ExNavigatorStyles = StyleSheet.create({
  navigator: { },
  scene: {
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bar: {
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#b2b2b2',
    borderBottomWidth: Layout.pixel,
  },
  barTitleText: {
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    marginTop: 11 + Layout.pixel,
  },
  barButtonIcon: {
    tintColor: Colors.tint,
  },
  barButtonText: {
    color: Colors.tint,
    fontSize: 17,
  },
  barLeftButton: {
    paddingRight: 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  barLeftButtonText: {
    color: Colors.tint,
    fontSize: 17,
    marginTop: 11 + Layout.pixel,
    marginLeft: 8,
  },
  barLeftButtonIcon: {
    tintColor: Colors.tint,
    marginTop: 11,
    marginLeft: 16,
  },
  barRightButton: {
    paddingLeft: 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  barRightButtonText: {
    color: Colors.tint,
    fontSize: 17,
    marginTop: 11 + Layout.pixel,
    marginRight: 8,
  },
  barRightButtonIcon: {
    tintColor: Colors.tint,
    marginTop: 12,
    marginRight: 16,
  },
  barBackButton: {
    paddingRight: 40,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  barBackButtonText: {
    marginTop: 11,
    marginLeft: 6,
  },
});

ExNavigatorStyles.barButtonPressRetentionOffset = {
  top: 40,
  left: 60,
  right: 60,
  bottom: 80,
};

export default ExNavigatorStyles;
