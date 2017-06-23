import React from 'react';
import {observable, computed, toJS} from 'mobx';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import navigationStore from './navigationStore';
import Scene from './Scene';
import { assert } from './Util';

import {TabNavigator, DrawerNavigator, StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
// import StackNavigator from './components/nav/navigators/StackNavigator';
// import TabNavigator from './components/nav/navigators/TabNavigator';
// import DrawerNavigator from './components/nav/navigators/DrawerNavigator';
// import NavigationActions from './components/nav/NavigationActions';
// import addNavigationHelpers from './components/nav/addNavigationHelpers';
const reservedKeys = [
  'navigate',
  'currentState',
  'refresh',
  'dispatch',
  'push',
  'setParams',
  'back',
  'pop'
];

function filterParam(data) {
  if (data.toString() !== '[object Object]') {
    return {data};
  }
  const proto = (data || {}).constructor.name;
  // avoid passing React Native parameters
  if (!data || (proto !== 'Object')) {
    return {};
  }
  return data;
}

function getValue(value, params) {
  return value instanceof Function ? value(params) : value;
}

function createNavigationOptions({title, hideNavBar, hideTabBar, backTitle, right, left, headerStyle}) {
  return ({navigation, screenProps}) => {
    if (hideTabBar) {
      return {
        tabBarVisible: false
      };
    }
    if (hideNavBar) {
      return {
        header: null
      };
    }

    return {
      title: getValue((navigation.state.params && navigation.state.params.title) || title, {...navigation.state.params, ...screenProps}),
      headerBackTitle: getValue((navigation.state.params && navigation.state.params.backTitle) || backTitle, {...navigation.state.params, ...screenProps}),
      headerRight: getValue((navigation.state.params && navigation.state.params.right) || right, {...navigation.state.params, ...screenProps}),
      headerLeft: getValue((navigation.state.params && navigation.state.params.left) || left, {...navigation.state.params, ...screenProps}),
      headerStyle: getValue((navigation.state.params && navigation.state.params.headerStyle || headerStyle), {...navigation.state.params, ...screenProps}),
    }
  }
}

@observer
class Renderer extends React.Component {
  render() {
    const Component = this.props.router.screen;
    return <Component navigation={addNavigationHelpers({state: this.props.router.state, dispatch: this.props.router.dispatch})}/>
  }
}

// @autobind
// export default class Router {
//   _names = {};
//   _scenes = null;
//   _converted = {};
//   _root = null;
//   _rootKey;
//   @observable screen;
//   @observable _state;
//   @computed get state() {
//     return toJS(this._state);
//   }
//
//   create(props) {
//     this.screen = null;
//     this._state = null;
//     try {
//       console.log("CREATE SCENES", this._scenes, this.screen);
//       this.screen = this.convertScene(this._root, this._rootKey).screen;
//       this.dispatch(NavigationActions.init());
//       return props => <Renderer router={this}/>
//     } catch (e) {
//       console.log("ERROR:", e);
//     }
//
//   }
//
//   constructor(scenes = {}) {
//     this._scenes = scenes;
//     for (const key of Object.keys(scenes)) {
//       const scene = scenes[key];
//       if (scene.initial) {
//         if (this._root) {
//           throw `initial must be unique: ${this._root}, ${scene}`;
//         } else {
//           if (!scene.children) {
//             throw `Root scene "${key}" must have children`;
//           }
//           this._root = scene;
//           this._rootKey = key;
//         }
//       }
//       if (reservedKeys.indexOf(key) !== -1) {
//         throw `Scene name cannot be reserved word: ${key}`;
//       }
//       if (!scene.component && !scene.children) {
//         throw `component or children property should be defined for scene '${key}'`;
//       }
//
//       if (!this[key]) {
//         // a bit of magic ;)
//         this[key] = new Function('actions', `return function ${key}(params){ actions.push('${key}', params)}`)(this);
//         this._names[this[key]] = key;
//       }
//     }
//
//     if (!this._root) {
//       throw 'No root scene is defined, please set initial property to true for root scene';
//     }
//     //setTimeout((()=>this.init()));
//   }
//
//   convertScene(scene, key) {
//     if (!key) {
//       throw `key cannot be null for scene ${JSON.stringify(scene)}`;
//     }
//     const {children, component, hideNavBar, modal, ...props} = scene;
//     let screen = component;
//     if (!screen) {
//       const children = this._getChildren(scene);
//       if (scene.tabs) {
//         screen = TabNavigator(children, scene);
//       } else if (scene.drawer) {
//         screen = DrawerNavigator(children, scene);
//       } else {
//
//         screen = StackNavigator(children, {
//           mode: modal ? 'modal' : 'card',
//           initialRouteParams: children[this._names[scene.children()[0]]]
//         });
//       }
//     }
//     this._converted[key] = {screen, navigationOptions, ...props};
//     if (hideNavBar) {
//       this._converted[key].navigationOptions = () => ({header: null});
//     }
//     return this._converted[key];
//   }
//
//   _getChildren(scene) {
//     if (!scene.children) {
//       return scene;
//     }
//     const children = scene.children();
//     if (!Array.isArray(children)) {
//       throw `Scene ${scene.key} children() is not Array`;
//     }
//     const res = {};
//     for (const f of children) {
//       if (!this._names[f] || !this._scenes[this._names[f]]) {
//         throw `Cannot found children ${JSON.stringify(f)} for scene '${JSON.stringify(scene)}`;
//       }
//       const name = this._names[f];
//       res[name] = this.convertScene(this._scenes[name], name);
//     }
//     return res;
//   }
//
//   dispatch(action) {
//     this._state = this.screen.router.getStateForAction(action, this._state);
//   }
//
//   currentState(state) {
//     if (!state) {
//       state = this._state;
//     }
//     if (!state.routes) {
//       return state;
//     } else {
//       return this.currentState(state.routes[state.index]);
//     }
//   }
//
//   push(routeName, params) {
//     this.dispatch(NavigationActions.navigate({
//       routeName,
//       params: {...this._converted[routeName], ...filterParam(params)}
//     }));
//   }
//
//   refresh(params) {
//     const key = this.currentState(this.state).key;
//     this.dispatch(NavigationActions.setParams({key, params}));
//   }
//
//   pop() {
//     this.dispatch(NavigationActions.back());
//   }
//
// }

@observer
@autobind
class App extends React.Component {

  render() {
    const AppNavigator = this.props.navigator;
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.store.dispatch,
        state: this.props.store.state,
      })} />
    );
  }
}

