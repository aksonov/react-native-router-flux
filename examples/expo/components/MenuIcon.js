import React from 'react';
import { Icon } from 'expo';

export default class MenuIcon extends React.Component {
  render() {
    return <Icon.Ionicons name={isAndroid ? 'md-more' : 'ios-more'} size={32} />;
  }
}
