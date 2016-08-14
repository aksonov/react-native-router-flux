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
import { BackAndroid } from 'react-native';
import NavigationExperimental from 'react-native-experimental-navigation';

import Actions, { ActionMap } from './Actions';
import getInitialState from './State';
import Reducer, { findElement } from './Reducer';
import DefaultRenderer from './DefaultRenderer';
import Scene from './Scene';
import * as ActionConst from './ActionConst';

const {
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

const propTypes = {
  dispatch: PropTypes.func,
  backAndroidHandler: PropTypes.func,
  onBackAndroid: PropTypes.func,
  onExitApp: PropTypes.func,
};

class Router extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.renderNavigation = this.renderNavigation.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.handleBackAndroid = this.handleBackAndroid.bind(this);
  }

  componentDidMount() {
    this.handleProps(this.props);

    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  componentWillReceiveProps(props) {
    this.handleProps(props);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  handleBackAndroid() {
    const {
      backAndroidHandler,
      onBackAndroid,
      onExitApp,
    } = this.props;
    // optional for customizing handler
    if (backAndroidHandler) {
      return backAndroidHandler();
    }

    try {
      Actions.pop();
      if (onBackAndroid) {
        onBackAndroid();
      }
      return true;
    } catch (err) {
      if (onExitApp) {
        return onExitApp();
      }

      return false;
    }
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
      scenesMap = Actions.create(scenes, props.wrapBy);
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
    Actions.get = key => findElement(navigationState, key, ActionConst.REFRESH);
    Actions.callback = props => {
      const constAction = (props.type && ActionMap[props.type] ? ActionMap[props.type] : null);
      if (this.props.dispatch) {
        if (constAction) {
          this.props.dispatch({ ...props, type: constAction });
        } else {
          this.props.dispatch(props);
        }
      }
      return (constAction ? onNavigate({ ...props, type: constAction }) : onNavigate(props));
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
