# Simple React Native Routing

#### WARNING: react-native-router-flux v4 is in beta. Go [here](https://github.com/aksonov/react-native-router-flux/tree/3.39.1) for v3.

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
* Built-in state machine (former Switch replacement) - each ‘scene’ has onEnter/onExit handlers.
MobX-powered, all used scenes are wrapped as 'observer' automatically. You may subscribe to navigationStore (former Actions), observe current navigation state, etc. If you are using Redux, skip this.
* Flexible nav bar customization, that is not allowed by react navigation right now:
https://github.com/react-community/react-navigation/issues/779
* Drawer support (react
* 'Lightbox' support (used by popups like Error alert within Example project)

## Breaking changes (compared to v3):
* No duration/panHandlers support - you have to implement custom navigator now instead and pass it as ‘navigator’ prop:
https://reactnavigation.org/docs/navigators/custom
* No support for partial hiding of tab bar for some tabs because of react navigation bug:
https://github.com/react-community/react-navigation/issues/1584
* No possibility to skip animation during reset/replace:
https://github.com/react-community/react-navigation/issues/1493
* `Switch` is removed - you may use onEnter/onExit handlers for more flexible logic.
* `getSceneStyle` is removed (no needed in v4).
* Custom reducer (`createReducer` prop for Router) - Redux actions now are passed from React Navigation (‘Navigation/BACK’, ‘Navigation/NAVIGATE’, etc.)
* Drawer is 'drawer' attribute Scene
* Modal is 'modal' attribute for Scene
* No flux 'focus' actions - use onEnter/onExit handlers instead.
* Possible other stuff.

## Migrating from v3
Coming soon
