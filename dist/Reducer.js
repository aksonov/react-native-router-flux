Object.defineProperty(exports,"__esModule",{value:true});exports.default=

createReducer;var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function createReducer(){
return function(state,action){return _navigationStore2.default._router.getStateForAction(action,state);};
}