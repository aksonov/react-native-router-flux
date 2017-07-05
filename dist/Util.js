Object.defineProperty(exports,"__esModule",{value:true});exports.

deepestExplicitValueForKey=deepestExplicitValueForKey;exports.




























assert=assert;function deepestExplicitValueForKey(navigationState,key){var current=void 0;var selected=navigationState;while({}.hasOwnProperty.call(selected,'children')){if(!selected.tabs){for(var i=0;i<selected.index;i+=1){if(typeof selected.children[i][key]!=='undefined'){current=selected.children[i][key];}}}selected=selected.children[selected.index];if(typeof selected[key]!=='undefined'){current=selected[key];}}if(typeof current==='undefined'){current=navigationState[key];}return current;}function assert(expr,failDescription){
if(!expr){
throw new Error('[react-native-router-flux] '+failDescription);
}
}

var OnEnter=exports.OnEnter='onEnter';
var OnExit=exports.OnExit='onExit';