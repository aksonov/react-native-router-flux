/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
import React, {
  PropTypes,
} from 'react';
import {
  Platform,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Actions from './Actions';
import _drawerImage from './menu_burger.png';
import _backButtonImage from './back_chevron.png';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#0A0A0A',
    position: 'absolute',
    top: Platform.OS === 'ios' || Platform.Version > 19 ? 20 : 0,
    left: 0,
    right: 0,
  },
  header: {
    backgroundColor: '#EFEFF2',
    paddingTop: 0,
    top: 0,
    height: Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44,
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'absolute',
  },
  backButton: {
    width: 130,
    height: 37,
    position: 'absolute',
    bottom: 4,
    left: 2,
    padding: 8,
    flexDirection: 'row',
  },
  rightButton: {
    width: 100,
    height: 37,
    position: 'absolute',
    bottom: 4,
    right: 2,
    padding: 8,
  },
  leftButton: {
    width: 100,
    height: 37,
    position: 'absolute',
    bottom: 4,
    left: 2,
    padding: 8,
  },
  barRightButtonText: {
    color: 'rgb(0, 122, 255)',
    textAlign: 'right',
    fontSize: 17,
  },
  barBackButtonText: {
    color: 'rgb(0, 122, 255)',
    textAlign: 'left',
    fontSize: 17,
    paddingLeft: 6,
  },
  barLeftButtonText: {
    color: 'rgb(0, 122, 255)',
    textAlign: 'left',
    fontSize: 17,
  },
  backButtonImage: {
    width: 13,
    height: 21,
  },
  rightButtonIconStyle: {

  },
});

const propTypes = {
  navigationState: PropTypes.object,
  backButtonImage: PropTypes.number,
  backButtonTextStyle: PropTypes.string,
  leftButtonStyle: PropTypes.string,
  leftButtonIconStyle: PropTypes.string,
  getTitle: PropTypes.func,
  titleStyle: PropTypes.object,
  position: PropTypes.object,
  navigationBarStyle: PropTypes.object,
};

const contextTypes = {
  drawer: PropTypes.object,
};

