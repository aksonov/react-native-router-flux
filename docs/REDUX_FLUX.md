# React Native MobX
 This component is the base for [react-native-mobx](https://github.com/aksonov/react-native-mobx) that provides replacement for Redux/Flux without any boilerplate using [MobX](https://mobxjs.github.io/mobx/).
 
# React Native Reactive
 [react-native-reactive](https://github.com/aksonov/react-native-reactive) is another reactive alternative with [usage of Calmm-JS](https://github.com/calmm-js/documentation)

# Redux/Flux
This component doesn't depend on any redux/flux library. It uses new React Native Navigation API and provide own reducer for its navigation state.
You may provide your own reducer if needed. To avoid the creation of initial state, you may pass a reducer creator.
Also all actions will pass themselves to Redux dispatch method if it is passed (i.e. if Router is `connect`ed with Redux)

The following example will dispatch the `focus` action when a new scene comes into focus. The current scene will be available to components via the `props.scene` property.

### Step 1

First create a reducer for the routing actions that will be dispatched by RNRF.

```javascript
// reducers/routes.js

import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    // ...other actions

    default:
      return state;
  }
}
```

### Step 2

Combine this reducer with the rest of the reducers from your app.

```javascript
// reducers/index.js

import { combineReducers } from 'redux';
import routes from './routes';
// ... other reducers

export default combineReducers({
  routes,
  // ... other reducers
});

```

### Step 3

Create your store, wrap your routes with the redux `Provider` component and connect your Router


```jsx
// app.js

import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';
// other imports...

// create store...
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);


class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
            // your scenes here
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
```

### Step 4

Now you can access the current scene from any connected component.

```jsx
// components/MyComponent.js
import React, { PropTypes, Text } from 'react-native';
import { connect } from 'react-redux';

class MyComponent extends React.Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    return (
      <Text>
        The current scene is titled {this.props.routes.scene.title}.
      </Text>
    );
  }
}

export default connect(({routes}) => ({routes}))(MyComponent);
```
