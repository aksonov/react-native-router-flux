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
  NavigationExperimental,
  PropTypes,
  StyleSheet,
  View,
} from 'react-native';
const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  RootContainer: NavigationRootContainer,
  Header: NavigationHeader,
} = NavigationExperimental;
import Actions from './Actions';
import NavBar from './NavBar';
import TabBar from './TabBar';

const propTypes = {
  navigationState: PropTypes.object,
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

class DefaultRenderer extends React.Component {
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

  renderHeader(/* NavigationSceneRendererProps*/ props) {
    const state = props.navigationState;
    let selected = state.children[state.index];
    while (selected.hasOwnProperty('children')) {
      selected = selected.children[selected.index];
    }
    const Component = state.navBar || selected.navBar || NavBar;
    return <Component {...props} getTitle={titleState => titleState.title} />;
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

  renderScene(/* NavigationSceneRendererProps*/ props) {
    return (
      <DefaultRenderer
        key={props.scene.navigationState.key}
        navigationState={props.scene.navigationState}
      />
    );
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

    const applyAnimation = selected.applyAnimation || navigationState.applyAnimation;
    const style = selected.style || navigationState.style;
    let direction = selected.direction || navigationState.direction || 'horizontal';

    const optionals = {};
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
        renderOverlay={this.renderHeader}
        direction={direction}
        renderScene={this.renderCard}
        {...optionals}
      />
    );
  }
}

DefaultRenderer.propTypes = propTypes;

export default DefaultRenderer;
