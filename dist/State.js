Object.defineProperty(exports,"__esModule",{value:true});exports.getActiveStateExceptDrawer=getActiveStateExceptDrawer;exports.










isActiveRoute=isActiveRoute;exports.









getActiveState=getActiveState;function getActiveStateExceptDrawer(param){var state=param;if(!state.routes){return state;}if(state.routes[state.index].routeName==='DrawerOpen'){return getActiveState(state.routes[0]);}return getActiveState(state.routes[state.index]);}function isActiveRoute(state,routeName){if(state.routeName===routeName){return true;}if(!state.routes){return state.routeName===routeName;}return isActiveRoute(state.routes[state.index],routeName);}function getActiveState(param){
var state=param;
if(!state.routes){
return state;
}
return getActiveState(state.routes[state.index]);
}