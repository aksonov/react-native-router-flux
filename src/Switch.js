import React, { Component, PropTypes } from 'react';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';

export default class Switch extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func,
    selector: PropTypes.func,
    unmountScenes: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.navigationState !== nextProps.navigationState) {
      this.updateState(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.navigationState !== nextState.navigationState) {
      return true;
    }
    return false;
  }

  updateState(props) {
    const navState = props.navigationState;

    const selector = props.selector;
    if (!selector) console.error('Selector should be defined.');

    const selectedKey = selector(props);
    if (!selectedKey) console.error('Selector should return key.');

    const selected = navState.children.filter(el => el.sceneKey === selectedKey);
    if (!selected) console.error(`A scene for key “${selectedKey}” does not exist.`);

    const navigationState = selected[0];
    if (!navigationState) console.error(`Cannot find a scene with key “${selectedKey}”`);

    if (navigationState.sceneKey !== navState.children[navState.index].sceneKey) {
      if (props.unmountScenes) {
        Actions[selectedKey]({ unmountScenes: true });
      } else {
        Actions[selectedKey]();
      }
    }
    this.setState({ navigationState });
  }

  render() {
    if (this.state.navigationState) {
      return (
        <DefaultRenderer
          onNavigate={this.props.onNavigate}
          navigationState={this.state.navigationState}
        />
      );
    }
    return null;
  }
}
