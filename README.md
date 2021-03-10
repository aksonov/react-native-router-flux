# React Native Router (v4.x) [![Backers on Open Collective](https://opencollective.com/react-native-router-flux/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/react-native-router-flux/sponsors/badge.svg)](#sponsors) [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Codacy Badge](https://api.codacy.com/project/badge/grade/c6d869e2367a4fb491efc9de228c5ac6)](https://www.codacy.com/app/aksonov-github/react-native-router-flux) [![npm version](https://badge.fury.io/js/react-native-router-flux.svg)](http://badge.fury.io/js/react-native-router-flux) [![CircleCI](https://circleci.com/gh/aksonov/react-native-router-flux.svg?style=svg)](https://circleci.com/gh/aksonov/react-native-router-flux)

[Follow author @PAksonov](https://twitter.com/PAksonov)

`react-native-router-flux` is a different API over `react-navigation`. It helps users to define all the routes in one central place and navigate and communicate between different screens in an easy way. But it also means that `react-native-router-flux` inherits all [limitations](https://reactnavigation.org/docs/en/limitations.html) and changes from updated versions.

### IMPORTANT NOTES
#### v5.0.alpha.x is based on React Navigation v5.x (very early alpha, development in progress, help wanted!)

#### v4.2.x is based on [React Navigation v4.x](https://reactnavigation.org/docs/4.x/getting-started)

#### v4.1.0-beta.x is based on [React Navigation v3.x](https://reactnavigation.org/docs/en/3.x/getting-started.html)

#### v4.0.x is based on [React Navigation v2.x]. See [this branch](https://github.com/aksonov/react-native-router-flux/tree/v3) and [docs](https://github.com/aksonov/react-native-router-flux/blob/master/README3.md) for v3 based on deprecated React Native Experimental Navigation API. It is not supported and may not work with latest React Native versions.

#### v4.0.0-beta.x is based on [React Navigation v1.5.x](https://reactnavigation.org/). See [this branch](https://github.com/aksonov/react-native-router-flux/tree/v4.0.0-beta) for this version. It is also not supported and may not work with the latest React Native versions.

---

- [Examples](#try-the-example-apps)
- [Motivation](https://gist.github.com/aksonov/e2d7454421e44b1c4c72214d14053410)
- [v4 Features](#v4-features)
- [API](/docs/API.md)
- [Migrating from v3](/docs/MIGRATION.md)
- [Sponsors/Backers/Contributors](#contributors)

## Getting Started

1. Install native dependencies used by RNRF (see below, https://reactnavigation.org/docs/en/getting-started.html)
2. Install this component

```sh
yarn add react-native-router-flux
```

## install the following libraries first
1. react-native-screens by ( ``` npm install react-native-screens || yarn add react-native-screens ```)
2. react-native-gesture-handler ( ``` npm install react-native-gesture-handler || yarn add react-native-gesture-handler ```)
3. react-native-reanimated (``` npm install react-native-reanimated || yarn add react-native-reanimated ```)
4. react-native-safe-area-context (``` npm install react-native-safe-area-context || yarn add react-native-react-native-safe-area-context ```)
5. @react-native-community/masked-view (``` npm install @react-native-community/masked-view || yarn add @react-native-community/masked-view ```)



## Usage

Define all your routes in one React component...

```jsx
const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} title="Login" />
      <Scene key="register" component={Register} title="Register" />
      <Scene key="home" component={Home} />
    </Stack>
  </Router>
);
```

...and navigate from one scene to another scene with a simple and powerful API.

```jsx
// Login.js

// navigate to 'home' as defined in your top-level router
Actions.home(PARAMS);

// go back (i.e. pop the current screen off the nav stack)
Actions.pop();

// refresh the current Scene with the specified props
Actions.refresh({ param1: 'hello', param2: 'world' });
```

## API

For a full listing of the API, [view the API docs](https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md).

## Try the [example apps](https://github.com/aksonov/react-native-router-flux/tree/master/examples)

![rnrf](https://user-images.githubusercontent.com/3681859/27937441-ef61d932-626b-11e7-885f-1db7dc74b32e.gif)

```sh
# Get the code
git clone https://github.com/aksonov/react-native-router-flux.git
cd react-native-router-flux/examples/[expo|react-native|redux]

# Installing dependencies
yarn

# Run it
yarn start
```

## v4 Features

- Based on latest [React Navigation](https://reactnavigation.org) API
- Separate navigation logic from presentation. You may now change navigation state directly from your business logic code - stores/reducers/etc. navigationStore
- Built-in state machine (v3 `Switch` replacement)
  - Each `Scene` with `component` defined can have `onEnter`/`onExit`/`on` handlers.
  - `onEnter`/`on` handler can be async.
  - For 'truthy' return of `onEnter`/`on`, `success` handler (if defined) will be executed
    - if `success` is a string then router will navigate to the `Scene` with that key
  - in case of handler's failure, `failure` prop (if defined) will be run.
  - Combining `onEnter`, `onExit`, `success`, and `failure` makes patterns like authentication, data validation, and conditional transitions simple and intuitive.
- [MobX](https://mobx.js.org/)-friendly: all scenes are wrapped with `observer`. You may subscribe to `navigationStore` (`Actions` in v3) and observe current navigation state. Not applicable to Redux.
- Flexible Nav bar customization, currently not allowed by React Navigation:
  https://github.com/react-community/react-navigation/issues/779
- Drawer support (provided by React Navigation)
- Inheritance of scene attributes allow you to avoid any code/attribute duplications. Adding `rightTitle` to a scene will apply to all child scenes simultaneously. See example app.
- Access to your app navigations state as simple as `Actions.state`.
- Use `Actions.currentScene` to get name of current scene.

### Helpful tips if you run into some gotchas

## Using Static on Methods with HOCs

- This is just a helpful tip for anyone who use the onExit/onEnter methods as a static method in their Component Class. Please refer to this link https://reactjs.org/docs/higher-order-components.html.

- If your Scene Components are Wrapped in Custom HOCs/ Decorators, then the static onExit/onEnter methods will not work as your Custom HOCs will not copy the static methods over to your Enhanced Component.Use the npm package called hoist-non-react-statics to copy your Component level static methods over to your Enhanced Component.

## Implement onBack from your Scene after declaring it

- If you have a Scene where in you want to make some changes to your Component State when Back button is pressed, then doing this

```jsx
<Scene key={...} component={...} onBack={()=>{/*code*/}}/>
```

will not help.

```jsx
<Scene key={...} component={...} onBack={()=>{/*code*/}} back={true}/>
```

Make sure back = true is passed to your scene, now in your Component's lifecycle add this

```jsx
componentDidMount(){
    InteractionManager.runAfterInteractions(()=> {
        Actions.refresh({onBack:()=>this.changeSomethingInYourComponent()})
    })
}
```

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="https://github.com/aksonov/react-native-router-flux/graphs/contributors"><img src="https://opencollective.com/react-native-router-flux/contributors.svg?width=890" /></a>

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
