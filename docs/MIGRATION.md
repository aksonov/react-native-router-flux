## Migrating from 3.x

* No `component` support for scene containers (that contains children `Scene`) - you have to use custom navigators (`navigator` prop) and possibly `contentComponent` (scenes cannot have both 'component' and 'children')
* No `duration`/`panHandlers` support - you have to implement custom navigator now instead and pass it as ‘navigator’ prop
https://reactnavigation.org/docs/navigators/custom. You could still pass `panHandlers={null}` to disable gestures or `gesturedEnabled={false}`
* No support for partial hiding of tab bar for some tabs because of react navigation bug (react navigation issue):
https://github.com/react-community/react-navigation/issues/1584
* No possibility to skip animation during reset/replace (react navigation issue):
https://github.com/react-community/react-navigation/issues/1493
* `Switch` is removed - you may use onEnter/onExit handlers for more flexible logic.
* Drawer syntax was changed (boolean `drawer` attribute + `contentComponent` for side menu component + `Actions.drawerOpen`/`Actions.drawerClose` to open/close drawer) 
* Modal is 'lightbox' attribute for parent Scene now (used for popups, like Error)
* If you have modal animation `modal` for Scene is not working, define separate Scene container with `modal` and put all your modals there, check Example project for details
* No `direction` attribute is supported for custom transitions. For vertical transition add `modal` to parent `Scene`.
* tabBarSelectedItemStyle is not supported. Instead please use React Navigation TabBar params for tabs Scene: `activeTintColor`, `inactiveTintColor`, etc (https://reactnavigation.org/docs/navigators/tab)
* To make multiple pops you could use `Actions.popTo(sceneName)` where sceneName is name of scene you want to see (it should be not container, i.e. scene with `component`)
* Possible other stuff...

Check Example project for this repository
