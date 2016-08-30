# API and Configuration

## Available imports
- `Router`
- `Scene`
- `Modal`
- `TabBar`
- `getInitialState`
- `Reducer`
- `DefaultRenderer`
- `Switch`
- `Actions`
- `ActionConst`
- `NavBar`

## Router:
| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| reducer | `function` | | optional user-defined reducer for scenes, you may want to use it to intercept all actions and put your custom logic |
| createReducer | `function` | | function that returns a reducer function for {initialState, scenes} param, you may wrap Reducer(param) with your custom reducer, check Flux usage section below|
| other props | | | all properties that will be passed to all your scenes |
| children | | required (if no scenes property passed)| Scene root element |
| scenes | `object` | optional | scenes for Router created with Actions.create. This will allow to create all actions BEFORE React processing. If you don't need it you may pass Scene root element as children |
| getSceneStyle | `function` | optional | Optionally override the styles for NavigationCard's Animated.View rendering the scene. |
| backAndroidHandler | `function` | optional | Optionally override the handler for `BackAndroid`, return `true` to stay in the app or return `false` to exit the app. Default handler will pop a scene and exit the app at last when the back key is pressed on Android. |
| onBackAndroid | `function` | optional | Get called after back key is pressed and a scene is poped, won't affect the default behavior. |
| onExitApp | `function` | optional | Optionally override the default action after back key is pressed on root scene. Return `true` to stay, or return `false` to exit the app. |

## Scene:

| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| key | `string` | required | Will be used to call screen transition, for example, `Actions.name(params)`. Must be unique. |
| component | `React.Component` | semi-required | The `Component` to be displayed. Not required when defining a nested `Scene`, see example. If it is defined for 'container' scene, it will be used as custom container `renderer` |
| initial | `bool` | false | Set to `true` if this is the initial scene |
| type | `string` | `ActionConst.PUSH` or `ActionConst.JUMP` | Defines how the new screen is added to the navigator stack. One of `ActionConst.PUSH`, `ActionConst.JUMP`, `ActionConst.REPLACE`, `ActionConst.RESET`. If parent container is tabbar (tabs=true), `ActionConst.JUMP` will be automatically set.
| clone | `bool` | | Scenes marked with `clone` will be treated as templates and cloned into the current scene's parent when pushed. See example. |
| passProps | `bool` | false | Pass all own props (except style, key, name, component, tabs) to children. Note that passProps is also passed to children. |

## ActionConst:

We accept shorthand string literal when defining scene type or action params, like:

```javascript
Actions.ROUTE_NAME({type: 'reset'});
<Scene key="myscene" type="replace" >
```

but it will be converted to const value when pass to reducer.
RECOMMENDATION is to always use const instead of string literal for consistency:

```javascript
Actions.ROUTE_NAME({type: ActionConst.RESET});
<Scene key="myscene" type={ActionConst.REPLACE} >
```

| Property | Type | Value | Shorthand |
|-----------|--------|---------|-----------------------------------------|
| ActionConst.JUMP | `string` | 'REACT_NATIVE_ROUTER_FLUX_JUMP' | 'jump' |
| ActionConst.PUSH | `string` | 'REACT_NATIVE_ROUTER_FLUX_PUSH' | 'push' |
| ActionConst.REPLACE | `string` | 'REACT_NATIVE_ROUTER_FLUX_REPLACE' | 'replace' |
| ActionConst.BACK | `string` | 'REACT_NATIVE_ROUTER_FLUX_BACK' | 'back' |
| ActionConst.BACK_ACTION | `string` | 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION' | 'BackAction' |
| ActionConst.POP_TO | `string` | 'REACT_NATIVE_ROUTER_FLUX_POP_TO' | 'popTo' |
| ActionConst.REFRESH | `string` | 'REACT_NATIVE_ROUTER_FLUX_REFRESH' | 'refresh' |
| ActionConst.RESET | `string` | 'REACT_NATIVE_ROUTER_FLUX_RESET' | 'reset' |
| ActionConst.FOCUS | `string` | 'REACT_NATIVE_ROUTER_FLUX_FOCUS' | 'focus' |

### Animation
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| duration | `number` | | optional. acts as a shortcut to writing an `applyAnimation` function with `Animated.timing` for a given duration (in ms). |
| direction | `string` | 'horizontal' | direction of animation horizontal/vertical/leftToRight ('horizontal' will be right to left)|
| animation | `string` | | animation options when transitioning: 'fade' currently only option |
| animationStyle | `function` | | optional interpolation function for scene transitions: `animationStyle={interpolationFunction}` |
| applyAnimation | `function` | | optional if provided overrides the default spring animation |

