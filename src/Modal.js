import React, { Component, View } from 'react-native';
import DefaultRenderer from './DefaultRenderer';

export default class extends Component {
  render() {
    const children = this.props.navigationState.children;
    const state = children[0];
    return (<View style={{ flex:1 }}>
            <DefaultRenderer navigationState={state} key={state.key} {...state} />
            {children.length > 1 && children.map((el, i) => {
              if (i > 0 && el.component) {
                const Component = el.component;
                return <Component key={el.key} {...el} />;
              }
            })}
        </View>);
  }
}
