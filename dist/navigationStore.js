Object.defineProperty(exports,"__esModule",{value:true});exports.supportedActions=exports.ActionMap=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _ActionMap,_supportedActions,_desc,_value,_class,_descriptor,_descriptor2,_descriptor3,_descriptor4;var _mobx=require('mobx');
var _reactNavigation=require('react-navigation');
var _ActionConst=require('./ActionConst');var ActionConst=_interopRequireWildcard(_ActionConst);
var _Util=require('./Util');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0});}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key];});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true;}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc;},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined;}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null;}return desc;}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var ActionMap=exports.ActionMap=(_ActionMap={
jump:ActionConst.JUMP,
push:ActionConst.PUSH,
replace:ActionConst.REPLACE,
back:ActionConst.BACK,
BackAction:ActionConst.BACK_ACTION,
popAndReplace:ActionConst.POP_AND_REPLACE,
popTo:ActionConst.POP_TO,
refresh:ActionConst.REFRESH,
reset:ActionConst.RESET,
focus:ActionConst.FOCUS,
pushOrPop:ActionConst.PUSH_OR_POP,
androidBack:ActionConst.ANDROID_BACK},_defineProperty(_ActionMap,
ActionConst.JUMP,ActionConst.JUMP),_defineProperty(_ActionMap,
ActionConst.PUSH,ActionConst.PUSH),_defineProperty(_ActionMap,
ActionConst.REPLACE,ActionConst.REPLACE),_defineProperty(_ActionMap,
ActionConst.BACK,ActionConst.BACK),_defineProperty(_ActionMap,
ActionConst.BACK_ACTION,ActionConst.BACK_ACTION),_defineProperty(_ActionMap,
ActionConst.POP_AND_REPLACE,ActionConst.POP_AND_REPLACE),_defineProperty(_ActionMap,
ActionConst.POP_TO,ActionConst.POP_TO),_defineProperty(_ActionMap,
ActionConst.REFRESH,ActionConst.REFRESH),_defineProperty(_ActionMap,
ActionConst.RESET,ActionConst.RESET),_defineProperty(_ActionMap,
ActionConst.FOCUS,ActionConst.FOCUS),_defineProperty(_ActionMap,
ActionConst.PUSH_OR_POP,ActionConst.PUSH_OR_POP),_defineProperty(_ActionMap,
ActionConst.ANDROID_BACK,ActionConst.ANDROID_BACK),_ActionMap);


var supportedActions=exports.supportedActions=(_supportedActions={},_defineProperty(_supportedActions,
ActionConst.PUSH,_reactNavigation.NavigationActions.NAVIGATE),_defineProperty(_supportedActions,
ActionConst.JUMP,_reactNavigation.NavigationActions.NAVIGATE),_defineProperty(_supportedActions,
ActionConst.REPLACE,_reactNavigation.NavigationActions.RESET),_defineProperty(_supportedActions,
ActionConst.BACK,_reactNavigation.NavigationActions.BACK),_defineProperty(_supportedActions,
ActionConst.REFRESH,_reactNavigation.NavigationActions.BACK),_defineProperty(_supportedActions,
ActionConst.RESET,_reactNavigation.NavigationActions.RESET),_supportedActions);

function filterParam(data){
if(data.toString()!=='[object Object]'){
return{data:data};
}
var proto=(data||{}).constructor.name;

if(!data||proto!=='Object'){
return{};
}
return data;
}

var createAction=function createAction(type){return function(){var payload=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return _extends({
type:type},
payload);};};var



