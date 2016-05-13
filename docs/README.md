# Documentation

Check out the following pages:

- [Mini-Tutorial](mini_tutorial.md)
- Available Imports
- Example
- Modals
- Redux/Flux
- Tabs
- Custom Navbar
- Switch
- Splitting Up Scenes
- Drawer/Side Menu
- Sub-Scenes
- Configuration/API
  - Router
  - Scene

## Getting Started

Check out the [mini-tutorial](mini_tutorial.md) for a quick walkthrough of the routing system.

## Installation
```
npm i react-native-router-flux --save
```

## Usage
In your top-level `index.js`, define your scenes using the `Scene` component and pass it into the `Router` as children:
```jsx
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
```jsx
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
```jsx
import {Actions} from 'react-native-router-flux'
```
And then:

* `Actions.ACTION_NAME(PARAMS)` will call the appropriate action and params will be passed to the scene.
* `Actions.pop()` will pop the current screen.
* `Actions.refresh(PARAMS)` will update the properties of the current screen.
