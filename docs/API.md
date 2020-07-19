# API and Configuration

## Available imports
- [`Router`](#router)
- [`Scene`](#scene)
- [`Tabs`](#tabs-tabs-or-scene-tabs)
- [`Stack`](#stack-stack)
- [`Tabbed Scene`](#tab-scene-child-scene-within-tabs)
- [`Drawer`](#drawer-drawer-or-scene-drawer)
- [`Modal`](#modals-modal-or-scene-modal)
- [`Lightbox`](#lightbox-lightbox)
- [`Actions`](#actions)
- [`NavigationStore`](#navigationstore)
- [`ActionConst`](#actionconst)

## Router:

| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| `backAndroidHandler`     | `Function` |  | Allows custom control of hardwareBackPress in Android (optional). For more info check [BackHandler](https://facebook.github.io/react-native/docs/backhandler.html).  |
| `children` |  | semi-required | Scene root element (required if `navigator` is not set) |
| `navigator`   | `Class` |  | Application navigator with all Scenes created by `Actions.create` - it is altenative way to create Router, mostly used for Redux integration (see ReduxExample for more details) |
| `onStateChange`   | `Function` |  | function to be called every time when navigation state is changed. Useful for mobx stores to change observables (set scene to `Actions.currentScene`, etc.) |
| `sceneStyle`     | `Style` |  | Style applied to all scenes (optional) |
| `uriPrefix`     | `string` |  | A uri prefix to strip from incoming urls for deep linking. For example, if you wanted to support deep linking from `www.example.com/user/1234/`, then you could pass `example.com` to only match paths against `/user/1234/`. |
| `wrapBy`   | `Function` |  | function to wrap each Scene component and nav bar buttons - allows easy MobX integration (by passing `observer`) |
| `navigationStore` | `NavigationStore` | If you don't want to use singleton `Actions`, you can pass a custom `new NavigationStore()` as prop to Router |

## Scene:
The basic routing component for this router, all `<Scene>` components require a `key` prop that must be unique. A parent `<Scene>` must have a `component` as a `prop` as it will act as a grouping component for its children.

All properties of type `React.Component` will receive the same properties available on the Scene.

| Property | Type | Default | Description |
|-----------|----------|----------|--------------------------------------------|
| `key`       | `string` | `required` | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| `path`       | `string` |  | Will be used to match against incoming deep links and pull params. For example, the path `/user/:id/` would specify to call the Scene's action with params `{ id: 1234 }` from the url `/user/1234/`. Should adhere to widely accepted uri templating standard https://tools.ietf.org/html/rfc6570 |
| `component` | `React.Component` | `semi-required` | The `Component` to be displayed. Not required when defining a nested `Scene`, see example. |
| `back`     | `boolean` | `false` | If it is `true` back button is displayed instead of left/drawer button defined by upper container. |
| `backButtonImage`     | `string` | | Image source to substitute for the nav back button |
| `backButtonTextStyle` | `Style` |  | Style applied to back button text |
| `backButtonTintColor`     | `string` | | Custom back button tint color |
| `backTitle` | `string` |  | Specifies the back button title for scene |
| `backTitleEnabled` | `boolean` |  | allows you to force back button titles to either be rendered or not (if you disagree with defaults for your platform and layout preset) |
| `clone`     | `boolean` | `false` | Scenes marked with `clone` will be treated as templates and cloned into the current scene's parent when pushed. See example. |
| `contentComponent`     | `React.Component` |  | Component used to render the content of the drawer (e.g. navigation items). |
| `drawer`     | `boolean` | `false` | load child scenes inside [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) |
| `drawerLockMode` | enum('unlocked', 'locked-closed', 'locked-open')  |  | If a child of a drawer, specifies the [lock mode of the drawer](https://facebook.github.io/react-native/docs/drawerlayoutandroid.html#drawerlockmode) |
| `failure` | `Function` | | If `on` returns a "falsey" value then `failure` is called. |
| `headerMode` | `string` | `float` | Specifies how the header should be rendered: `float` (render a single header that stays at the top and animates as screens are changed. This is a common pattern on iOS.), `screen` (each screen has a header attached to it and the header fades in and out together with the screen. This is a common pattern on Android) or `none` (No header will be rendered) |
| `headerLayoutPreset` | `string` | iOS: `center` Android: `left` | Change layout preset from header to be able to center text in some cases where it would be misaligned. |
| `hideBackImage`     | `boolean` | `false` | hide back image |
| `hideNavBar`     | `boolean` | `false` | hide the nav bar |
| `init`     | `boolean` | `false` | If it is `true` back button will not be displayed |
| `initial`   | `boolean` | `false` | Set to `true` if this is the first scene to display among its sibling `Scene`s |
| `leftButtonIconStyle`     | `Style` |  | Style applied to left button Image |
| `leftButtonImage`     | `Image` |  | Image to substitute for the left nav bar button |
| `leftButtonStyle`     | `Style` |  | Style applied to left button |
| `leftButtonTextStyle`     | `Style` |  | Style applied to left button text |
| `modal`     | `boolean` | `false` |  Defines scene container as 'modal' one, i.e. all children scenes will have bottom-to-top animation. It is applicable only for containers (different from v3 syntax) |
| `navBar` | `React.Component`| | Optional React component to render custom NavBar |
| `navBarButtonColor` | `string` | | Set the color of the back button in the navBar |
| `navigationBarStyle`     | `Style` | | Style applied to nav bar |
| `navigationBarTitleImage` | `Object` | | The `Image` source that overrides the `title` in the navbar the image in the center of the navbar |
| `navigationBarTitleImageStyle` | `object` | | Styles to apply to `navigationBarTitleImage` |
| `navTransparent`     | `boolean` | `false` | nav bar background transparency |
| `on`     | `Function` | | aka `onEnter` |
| `onBack`     | `Function` |  | Called when the back button is pressed. |
| `onEnter`     | `Function` | | Called when the `Scene` is navigated to. `props` are provided as a function param. Only scenes with 'component' defined is supported. Your component class may also have `onEnter` function |
| `onExit`     | `Function` | | Called when the `Scene` is navigated away from. Only scenes with 'component' defined is supported. Your component class may also have `onExit` function |
| `onLeft`     | `Function` |  | Called when the left nav bar button is pressed. |
| `onRight`     | `Function` |  | Called when the right nav bar button is pressed. |
| `renderBackButton` | `React.Component` | | React component to render back button |
| `renderLeftButton` | `React.Component` | | React component to render as the left button |
| `renderRightButton` | `React.Component` | | React component to render as the right button |
| `renderTitle`     | `React.Component` |  | React component to render title for nav bar |
| `rightButtonImage`     | `Image` |  | Image to substitute for the right nav bar button |
| `rightButtonStyle`     | `Style` |  | Style applied to right button image |
| `rightButtonTextStyle`     | `Style` |  | Style applied to right button text |
| `rightTitle` | `string` |  | Specifies the right button title for scene |
| `success`     | `Function` | | If `on` returns a "truthy" value then `success` is called. |
| `tabs`     | `boolean` | `false` | load child scenes as [TabNavigator](https://reactnavigation.org/docs/navigators/tab). Other [Tab Navigator  props](https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig) also apply here. |
| `title`     | `string` |  | Text to be displayed in the center of the nav bar. |
| `titleStyle`     | `Style` |  | Style applied to the title |
| `type`   | `string` | `push` | Optional type of navigation action. You could use `replace` to replace current scene with this scene |
| all other props     |  |  | Any other props not listed here will be pass on to the specified `Scene`'s `component` |

## Tabs (`<Tabs>` or `<Scene tabs>`)
Can use all `props` listed above in `<Scene>` as `<Tabs>` is syntatic sugar for `<Scene tabs={true}>`.

| Property | Type | Default | Description |
|-----------------|----------|----------|--------------------------------------------|
| `activeBackgroundColor` | `string` |  | Specifies the active background color for the tab in focus |
| `activeTintColor`     | `string` |  | Specifies the active tint color for tabbar icons |
| `backToInitial`     | `boolean` | `false` | Back to initial screen on focused tab if tab icon was tapped. If your intention is to manage navigation from `tabBarOnPress`, do not set this prop `true`. Both props defined will make the `tabBarOnPress` passed to be wrapped and called in conjunction with the default handlers from tabbar. |
| `hideTabBar`     | `boolean` | `false` | hide the tab bar |
| `inactiveBackgroundColor` | `string` |  | Specifies the inactive background color for the tabs not in focus |
| `inactiveTintColor`     | `string` |  | Specifies the inactive tint color for tabbar icons |
| `indicatorStyle`     | `object` |  | Override the style for active tab indicator. |
| `labelStyle` | `object` | | Overrides the styles for the tab label |
| `lazy`     | `boolean` | `false` | Won't render/mount the tab scene until the tab is active |
| `showLabel`     | `boolean` | `true`  | Boolean to show or not the tabbar icons labels |
| `tabBarComponent`     | `React.Component` |  | React component to render custom tab bar |
| `tabBarOnPress`     | `function` | | Custom tab bar icon press. |
| `tabBarPosition`     | `string` |  | Specifies tabbar position. Defaults to `bottom` on iOS and `top` on Android. |
| `tabBarStyle` | `object` | | Override the tabbar styles |
| `tabStyle` | `object` | | Override the style for an individual tab of the tabbar |
| `upperCaseLabel`     | `boolean` | `true` | Whether to make label uppercase, default is true. |
| `wrap`     | `boolean` | `true` | Wrap each scene with own navbar automatically (if it is not another container). |

## Custom Tab Bar Component
To implement a custom tab bar, import your component and assign it to the `tabBarComponent` prop in `<Tabs>`.
```jsx
// ... import components
<Tabs
  key="tabBar"
  tabBarComponent={CustomTabBar}
>
  <Scene key="tab1" component={TabOne} title="Tab1"/>
  <Scene key="tab2" component={TabTwo} title="Tab2"/>
</Tabs>
```
Sample code for a custom tab bar component that will navigate to scene when tab is clicked:
```jsx
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class CustomTabBar extends React.Component {
  render() {
    const { state } = this.props.navigation;
    const activeTabIndex = state.index;

    return (
      <View>
        {
          state.routes.map(element => (
            <TouchableOpacity key={element.key} onPress={() => Actions[element.key]()}>
              <Text>{element.key.toUpperCase()}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}
```

## LegacyTabs (`<LegacyTabs>` or `<Scene tabs={true} legacy={true}>`)
Can use all `props` listed above in `<Scene>` as `<LegacyTabs>` is syntatic sugar for `<Scene tabs={true} legacy={true}>`.

| Property | Type | Default | Description |
|-----------------|----------|----------|--------------------------------------------|
| `activeBackgroundColor` | `string` |  | Specifies the active background color for the tab in focus |
| `activeTintColor`     | `string` |  | Specifies the active tint color for tabbar icons |
| `animationEnabled`     | `boolean` | `true` | Enable or disable tab swipe animation. |
| `backToInitial`     | `boolean` | `false` | Back to initial screen on focused tab if tab icon was tapped. |
| `hideTabBar`     | `boolean` | `false` | hide the tab bar |
| `inactiveBackgroundColor` | `string` |  | Specifies the inactive background color for the tabs not in focus |
| `inactiveTintColor`     | `string` |  | Specifies the inactive tint color for tabbar icons |
| `indicatorStyle`     | `object` |  | Override the style for active tab indicator. |
| `labelStyle` | `object` | | Overrides the styles for the tab label |
| `lazy`     | `boolean` | `false` | Won't render/mount the tab scene until the tab is active |
| `showLabel`     | `boolean` | `true`  | Boolean to show or not the tabbar icons labels |
| `swipeEnabled`     | `boolean` | `false` | Enable or disable swiping tabs. |
| `tabBarComponent`     | `React.Component` |  | React component to render custom tab bar |
| `tabBarOnPress`     | `function` | | Custom tab bar icon press. |
| `tabBarPosition`     | `string` |  | Specifies tabbar position. Defaults to `bottom` on iOS and `top` on Android. |
| `tabBarStyle` | `object` | | Override the tabbar styles |
| `tabStyle` | `object` | | Override the style for an individual tab of the tabbar |
| `upperCaseLabel`     | `boolean` | `true` | Whether to make label uppercase, default is true. |
| `wrap`     | `boolean` | `true` | Wrap each scene with own navbar automatically (if it is not another container). |


## Stack (`<Stack>`)
A component to group Scenes together for its own stack based navigation. Using this will create a separate navigator for this stack, so expect two navbars to appear unless you add `hideNavBar`.

## Tab Scene (child `<Scene>` within `Tabs`)
A `Scene` that is a direct child of `Tabs` and can use all `props` listed above in `Scene`,

| Property | Type | Default | Description |
|-----------------|----------|----------|--------------------------------------------|
| `icon` | `component` | `undefined` | a React Native component to place as a tab icon
| `tabBarLabel` | `string` | | The string to override a tab label |

## Drawer (`<Drawer>` or `<Scene drawer>`)
Can use all `prop` as listed in `Scene` as `<Drawer>`, syntatic sugar for `<Scene drawer={true}>`

| Property | Type | Default | Description |
|---|---|---|---|
| `drawerIcon` | `React.Component` |  | Arbitrary component to be used for drawer 'hamburger' icon, you have to set it together with `drawer` prop |
| `drawerImage` | `Image` |  | Image to substitute drawer 'hamburger' icon, you have to set it together with `drawer` prop |
| `drawerPosition` | `string`  | `left` | Determines whether the drawer is on the right or the left. Keywords accepted are `right` and `left` |
| `drawerWidth` | `number`  |  | The width, in pixels, of the drawer (optional)|
| `hideDrawerButton` | `boolean` | `false` | Boolean to show or not the drawerImage or drawerIcon |


## Modals (`<Modal>` or `<Scene modal>`)
To implement a modal, you must use `<Modal>` as the root scene in your `Router`. The `Modal` will render the first scene (should be your true root scene) normally, and all following
To display a modal use `<Modal>` as root renderer, so it will render the first element as `normal` scene and all others as popups (when they are pushed).

Example:
In the example below, the `root` Scene is nested within a `<Modal>`, since it is the first nested `Scene`, it will render normally. If one were to `push` to `statusModal`, `errorModal` or `loginModal`, they will render as a `Modal` and by default will pull up from the bottom of the screen. It is important to note that currently the `Modal` does not allow for transparent backgrounds.

```jsx
//... import components
<Router>
  <Modal>
    <Scene key="root">
      <Scene key="screen1" initial={true} component={Screen1} />
      <Scene key="screen2" component={Screen2} />
    </Scene>
    <Scene key="statusModal" component={StatusModal} />
    <Scene key="errorModal" component={ErrorModal} />
    <Scene key="loginModal" component={LoginModal} />
  </Modal>
</Router>
```

## Lightbox (`<Lightbox>`)
Lightbox is a component used to render a component on top of the current `Scene`. Unlike modal, it will allow for resizing and transparency of the background.

Example:
In the example below, the `root` Scene is nested within a `<Lightbox>`, since it is the first nested `Scene`, it will render normally. If one were to `push` to `loginLightbox`, they will render as a `Lightbox` and by default will lay on top of the current `Scene` allowing for transparent backrounds.

```jsx
//... import components
<Router>
  <Lightbox>
    <Scene key="root">
      <Scene key="screen1" initial={true} component={Screen1} />
      <Scene key="screen2" component={Screen2} />
    </Scene>

    {/* Lightbox components will lay over the screen, allowing transparency*/}
    <Scene key="loginLightbox" component={loginLightbox} />
  </Lightbox>
</Router>
```

## Actions
This `Object` is the main utility is to provide navigation features to your application. Assuming your `Router` and `Scenes` are configured properly, use the properties listed below to navigate between scenes. Some offer the added functionality to pass React `props` to the navigated scene.

These can be used directly, for example, `Actions.pop()` will dispatch correspond action written in the source code, or, you can set those constants in scene type, when you do Actions.main(), it will dispatch action according to your scene type or the default one.

| Property | Type | Parameters | Description |
|-----------------|----------|----------|--------------------------------------------|
| `[key]` | `Function` | `Object` | The `Actions` object "automagically" uses the `Scene`'s `key` prop in the `Router` to navigate. To navigate to a scene, call `Actions.key()` or `Actions[key].call()`. |
| `create` | `React.Element` | `(rootScene: Scene, props: Object, wrapBy: Function)` | pass `Scene` to create your app navigator and the Props the Router should receive. It is alternative router creation method mostly used for Redux integration |
| `currentScene` | `String` | | Returns the current scene that is active |
| `drawerClose` | `Function` | | Closes the `Drawer` if applicable |
| `drawerOpen` | `Function` | | Opens the `Drawer` if applicable |
| `jump` | `Function` | `(sceneKey: String, props: Object)` | used to switch to a new tab. For `Tabs` only. |
| `pop` | `Function` | | Go back to the previous scene by "popping" the current scene off the nav stack |
| `popTo` | `Function` | `(sceneKey: String, props: Object)` | Pops the navigation stack until the `Scene` with the specified key is reached. |
| `push` | `Function` | `(sceneKey: String, props: Object)` | Pushes the scene to the stack, performing a transition to the new scene. |
| `ref` | `Object` | | Allow access to component instance through it's ref on `onEnter` and `onExit` events in the `Scene` |
| `refresh` | `Function` | `(props: Object)` | Reloads the current scene by loading new `props` into the `Scene` |
| `replace` | `Function` | `(sceneKey: String, props: Object)` |  Pops the current scene from the stack and pushes the new scene to the navigation stack. *No transition will occur. |
| `reset` | `Function` | `(sceneKey: String, props: Object)` | Clears the routing stack and pushes the scene into the first index. *No transition will occur.* |

If you're having problem accessing `Actions.ref.your_component_ref`, try checking if it is `undefined` first before accessing it's values, so it can access the reference after the component is mounted. An example:
```
onEnter={() => {
if(Actions.refs.your_component_ref !== undefined) { 
  //now you can access it's properties without trouble
  Actios.refs.your_component_ref.selector.props.someCoolFunction();
  }
}}
```

### NavigationStore

`NavigationStore` is the class that `Actions` is an instance of. In other words, `Actions` is the singleton instance of `NavigationStore` — but if you prefer, you can instantiate a `NavigationStore` on your own and pass it to `Router` explicitly.

## ActionConst
Type constants to determine `Scene` transitions, These are **PREFERRED** over typing their values manually as these are subject to change as the project is updated.

| Property | Type | Value | Shorthand |
|-----------------|----------|----------|--------------------------------------------|
| `ActionConst.ANDROID_BACK` | `string` | 'REACT_NATIVE_ROUTER_FLUX_ANDROID_BACK' | *N/A* |
| `ActionConst.BACK_ACTION` | `string` | 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION' | `pop` |
| `ActionConst.BACK` | `string` | 'REACT_NATIVE_ROUTER_FLUX_BACK' | `pop` |
| `ActionConst.BLUR` | `string` | 'REACT_NATIVE_ROUTER_FLUX_BLUR' | *N/A* |
| `ActionConst.FOCUS` | `string` | 'REACT_NATIVE_ROUTER_FLUX_FOCUS' | *N/A* |
| `ActionConst.JUMP` | `string` | 'REACT_NATIVE_ROUTER_FLUX_JUMP' | `jump` |
| `ActionConst.POP_TO` | `string` | 'REACT_NATIVE_ROUTER_FLUX_POP_TO' | `popTo` |
| `ActionConst.PUSH_OR_POP` | `string` | 'REACT_NATIVE_ROUTER_FLUX_PUSH_OR_POP' | `push` |
| `ActionConst.PUSH` | `string` | 'REACT_NATIVE_ROUTER_FLUX_PUSH' | `push` |
| `ActionConst.REFRESH` | `string` | 'REACT_NATIVE_ROUTER_FLUX_REFRESH' | `refresh` |
| `ActionConst.REPLACE` | `string` | 'REACT_NATIVE_ROUTER_FLUX_REPLACE' | `replace` |
| `ActionConst.RESET` | `string` | 'REACT_NATIVE_ROUTER_FLUX_RESET' | `reset` |

## Universal and Deep Linking
#### Use Case
- Consider a web app and mobile app pairing for a social network, which might have a url `https://thesocialnetwork.com/profile/1234/`.
- If we were building both a web app and a mobile app, we'd like to be able to express that uri scheme across platforms with the path `/profile/:id/`.
- On the web, we might want `React-Router` to to open up our `<Profile />` component with the `props` `{ id: 1234 }`.
- On mobile, if we've correctly set up our Android/iOS environment to launch our application and open our RNRF `<Router />`, then we also want to navigate to our mobile `<Profile />` scene with the `params` ` { id: 1234 }`

#### Usage
```javascript
<Router uriPrefix={'thesocialnetwork.com'}>
  <Scene key="root">
     <Scene key={'home'} component={Home} />
     <Scene key={'profile'} path={"/profile/:id/"} component={Profile} />
     <Scene key={'profileForm'} path={"/edit/profile/:id/"} component={ProfileForm} />
  </Scene>
</Router>
```

If a user clicks on `http://thesocialnetwork.com/profile/1234/` on their device, they'll open the `<Router />` and then call `Actions.profile({ id: 1234 })`
