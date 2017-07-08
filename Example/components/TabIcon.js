import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  return <Text
    style={{color: props.focused ? 'red' : 'black'}}
  >TAB
    {props.title}
  </Text>
};

TabIcon.propTypes = propTypes;

export default TabIcon;