NavigationStore=(_class=function(){_createClass(NavigationStore,[{key:'state',get:function get()






{
return(0,_mobx.toJS)(this._state);
}},{key:'router',set:function set(

router){
this._router=router;
this.dispatch(_reactNavigation.NavigationActions.init());
},get:function get()
{
return this._router;
}}]);

function NavigationStore(){var _this=this;_classCallCheck(this,NavigationStore);this._router=null;this.states={};this.reducer=null;_initDefineProp(this,'_state',_descriptor,this);_initDefineProp(this,'currentScene',_descriptor2,this);_initDefineProp(this,'prevScene',_descriptor3,this);this.
















































nextState=function(state,cmd){return _this.reducer?_this.reducer(state,cmd):_this._router.getStateForAction(cmd,state);};this.

dispatch=function(cmd){
_this.setState(_this.nextState(_this.state,cmd));
};_initDefineProp(this,'setState',_descriptor4,this);this.











run=function(){for(var _len=arguments.length,params=Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){params[_key-3]=arguments[_key];}var type=arguments.length>0&&arguments[0]!==undefined?arguments[0]:ActionConst.PUSH;var routeName=arguments[1];var actions=arguments[2];
var res={};
for(var _iterator=params,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var param=_ref;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
if(supportedActions[type]){
_this.dispatch(createAction(supportedActions[type])({routeName:routeName,index:0,actions:actions,params:res}));
}else if(type===ActionConst.POP_TO){
var nextScene='';
var newState=_this._state;
var currentState=_this._state;
var currentScene=_this.currentScene;
while(nextScene!==currentScene&&newState&&nextScene!==routeName){
newState=_this.nextState(currentState,_reactNavigation.NavigationActions.back());
if(newState){
nextScene=_this.currentState(newState).routeName;
if(nextScene!==routeName){
currentState=newState;
}
}
}
if(nextScene===routeName){
_this.setState(newState);
}
}
};this.

push=function(routeName){for(var _len2=arguments.length,params=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){params[_key2-1]=arguments[_key2];}
_this.run.apply(_this,[ActionConst.PUSH,routeName,null].concat(params));
};this.

drawerOpen=function(){
_this.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerOpen'}));
};this.

drawerClose=function(){
_this.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerClose'}));
};this.

currentState=function(param){
var state=param;
if(!state){
state=_this._state;
}
if(!state.routes){
return state;
}
return _this.currentState(state.routes[state.index]);
};this.

refresh=function(params){
var key=_this.currentState(_this.state).key;
_this.dispatch(_reactNavigation.NavigationActions.setParams({key:key,params:params}));
};this.

pop=function(){
_this.dispatch(_reactNavigation.NavigationActions.back());
};this.

reset=function(routeName){for(var _len3=arguments.length,params=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){params[_key3-1]=arguments[_key3];}
_this.replace.apply(_this,[routeName].concat(params));
};this.

popTo=function(routeName){for(var _len4=arguments.length,params=Array(_len4>1?_len4-1:0),_key4=1;_key4<_len4;_key4++){params[_key4-1]=arguments[_key4];}
_this.run.apply(_this,[ActionConst.POP_TO,routeName].concat(params));
};this.

replace=function(routeName){for(var _len5=arguments.length,params=Array(_len5>1?_len5-1:0),_key5=1;_key5<_len5;_key5++){params[_key5-1]=arguments[_key5];}
var res={};
for(var _iterator2=params,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator']();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value;}var param=_ref2;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
_this.run(ActionConst.REPLACE,routeName,[_reactNavigation.NavigationActions.navigate({
routeName:routeName,
params:res})]);

};var defaultSuccess=function defaultSuccess(){};var defaultFailure=function defaultFailure(){};(0,_mobx.autorunAsync)(function _callee(){var handler,res,_handler,success,failure,params,_res;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;if(_this.prevScene&&_this.currentScene!==_this.prevScene){handler=_this[_this.prevScene+_Util.OnExit];if(handler){try{res=handler();if(res instanceof Promise){res.then(defaultSuccess,defaultFailure);}}catch(e){console.error('Error during onExit handler:',e);}}}if(!(_this.currentScene&&_this.currentScene!==_this.prevScene&&_this.states[_this.currentScene])){_context.next=20;break;}_handler=_this[_this.currentScene+_Util.OnEnter];success=_this.states[_this.currentScene].success||defaultSuccess;failure=_this.states[_this.currentScene].failure||defaultFailure;if(!_handler){_context.next=20;break;}_context.prev=7;params=_this.currentState().params;console.log('RUN onEnter handler for state=',_this.currentScene,' params='+JSON.stringify(params));_context.next=12;return regeneratorRuntime.awrap(_handler(params));case 12:_res=_context.sent;if(_res){console.log('SUCCESS',_res);success(_res);}else{console.log('FAILURE NULL RES');failure();}_context.next=20;break;case 16:_context.prev=16;_context.t0=_context['catch'](7);console.log('FAILURE EXCEPTION',_context.t0);failure(_context.t0);case 20:_context.next=25;break;case 22:_context.prev=22;_context.t1=_context['catch'](0);console.error('Error handling:'+_context.t1);case 25:case'end':return _context.stop();}}},null,_this,[[0,22],[7,16]]);});}return NavigationStore;}(),(_descriptor=_applyDecoratedDescriptor(_class.prototype,'_state',[_mobx.observable],{enumerable:true,initializer:null}),_descriptor2=_applyDecoratedDescriptor(_class.prototype,'currentScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor3=_applyDecoratedDescriptor(_class.prototype,'prevScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_applyDecoratedDescriptor(_class.prototype,'state',[_mobx.computed],Object.getOwnPropertyDescriptor(_class.prototype,'state'),_class.prototype),_descriptor4=_applyDecoratedDescriptor(_class.prototype,'setState',[_mobx.action],{enumerable:true,initializer:function initializer(){var _this2=this;return function(newState){if(!newState){return;}_this2._state=newState;_this2.prevScene=_this2.currentScene;_this2.currentScene=_this2.currentState(_this2._state).routeName;};}})),_class);exports.default=



new NavigationStore();