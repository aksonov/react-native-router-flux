# React Native Router [![Backers on Open Collective](https://opencollective.com/react-native-router-flux/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/react-native-router-flux/sponsors/badge.svg)](#sponsors) [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/grade/c6d869e2367a4fb491efc9de228c5ac6)](https://www.codacy.com/app/aksonov-github/react-native-router-flux) [![npm version](https://badge.fury.io/js/react-native-router-flux.svg)](http://badge.fury.io/js/react-native-router-flux) [![CircleCI](https://circleci.com/gh/aksonov/react-native-router-flux.svg?style=svg)](https://circleci.com/gh/aksonov/react-native-router-flux)

[Follow author @PAksonov](https://twitter.com/PAksonov)

Please 🌟 my talk proposal for [ReactiveConf 2017](https://reactiveconf.com/) - [What is RNRF?](https://gist.github.com/aksonov/e2d7454421e44b1c4c72214d14053410)

#### NOTE: v4 (based on [React Navigation](https://reactnavigation.org/)) is in beta. See [this branch](https://github.com/aksonov/react-native-router-flux/tree/v3) and [docs](https://github.com/aksonov/react-native-router-flux/blob/master/README3.md) for v3.

___

* [Example](#try-the-example-app)
* [Motivation](https://gist.github.com/aksonov/e2d7454421e44b1c4c72214d14053410)
* [v4 Features](#v4-features)
* [API](/docs/API.md)
* [Migrating from v3](/docs/MIGRATION.md)
* [Sponsors/Backers/Contributors](#contributors)


Define all your routes in one React component...

```js
const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} title="Login"/>
      <Scene key="register" component={Register} title="Register"/>
      <Scene key="home" component={Home}/>
    </Stack>
  </Router>
);
```

...and navigate from scene to scene with a simple, powerful API

```js
// Login.js

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
git clone https://github.com/aksonov/react-native-router-flux.git
cd react-native-router-flux/Example

# Install dependencies
yarn

# Run it
react-native run-ios
```

## v4 Features
* Based on latest [React Navigation](https://reactnavigation.org) API
* Separate navigation logic from presentation. You may change now navigation state directly from your business logic code - stores/reducers/etc. navigationStore
* Built-in state machine (v3 `Switch` replacement)
  * Each `Scene` with `component` defined can have `onEnter`/`onExit`/`on` handlers.
  * `onEnter`/`on` handler can be async.
  * For 'truthy' return of `onEnter`/`on`, `success` handler (if defined) will be executed
    * if `success` is a string then router will navigate to the `Scene` with that key
  * in case of handler's failure, `failure` prop (if defined) will be run.
  * Combining `onEnter`, `onExit`, `success`, and `failure` makes patterns like authentication, data validation, and conditional transitions simple and intuitive.
* [MobX](https://mobx.js.org/)-friendly: all scenes are wrapped with `observer`. You may subscribe to `navigationStore` (`Actions` in v3) and observe current navigation state. Not applicable to Redux.
* Flexible nav bar customization not currently allowed by React Navigation:
https://github.com/react-community/react-navigation/issues/779
* Drawer support (provided by React Navigation)
* Inheritance of scene attributes allow you to avoid any code/attribute duplications. Adding `rightTitle` to a scene will apply to all child scenes. See example app.
* Access to your app navigations state as simple as `Actions.state`.
* Use `Actions.currentScene` to get name of current scene.

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