### Gestures
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| panHandlers | `object` | | optional, provide null to disable swipe back gesture |
| getPanHandlers | `function` | optional | Optionally override the gesture handlers for scene |

### Scene styles
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| sceneStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) | { flex: 1 } | optional style override for the Scene's component |
| getSceneStyle | `function` | optional | Optionally override the styles for NavigationCard's Animated.View rendering the scene.  Receives first argument of `NavigationSceneRendererProps` and second argument of `{hideNavBar,hideTabBar,isActive}` (see Example app). |

### Tabs
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| tabs| `bool` | false | Defines 'TabBar' scene container, so child scenes will be displayed as 'tabs'. If no `component` is defined, built-in `TabBar` is used as renderer. All child scenes are wrapped into own navbar.
| tabBarStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) |  | optional style override for the Tabs component |
| tabBarIconContainerStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) |  | optional style override for the View that contains each tab icon |
| hideTabBar | `bool` | false | hides tab bar for this scene and any following scenes until explicitly reversed (if built-in TabBar component is used as parent renderer)|
| pressOpacity | `number` | 0.2 | the opacity when clicking on the tab |


### Navigation Bar
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| hideNavBar | `bool` | false | hides the navigation bar for this scene and any following scenes until explicitly reversed |
| navigationBarStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) |  | optional style override for the navigation bar |
| navBar | `React.Component` | | optional custom NavBar for the scene. Check built-in NavBar of the component for reference |
| drawerImage | [`Image source`](https://facebook.github.io/react-native/docs/image.html#source) | `'./menu_burger.png'` | Simple way to override the drawerImage in the navBar |

#### Navigation Bar: Title
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| title | `string` | null | The title to be displayed in the navigation bar |
| getTitle | `function` | optional | Optionally closure to return a value of the title based on state |
| renderTitle | `function` | optional | Optionally closure to render the title |
| titleStyle | [`Text style`](https://facebook.github.io/react-native/docs/text.html#style) |  | optional style override for the title element |
| titleOpacity | `string` | optional | Set opacity for the title in navigation bar |
| titleProps | `object` | null | Any other properties to be set on the title component |

#### Navigation Bar: Back button
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| backTitle | `string` | | optional string to display with back button |
| renderBackButton | `function` | | optional closure to render back text or button if this route happens to be the previous route |
| backButtonImage | [`Image source`](https://facebook.github.io/react-native/docs/image.html#source) | `'./back_chevron.png'` | Simple way to override the back button in the navBar |
| backButtonTextStyle | [`Text style`](https://facebook.github.io/react-native/docs/text.html#style) | | optional style override for the back title element |
| hideBackImage | `boolean` | false | no default back button image will be displayed |
| onBack | `function` | Actions.pop | actions for back button |

#### Navigation Bar: Left button
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| leftTitle | `string` | | optional string to display on the left if the previous route does not provide `renderBackButton` prop. `renderBackButton` > `leftTitle` > <previous route's `title`> |
| getLeftTitle | `function` | | optional closure to display on the left if the previous route does not provide `renderBackButton` prop. `renderBackButton` > `getLeftTitle` > <previous route's `title`> |
| renderLeftButton | `function` | | optional closure to render the left title / buttons element |
| onLeft | `function` | | function will be called when left navBar button is pressed |
| leftButtonImage | [`Image source`](https://facebook.github.io/react-native/docs/image.html#source) |  | Image for left button |
| leftButtonIconStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) |  | Image style for left button |
| leftButtonStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) | | optional style override for the container of left title / buttons |
| leftButtonTextStyle | [`Text style`](https://facebook.github.io/react-native/docs/text.html#style) | | optional style override for the left title element |

#### Navigation Bar: Right button
| Property | Type | Default | Description |
|-----------|--------|---------|--------------------------------------------|
| rightTitle | `string` | | optional string to display on the right. `onRight` must be provided for this to appear. |
| getRightTitle | `function` | | optional closure to display on the right. `onRight` must be provided for this to appear. |
| renderRightButton | `function` | | optional closure to render the right title / buttons element |
| onRight | `function` | | function will be called when right navBar button is pressed |
| rightButtonImage | [`Image source`](https://facebook.github.io/react-native/docs/image.html#source) |  | Image for right button |
| rightButtonIconStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) |  | Image style for right button |
| rightButtonStyle | [`View style`](https://facebook.github.io/react-native/docs/view.html#style) | | optional style override for the container of right title / buttons |
| rightButtonTextStyle | [`Text style`](https://facebook.github.io/react-native/docs/text.html#style) | | optional style override for the right title element |
| **...other props** | | | all properties that will be passed to your component instance |
