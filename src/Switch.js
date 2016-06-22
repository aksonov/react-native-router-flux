import React, { PropTypes } from 'react';
import TabBar from './TabBar';
import { assert } from './Util';

export default function Switch(props) {
  const navState = props.navigationState;
  const selector = props.selector;
  const statem = props.statem;
  if (!selector && !statem) console.error('Selector should be defined.');
  let index = -1;
  if (!selector) {
    assert(statem.isIn, 'Wrong statem passed');
    // support Statem - Harel statecharts machine!
    navState.children.forEach((el, i) => {
      assert(el.default || el.state,
        `Either default or state should be defined for element=${el.key}`);
      if (el.default) {
        index = i;
      } else {
        assert(el.state.id, 'State doesn\'t have id');
        if (statem.isIn(el.state.id)) {
          index = i;
        }
      }
    });
    assert(index !== -1, 'No default scene is defined');
  } else {
    const selectedKey = selector(props);
    if (!selectedKey) console.error('Selector should return key.');
    navState.children.forEach((el, i) => {
      if (el.sceneKey === selectedKey) {
        index = i;
      }
    });
    if (index === -1) console.error(`A scene for key “${selectedKey}” does not exist.`);
  }
  const navigationState = index !== navState.index ? { ...navState, index } : navState;
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
};
