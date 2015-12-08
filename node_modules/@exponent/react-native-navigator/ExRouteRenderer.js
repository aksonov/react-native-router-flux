'use strict';

import React, {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import invariant from 'invariant';
import cloneReferencedElement from 'react-native-clone-referenced-element';

import ExNavigatorStyles from './ExNavigatorStyles';
import ExSceneConfigs from './ExSceneConfigs';
import Layout from './Layout';

import { BackIcon } from './ExNavigatorIcons';

import type { Navigator } from 'react-native';
import type * as ExNavigator from './ExNavigator';
import type * as ExRoute from './ExRoute';

type BarStyles = {
  titleStyle?: any;
  barButtonTextStyle?: any;
  barButtonIconStyle?: any;
};

class NavigationBarRouteMapper {
  constructor(navigator: ExNavigator, styles: BarStyles) {
    this._navigator = navigator;
    this._titleStyle = styles.titleStyle;
    this._barButtonTextStyle = styles.barButtonTextStyle;
    this._barButtonIconStyle = styles.barButtonIconStyle;
  }

  Title(
    route: ExRoute,
    navigator: Navigator,
    index: number,
    state: Object
  ): ?React.Component {
    if (route.renderTitle) {
      return route.renderTitle(this._navigator, index, state);
    }

    if (!route.getTitle) {
      return null;
    }

    return (
      <Text style={[ExNavigatorStyles.barTitleText, this._titleStyle]}>
        {shortenTitle(route.getTitle(this._navigator, index, state))}
      </Text>
    );
  }

  LeftButton(
    route: ExRoute,
    navigator: Navigator,
    index: number,
    state: Object
  ): ?React.Component {

    if (route.renderLeftButton) {
      return route.renderLeftButton(this._navigator, index, state);
    }

    if (index === 0) {
      return null;
    }

    return this._renderBackButton(route, this._navigator, index, state);
  }

  _renderBackButton(
    route: ExRoute,
    navigator: Navigator,
    index: number,
    state: Object,
  ): ?React.Component {
    let previousIndex = index - 1;
    let previousRoute = state.routeStack[previousIndex];
    if (previousRoute.renderBackButton) {
      return previousRoute.renderBackButton(this._navigator, previousIndex, state);
    }

    let title;
    if (route.getBackButtonTitle){
      title = route.getBackButtonTitle(this._navigator, index, state);
    } else if (previousRoute.getTitle) {
      title = previousRoute.getTitle(this._navigator, previousIndex, state);
    }

    if (title) {
      var buttonText =
        <Text
          numberOfLines={1}
          style={[
            ExNavigatorStyles.barButtonText,
            ExNavigatorStyles.barBackButtonText,
            this._barButtonTextStyle,
          ]}
        >
          {title}
        </Text>;
    }

    return (
      <TouchableOpacity
        pressRetentionOffset={ExNavigatorStyles.barButtonPressRetentionOffset}
        onPress={() => this._navigator.pop()}
        style={[ExNavigatorStyles.barBackButton, styles.backButtonStyle]}>
        <BackIcon
          style={[
            ExNavigatorStyles.barButtonIcon,
            this._barButtonIconStyle,
          ]}
        />
        {buttonText}
      </TouchableOpacity>
    );
  }

  RightButton(
    route: ExRoute,
    navigator: Navigator,
    index: number,
    state: Object
  ): ?React.Component {
    if (route.renderRightButton) {
      return route.renderRightButton(this._navigator, index, state);
    }
  }
};

export default class ExRouteRenderer {
  constructor(navigator: ExNavigator, styles: BarStyles) {
    this._previousRoute = null;
    this.navigationBarRouteMapper = new NavigationBarRouteMapper(
      navigator,
      styles,
    );
  }

  configureScene(route: ExRoute): Object {
    if (route.configureScene) {
      let sceneConfig = route.configureScene();
      if (sceneConfig) {
        return sceneConfig;
      }
    }

    if (Platform.OS === 'android') {
      return ExSceneConfigs.Fade;
    } else {
      return ExSceneConfigs.PushFromRight;
    }
  }

  renderScene(route: ExRoute, navigator: ExNavigator): React.Component {
    if (route.renderScene) {
      let scene = route.renderScene(navigator);
      if (!scene) {
        return scene;
      }
      return cloneReferencedElement(scene, {
        ref: component => { route.scene = component; },
      });
    }

    invariant(
      route.getSceneClass,
      'The route must implement renderScene or getSceneClass',
    );
    let Component = route.getSceneClass();
    return (
      <Component
        ref={component => { route.scene = component; }}
        navigator={navigator}
      />
    );
  }

  onWillFocus(event) {
    let { data: { route } } = event;
    if (route.onWillFocus) {
      route.onWillFocus(event);
    }
    // The component isn't mounted yet if this is the first time it's rendered
    if (route.scene && route.scene.componentWillFocus) {
      route.scene.componentWillFocus(event);
    }

    let previousRoute = this._previousRoute;
    if (previousRoute) {
      if (previousRoute.onWillBlur) {
        previousRoute.onWillBlur(event);
      }
      let previousScene = previousRoute.scene;
      if (previousScene && previousScene.componentWillBlur) {
        previousScene.componentWillBlur(event);
      }
    }
  }

  onDidFocus(event) {
    let { data: { route } } = event;
    if (route.onDidFocus) {
      route.onDidFocus(event);
    }
    if (route.scene && route.scene.componentDidFocus) {
      route.scene.componentDidFocus(event);
    }

    let previousRoute = this._previousRoute;
    if (previousRoute) {
      if (previousRoute.onDidBlur) {
        previousRoute.onDidBlur(event);
      }
      let previousScene = previousRoute.scene;
      if (previousScene && previousScene.componentDidBlur) {
        previousScene.componentDidBlur(event);
      }
    }
    this._previousRoute = route;
  }
};

// Long titles will run into the left and right button text or overflow even
// further and just generally look gross so we try to limit the damage by
// shortening the title text.
//
// iOS does this by moving the title to take up the available space (to the
// left or right if the buttons leave space), and then ellipsising as necessary
// by measuring the actual text, etc. We can eventually but for now, we'll just
// limit titles to at most 18 characters.
function shortenTitle(title) {
  if (title.length > 18) {
    return title.substr(0, 18) + '…';
  } else {
    return title;
  }
}

let styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ExRouteRenderer;
