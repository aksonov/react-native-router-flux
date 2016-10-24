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

Create your store, wrap your routes with the redux `Provider` component and connect your Router.


```jsx
// app.js

import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';
// other imports...

// create store...
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);


class App extends Component {
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
import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class MyComponent extends Component {
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

*Optional opportunity.* Getting access the routes from any component using Context.

```jsx
// components/MyComponent.js
import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import Button from 'react-native-button'

class MyComponent extends React.Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render () {
    const {routes} = this.context;

    return (
      <View>
          <Button onPress={()=>routes.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
          <Button onPress={routes.register}>Go to Register page</Button>
          <Button onPress={routes.back}>Go back</Button>
      </View>
    );
  }
}

export default MyComponent;
```

### About `Key xxx is already defined`

There is no way to prevent `Router` re-render IF you wrap it under a `Provider` AND listen updates from `redux`.
It is a nature by design.

the point how to prevent this, is: **`Router` should render once and just once**
it means:

If you didn't connect to redux at all, it works fine since your `Router` would not be triggered by any of updates from redux.

Also, you can `connect()` `Router` to `redux` to get a `dispatch()` method props but you can NOT listen to another props.

Thus, the architecture would be:

```jsx
import {
    Router,
    Scene,
    Actions,
} from 'react-native-router-flux';


// --- child component can connect and listen to props they want.
const myConnectedMainConponent = connect()(myMainConponent);
const myConnectedLoginConponent = connect()(myLoginConponent);

// --- Create it via Actions.create(), or it will be re-created for each render of your Router
const scenes = Actions.create(
    <Scene key="root">
        <Scene key="login" component={myLoginConponent} />
        <Scene key="main" component={myMainConponent} />
    </Scene>
);

// --- Create connected Router if you want dispatch() method.
// --- Or you can just use vanilla Router
const myConnectedRouter = connect()(Router);

// --- your exported main router
export default class MyExportedRouter extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Provider store={store}>
                <myConnectedRouter scenes={scenes} />
            </Provider>
        );
    }
}
```

**Point Taken:**

1. `Router` should render once and just once ( connect to get dispatch method only or not connect at all )
2. pre create scenes via Actions.create() and pass it into Router
3. move your app main logic into one of the children of Router
