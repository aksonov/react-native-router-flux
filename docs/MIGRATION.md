## Migrating from 3.x

* `Actions.create` (alternative syntax to define scenes) is not available (for simplicity) - just use `<Router>` as top component for your App. You may wrap it with Redux as well.
* No `duration`/`panHandlers` support - you have to implement custom navigator now instead and pass it as ‘navigator’ prop
https://reactnavigation.org/docs/navigators/custom. You could still pass `panHandlers={null}` to disable gestures or `gesturedEnabled={false}`
* No `component` support for scene containers (that contains children `Scene`) - you have to use custom navigator
* No support for partial hiding of tab bar for some tabs because of react navigation bug (react navigation issue):
https://github.com/react-community/react-navigation/issues/1584
* No possibility to skip animation during reset/replace (react navigation issue):
https://github.com/react-community/react-navigation/issues/1493
* `Switch` is removed - you may use onEnter/onExit handlers for more flexible logic.
* `getSceneStyle` is removed (no needed in v4, you may pass any values to Router now and they will be inherited by all scenes).
* Custom reducer is supported (`createReducer` prop for Router) but Redux actions now are passed directly from React Navigation (‘Navigation/BACK’, ‘Navigation/NAVIGATE’, etc.)
* Use 'replace' instead of `ActionConst.REPLACE` within Scene declaration
* Scenes cannot have both 'component' and 'children'
* Drawer syntax was changed (boolean `drawer` attribute + `contentComponent` for side menu component + `Actions.drawerOpen`/`Actions.drawerClose` to open/close drawer) 
* Modal is 'lightbox' attribute for Scene (used for popups, like Error)
* Container scenes (that has children) cannot have `component` (or it will be considered as child!). If you want to customize containers, use react navigation custom navigators and pass it as `navigator` prop.
* No `position` attribute is supported for custom transitions. For vertical transition add `modal` to parent `Scene`.
* No flux 'focus' actions - use onEnter/onExit handlers instead.
* tabBarSelectedItemStyle is not supported. Instead please use React Navigation TabBar params for tabs Scene: `activeTintColor`, `inactiveTintColor`, etc (https://reactnavigation.org/docs/navigators/tab)
* To make multiple pops you could use `Actions.popTo(sceneName)` where sceneName is name of scene you want to see (it should be not container, i.e. scene with `component`)
* Possible other stuff.
