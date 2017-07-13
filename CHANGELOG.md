# Change Log

## 4.0.0-beta.8
- Fix: ‘clone’ scenes declared at the end were not visible for scenes declared above
- Enhancement: If component has static navigationOptions return it instead of RNRF generated options
- Enhancement: Allow all navBar properties (title, right, left, rightButtonImage, onRight, etc.) be defined as static functions/values of Scene component
- Fix: Actions.refresh was broken because navigationStore doesn’t allow the same scene after state change
- Enhancement: fix ESLint errors for tests
- Fix: avoid re-render of all scenes during navigation state change (#2018)
- Support rightButtonTextStyle and leftButtonTextStyle, avoid reset them to default values after push (after push from Login to Login2, "Cancel" became blue again)
- Fix: Support passing navbar attributes (like onRight/onLeft/leftTitle/rightTitle) via `Actions.refresh`
- Fix: postinstall somewhere doesn't work with npm (#2008)


## 4.0.0-beta.7

- Fix: Mobx enabled useStrict (#1994)
- Improvement: Support Actions.popTo(sceneName) (#1987)
- Fix: Support v3 syntax `panHandlers={null}` to disable gestures for back transition. You may also pass `gesturesEnabled={false}` (#2002)
- Fix: Support for renderTitle, drawerImage, navigationBarTitleImage, navigationBarTitleImageStyle props for `Scene` (#1991)
- Fix: Pass drawerPosition, drawerOptions, drawerWidth and other Scene params to react-navigation DrawerNavigator
- Fix: Pass all container scene props to StackNavigator config
- Fix: ESLint formatting

