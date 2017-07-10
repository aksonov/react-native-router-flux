import React from 'react';
import {
  Platform,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Actions from './navigationStore';
import _backButtonImage from '../images/back_chevron.png';

export function renderBackButton(state) {
  const textButtonStyle = [
    styles.barBackButtonText,
    state.backButtonTextStyle,
  ];
  const style = [
    styles.backButton,
    state.leftButtonStyle,
  ];
  const buttonImage = state.backButtonImage || _backButtonImage;
  let onPress = state.onBack;
  if (onPress) {
    onPress = onPress.bind(null, state);
  } else {
    onPress = Actions.pop;
  }

  const text = state.backTitle ?
    (<Text style={textButtonStyle}>
      {state.backTitle}
    </Text>)
    : null;

  return (
    <TouchableOpacity
      testID="backNavButton"
      style={{ position: 'absolute', top: 0, left: 0, height: 50, width: 70 }}
      onPress={onPress}
    >
      <View style={style}>
      {buttonImage && !state.hideBackImage && <Image
        source={buttonImage}
        style={[
          styles.backButtonImage,
          state.barButtonIconStyle,
          state.leftButtonIconStyle,
        ]}
      />
      }
      {text}
      </View>
    </TouchableOpacity>
  );
}

export function renderLeftButton(state, wrapBy) {
  let onPress = state.onLeft;
  const buttonImage = state.leftButtonImage;
  const menuIcon = state.drawerIcon;
  const style = [styles.leftButton, state.leftButtonStyle];
  const textStyle = [styles.barLeftButtonText, state.leftButtonTextStyle];
  const leftButtonStyle = [styles.defaultImageStyle, state.leftButtonIconStyle];
  const leftTitle = state.getLeftTitle ? state.getLeftTitle(state) : state.leftTitle;

  if (state.leftButton) {
    let Button = state.leftButton;
    if (wrapBy) {
      Button = wrapBy(Button);
    }
    return (
      <Button
        {...state}
        key={'leftNavBarBtn'}
        testID="leftNavButton"
        style={[...style, ...leftButtonStyle]}
        textStyle={textStyle}
      />
    );
  }

  if (onPress && (leftTitle || buttonImage)) {
    onPress = onPress.bind(null, state);
    return (
      <TouchableOpacity
        key={'leftNavBarBtn'}
        testID="leftNavButton"
        style={style}
        onPress={onPress}
      >
        {leftTitle && <Text style={textStyle}>
          {leftTitle}
        </Text>
        }
        {!leftTitle && buttonImage && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          {menuIcon || <Image
            source={buttonImage}
            style={state.leftButtonIconStyle || styles.defaultImageStyle}
          />
          }
        </View>
        }
      </TouchableOpacity>
    );
  }
  if ((!!state.onLeft ^ !!(leftTitle || buttonImage))) {
    console.warn(
      `Both onLeft and leftTitle/leftButtonImage
            must be specified for the scene: ${state.name}`,
    );
  }
  return null;
}


export function renderRightButton(state, wrapBy) {
  const drawer = null;
  if (!state) {
    return null;
  }

  let onPress = state.onRight;
  let buttonImage = state.rightButtonImage;
  let menuIcon = state.drawerIcon;
  const style = [styles.rightButton, state.rightButtonStyle];
  const textStyle = [styles.barRightButtonText, state.rightButtonTextStyle];
  const rightButtonStyle = [styles.defaultImageStyle, state.rightButtonIconStyle];
  const rightTitle = state.getRightTitle ? state.getRightTitle(state) : state.rightTitle;

  if (state.rightButton) {
    let Button = state.rightButton;
    if (wrapBy) {
      Button = wrapBy(Button);
    }
    return (
      <Button
        {...state}
        key={'rightNavBarBtn'}
        testID="rightNavButton"
        style={style}
        textButtonStyle={textStyle}
      />
    );
  }

  if (!onPress && !!drawer && typeof drawer.toggle === 'function' && drawer.props.side === 'right') {
    buttonImage = state.drawerImage;
    if (buttonImage || menuIcon) {
      onPress = drawer.toggle;
    }
    if (!menuIcon) {
      menuIcon = (
        <Image
          source={buttonImage}
          style={rightButtonStyle}
        />
      );
    }
  }

  if (onPress && (rightTitle || buttonImage)) {
    onPress = onPress.bind(null, state);
    return (
      <TouchableOpacity
        key={'rightNavBarBtn'}
        testID="rightNavButton"
        style={style}
        onPress={onPress}
      >
        {rightTitle && <Text style={textStyle}>
          {rightTitle}
        </Text>
        }
        {buttonImage && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          {menuIcon || <Image
            source={buttonImage}
            style={state.rightButtonIconStyle || styles.defaultImageStyle}
          />
          }
        </View>
        }
      </TouchableOpacity>
    );
  }
  if ((!!state.onRight ^ !!(typeof (rightTitle) !== 'undefined'
    || typeof (buttonImage) !== 'undefined'))) {
    console.warn(
      `Both onRight and rightTitle/rightButtonImage
            must be specified for the scene: ${state.name}`,
    );
  }
  return null;
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#0A0A0A',
    fontSize: 18,
    width: 180,
    alignSelf: 'center',
  },
  titleImage: {
    width: 180,
    alignSelf: 'center',
  },
  titleWrapper: {
    marginTop: 10,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 20,
      },
      android: {
        top: 5,
      },
      windows: {
        top: 5,
      },
    }),
    left: 0,
    right: 0,
  },
  header: {
    backgroundColor: '#EFEFF2',
    paddingTop: 0,
    top: 0,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
      windows: {
        height: 54,
      },
    }),
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 12,
      },
      android: {
        top: 10,
      },
      windows: {
        top: 8,
      },
    }),
    left: 2,
    paddingLeft: 8,
    flexDirection: 'row',
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  rightButton: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 12,
      },
      android: {
        top: 10,
      },
      windows: {
        top: 8,
      },
    }),
    right: 2,
    paddingRight: 8,
  },
  leftButton: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 12,
      },
      android: {
        top: 8,
      },
      windows: {
        top: 8,
      },
    }),
    left: 2,
    paddingLeft: 8,
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
  defaultImageStyle: {
    height: 24,
    resizeMode: 'contain',
  },
});

