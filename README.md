# React Native Router [![Backers on Open Collective](https://opencollective.com/react-native-router-flux/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/react-native-router-flux/sponsors/badge.svg)](#sponsors) [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/grade/c6d869e2367a4fb491efc9de228c5ac6)](https://www.codacy.com/app/aksonov-github/react-native-router-flux) [![npm version](https://badge.fury.io/js/react-native-router-flux.svg)](http://badge.fury.io/js/react-native-router-flux) [![CircleCI](https://circleci.com/gh/aksonov/react-native-router-flux.svg?style=svg)](https://circleci.com/gh/aksonov/react-native-router-flux)

[![NPM](https://nodei.co/npm/react-native-router-flux.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-router-flux/)  

[Follow author @PAksonov](https://twitter.com/PAksonov)

Please 🌟 my proposal talk for ReactiveConf 2017 [What is RNRNF?](https://gist.github.com/aksonov/e2d7454421e44b1c4c72214d14053410) 

#### Go [here](https://github.com/aksonov/react-native-router-flux/tree/v3) for v3. Docs could be found [here](https://github.com/aksonov/react-native-router-flux/blob/master/README3.md)

___

Define all your routes in one place...

```js
class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login"/>
          <Scene key="register" component={Register} title="Register"/>
          <Scene key="home" component={Home}/>
        </Scene>
      </Router>
    );
  }
}
```

...and navigate from scene to scene with a simple, powerful API

```js
// login.js

// navigate to 'home' as defined in your top-level router
Actions.home(PARAMS)

// go back (i.e. pop the current screen off the nav stack)
Actions.pop()

// refresh the current Scene with the specified props
Actions.refresh({param1: 'hello', param2: 'world'})
```


## Try the example app

![rnrf](https://user-images.githubusercontent.com/3681859/27937441-ef61d932-626b-11e7-885f-1db7dc74b32e.gif)

```bash
# Get the code
git clone git@github.com:aksonov/react-native-router-flux.git`
cd react-native-router-flux/Example

# Install dependencies
yarn

# Run it
react-native run-ios
```

## v4 Features
* Based on latest [React Navigation](https://reactnavigation.org) API
* Separate navigation logic from presentation. You may change now navigation state directly from your business logic code - stores/reducers/etc. navigationStore
* Built-in state machine (v3 `Switch` replacement) - each ‘scene’ could have onEnter/onExit handlers. onEnter handler could be async. For successful termination of onEnter, `success` handler (if defined) will be executed (if `success` is string then router will navigation to that Scene), in case of handler's failure `failure` (if defined) will be run. It will allow to build authentication, data validation and conditional transitions in very easy way.
* MobX-powered, all used scenes are wrapped as 'observer' automatically. You may subscribe to navigationStore (former Actions), observe current navigation state, etc. If you are using Redux, skip this.
* Flexible nav bar customization, that is not allowed by react navigation right now:
https://github.com/react-community/react-navigation/issues/779
* Drawer support (provided by reactnavigation)
* Inheritance of scene attributes allow you to avoid any code/attribute duplications. If you send rightTitle it will be shown in all children.
* Access to your app navigations state as simple as `Actions.state`, use `Actions.currentScene` to get name of current scene.

## Breaking changes (compared to v3):
* `Actions.create` (alternative syntax to define scenes) is not available (for simplicity) - just use `<Router>` as top component for your App. You may wrap it with Redux as well.
* No `duration`/`panHandlers` support - you have to implement custom navigator now instead and pass it as ‘navigator’ prop
https://reactnavigation.org/docs/navigators/custom. You could still pass `panHandlers={null}` to disable gestures or `gesturedEnabled={false}`
* No `component` support for scene containers (that contains children `Scene`) - you have to use custom navigator
* No support for partial hiding of tab bar for some tabs because of react navigation bug (react navigation issue):
https://github.com/react-community/react-navigation/issues/1584
* No possibility to skip animation during reset/replace (react navigation issue):
https://github.com/react-community/react-navigation/issues/1493
* `Switch` is removed - you may use onEnter/onExit handlers for more flexible logic.
* `getSceneStyle` is removed (no needed in v4, you may pass any values to Router now and they will be inherited by all scenes).
* Custom reducer is supported (`createReducer` prop for Router) but Redux actions now are passed directly from React Navigation (‘Navigation/BACK’, ‘Navigation/NAVIGATE’, etc.)
* Drawer is 'drawer' attribute Scene
* Modal is 'lightbox' attribute for Scene (used for popups, like Error)
* Container scenes (that has children) cannot have `component` (or it will be considered as child!). If you want to customize containers, use react navigation custom navigators and pass it as `navigator` prop.
* No `position` attribute is supported for custom transitions. For vertical transition add `modal` to parent `Scene`.
* No flux 'focus' actions - use onEnter/onExit handlers instead.
* tabBarSelectedItemStyle is not supported. Instead please use React Navigation TabBar params for tabs Scene: `activeTintColor`, `inactiveTintColor`, etc (https://reactnavigation.org/docs/navigators/tab)
* Possible other stuff.

## Migrating from v3
Coming soon

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/react-native-router-flux/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/react-native-router-flux#backer)]

<a href="https://opencollective.com/react-native-router-flux#backers" target="_blank"><img src="https://opencollective.com/react-native-router-flux/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/react-native-router-flux#sponsor)]

<a href="https://opencollective.com/react-native-router-flux/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-native-router-flux/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-native-router-flux/sponsor/9/avatar.svg"></a>


