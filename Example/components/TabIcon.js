import React from 'react';
import {PropTypes} from "react";
import {Text} from "react-native";

const propTypes = {
  selected: PropTypes.string,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <Text
    style={{ color: props.selected ? 'red' : 'black' }}
  >
    {props.title}
  </Text>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
