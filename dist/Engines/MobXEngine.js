Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _desc,_value,_class,_descriptor,_descriptor2,_descriptor3;var _mobx=require('mobx');
var _native=require('mobx-react/native');function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0});}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key];});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true;}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc;},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined;}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null;}return desc;}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');}var

StateManager=(_class=function(){function StateManager(){var _this=this;_classCallCheck(this,StateManager);this.
stateChangeHandler=null;this.
reducer=null;this.
getActiveState=null;_initDefineProp(this,'currentScene',_descriptor,this);_initDefineProp(this,'prevScene',_descriptor2,this);_initDefineProp(this,'currentParams',_descriptor3,this);this.












getState=function(){return _this.state;};this.

setupHandlers=function(reducer,setChangedHandler,getActiveState){
_this.reducer=reducer;
_this.stateChangeHandler=setChangedHandler;
_this.getActiveState=getActiveState;
};this.

dispatch=function(cmd){
var newState=_this.reducer(_this._state,cmd);

if(!newState)return;

var activeState=_this.getActiveState(newState);

_this._state=newState;
_this.currentScene=activeState.routeName;
_this.currentParams=activeState.params;

_this.stateChangeHandler(newState);
};}_createClass(StateManager,[{key:'state',get:function get(){var scene=this.currentScene;var params=this.currentParams;return this._state;}}]);return StateManager;}(),(_descriptor=_applyDecoratedDescriptor(_class.prototype,'currentScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor2=_applyDecoratedDescriptor(_class.prototype,'prevScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor3=_applyDecoratedDescriptor(_class.prototype,'currentParams',[_mobx.observable],{enumerable:true,initializer:null})),_class);exports.default=


{
appHoc:_native.observer,
stateManager:new StateManager()};