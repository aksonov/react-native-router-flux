import React from 'react';
import PropTypes from 'prop-types';
import TabBar from './TabBar';
import Actions from './Actions';

export default function Switch(props) {
  const navState = props.navigationState;

  const selector = props.selector;
  const statem = props.statem;
  if (!selector && !statem) console.error('Selector should be defined.');
  let index = -1;
  let selectedKey;
  if (!selector) {
    // support Statem - Harel statecharts machine!
    navState.children.forEach((el, i) => {
      if (!(el.default || el.state)) {
        console.error(`Either default or state should be defined for element=${el.key}`);
      }
      if (el.default) {
        index = i;
      } else if (el.state.active) {
        index = i;
      }
    });
  } else {
    selectedKey = selector(props);
    if (!selectedKey) console.error('Selector should return key.');
    navState.children.forEach((el, i) => {
      if (el.sceneKey === selectedKey) {
        index = i;
      }
    });
  }
  if (index === -1) console.error(`A scene for key “${selectedKey}” does not exist.`);
  let navigationState = { ...navState, index };

  if (index !== navState.index) {
    if (props.unmountScenes) {
      setTimeout(() => {
        Actions[selectedKey]({ unmountScenes: true });
      }, 0);
      navigationState = { ...navState, children: [navState.children[navState.index]], index: 0 };
    } else {
      setTimeout(() => {
        Actions[selectedKey]();
      }, 0);
    }
  }

  return (
    <TabBar
      onNavigate={props.onNavigate}
      navigationState={navigationState}
    />
  );
}

Switch.propTypes = {
  navigationState: PropTypes.object,
  onNavigate: PropTypes.func,
  selector: PropTypes.func,
  statem: PropTypes.any,
  unmountScenes: PropTypes.bool,
};
