Object.defineProperty(exports,"__esModule",{value:true});exports.supportedActions=exports.actionMap=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _actionMap,_supportedActions,_desc,_value,_class,_descriptor,_descriptor2,_descriptor3,_descriptor4,_descriptor5,_descriptor6;var _mobx=require('mobx');
var _reactNavigation=require('react-navigation');
var _ActionConst=require('./ActionConst');var ActionConst=_interopRequireWildcard(_ActionConst);
var _Util=require('./Util');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0});}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key];});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true;}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc;},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined;}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null;}return desc;}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var actionMap=exports.actionMap=(_actionMap={},_defineProperty(_actionMap,
ActionConst.JUMP,'jump'),_defineProperty(_actionMap,
ActionConst.PUSH,'push'),_defineProperty(_actionMap,
ActionConst.REPLACE,'replace'),_defineProperty(_actionMap,
ActionConst.BACK,'pop'),_defineProperty(_actionMap,
ActionConst.BACK_ACTION,'pop'),_defineProperty(_actionMap,
ActionConst.POP_AND_REPLACE,'pop'),_defineProperty(_actionMap,
ActionConst.POP_TO,'popTo'),_defineProperty(_actionMap,
ActionConst.REFRESH,'refresh'),_defineProperty(_actionMap,
ActionConst.RESET,'replace'),_defineProperty(_actionMap,
ActionConst.PUSH_OR_POP,'push'),_actionMap);


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