const defaultProps = {
  drawerImage: _drawerImage,
  backButtonImage: _backButtonImage,
};

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.renderRightButton = this.renderRightButton.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  renderBackButton() {
    const state = this.props.navigationState;
    const childState = state.children[state.index];
    let buttonImage = childState.backButtonImage ||
      state.backButtonImage || this.props.backButtonImage;
    let onPress = Actions.pop;

    if (state.index === 0) {
      return null;
    }

    let text = childState.backTitle ?
      <Text
        style={[
          styles.barBackButtonText,
          this.props.backButtonTextStyle,
          state.backButtonTextStyle,
          childState.backButtonTextStyle,
        ]}
      >
        {childState.backTitle}
      </Text>
      : null;

    return (
      <TouchableOpacity
        testID="backNavButton"
        style={[
          styles.backButton,
          this.props.leftButtonStyle,
          state.leftButtonStyle,
          childState.leftButtonStyle,
        ]}
        onPress={onPress}
      >
        {buttonImage &&
          <Image
            source={buttonImage}
            style={[
              styles.backButtonImage,
              this.props.leftButtonIconStyle,
              state.barButtonIconStyle,
              state.leftButtonIconStyle,
              childState.leftButtonIconStyle,
            ]}
          />
        }
        {text}
      </TouchableOpacity>
    );
  }

  renderRightButton() {
    const self = this;
    function tryRender(state) {
      if (state.rightButton) {
        const Button = state.rightButton;
        return (
          <Button
            {...self.props}
            {...state}
            key={'rightNavBarBtn'}
            testID="rightNavButton"
            style={[styles.rightButton, state.rightButtonStyle]}
          />
        );
      }
      if (state.onRight && (state.rightTitle || state.rightButtonImage)) {
        const onPress = state.onRight.bind(null, state);
        return (
          <TouchableOpacity
            key={'rightNavBarBtn'}
            testID="rightNavButton"
            style={[styles.rightButton, state.rightButtonStyle]}
            onPress={onPress}
          >
            {state.rightTitle &&
              <Text
                style={[
                  styles.barRightButtonText,
                  state.rightButtonTextStyle]}
              >
                {state.rightTitle}
              </Text>
            }
            {state.rightButtonImage &&
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
              >
                <Image
                  source={state.rightButtonImage}
                  style={state.rightButtonIconStyle}
                />
              </View>}
          </TouchableOpacity>
        );
      }
      if ((!!state.onRight ^ !!(state.rightTitle || state.rightButtonImage))) {
        console.warn(
          `Both onRight and rightTitle/rightButtonImage
            must be specified for the scene: ${state.name}`
        );
      }
      return null;
    }
    return tryRender(this.props);
  }

  renderLeftButton() {
    const self = this;
    const drawer = this.context.drawer;
    function tryRender(state) {
      let onPress = state.onLeft;
      let buttonImage = state.leftButtonImage;

      if (state.leftButton) {
        const Button = state.leftButton;
        return (
          <Button
            {...self.props}
            {...state}
            key={'leftNavBarBtn'}
            testID="leftNavButton"
            style={[styles.leftButton, state.leftButtonStyle]}
          />
        );
      }

      if (!!drawer && typeof drawer.toggle === 'function') {
        buttonImage = state.drawerImage;
        if (buttonImage) {
          onPress = drawer.toggle;
        }
      }

      if (onPress && (state.leftTitle || buttonImage)) {
        onPress = onPress.bind(null, state);
        return (
          <TouchableOpacity
            key={'leftNavBarBtn'}
            testID="leftNavButton"
            style={[styles.leftButton, state.leftButtonStyle]}
            onPress={onPress}
          >
            {state.leftTitle &&
              <Text
                style={[
                  styles.barLeftButtonText,
                  state.leftButtonTextStyle,
                ]}
              >
                {state.leftTitle}
              </Text>
            }
            {buttonImage &&
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}
              >
                <Image
                  source={buttonImage}
                  style={state.leftButtonIconStyle}
                />
              </View>}
          </TouchableOpacity>
        );
      }
      if ((!!state.onLeft ^ !!(state.leftTitle || buttonImage))) {
        console.warn(
          `Both onLeft and leftTitle/leftButtonImage
            must be specified for the scene: ${state.name}`
        );
      }
      return null;
    }
    return tryRender(this.props);
  }

  renderTitle(childState, index:number) {
    const title = this.props.getTitle ? this.props.getTitle(childState) : childState.title;
    return (
      <Animated.Text
        key={childState.key}
        style={[
          styles.title,
          this.props.titleStyle,
          this.props.navigationState.titleStyle,
          childState.titleStyle,
          {
            opacity: this.props.position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0, 1, 0],
            }),
            left: this.props.position.interpolate({
              inputRange: [index - 1, index + 1],
              outputRange: [200, -200],
            }),
            right: this.props.position.interpolate({
              inputRange: [index - 1, index + 1],
              outputRange: [-200, 200],
            }),
          },
        ]}
      >
        {title}
      </Animated.Text>
    );
  }

  render() {
    let state = this.props.navigationState;
    let selected = state.children[state.index];
    while (selected.hasOwnProperty('children')) {
      state = selected;
      selected = selected.children[selected.index];
    }

    const renderLeftButton = selected.renderLeftButton ||
      selected.component.renderLeftButton ||
      this.renderLeftButton;
    const renderRightButton = selected.renderRightButton ||
      selected.component.renderRightButton ||
      this.renderRightButton;
    const renderBackButton = selected.renderBackButton ||
      selected.component.renderBackButton ||
      this.renderBackButton;
    const renderTitle = selected.renderTitle ||
      selected.component.renderTitle ||
      this.props.renderTitle;
    return (
      <Animated.View
        style={[
          styles.header,
          this.props.navigationBarStyle,
          state.navigationBarStyle,
          selected.navigationBarStyle,
        ]}
      >
        {renderTitle ? renderTitle(selected) : state.children.map(this.renderTitle, this)}
        {renderBackButton() || renderLeftButton()}
        {renderRightButton()}
      </Animated.View>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.contextTypes = contextTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
