# React Native Router (v2.x) [![Join the chat at https://gitter.im/aksonov/react-native-router-flux](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aksonov/react-native-router-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Router for React Native based on [exNavigator](https://github.com/exponentjs/ex-navigator)

## Features
- Define your screens ("routes") and animation transitions in one central location
- Use simple syntax to call transitions anywhere in your code (e.g. `Actions.login`)
- Eliminates the need to pass navigator objects to your screens
- Use a `Schema` to define common properties for a group of screens. For example, you can define a "modal" `Schema` for screens that animate from the bottom of the screen.
- Ability to show/hide navigation bar (see limitations)
- Support for managing a tab bar, using [react-native-tabs](https://github.com/aksonov/react-native-tabs) (see demo)
- Support for nested navigators. For example, each tab can have its own navigator, nested in a root navigator. Transition actions will automatically use the top navigator.

## Installation
```
npm i react-native-router-flux --save
```

## Usage
1. In top-level index.js, define a `Router` and child `Route` elements for your screens.
    * If some of your screens have common attributes, consider defining a `Schema` element to reduce repetition
2. In any app screen:
    * import {Actions} from 'react-native-router-flux'
    * Actions.ACTION_NAME(PARAMS) will call appropriate action and params will be passed to the route

## Configuration

##### Router:
| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| header | object | null | optional header view |
| footer | object | null | optional footer view (e.g. tab bar) |
| hideNavBar | bool | false | hides navigation bar for every route |

##### Route:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| name | string | required | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| component | React.Component | semi-required | The `Component` to be displayed. Not required when defining a nested `Router` or child, see example |
| type | string | optional | Defines how the new screen is added to the navigator stack. One of `push`, `modal`,`actionSheet`,`replace`, `switch`, `reset` `transitionToTop`.  Default is 'push'. `replace` tells navigator to replace current route with new route. `actionSheet` shows Action Sheet popup, you must pass callback as callback function, check Example for details. `modal` type inserts its 'component' after navigator component. It could be used for popup alerts as well for various needed processes before any navigator transitions (like login auth process).`switch` is used for tab screens. `reset` is similar to replace except it unmounts the componets in the navigator stack. `modal` component could be dismissed by using Actions.dismiss() `transitionToTop` will reset router stack ['route.name'] and with animation, if route has `sceneConfig`. eg `<Route name="login" schema="modal" component={Login} type="transitionToTop" />` |
| initial | bool | false | Set to `true` if this is the initial screen |
| title | string | null | The title to be displayed in the navigation bar |
| schema | string | optional | Set this property to the name of a previously defined `Schema` to inherit its properties |
| wrapRouter | bool | false | If `true`, the route is automatically nested in its own `Router`. Useful for modal screens. For type==switch wrapRouter will be true|
| sceneConfig | Navigator.SceneConfigs | optional | Defines the transition animation.  |
| defaultRoute | string | optional | Defines which route to go to if this route is used as a tab and the tab is clicked on when the tab is already selected |
| hideNavBar | bool | false | hides navigation bar for this route |
| hideTabBar | bool | false | hides tab bar for this route (if built-in TabBar component is used as footer for parent Router, check Example)|
| navigationBarStyle | View style |  | optional style override for the navigation bar |
| titleStyle | Text style |  | optional style override for the title element |
| renderTitle | Closure | | optional closure to render the title element |
| barButtonIconStyle | Image style |  | optional style override for icon buttons (e.g. back icon) |
| leftTitle | string | | optional string to display on the left if the previous route does not provide `renderBackButton` prop. `renderBackButton` > `leftTitle` > <previous route's `title`> |
| renderLeftButton | Closure | | optional closure to render the left title / buttons element |
| renderBackButton | Closure | | optional closure to render back text or button if this route happens to be the previous route |
| leftButtonStyle | View style | | optional style override for the container of left title / buttons |
| leftButtonTextStyle | Text style | | optional style override for the left title element |
| rightTitle | string | | optional string to display on the right. `onRight` must be provided for this to appear. |
| renderRightButton | Closure | | optional closure to render the right title / buttons element |
| rightButtonStyle | View style | | optional style override for the container of right title / buttons |
| rightButtonTextStyle | Text style | | optional style override for the right title element |

##### Schema:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| name | string | required | The name of the schema, to be referenced in the route as `schema={"name"}` |
| property | - |  - | A `Schema` can have any property that you want the `Route` to inherit  |


## Example
![launch](https://cloud.githubusercontent.com/assets/1321329/11692367/7337cfe2-9e9f-11e5-8515-e8b7a9f230ec.gif)

```javascript
import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from './components/Register'
import Login from './components/Login'
import Login2 from './components/Login2'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
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

export default class Example extends React.Component {
    render() {
        return (
            <Router hideNavBar={true}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                <Schema name="withoutAnimation"/>
                <Schema name="tab" type="switch" icon={TabIcon} />

                <Route name="launch" component={Launch} initial={true} wrapRouter={true} title="Launch"/>
                <Route name="register" component={Register} title="Register"/>
                <Route name="home" component={Home} title="Replace" type="replace"/>
                <Route name="login" schema="modal">
                    <Router>
                        <Route name="loginModal" component={Login} title="Login" schema="modal"/>
                        <Route name="loginModal2" component={Login2} title="Login2"/>
                    </Router>
                </Route>
                <Route name="error" component={Error} title="Error"  type="modal"/>
                <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                <Route name="tabbar">
                    <Router footer={TabBar} hideNavBar={true} tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}}>
                        <Route name="tab1" schema="tab" title="Tab #1" defaultRoute='tab1_1'>
                            <Router>
                                <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                            </Router>
                        </Route>
                        <Route name="tab2" schema="tab" title="Tab #2" hideNavBar={true}>
                            <Router onPop={()=>{console.log("onPop is called!"); return true} }>
                                <Route name="tab2_1" component={TabView} title="Tab #2_1" />
                                <Route name="tab2_2" component={TabView} title="Tab #2_2" />
                            </Router>
                        </Route>
                        <Route name="tab3" schema="tab" title="Tab #3" component={TabView} hideTabBar={true}/>
                        <Route name="tab4" schema="tab" title="Tab #4" component={TabView} />
                        <Route name="tab5" schema="tab" title="Tab #5" component={TabView} />
                    </Router>
                </Route>
            </Router>
        );
    }
}
```

components/Launch.js (initial screen)

```javascript
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
To display a modal use ```type="modal"``` for your route components.
Modal type inserts its 'component' after navigator component. See the ```Examples``` folder for more details.

Note that **ReactNativeRouterFlux will not provide animations for modals** and you'll need to animate the modal yourself (or use a library)

## Sidebar/Drawer support
You can easily configure react-native-router-flux to handle a sidebar/drawer for specific routes:  
**1.** Create a sidebar/drawer component (you can use both [react-native-drawer](https://github.com/root-two/react-native-drawer) and [react-native-side-menu](https://github.com/react-native-fellowship/react-native-side-menu)) and pass its router props to its children:
```javascript
<DrawerLayout>
   {React.Children.map(children, c => React.cloneElement(c, {route: this.props.route}))}
</DrawerLayout>
```  
**2.** In you router component add the sidebar/drawer and nested routes following this pattern:
```javascript
<Router>
  <Route name="without-drawer"/>
  <Route name="main">
   <Drawer>
      <Router>
        <Route name="with-drawer-a"/>
        <Route name="with-drawer-b"/>
      </Router>
    </Drawer>
  </Route>
</Router>
```

There is **an [example](https://github.com/efkan/rndrawer-implemented-rnrouter)** which is worked together with `react-native-drawer`.

Also here is another complete example of a working drawer using a common app with:
- A session screen that just checks if the user is already logged-in on startup (SessionScreen)
- An auth screen that handles signin/signup (AuthScreen)
- Many other screens that show the true content of the app, all using the sidebar

**SideDrawer.js (I'm using 'react-native-drawer')**
```javascript
import Drawer from 'react-native-drawer'

class SideDrawer extends React.Component {
  render() {
    return (
      <Drawer
        type="overlay"
        content={<SideDrawerContent />}
        tapToClose={true}
        openDrawerOffset={0.2} 
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={{ drawer: drawerStyle, main: mainStyle }}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    )
  }
}
```

**Router.js**
```javascript
const hideNavBar = Platform.OS === 'android'
const paddingTop = Platform.OS === 'android' ? 0 : 8

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Schema
          name='boot'
          sceneConfig={Navigator.SceneConfigs.FadeAndroid}
          hideNavBar={true}
          type='replace'
        />
        <Schema
          name='main'
          sceneConfig={Navigator.SceneConfigs.FadeAndroid}
          hideNavBar={hideNavBar}
        />

        <Route schema='boot' component={SessionScreen} name='session' initial={true} />
        <Route schema='boot' component={AuthScreen} name='auth' />

        <Route name='main' hideNavBar={true} type='reset'>
          <SideDrawer>
            <Router
              sceneStyle={styles.scene}
              navigationBarStyle={styles.navigationBar}
              titleStyle={styles.title}
              barButtonIconStyle={styles.barButtonIcon}
              barButtonTextStyle={styles.barButtonText}
            >
              <Route schema='main' component={PlaceScreen} name='place' title='Places' />
              <Route schema='main' component={PaymentScreen} name='payment' title='Payment' header={Toolbar} />
            </Router>
          </SideDrawer>
        </Route>

      </Router>
    )
  }
}
```

## Redux/Flux support
This component is not opinionated and does not depend on any implementation of Flux or Redux, but you can easily connect it to them.

If 'dispatch' prop is passed to the router, it will be called with current route as `route`, `name` as route name and all route props, check Example for more details.

Also all route actions can be hooked by adding handlers for `Actions.onPush`, `Actions.onReplace`, `Actions.onPop` in your store(s).

Here is an example of connecting the router and its routes to Redux and creating a component aware of being focused:  

**1. Connect a `<Route>` to Redux**  
Connecting a `<Route>` to Redux is easy, instead of:  
```javascript
<Route name="register" component={RegisterScreen} title="Register" />
```
you might write:
```javascript
<Route name="register" component={connect(selectFnForRegister)(RegisterScreen)} title="Register" />
```
You can also simply connect the component itself in its own file like you usually do.  
  
**2. Connect a `<Router>` to Redux**  
If you need to inform Redux of the navigation status (i.e. when you pop a route) just override the `<Router>` component included in `react-native-router-flux` with a connected one:  
```javascript
import ReactNativeRouter, { Actions, Router } from 'react-native-router-flux'
const Router = connect()(ReactNativeRouter.Router) 
```
Now when you use a `<Router>` it will be connected to the store and will trigger the following actions:
- `Actions.BEFORE_ROUTE`
- `Actions.AFTER_ROUTE`
- `Actions.AFTER_POP`
- `Actions.BEFORE_POP`
- `Actions.AFTER_DISMISS`
- `Actions.BEFORE_DISMISS`

Take a look at [this](https://github.com/aksonov/react-native-router-flux/blob/master/Example/Example.js) for an example.

**3. Catch the interested actions in your reducer**  
For this example I have a `global` reducer (where I keep the information needed by all my app) where I set the `currentRoute`:
```javascript
case Actions.AFTER_ROUTE:
case Actions.AFTER_POP:
  return state.set('currentRoute', action.name)