// @autobind
// export default class Router {
//   navigator;
//   store;
//
//   constructor(scenes){
//     this.navigator = StackNavigator(scenes);
//     this.store = new NavigationStore(this.navigator.router);
//   }
//
//   app(){
//     return () => <App navigator={this.navigator} store={this.store} />
//
//   }
// }

function processScene(scene: Scene, inheritProps) {
  assert(scene.props, 'props should be defined');
  if (!scene.props.children) {
    throw `children property should be defined`;
  }
  const res = {};
  const order = [];
  const {tabs, modal, drawer, ...parentProps} = scene.props;
  const children = !Array.isArray(parentProps.children) ? [parentProps.children] : parentProps.children;
  let initialRouteName, initialRouteParams;
  for (const child of children) {
    assert(child.key, `key should be defined for ${child}`);
    if (reservedKeys.indexOf(child.key) !== -1) {
      throw `Scene name cannot be reserved word: ${key}`;
    }
    const {component, ...props} = child.props;
    res[child.key] = {
      screen: component || processScene(child, parentProps),
      navigationOptions: createNavigationOptions(props)
    };

    // a bit of magic, create all 'actions' inside navigationStore
    if (!navigationStore[child.key]) {
      navigationStore[child.key] = new Function('actions', `return function ${child.key}(params){ actions.push('${child.key}', params)}`)(navigationStore);
    }
    order.push(child.key)
    if (child.props.initial || !initialRouteName) {
      initialRouteName = child.key;
      initialRouteParams = child.props;
    }
  }
  const mode = modal ? 'modal' : 'card';
  if (tabs) {
    return TabNavigator(res, {initialRouteParams, order, navigationOptions: createNavigationOptions(parentProps) });
  } else if (drawer) {
    return DrawerNavigator(res);
  } else {
    return StackNavigator(res, { mode, initialRouteParams, initialRouteName, navigationOptions: createNavigationOptions(parentProps) });
  }
}

export default (scene: Scene) => {
  const AppNavigator = processScene(scene);
  navigationStore.router = AppNavigator.router;

  return observer(()=><AppNavigator navigation={addNavigationHelpers({
    dispatch: navigationStore.dispatch,
    state: navigationStore.state,
  })} />);
}
