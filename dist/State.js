Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.getActiveStateExceptDrawer=getActiveStateExceptDrawer;exports.










isActiveRoute=isActiveRoute;exports.












getActiveState=getActiveState;exports.







inject=inject;function getActiveStateExceptDrawer(param){var state=param;if(!state.routes){return state;}if(state.routes[state.index].routeName==='DrawerOpen'){return getActiveState(state.routes[0]);}return getActiveState(state.routes[state.index]);}function isActiveRoute(state,routeName){if(state.routeName===routeName){return true;}if(!state.routes){return state.routeName===routeName;}if(state.routes[state.index].routeName==='DrawerOpen'){return isActiveRoute(state.routes[0],routeName);}return isActiveRoute(state.routes[state.index],routeName);}function getActiveState(param,parent){var state=param;if(!state.routes){return _extends({},state,{parent:parent});}return getActiveState(state.routes[state.index],state);}function inject(state,key,index){
if(!state.routes){
return state;
}
if(state.key===key){
return _extends({},state,{index:index});
}
return _extends({},state,{routes:state.routes.map(function(x){return inject(x,key,index);})});
}