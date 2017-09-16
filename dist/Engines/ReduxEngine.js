Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();exports.









































navReducer=navReducer;exports.










navMiddleware=navMiddleware;var _reactRedux=require('react-redux');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var StateManager=function(){function StateManager(store){var _this=this;_classCallCheck(this,StateManager);this.stateChangeHandler=null;this.reducer=null;this.reduxDispatch=null;this.setupHandlers=function(reducer,setChangedHandler){_this.reducer=reducer;_this.stateChangeHandler=setChangedHandler;};this.dispatch=function(cmd){_this.reduxDispatch(cmd);};this.reduxDispatch=store.dispatch;}_createClass(StateManager,[{key:'getState',value:function getState(props){return props.state;}}]);return StateManager;}();var stateManagerInstance=null;function createEngine(store){stateManagerInstance=new StateManager(store);return{appHoc:(0,_reactRedux.connect)(mapStateToProps),stateManager:stateManagerInstance};}function mapStateToProps(state){return{state:state.nav};}function navReducer(state,cmd){var newState=stateManagerInstance!==null&&typeof stateManagerInstance.reducer==='function'?stateManagerInstance.reducer(!state||state.index===undefined?null:state,cmd):null;if(!newState)return state||{};return newState;}function navMiddleware(_ref){var getState=_ref.getState;
return function(next){return function(action){
var result=next(action);

stateManagerInstance.stateChangeHandler(getState());

return result;
};};
}exports.default=

createEngine;