function uniteParams(routeName,params){
var res={};
for(var _iterator=params,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var param=_ref;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
return res;
}

var createAction=function createAction(type){return function(){var payload=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return _extends({
type:type},
payload);};};var



NavigationStore=(_class=function(){_createClass(NavigationStore,[{key:'state',get:function get()










{
var scene=this.currentScene;
var params=this.currentParams;
return this._state;
}},{key:'router',set:function set(

router){
this._router=router;
this.dispatch(_reactNavigation.NavigationActions.init());
},get:function get()
{
return this._router;
}}]);

function NavigationStore(){var _this=this;_classCallCheck(this,NavigationStore);this._router=null;this.states={};this.reducer=null;_initDefineProp(this,'currentScene',_descriptor,this);_initDefineProp(this,'prevScene',_descriptor2,this);_initDefineProp(this,'currentParams',_descriptor3,this);_initDefineProp(this,'_onEnterHandlerExecuted',_descriptor4,this);_initDefineProp(this,'_onExitHandlerExecuted',_descriptor5,this);this.


















































nextState=function(state,cmd){return _this.reducer?_this.reducer(state,cmd):_this._router.getStateForAction(cmd,state);};this.

dispatch=function(cmd,type,params){
_this.setState(_this.nextState(_this.state,cmd),type,params);
};_initDefineProp(this,'setState',_descriptor6,this);this.





















execute=function(actionType,routeName){for(var _len=arguments.length,params=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){params[_key-2]=arguments[_key];}
var res=uniteParams(routeName,params);
var overridenType=res.type||actionType;
var type=actionMap[overridenType]||overridenType;
_this[type](routeName,res);
};this.

run=function(){for(var _len2=arguments.length,params=Array(_len2>3?_len2-3:0),_key2=3;_key2<_len2;_key2++){params[_key2-3]=arguments[_key2];}var type=arguments.length>0&&arguments[0]!==undefined?arguments[0]:ActionConst.PUSH;var routeName=arguments[1];var actions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};
var res=uniteParams(routeName,params);
if(supportedActions[type]){
_this.dispatch(createAction(supportedActions[type])(_extends({routeName:routeName},actions,{params:res})),type,res);
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

push=function(routeName){for(var _len3=arguments.length,params=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){params[_key3-1]=arguments[_key3];}
_this.run.apply(_this,[ActionConst.PUSH,routeName,null].concat(params));
};this.

jump=function(routeName){for(var _len4=arguments.length,params=Array(_len4>1?_len4-1:0),_key4=1;_key4<_len4;_key4++){params[_key4-1]=arguments[_key4];}
_this.run.apply(_this,[ActionConst.JUMP,routeName,null].concat(params));
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

pop=function(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
var res=filterParam(params);
_this.dispatch(_reactNavigation.NavigationActions.back());
if(res.refresh){
_this.refresh(res.refresh);
}
};this.

popTo=function(routeName){for(var _len5=arguments.length,params=Array(_len5>1?_len5-1:0),_key5=1;_key5<_len5;_key5++){params[_key5-1]=arguments[_key5];}
_this.run.apply(_this,[ActionConst.POP_TO,routeName].concat(params));
};this.

replace=function(routeName){for(var _len6=arguments.length,params=Array(_len6>1?_len6-1:0),_key6=1;_key6<_len6;_key6++){params[_key6-1]=arguments[_key6];}
var res=uniteParams(routeName,params);
_this.run(ActionConst.REPLACE,routeName,{key:routeName,index:0,actions:[_reactNavigation.NavigationActions.navigate({
routeName:routeName,
params:res})]});

};this.

reset=function(routeName){for(var _len7=arguments.length,params=Array(_len7>1?_len7-1:0),_key7=1;_key7<_len7;_key7++){params[_key7-1]=arguments[_key7];}
var res=uniteParams(routeName,params);
_this.run(ActionConst.RESET,routeName,{key:null,index:0,actions:[_reactNavigation.NavigationActions.navigate({
routeName:routeName,
params:res})]});

};var defaultSuccess=function defaultSuccess(){};var defaultFailure=function defaultFailure(){};(0,_mobx.autorunAsync)(function _callee(){var handler,res,_handler,success,failure,params,_res;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;if(_this.prevScene&&_this.currentScene!==_this.prevScene&&!_this._onExitHandlerExecuted){_this._onExitHandlerExecuted=true;handler=_this[_this.prevScene+_Util.OnExit];if(handler){try{res=handler();if(res instanceof Promise){res.then(defaultSuccess,defaultFailure);}}catch(e){console.error('Error during onExit handler:',e);}}}if(!(_this.currentScene&&_this.currentScene!==_this.prevScene&&_this.states[_this.currentScene]&&!_this._onEnterHandlerExecuted)){_context.next=21;break;}_handler=_this[_this.currentScene+_Util.OnEnter];_this._onEnterHandlerExecuted=true;success=_this.states[_this.currentScene].success||defaultSuccess;failure=_this.states[_this.currentScene].failure||defaultFailure;if(!_handler){_context.next=21;break;}_context.prev=8;params=_this.currentState().params;console.log('RUN onEnter handler for state=',_this.currentScene,' params='+JSON.stringify(params));_context.next=13;return regeneratorRuntime.awrap(_handler(params));case 13:_res=_context.sent;if(_res){console.log('SUCCESS',_res);success(_res);}else{console.log('FAILURE NULL RES');failure();}_context.next=21;break;case 17:_context.prev=17;_context.t0=_context['catch'](8);console.log('FAILURE EXCEPTION',_context.t0);failure({error:_context.t0});case 21:_context.next=26;break;case 23:_context.prev=23;_context.t1=_context['catch'](0);console.error('Error handling:'+_context.t1);case 26:case'end':return _context.stop();}}},null,_this,[[0,23],[8,17]]);});}return NavigationStore;}(),(_descriptor=_applyDecoratedDescriptor(_class.prototype,'currentScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor2=_applyDecoratedDescriptor(_class.prototype,'prevScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor3=_applyDecoratedDescriptor(_class.prototype,'currentParams',[_mobx.observable],{enumerable:true,initializer:null}),_descriptor4=_applyDecoratedDescriptor(_class.prototype,'_onEnterHandlerExecuted',[_mobx.observable],{enumerable:true,initializer:function initializer(){return false;}}),_descriptor5=_applyDecoratedDescriptor(_class.prototype,'_onExitHandlerExecuted',[_mobx.observable],{enumerable:true,initializer:function initializer(){return false;}}),_descriptor6=_applyDecoratedDescriptor(_class.prototype,'setState',[_mobx.action],{enumerable:true,initializer:function initializer(){var _this2=this;return function(newState,type,params){if(!newState){return;}var state=_this2.currentState(newState);if(type===ActionConst.JUMP&&state.routeName===_this2.currentScene){return;}_this2._state=newState;_this2.prevScene=_this2.currentScene;_this2._onExitHandlerExecuted=false;_this2._onEnterHandlerExecuted=false;_this2.currentScene=state.routeName;_this2.currentParams=state.params;if(type===ActionConst.JUMP&&params){_this2.refresh(params);}};}})),_class);exports.default=



new NavigationStore();