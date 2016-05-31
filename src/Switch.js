import React, { PropTypes } from 'react';
import TabBar from './TabBar';

export default function Switch(props) {
  const navState = props.navigationState;
  const selector = props.selector;
  if (!selector) console.error('Selector should be defined.');
  const selectedKey = selector(props);
  if (!selectedKey) console.error('Selector should return key.');
  let index = -1;
  navState.children.forEach((el, i) => {
    if (el.sceneKey === selectedKey) {
      index = i;
    }
  });
  if (index === -1) console.error(`A scene for key “${selectedKey}” does not exist.`);
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
};
