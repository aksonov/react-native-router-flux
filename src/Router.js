/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  NavigationExperimental,
} from 'react-native';

import Actions from './Actions';
import getInitialState from './State';
import Reducer from './Reducer';
import DefaultRenderer from './DefaultRenderer';
import Scene from './Scene';

const {
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

const propTypes = {
  dispatch: PropTypes.func,
};

class Router extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.renderNavigation = this.renderNavigation.bind(this);
    this.handleProps = this.handleProps.bind(this);
  }

  componentDidMount() {
    this.handleProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleProps(props);
  }

  handleProps(props) {
    let scenesMap;

    if (props.scenes) {
      scenesMap = props.scenes;
    } else {
      let scenes = props.children;

      if (Array.isArray(props.children) || props.children.props.component) {
        scenes = (
          <Scene
            key="__root"
            hideNav
            {...this.props}
          >
            {props.children}
          </Scene>
        );
      }
      scenesMap = Actions.create(scenes);
    }

    // eslint-disable-next-line no-unused-vars
    const { children, styles, scenes, reducer, createReducer, ...parentProps } = props;

    scenesMap.rootProps = parentProps;

    const initialState = getInitialState(scenesMap);
    const reducerCreator = props.createReducer || Reducer;

    const routerReducer = props.reducer || (
      reducerCreator({
        initialState,
        scenes: scenesMap,
      }));

    this.setState({ reducer: routerReducer });
  }

  renderNavigation(navigationState, onNavigate) {
    if (!navigationState) {
      return null;
    }

    Actions.callback = props => {
      if (this.props.dispatch) this.props.dispatch(props);
      return onNavigate(props);
    };

    return <DefaultRenderer onNavigate={onNavigate} navigationState={navigationState} />;
  }

  render() {
    if (!this.state.reducer) return null;

    return (
      <NavigationRootContainer
        reducer={this.state.reducer}
        renderNavigation={this.renderNavigation}
      />
    );
  }
}

Router.propTypes = propTypes;

export default Router;
