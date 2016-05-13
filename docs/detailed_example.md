## Detailed Example
![launch](https://cloud.githubusercontent.com/assets/1321329/11692367/7337cfe2-9e9f-11e5-8515-e8b7a9f230ec.gif)

```jsx
import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from './components/Register'
import Login from './components/Login'
import Login2 from './components/Login2'
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'
import Error from './components/Error'
import Home from './components/Home'
import TabView from './components/TabView'

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class Example extends React.Component {
    render() {
        return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="register2" component={Register} title="Register2" duration={1}/>
                    <Scene key="home" component={Home} title="Replace" type="replace"/>
                    <Scene key="launch" component={Launch} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
                    <Scene key="login" direction="vertical">
                        <Scene key="loginModal" component={Login} schema="modal" title="Login"/>
                        <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
                    </Scene>
                    <Scene key="tabbar" tabs={true} >
                        <Scene key="tab1"  title="Tab #1" icon={TabIcon} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'white'}}>
                            <Scene key="tab1_1" component={TabView} title="Tab #1_1" onRight={()=>alert("Right button")} rightTitle="Right" />
                            <Scene key="tab1_2" component={TabView} title="Tab #1_2" titleStyle={{color:'black'}}/>
                        </Scene>
                        <Scene key="tab2" initial={true} title="Tab #2" icon={TabIcon}>
                            <Scene key="tab2_1" component={TabView} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
                            <Scene key="tab2_2" component={TabView} title="Tab #2_2"/>
                        </Scene>
                        <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar={true} icon={TabIcon}/>
                        <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={true} icon={TabIcon}/>
                        <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
                    </Scene>
                </Scene>
                <Scene key="error" component={Error}/>
            </Scene>
        </Router>;
    }
}

```

components/Launch.js (initial screen)

```jsx
import React, {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'

class Launch extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={Actions.error('error message')}>Show error popup</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;
```

## Modals
To display a modal use `Modal` as root renderer, so it will render the first element as `normal` scene and all others as popups (when they are pushed), see Example for more details.

## Redux/Flux
This component doesn't depend on any redux/flux library. It uses new React Native Navigation API and provide own reducer for its navigation state.
You may provide your own reducer if needed. To avoid the creation of initial state, you may pass a reducer creator.
Also all actions will pass themselves to Redux dispatch method if it is passed (i.e. if Router is `connect`ed with Redux)

The following example will dispatch the `focus` action when a new scene comes into focus. The current scene will be available to components via the `props.scene` property.

##### Step 1

First create a reducer for the routing actions that will be dispatched by RNRF.

```javascript
// reducers/routes.js

const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case "focus":
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

##### Step 2

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

##### Step 3

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

##### Step 4

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