# API and Configuration

## Available imports
- `Router`
- `Scene`
- `Actions`
- `ActionConst`

## Router:

| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| children |  | required | Scene root element |
| `wrapBy`   | `Function` |  | allows integration of state management schemes like Redux (`connect`) and Mobx (`observer`) |
| `sceneStyle`     | `Style` |  | Style applied to all scenes (optional) |

## Scene:

| Property | Type | Default | Description |
|-----------|----------|----------|--------------------------------------------|
| `key`       | `string` | `required` | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| `type`   | `string` | `push` | Optional type of navigation action. You could use `replace` to replace current scene with this scene |
| `component` | `React.Component` | `semi-required` | The `Component` to be displayed. Not required when defining a nested `Scene`, see example. |
| `navBar` | `React.Component`| | Optional React component to render custom NavBar |
| `headerMode` | `string` | `float` | Specifies how the header should be rendered: `float` (render a single header that stays at the top and animates as screens are changed. This is a common pattern on iOS.), `screen` (each screen has a header attached to it and the header fades in and out together with the screen. This is a common pattern on Android) or `none` (No header will be rendered) |
| `initial`   | `boolean` | `false` | Set to `true` if this is the first scene to display among its sibling `Scene`s |
| `modal`     | `boolean` | `false` |  Defines scene container as 'modal' one, i.e. all children scenes will have bottom-to-top animation. It is applicable only for containers (different from v3 syntax) |
| `clone`     | `boolean` | `false` | Scenes marked with `clone` will be treated as templates and cloned into the current scene's parent when pushed. See example. |
| `onEnter`     | `Function` | | Called when the `Scene` is navigated to. `props` are provided as a function param. Only scenes with 'component' defined is supported |
| `on`     | `Function` | | aka `onEnter` |
| `onExit`     | `Function` | | Called when the `Scene` is navigated away from. Only scenes with 'component' defined is supported |
| `success`     | `Function` | | If `on` returns a "truthy" value then `success` is called. |
| `failure`     | `Function` | | If `on` returns a "falsey" value then `failure` is called. |
| `tabs`     | `boolean` | `false` | load child scenes as [TabNavigator](https://reactnavigation.org/docs/navigators/tab). Other [Tab Navigator  props](https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig) also apply here. |
| `lazy`     | `boolean` | `false` | whether to lazily render tabs as needed as opposed to rendering them upfront |
| `hideTabBar`     | `boolean` | `false` | hide the tab bar (only applies to scenes with `tabs` specified) |
| `tabBarPosition`     | `string` |  | Specifies tabbar position. Defaults to `bottom` on iOS and `top` on Android. |
| `activeTintColor`     | `string` |  | Specifies the active tint color for tabbar icons |
| `tabBarComponent`     | `React.Component` |  | React component to render custom tab bar |
| `swipeEnabled`     | `boolean` | `true` | Enable or disable swiping tabs. |
| `animationEnabled`     | `boolean` | `true` | Enable or disable animating tabs on switch. |
| `showLabel`     | `boolean` | `true`  | Boolean to show or not the tabbar icons labels |
| `drawer`     | `boolean` | `false` | load child scenes inside [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) |
| `drawerImage`     | `Image` |  | Image to substitute drawer 'hamburger' icon, you have to set it together with `drawer` prop |
| `contentComponent`     | `React.Component` |  | Component used to render the content of the drawer (e.g. navigation items). |
| `onLeft`     | `boolean` | `false` | load child scenes as [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) |
| `navTransparent`     | `boolean` | `false` | nav bar background transparency |
| `navigationBarStyle`     | `Style` | | Style applied to nav bar |
| `hideNavBar`     | `boolean` | `false` | hide the nav bar |
| `title`     | `string` |  | Text to be displayed in the center of the nav bar. |
| `renderTitle`     | `React.Component` |  | React component to render title for nav bar |
| `titleStyle`     | `Style` |  | Style applied to the title |
| `onLeft`     | `Function` |  | Called when the left nav bar button is pressed. |
| `onRight`     | `Function` |  | Called when the right nav bar button is pressed. |
| `leftButtonImage`     | `Image` |  | Image to substitute for the left nav bar button |
| `leftButtonTextStyle`     | `Style` |  | Style applied to left button text |
| `rightButtonImage`     | `Image` |  | Image to substitute for the right nav bar button |
| `rightButtonTextStyle`     | `Style` |  | Style applied to right button text |
| `headerBackTitle`     | `string` |  | Specifies the back button title for scene |
| `back`     | `boolean` | `false` | Show a back button on the left side of the nav bar that calls `Actions.pop` on press. |
| all other props     |  |  | Any other props not listed here will be pass on to the specified `Scene`'s `component` |

## Actions

| Property | Type | Default | Description |
|-----------------|----------|----------|--------------------------------------------|
| `[key]`       | `Function` |  | Scenes are "automagically" added as functions on the `Actions` object by `key`. To navigate to a scene, call `Actions.{key}`. The function takes an `Object` which gets passed to the Scene as React props. |
| `pop`       | `Function` |  | Go back to the previous scene by "popping" the current scene off the nav stack |
| `refresh`       | `Function` |  | "Refresh" the current scene. The function takes an `Object` which gets passed to the Scene as React props. |
