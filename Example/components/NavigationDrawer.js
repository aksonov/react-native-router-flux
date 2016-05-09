import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';

import TabView from './TabView';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {
  render() {
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={<TabView />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