```
Now the reducer will catch every route change and update `global.currentRoute` with the currently focused route.  
You also can do many other interesting things from here, like saving an history of the navigation itself in an array!  

**4. Update your component on focus**  
I'm doing it on `componentDidUpdate` of my component of the route named `payment`.
If `global.currentRoute` is `payment` and the previous `global.currentRoute` was different, then the component has just been focused.
```javascript
  componentDidUpdate(prevProps) {
    const prevRoute = prevProps.global.currentRoute
    const currentRoute = this.props.global.currentRoute
    if (currentRoute === 'payment' && prevRoute !== currentRoute) {
      this.props.actions.doSomething()
    }
  }
```
P.S.: Remember to check `currentRoute === 'payment'`, otherwise you'll start doSomething() on every route change!  

## Limitations
### Nested Routers
* If you are using a tab bar where each tab has its own `Router`, modal screens will have to be presented from the root navigator in order to cover the tab bar. To do this, the modal screen should be defined in the root router, and should have the `wrapRouter={true}` property as in the example below.
```
        <Router>
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Route name="myModal" component={myModal} title="Modal" schema="modal" wrapRouter={true} />
          <Route name="tabbar">
            <Router footer={TabBar}>
              <Route name="tab1" schema="tab" title="Tab 1" component={Tab1}/>
            </Router>
          </Route>
        </Router>
```

##  Inter Routing
### Routing from one nested route to the other
* If you are in one nested route and you want to navigate to a route which is in different parent alltogether, this is what you should follow
```
  import { Actions as NavigationActions } from 'react-native-router-flux'
  .
  .
  .
  .
  <Router>
    <Scene key="route1" hideNavBar type='reset'>
      <Scene initial key='subRoute1' component={SubRoute1Screen} title='SubRoute1' type='reset' />
      <Scene key='subRoute2' component={SubRoute2Screen} title='SubRoute2' />
      <Scene key='subRoute3' component={SubRoute3Screen} title='SubRoute3' />
      <Scene key='subRoute4' component={SubRoute4Screen} title='SubRoute4' />
    </Scene>
    <Scene key='route2'>
      <Scene key='subRoute5'>
        <Scene key='subRoute6' component={SubRoute6Screen} title='SubRoute6' />
        <Scene key='subRoute7' component={SubRoute7Screen} title='SubRoute7' />
      </Scene>
    </Scene>
  </Router>
```
Let's say you are at SubRoute3Screen and you want to navigate to SubRoute7Screen, you have to do the following in SubRoute3Screen:-

NavigationActions.route2();
NavigationActions.subRoute5();
NavigationActions.subRoute7();

