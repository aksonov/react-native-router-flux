import React, { PropTypes } from 'react';
import TabBar from './TabBar';
import Actions from './Actions';

export default function Switch(props) {
  const navState = props.navigationState;

  const selector = props.selector;
  if (!selector) console.error('Selector should be defined.');

  const selectedKey = selector(props);
  if (!selectedKey) console.error('Selector should return key.');

  const selected = navState.children.filter(el => el.sceneKey === selectedKey);
  if (!selected) console.error(`A scene for key “${selectedKey}” does not exist.`);

  let index = -1;
  navState.children.forEach((el, i) => {
    if (el.sceneKey === selectedKey) {
      index = i;
    }
  });
  if (index === -1) console.error(`A scene for key “${selectedKey}” does not exist.`);

  let navigationState;
  if (index !== navState.index) {
    if (props.unmountScenes) {
      navigationState = {
        ...navState,
        children: [navState.children[navState.index]],
        index: 0,
      };
      setTimeout(() => {
        Actions[selectedKey]({ unmountScenes: true });
      }, 1);
    } else {
      navigationState = { ...navState, index };
      setTimeout(() => {
        Actions[selectedKey]();
      }, 1);
    }
  } else {
    navigationState = navState;
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
