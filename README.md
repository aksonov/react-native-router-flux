# React Native Router [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/grade/c6d869e2367a4fb491efc9de228c5ac6)](https://www.codacy.com/app/aksonov-github/react-native-router-flux) [![npm version](https://badge.fury.io/js/react-native-router-flux.svg)](http://badge.fury.io/js/react-native-router-flux)

Router for React Native based on new React Native Navigation API.

## Documentation

- [Mini-Tutorial](docs/MINI_TUTORIAL.md)
- [API and Configuration](docs/API_CONFIGURATION.md)
  - Available Imports
  - Router API
  - Scene API
- [Detailed Example](docs/DETAILED_EXAMPLE.md)
- [Reactive/Redux/Flux](docs/REDUX_FLUX.md)
- [Other Info](docs/OTHER_INFO.md)
  - Modals
  - Tabbar
  - Custom navbar
  - Switch
  - Splitting Scenes
  - Drawer (side-menu)
  - Sub-Scenes
- [Changelog](docs/CHANGELOG.md)
- [Migrating from 2.x](docs/MIGRATION.md)

## Features

`react-native-router-flux` is a routing package that allows you to:

- Define scene transitions in one central location
- Without having to pass navigator objects around, and allow you to
- Call transitions anywhere in your code with a simple syntax (e.g. `Actions.login({username, password})` or `Actions.profile({profile})` or even `Actions.profile(123)` - all params will be part of `this.props` for given Scene component).

### New Features and Highlights

- **Highly Customizable Navigation Bar** - Show/hide the navbar depending on Scene or even the state of a Scene (e.g. Edit/Save navbar for edit mode).

- **Tab Bar Support** using [react-native-tabs](https://github.com/aksonov/react-native-tabs) (see Example app).

- **Nested Navigators** (e.g. Each tab can have its own navigator, nested in a root navigator).

- **Custom Scene Renderers** for action sheet, native TabBarIOS or anything else. See built-in `Modal` renderer (to display popups) for example. *Call for PRs!* let's build some custom renderers for ActionSheet, Drawer, etc. Let's make an awesome library! Currently, if you want to use Action Sheets you'll need to use a 3rd party module.

- **Dynamic Routing** allows you to choose which scene to render depending on application state (see the `Switch` renderer, useful for authentication).

- **Bring Your Own Reducer** for navigation state.

- **Reset History Stack** - The new [`reset`](docs/API_CONFIGURATION.md#scene)type for clearing the history stack and eliminating the navbar back button.

- **More Powerful State Control** - Support for having different states while on the same screen. For example, "View My Account" could allow in-place editing of fields and "Save", "Cancel" navigation bar buttons should appear.

## Getting Started

Check out the [mini-tutorial](docs/MINI_TUTORIAL.md) for a quick walkthrough of the routing system.

## Supported configurations

While ExperimentalNavigation API is not stable, RNRF uses separated fork of ExperimentalNavigation API to avoid dependency from React Native version.
So 3.30 version of RNRF doesn't depend from React Native version, but from that fork (now it is based on 0.26 API).
You could use this component with RN0.26+

## Installation
```
npm i react-native-router-flux --save
```

## Usage
In your top-level `index.js`, define your scenes using the `Scene` component and pass it into the `Router` as children:
```js
import {Scene, Router} from 'react-native-router-flux';

class App extends React.Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login"/>
        <Scene key="register" component={Register} title="Register"/>
        <Scene key="home" component={Home}/>
      </Scene>
    </Router>
  }
}
```
Alternatively, you could define all of your scenes during compile time and use it later within `Router`:
```js
import {Actions, Scene, Router} from 'react-native-router-flux';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login"/>
    <Scene key="register" component={Register} title="Register"/>
    <Scene key="home" component={Home}/>
  </Scene>
);

/* ... */

class App extends React.Component {
  render() {
    return <Router scenes={scenes}/>
  }
}
```

On any Scene, you can also call the following functions by first importing the `Actions` object:
```js
import {Actions} from 'react-native-router-flux'
```
And then:

* `Actions.ACTION_NAME(PARAMS)` will call the appropriate action and params will be passed to the scene.
* `Actions.pop()` will pop the current screen. It accepts following optional params:
  * `{popNum: [number]}` allows to pop multiple screens at once 
  * `{refresh: {...propsToSetOnPreviousScene}}` allows to refresh the props of the scene that it pops back to
* `Actions.refresh(PARAMS)` will update the properties of the current screen.

## Production Apps using react-native-router-flux
+ GuavaPass.com ([iOS](https://itunes.apple.com/en/app/guavapass-one-pass-fitness/id1050491044?l=en&mt=8), Android) - offers convenient access to top classes at boutique fitness studios across Asia.
+ Epic Fail Videos ([iOS](https://itunes.apple.com/us/app/epic-fail-videos-best-fail/id1115219339), [Android](https://play.google.com/store/apps/details?id=com.hazuu.epicfailvideos)) - The best Fail Videos Collection, never miss a laugh with your friends!
+ Junk Free ([iOS](https://itunes.apple.com/us/app/junk-free-by-junk-free-june/id1109940159)) - A simple way to find, share, and save recipes, workouts, and other healthy content with your friends, family and workmates. 

## Support
Thanks to all who submitted PRs to 2.x release. If you like the component and want to support it, feel free to donate any amount or help with issues.
