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

Check out the [mini-tutorial](mini_tutorial.md) for a quick explanation of this package.

## Installation
```
npm i react-native-router-flux --save
```

## Usage
1. In top-level index.js, define your scenes using `Scene` element and pass it to `Router`:
```jsx
import {Actions, Scene, Router} from 'react-native-router-flux';

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
Alternatively you could define all your scenes during compile time and use it later within `Router`:
```jsx
const scenes = Actions.create(
            <Scene key="root">
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="register" component={Register} title="Register"/>
                <Scene key="home" component={Home}/>
            </Scene>
);
///
class App extends React.Component {
    render() {
        return <Router scenes={scenes}/>
    }
}
```

2. In any app screen:
    * `import {Actions} from 'react-native-router-flux'`
    * `Actions.ACTION_NAME(PARAMS)` will call the appropriate action and params will be passed to the scene.
    * `Actions.pop()` will pop the current screen.
    * `Actions.refresh(PARAMS)` will update the properties of the current screen.