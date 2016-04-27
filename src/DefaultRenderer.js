/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {
  Animated,
  Component,
  NavigationExperimental,
  PropTypes,
  View,
} from 'react-native';

import TabBar from './TabBar';
import NavBar from './NavBar';
import Actions from './Actions';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
} = NavigationExperimental;

export default class DefaultRenderer extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
  };

  static childContextTypes = {
    navigationState: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.renderCard = this.renderCard.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  getChildContext() {
    return {
      navigationState: this.props.navigationState,
    };
  }

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

  renderCard(/* NavigationSceneRendererProps*/ props) {
    const { key, direction, panHandlers, getSceneStyle } = props.scene.navigationState;

    const optionals = {};
    if (getSceneStyle) optionals.style = getSceneStyle(props);

    return (
      <NavigationCard
        {...props}
        key={`card_${key}`}
        direction={direction || 'horizontal'}
        panHandlers={panHandlers}
        renderScene={this.renderScene}
        {...optionals}
      />
    );
  }

  renderScene(props: Object) {
    return (
      <DefaultRenderer
        key={props.scene.navigationState.key}
        navigationState={props.scene.navigationState}
      />
    );
  }

  renderHeader(props) {
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

    const HeaderComponent = selected.navBar || child.navBar || state.navBar || NavBar;
    const navBarProps = { ...state, ...child, ...selected };

    if ((selected.leftTitle || selected.leftButtonImage) && selected.onLeft) {
      delete navBarProps.leftButton;
    }

    if ((selected.rightTitle || selected.rightButtonImage) && selected.onRight) {
      delete navBarProps.rightButton;
    }

    if (selected.rightButton) {
      delete navBarProps.rightTitle;
      delete navBarProps.onRight;
      delete navBarProps.rightButtonImage;
    }

    if (selected.leftButton) {
      delete navBarProps.leftTitle;
      delete navBarProps.onLeft;
      delete navBarProps.leftButtonImage;
    }
    delete navBarProps.style;

    const getTitle = selected.getTitle || (opts => opts.title);
    return <HeaderComponent {...props} {...navBarProps} getTitle={getTitle} />;
  }

  render() {
    const navigationState = this.props.navigationState;

    if (!navigationState) {
      return null;
    }

    let SceneComponent = navigationState.component;

    if (navigationState.tabs && !SceneComponent) {
      SceneComponent = TabBar;
    }

    if (SceneComponent) {
      return (
        <View
          style={[{ flex: 1 }, navigationState.sceneStyle]}
        >
          <SceneComponent
            {...navigationState}
            navigationState={navigationState}
          />
        </View>
      );
    }

    const optionals = {};
    const selected = navigationState.children[navigationState.index];
    const applyAnimation = selected.applyAnimation || navigationState.applyAnimation;
    const style = selected.style || navigationState.style;
    let direction = selected.direction || navigationState.direction || 'horizontal';

    if (applyAnimation) {
      optionals.applyAnimation = applyAnimation;
    } else {
      let duration = selected.duration;
      if (duration === null || duration === undefined) duration = navigationState.duration;
      if (duration !== null && duration !== undefined) {
        optionals.applyAnimation = (pos, navState) => {
          Animated.timing(pos, { toValue: navState.index, duration }).start();
        };
      }
    }

    return (
      <NavigationAnimatedView
        navigationState={navigationState}
        style={[
          {
            flex: 1,
            backgroundColor: 'transparent',
          },
          style,
        ]}
        renderOverlay={this.renderHeader}
        direction={direction}
        renderScene={this.renderCard}
        {...optionals}
      />
    );
  }

}
