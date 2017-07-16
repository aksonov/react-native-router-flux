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

## Scene:

| Property | Type | Default | Description |
|-----------|----------|----------|--------------------------------------------|
| `key`       | `string` | required | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| `component` | `React.Component` | semi-required | The `Component` to be displayed. Not required when defining a nested `Scene`, see example. |
| `initial`   | `boolean` | false | Set to `true` if this is the first scene to display among its sibling `Scene`s |
| `clone`     | `boolean` | false | Scenes marked with `clone` will be treated as templates and cloned into the current scene's parent when pushed. See example. |
| `on`     | `Function` | | aka `onEnter`. Called when the `Scene` is navigated to. `props` are provided as a function param |
| `onExit`     | `Function` | | Called when the `Scene` is navigated away from. |
| `success`     | `Function` | | If `on` returns a "truthy" value then `success` is called. |
| `failure`     | `Function` | | If `on` returns a "falsey" value then `failure` is called. |
| `tabs`     | `boolean` | false | load child scenes as [TabNavigator](https://reactnavigation.org/docs/navigators/tab). Other [Tab Navigator  props](https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig) also apply here. |
| `hideTabBar`     | `boolean` | false | hide the tab bar (only applies to scenes with `tabs` specified) |
| `drawer`     | `boolean` | false | load child scenes inside [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) |
| `contentComponent`     | `React.Component` |  | Component used to render the content of the drawer (e.g. navigation items). |
| `onLeft`     | `boolean` | false | load child scenes as [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) |
| `navTransparent`     | `boolean` | false | nav bar background transparency |
| `hideNavBar`     | `boolean` | false | hide the nav bar |
| `title`     | `string` |  | Text to be displayed in the center of the nav bar. |
| `onLeft`     | `Function` |  | Called when the left nav bar button is pressed. |
| `onRight`     | `Function` |  | Called when the right nav bar button is pressed. |
| `leftButtonImage`     | `Image` |  | Image to substitute for the left nav bar button |
| `rightButtonImage`     | `Image` |  | Image to substitute for the right nav bar button |
| `modal`     | `boolean` | false |  |
| `back`     | `boolean` | false | Show a back button on the left side of the nav bar that calls `Actions.pop` on press. |
| all other props     |  |  | Any other props not listed here will be pass on to the specified `Scene`'s `component` |

## Actions

| Property | Type | Default | Description |
|-----------------|----------|----------|--------------------------------------------|
| `[key]`       | `Function` |  | Scenes are "automagically" added as functions on the `Actions` object by `key`. To navigate to a scene, call `Actions.{key}`. The function takes an `Object` which gets passed to the Scene as React props. |
| `pop`       | `Function` |  | Go back to the previous scene by "popping" the current scene off the nav stack |
| `refresh`       | `Function` |  | "Refresh" the current scene. The function takes an `Object` which gets passed to the Scene as React props. |
