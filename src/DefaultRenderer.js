/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Component, Animated, PropTypes, StyleSheet, View, NavigationExperimental } from 'react-native';
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    RootContainer: NavigationRootContainer,
    Header: NavigationHeader,
    } = NavigationExperimental;
import TabBar from './TabBar';
import NavBar from './NavBar';
import Actions from './Actions';

export default class DefaultRenderer extends Component {
  constructor(props) {
    super(props);
    this._renderCard = this._renderCard.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  static childContextTypes = {
    navigationState: PropTypes.any,
  };

  componentDidMount() {
    this.dispatchFocusAction(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigationState !== this.props.navigationState) {
      this.dispatchFocusAction(nextProps);
    }
  }

  dispatchFocusAction({ navigationState }) {
    if (!navigationState || navigationState.component || navigationState.tabs) {
      return;
    }
    const scene = navigationState.children[navigationState.index];
    Actions.focus({ scene });
  }

  getChildContext() {
    return {
      navigationState: this.props.navigationState,
    };
  }

  render() {
    const navigationState = this.props.navigationState;
    if (!navigationState) {
      return null;
    }
    let Component = navigationState.component;
    if (navigationState.tabs && !Component) {
      Component = TabBar;
    }
    if (Component) {
      return (
                <View style={[{ flex: 1 }, navigationState.sceneStyle]}>
                    <Component {...navigationState} navigationState={navigationState} />
                </View>
            );
    }

    const selected = navigationState.children[navigationState.index];
        // return <DefaultRenderer key={selected.key} navigationState={selected}/>

    let applyAnimation = selected.applyAnimation || navigationState.applyAnimation;
    let style = selected.style || navigationState.style;
    let direction = selected.direction || navigationState.direction || 'horizontal';

    let optionals = {};
    if (applyAnimation) {
      optionals.applyAnimation = applyAnimation;
    } else {
      let duration = selected.duration;
      if (duration === null || duration === undefined) duration = navigationState.duration;
      if (duration !== null && duration !== undefined) {
        optionals.applyAnimation = function (pos, navState) {
          Animated.timing(pos, { toValue: navState.index, duration }).start();
        };
      }
    }

    return (
            <NavigationAnimatedView
              navigationState={navigationState}
              style={[styles.animatedView, style]}
              renderOverlay={this._renderHeader}
              direction={direction}
              renderScene={this._renderCard}
              {...optionals}
            />
        );
  }

  _renderHeader(/* NavigationSceneRendererProps*/ props) {
    const state = props.navigationState;
    const child = state.children[state.index];
    let selected = state.children[state.index];
    while (selected.hasOwnProperty('children')) {
      selected = selected.children[selected.index];
    }
    if (state.hideNavBar || selected.hideNavBar || child.hideNavBar) {
      return null;
    }

    if (selected.component && selected.component.renderNavigationBar) {
      return selected.component.renderNavigationBar({ ...this.props, ...selected });
    }
    const Component =  selected.navBar || child.navBar || state.navBar || NavBar;
    //console.log("STATE:", state);
    //console.log("CHILD:", child);
    //console.log("SELECTED:", selected);

    let navBarProps = {...state, ...child, ...selected};
    // delete contrary properties
    if ((selected.leftTitle || selected.leftButtonImage) && selected.onLeft){
      delete navBarProps.leftButton;
    }
    if ((selected.rightTitle || selected.rightButtonImage) && selected.onRight){
      delete navBarProps.rightButton;
    }
    if (selected.rightButton){
      delete navBarProps.rightTitle;
      delete navBarProps.onRight;
      delete navBarProps.rightButtonImage;
    }
    if (selected.leftButton){
      delete navBarProps.leftTitle;
      delete navBarProps.onLeft;
      delete navBarProps.leftButtonImage;
    }
    delete navBarProps.style;

    const getTitle = selected.getTitle || ( state => state.title );
    return <Component {...props} {...navBarProps} getTitle={getTitle} />;
  }

  _renderCard(/* NavigationSceneRendererProps*/ props) {
    const { key, direction, panHandlers, getSceneStyle } = props.scene.navigationState;

    const optionals = {};
    if (getSceneStyle) optionals.style = getSceneStyle(props);

    return (
            <NavigationCard
              {...props}
              key={'card_' + key}
              direction={direction || 'horizontal'}
              panHandlers={panHandlers}
              renderScene={this._renderScene}
              {...optionals}
            />
        );
  }

  _renderScene(/* NavigationSceneRendererProps*/ props) {
    return <DefaultRenderer key={props.scene.navigationState.key} navigationState={props.scene.navigationState} />;
  }

}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor:'transparent'
  },
});
