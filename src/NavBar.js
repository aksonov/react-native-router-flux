import React from 'react';
import { HeaderBackButton } from 'react-navigation';
import {
  Platform, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import _backButtonImage from '../images/back_chevron.png';

const hitSlop = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
};
export function BackButton(state) {
  const textButtonStyle = [styles.barBackButtonText, state.backButtonTextStyle];
  const style = [styles.backButton, state.leftButtonStyle];
  const buttonImage = state.backButtonImage || _backButtonImage;
  const tintColor = getValue(state.backButtonTintColor, state) || state.tintColor || state.navBarButtonColor || state.headerTintColor;
  let onPress = state.onBack;
  if (onPress) {
    onPress = onPress.bind(null, state);
  } else {
    onPress = () => state.navigation.dispatch(NavigationActions.back());
  }

  // returning react-navigation's back button well styled for ios and android if rnrf4-supported customization
  // is not required
  if (!state.backButtonImage) {
    return <HeaderBackButton onPress={onPress} title={state.backTitle} titleStyle={textButtonStyle} tintColor={tintColor} truncatedTitle={state.truncatedTitle} />;
  }

  const text = state.backTitle ? <Text style={textButtonStyle}>{state.backTitle}</Text> : null;

  return (
    <TouchableOpacity testID="backNavButton" style={styles.backButtonContainer} onPress={onPress}>
      <View style={style}>
        {buttonImage && !state.hideBackImage && <Image source={buttonImage} style={[styles.backButtonImage, state.barButtonIconStyle, state.leftButtonIconStyle, { tintColor }]} />}
        {text}
      </View>
    </TouchableOpacity>
  );
}

export function LeftButton(state) {
  let onPress = state.onLeft;
  let buttonImage = getValue(state.leftButtonImage, state);
  let menuIcon = getValue(state.drawerIcon, state);
  const style = [styles.leftButton, state.leftButtonStyle];
  const leftButtonTextStyle = getValue(state.leftButtonTextStyle, state);
  const leftButtonIconStyle = getValue(state.leftButtonIconStyle, state);
  const leftButtonStyle = [styles.defaultImageStyle, leftButtonIconStyle];
  const leftTitle = state.getLeftTitle ? state.getLeftTitle(state) : getValue(state.leftTitle, state);
  const textColor = getValue(state.leftButtonTintColor, state);
  const tintColor = textColor || state.tintColor || state.navBarButtonColor || state.headerTintColor;
  const textStyle = [styles.barLeftButtonText, tintColor && { color: tintColor }, leftButtonTextStyle, textColor && { color: textColor }];

  if (state.leftButton || state.left) {
    const Button = state.leftButton || state.left;
    return <Button {...state} key="leftNavBarBtn" testID="leftNavButton" style={[...style, ...leftButtonStyle]} textStyle={textStyle} />;
  }

  if (!onPress && !state.hideDrawerButton && (state.drawerImage || menuIcon) && state.drawerPosition !== 'right') {
    buttonImage = state.drawerImage;
    if (buttonImage || menuIcon) {
      onPress = () => state.navigation.dispatch(DrawerActions.openDrawer());
    }
    if (!menuIcon) {
      menuIcon = <Image source={buttonImage} style={[state.leftButtonIconStyle || styles.defaultImageStyle, { tintColor }]} />;
    }
  }

  if (onPress && (leftTitle || buttonImage || menuIcon)) {
    onPress = onPress.bind(null, state);
    return (
      <TouchableOpacity key="leftNavBarBtn" testID="leftNavButton" style={style} onPress={onPress} hitSlop={state.hitSlop || hitSlop}>
        {leftTitle && <Text style={textStyle}>{leftTitle}</Text>}
        {!leftTitle
          && (menuIcon || buttonImage) && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {menuIcon || <Image source={buttonImage} style={[state.leftButtonIconStyle || styles.defaultImageStyle, { tintColor }]} />}
            </View>
        )}
      </TouchableOpacity>
    );
  }
  if (!!state.onLeft ^ !!(leftTitle || buttonImage || menuIcon)) {
    console.warn(`Both onLeft and leftTitle/leftButtonImage
            must be specified for the scene: ${state.name}`);
  }
  return null;
}

function getValue(value, params) {
  return value instanceof Function ? value(params) : value;
}

export function RightButton(state) {
  if (!state) {
    return null;
  }

  let onPress = state.onRight;
  let buttonImage = getValue(state.rightButtonImage, state);
  let menuIcon = state.drawerIcon;
  const style = [styles.rightButton, state.rightButtonStyle];
  const rightButtonTextStyle = getValue(state.rightButtonTextStyle, state);
  const rightButtonIconStyle = getValue(state.rightButtonIconStyle, state);
  const rightButtonStyle = [styles.defaultImageStyle, rightButtonIconStyle];
  const rightTitle = state.getRightTitle ? state.getRightTitle(state) : getValue(state.rightTitle, state);
  const textColor = getValue(state.rightButtonTintColor, state);
  const tintColor = textColor || state.tintColor || state.navBarButtonColor || state.headerTintColor;
  const textStyle = [styles.barRightButtonText, tintColor && { color: tintColor }, rightButtonTextStyle, textColor && { color: textColor }];

  if (state.rightButton || state.right) {
    const Button = state.rightButton || state.right;
    return <Button {...state} key="rightNavBarBtn" testID="rightNavButton" style={style} textButtonStyle={textStyle} />;
  }

  if (!onPress && !state.hideDrawerButton && state.drawerImage && state.drawerPosition === 'right') {
    buttonImage = state.drawerImage;
    if (buttonImage || menuIcon) {
      onPress = () => state.navigation.dispatch(DrawerActions.openDrawer());
    }
    if (!menuIcon) {
      menuIcon = <Image source={buttonImage} style={[rightButtonStyle, { tintColor }]} />;
    }
  }

  if (onPress && (rightTitle || buttonImage)) {
    onPress = onPress.bind(null, state);
    return (
      <TouchableOpacity key="rightNavBarBtn" testID="rightNavButton" style={style} onPress={onPress} hitSlop={state.hitSlop || hitSlop}>
        {rightTitle && <Text style={textStyle}>{rightTitle}</Text>}
        {!rightTitle
          && buttonImage && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              {menuIcon || <Image source={buttonImage} style={[state.rightButtonIconStyle || styles.defaultImageStyle, { tintColor }]} />}
            </View>
        )}
      </TouchableOpacity>
    );
  }
  if (!!state.onRight ^ !!(typeof rightTitle !== 'undefined' || typeof buttonImage !== 'undefined')) {
    console.warn(`Both onRight and rightTitle/rightButtonImage
            must be specified for the scene: ${state.routeName}`);
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
  },
  header: {
    backgroundColor: '#EFEFF2',
    paddingTop: 0,
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
  },
  backButton: {
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
    right: 2,
    paddingRight: 8,
  },
  leftButton: {
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
  backButtonContainer: {
    height: 50,
    width: 70,
  },
  backButtonImage: {
    ...Platform.select({
      android: {
        marginTop: 5,
      },
    }),
    width: 13,
    height: 21,
  },
  defaultImageStyle: {
    height: 24,
    resizeMode: 'contain',
  },
});
