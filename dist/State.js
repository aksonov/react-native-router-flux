Object.defineProperty(exports,"__esModule",{value:true});exports.getActiveState=getActiveState;function getActiveState(param){
var state=param;
if(!state.routes){
return state;
}
return getActiveState(state.routes[state.index]);
}