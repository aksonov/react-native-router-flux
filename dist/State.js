Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.getActiveStateExceptDrawer=getActiveStateExceptDrawer;exports.










isActiveRoute=isActiveRoute;exports.












getActiveState=getActiveState;exports.







inject=inject;exports.












popPrevious=popPrevious;function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function getActiveStateExceptDrawer(param){var state=param;if(!state.routes){return state;}if(state.routes[state.index].routeName==='DrawerOpen'){return getActiveState(state.routes[0]);}return getActiveState(state.routes[state.index]);}function isActiveRoute(state,routeName){if(state.routeName===routeName){return true;}if(!state.routes){return state.routeName===routeName;}if(state.routes[state.index].routeName==='DrawerOpen'){return isActiveRoute(state.routes[0],routeName);}return isActiveRoute(state.routes[state.index],routeName);}function getActiveState(param,parent){var state=param;if(!state.routes){return _extends({},state,{parent:parent});}return getActiveState(state.routes[state.index],state);}function inject(state,key,index,routes){if(!state.routes){return state;}if(state.key===key){if(routes){return _extends({},state,{routes:routes,index:index});}return _extends({},state,{index:index});}return _extends({},state,{routes:state.routes.map(function(x){return inject(x,key,index,routes);})});}function popPrevious(state){
var activeState=getActiveState(state);
if(activeState.parent&&activeState.parent.index){
var parent=activeState.parent;
var key=parent.key;
var routes=[].concat(_toConsumableArray(parent.routes.slice(0,parent.index-1)),_toConsumableArray(parent.routes.slice(parent.index)));
var newState=inject(state,key,parent.index-1,routes);
return newState;
}
return state;
}