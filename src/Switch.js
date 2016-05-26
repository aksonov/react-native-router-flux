import React from 'react';
import DefaultRenderer from './DefaultRenderer';

export default function Switch(props) {
  const navState = props.navigationState;
  const selector = props.selector;
  if (!selector) console.error('Selector should be defined.');
  const selectedKey = selector(props);
  if (!selectedKey) console.error('Selector should return key.');
  const selected = navState.children.filter(el => el.sceneKey === selectedKey);
  if (!selected) console.error(`A scene for key “${selectedKey}” does not exist.`);
  const navigationState = selected[0];
  if (!navigationState) console.error(`Cannot find a scene with key “${selectedKey}”`);
  return (
    <DefaultRenderer
      onNavigate={props.onNavigate}
      navigationState={navigationState}
    />
  );
}
