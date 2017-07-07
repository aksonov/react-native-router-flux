Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _desc,_value,_class,_descriptor,_descriptor2,_descriptor3;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _mobx=require('mobx');
var _reactNavigation=require('react-navigation');
var _ActionConst=require('./ActionConst');var _ActionConst2=_interopRequireDefault(_ActionConst);
var _Util=require('./Util');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0});}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key];});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true;}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc;},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined;}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null;}return desc;}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');}

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




















































dispatch=function(action){
var newState=_this.reducer?_this.reducer(_this.state,action):_this._router.getStateForAction(action,_this.state);

if(!newState||_this.currentState(newState).routeName===_this.currentScene){
return;
}
_this._state=newState;
_this.prevScene=_this.currentScene;
_this.currentScene=_this.currentState(_this._state).routeName;
};this.

run=function(){for(var _len=arguments.length,params=Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){params[_key-3]=arguments[_key];}var type=arguments.length>0&&arguments[0]!==undefined?arguments[0]:_ActionConst2.default.PUSH;var routeName=arguments[1];var actions=arguments[2];
var res={};
for(var _iterator=params,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var param=_ref;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
if(res.clone){
console.log("STATE:",JSON.stringify(_this.state));
}
_this.dispatch(createAction(type)({routeName:routeName,index:0,actions:actions,params:res}));
};this.

push=function(routeName){for(var _len2=arguments.length,params=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){params[_key2-1]=arguments[_key2];}
_this.run.apply(_this,[_ActionConst2.default.PUSH,routeName,null].concat(params));
};this.

drawerOpen=function(){
_this.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerOpen'}));
};this.

drawerClose=function(){
_this.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerClose'}));
};this.

currentState=function(state){
if(!state){
state=_this._state;
}
if(!state.routes){
return state;
}else{
return _this.currentState(state.routes[state.index]);
}
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

replace=function(routeName){for(var _len4=arguments.length,params=Array(_len4>1?_len4-1:0),_key4=1;_key4<_len4;_key4++){params[_key4-1]=arguments[_key4];}
var res={};
for(var _iterator2=params,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator']();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value;}var param=_ref2;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
_this.run(_ActionConst2.default.REPLACE,routeName,[_reactNavigation.NavigationActions.navigate({
routeName:routeName,
params:res})]);

};var defaultSuccess=function defaultSuccess(){};var defaultFailure=function defaultFailure(){};(0,_mobx.autorun)(function(){try{if(_this.prevScene&&_this.currentScene!==_this.prevScene){var handler=_this[_this.prevScene+_Util.OnExit];if(handler){try{var res=handler();if(res instanceof Promise){res.then(defaultSuccess,defaultFailure);}}catch(e){console.error("Error during onExit handler:",e);}}}if(_this.currentScene&&_this.currentScene!==_this.prevScene&&_this.states[_this.currentScene]){var _handler=_this[_this.currentScene+_Util.OnEnter];var success=_this.states[_this.currentScene].success||defaultSuccess;var failure=_this.states[_this.currentScene].failure||defaultFailure;if(_handler){try{var params=_this.currentState().params;console.log("RUN onEnter handler for state=",_this.currentScene,' params='+JSON.stringify(params));var _res=_handler(params);if(_res instanceof Promise){_res.then(success,failure);}else{if(_res){success(_res);}else{failure();}}}catch(e){console.error("Error during onEnter handler:",e);failure(e);}}}}catch(e){console.error("Error handling:"+e);}});}return NavigationStore;}(),(_descriptor=_applyDecoratedDescriptor(_class.prototype,'_state',[_mobx.observable],{enumerable:true,initializer:null}),_descriptor2=_applyDecoratedDescriptor(_class.prototype,'currentScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor3=_applyDecoratedDescriptor(_class.prototype,'prevScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_applyDecoratedDescriptor(_class.prototype,'state',[_mobx.computed],Object.getOwnPropertyDescriptor(_class.prototype,'state'),_class.prototype)),_class);exports.default=



new NavigationStore();