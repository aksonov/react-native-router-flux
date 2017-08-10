Object.defineProperty(exports,"__esModule",{value:true});exports.actionMap=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _actionMap,_jsxFileName='src/navigationStore.js',_desc,_value,_class,_descriptor,_descriptor2,_descriptor3,_descriptor4;var _react=require('react');var _react2=_interopRequireDefault(_react);
var _mobx=require('mobx');
var _ActionConst=require('./ActionConst');var ActionConst=_interopRequireWildcard(_ActionConst);
var _Util=require('./Util');
var _reactNative=require('react-native');
var _reactNavigation=require('react-navigation');
var _NavBar=require('./NavBar');
var _LightboxNavigator=require('./LightboxNavigator');var _LightboxNavigator2=_interopRequireDefault(_LightboxNavigator);
var _OverlayNavigator=require('./OverlayNavigator');var _OverlayNavigator2=_interopRequireDefault(_OverlayNavigator);
var _menu_burger=require('../images/menu_burger.png');var _menu_burger2=_interopRequireDefault(_menu_burger);
var _Scene=require('./Scene');var _Scene2=_interopRequireDefault(_Scene);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _State=require('./State');
var _Reducer=require('./Reducer');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0});}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key];});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true;}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc;},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined;}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null;}return desc;}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var RightNavBarButton=void 0;
var LeftNavBarButton=void 0;
var BackNavBarButton=void 0;

var actionMap=exports.actionMap=(_actionMap={},_defineProperty(_actionMap,
ActionConst.JUMP,'jump'),_defineProperty(_actionMap,
ActionConst.PUSH,'push'),_defineProperty(_actionMap,
ActionConst.REPLACE,'replace'),_defineProperty(_actionMap,
ActionConst.BACK,'pop'),_defineProperty(_actionMap,
ActionConst.BACK_ACTION,'pop'),_defineProperty(_actionMap,
ActionConst.POP_AND_REPLACE,'pop'),_defineProperty(_actionMap,
ActionConst.POP_TO,'popTo'),_defineProperty(_actionMap,
ActionConst.REFRESH,'refresh'),_defineProperty(_actionMap,
ActionConst.RESET,'reset'),_defineProperty(_actionMap,
ActionConst.PUSH_OR_POP,'push'),_defineProperty(_actionMap,
ActionConst.POP_AND_PUSH,'popAndPush'),_actionMap);


var reservedKeys=[
'children',
'create',
'execute',
'popTo',
'navigate',
'replace',
'refresh',
'dispatch',
'push',
'setParams',
'run',
'onEnter',
'onRight',
'onLeft',
'left',
'back',
'right',
'rightButton',
'leftButton',
'on',
'onExit',
'pop',
'renderLeftButton',
'renderRightButton',
'renderTitle',
'navBar',
'title',
'drawerOpen',
'drawerClose'];


var dontInheritKeys=[
'component',
'wrap',
'modal',
'overlay',
'drawer',
'tabs',
'navigator',
'children',
'key',
'ref',
'style',
'title',
'navTransparent',
'type',
'hideNavBar',
'hideTabBar'];


function getValue(value,params){
return value instanceof Function?value(params):value;
}

function getProperties(){var component=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
var res={};
for(var _iterator=reservedKeys,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var key=_ref;
if(component[key]){
res[key]=component[key];
}
}
delete res.children;
return res;
}
function createTabBarOptions(_ref2){var tabBarStyle=_ref2.tabBarStyle,activeTintColor=_ref2.activeTintColor,inactiveTintColor=_ref2.inactiveTintColor,activeBackgroundColor=_ref2.activeBackgroundColor,inactiveBackgroundColor=_ref2.inactiveBackgroundColor,showLabel=_ref2.showLabel,labelStyle=_ref2.labelStyle,tabStyle=_ref2.tabStyle,props=_objectWithoutProperties(_ref2,['tabBarStyle','activeTintColor','inactiveTintColor','activeBackgroundColor','inactiveBackgroundColor','showLabel','labelStyle','tabStyle']);
return _extends({},props,{style:tabBarStyle,activeTintColor:activeTintColor,inactiveTintColor:inactiveTintColor,activeBackgroundColor:activeBackgroundColor,inactiveBackgroundColor:inactiveBackgroundColor,showLabel:showLabel,labelStyle:labelStyle,tabStyle:tabStyle});
}
function createNavigationOptions(params){var
title=



params.title,backButtonImage=params.backButtonImage,navTransparent=params.navTransparent,hideNavBar=params.hideNavBar,hideTabBar=params.hideTabBar,backTitle=params.backTitle,right=params.right,rightButton=params.rightButton,left=params.left,leftButton=params.leftButton,navigationBarStyle=params.navigationBarStyle,headerStyle=params.headerStyle,navBarButtonColor=params.navBarButtonColor,tabBarLabel=params.tabBarLabel,tabBarIcon=params.tabBarIcon,icon=params.icon,getTitle=params.getTitle,renderTitle=params.renderTitle,panHandlers=params.panHandlers,navigationBarTitleImage=params.navigationBarTitleImage,navigationBarTitleImageStyle=params.navigationBarTitleImageStyle,component=params.component,rightTitle=params.rightTitle,leftTitle=params.leftTitle,leftButtonTextStyle=params.leftButtonTextStyle,rightButtonTextStyle=params.rightButtonTextStyle,backButtonTextStyle=params.backButtonTextStyle,headerTitleStyle=params.headerTitleStyle,titleStyle=params.titleStyle,navBar=params.navBar,onRight=params.onRight,onLeft=params.onLeft,rightButtonImage=params.rightButtonImage,leftButtonImage=params.leftButtonImage,init=params.init,back=params.back,renderBackButton=params.renderBackButton,renderNavigationBar=params.renderNavigationBar,drawerIcon=params.drawerIcon,drawerImage=params.drawerImage,drawerPosition=params.drawerPosition,props=_objectWithoutProperties(params,['title','backButtonImage','navTransparent','hideNavBar','hideTabBar','backTitle','right','rightButton','left','leftButton','navigationBarStyle','headerStyle','navBarButtonColor','tabBarLabel','tabBarIcon','icon','getTitle','renderTitle','panHandlers','navigationBarTitleImage','navigationBarTitleImageStyle','component','rightTitle','leftTitle','leftButtonTextStyle','rightButtonTextStyle','backButtonTextStyle','headerTitleStyle','titleStyle','navBar','onRight','onLeft','rightButtonImage','leftButtonImage','init','back','renderBackButton','renderNavigationBar','drawerIcon','drawerImage','drawerPosition']);
var NavBar=renderNavigationBar||navBar;
if(component&&component.navigationOptions){
return component.navigationOptions;
}
return function(_ref3){var navigation=_ref3.navigation,screenProps=_ref3.screenProps;
var navigationParams=navigation.state.params||{};
var state=_extends({navigation:navigation},params,navigationParams,screenProps);
var res=_extends({},
props,{
headerTintColor:navBarButtonColor||props.tintColor||navigationParams.tintColor||navigationParams.headerTintColor,
headerTitleStyle:headerTitleStyle||titleStyle,
title:getValue(navigationParams.title||title||getTitle,state),
headerBackTitle:getValue(navigationParams.backTitle||backTitle,state),
headerRight:getValue(navigationParams.right||right||rightButton||params.renderRightButton,state),
headerLeft:getValue(navigationParams.left||left||leftButton||params.renderLeftButton,state),
headerTitle:getValue(navigationParams.renderTitle||renderTitle||params.renderTitle,state),
headerStyle:getValue(navigationParams.headerStyle||headerStyle||navigationBarStyle,state),
headerBackImage:navigationParams.backButtonImage||backButtonImage});

if(NavBar){
res.header=function(data){return _react2.default.createElement(NavBar,_extends({navigation:navigation},state,data,{__source:{fileName:_jsxFileName,lineNumber:128}}));};
}

if(panHandlers===null){
res.gesturesEnabled=false;
}

if(navigationBarTitleImage){
res.headerTitle=_react2.default.createElement(Image,{source:navigationBarTitleImage,style:navigationBarTitleImageStyle,__source:{fileName:_jsxFileName,lineNumber:136}});
}

if(tabBarLabel){
res.tabBarLabel=tabBarLabel;
}

if(tabBarIcon||icon){
var Icon=tabBarIcon||icon;
res.tabBarIcon=function(data){return _react2.default.createElement(Icon,_extends({},state,data,{__source:{fileName:_jsxFileName,lineNumber:145}}));};
}
var componentData={};

if(component){var _arr=
['onRight','onLeft','rightButton','leftButton','leftTitle','rightTitle','rightButtonImage',
'leftButtonImage','rightButtonTextStyle','leftButtonTextStyle','rightButtonIconStyle','leftButtonIconStyle',
'leftButtonTintColor','rightButtonTintColor'];for(var _i2=0;_i2<_arr.length;_i2++){var key=_arr[_i2];
if(component[key]){
componentData[key]=component[key];
}
}
}

if(rightButtonImage||rightTitle||params.renderRightButton||onRight||navigationParams.onRight||
navigationParams.rightTitle||navigationParams.rightButtonImage||rightButtonTextStyle||
(drawerImage||drawerIcon)&&drawerPosition==='right'){
res.headerRight=getValue(navigationParams.right||navigationParams.rightButton||params.renderRightButton,_extends({},
navigationParams,screenProps))||_react2.default.createElement(RightNavBarButton,_extends({},params,navigationParams,componentData,{__source:{fileName:_jsxFileName,lineNumber:163}}));
}

if(leftButtonImage||backButtonImage||backTitle||leftTitle||params.renderLeftButton||leftButtonTextStyle||
backButtonTextStyle||onLeft||navigationParams.leftTitle||navigationParams.onLeft||navigationParams.leftButtonImage||
navigationParams.backButtonImage||navigationParams.backTitle||(drawerImage||drawerIcon)&&drawerPosition!=='right'){
res.headerLeft=getValue(navigationParams.left||navigationParams.leftButton||params.renderLeftButton,_extends({},params,navigationParams,screenProps))||
(onLeft&&(leftTitle||navigationParams.leftTitle||leftButtonImage)||drawerImage||drawerIcon)&&
_react2.default.createElement(LeftNavBarButton,_extends({},params,navigationParams,componentData,{__source:{fileName:_jsxFileName,lineNumber:171}}))||(
init?null:renderBackButton&&renderBackButton(state)||_react2.default.createElement(BackNavBarButton,_extends({},state,{__source:{fileName:_jsxFileName,lineNumber:172}})));
}

if(back){
res.headerLeft=renderBackButton&&renderBackButton(state)||_react2.default.createElement(BackNavBarButton,_extends({},state,{__source:{fileName:_jsxFileName,lineNumber:176}}));
}

if(hideTabBar){
res.tabBarVisible=false;
}
if(hideNavBar){
res.header=null;
}

if(navTransparent){
res.headerStyle={position:'absolute',backgroundColor:'transparent',zIndex:100,top:0,left:0,right:0};
}
return res;
};
}

function createWrapper(Component,wrapBy){
if(!Component){
return null;
}
var wrapper=wrapBy||function(props){return props;};
function wrapped(_ref4){var navigation=_ref4.navigation,props=_objectWithoutProperties(_ref4,['navigation']);
return _react2.default.createElement(Component,_extends({},props,{navigation:navigation},navigation.state.params,{name:navigation.state.routeName,__source:{fileName:_jsxFileName,lineNumber:199}}));
}
wrapped.propTypes={
navigation:_propTypes2.default.object};

return wrapper(wrapped);
}

function filterParam(){var data=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
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
for(var _iterator2=params,_isArray2=Array.isArray(_iterator2),_i3=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref5;if(_isArray2){if(_i3>=_iterator2.length)break;_ref5=_iterator2[_i3++];}else{_i3=_iterator2.next();if(_i3.done)break;_ref5=_i3.value;}var param=_ref5;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
return res;
}

var defaultSuccess=function defaultSuccess(){};
var defaultFailure=function defaultFailure(){};var

NavigationStore=(_class=function(){function NavigationStore(){var _this=this;_classCallCheck(this,NavigationStore);this.
states={};this.
reducer=null;_initDefineProp(this,'currentScene',_descriptor,this);_initDefineProp(this,'prevScene',_descriptor2,this);_initDefineProp(this,'currentParams',_descriptor3,this);this.












create=function(scene){var params=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var wrapBy=arguments.length>2&&arguments[2]!==undefined?arguments[2]:function(props){return props;};
(0,_Util.assert)(!Array.isArray(scene),'Router should contain only one scene, please wrap your scenes with root Scene ');
RightNavBarButton=wrapBy(_NavBar.RightButton);
LeftNavBarButton=wrapBy(_NavBar.LeftButton);
BackNavBarButton=wrapBy(_NavBar.BackButton);
var AppNavigator=_this.processScene(scene,params,[],wrapBy);
_this.router=AppNavigator.router;
_this.dispatch(_reactNavigation.NavigationActions.init());
return AppNavigator;
};this.

processScene=function(scene){var inheritProps=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var clones=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var wrapBy=arguments[3];
(0,_Util.assert)(scene.props,'props should be defined');
if(!scene.props.children){
return null;
}
var res={};
var order=[];var _scene$props=
scene.props,tabs=_scene$props.tabs,modal=_scene$props.modal,overlay=_scene$props.overlay,lightbox=_scene$props.lightbox,navigator=_scene$props.navigator,contentComponent=_scene$props.contentComponent,lazy=_scene$props.lazy,drawer=_scene$props.drawer,parentProps=_objectWithoutProperties(_scene$props,['tabs','modal','overlay','lightbox','navigator','contentComponent','lazy','drawer']);

var commonProps=_extends({},inheritProps,parentProps);
delete commonProps.children;
delete commonProps.component;

for(var _iterator3=Object.keys(commonProps),_isArray3=Array.isArray(_iterator3),_i4=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref6;if(_isArray3){if(_i4>=_iterator3.length)break;_ref6=_iterator3[_i4++];}else{_i4=_iterator3.next();if(_i4.done)break;_ref6=_i4.value;}var pkey=_ref6;
if(dontInheritKeys.includes(pkey)&&!parentProps[pkey]){
delete commonProps[pkey];
}
}

if(drawer){
commonProps.drawerImage=commonProps.drawerImage||_menu_burger2.default;
}

var children=!Array.isArray(parentProps.children)?[parentProps.children]:[].concat(_toConsumableArray(parentProps.children));

if(!drawer&&!tabs){
children.push.apply(children,_toConsumableArray(clones));
}

for(var _iterator4=children,_isArray4=Array.isArray(_iterator4),_i5=0,_iterator4=_isArray4?_iterator4:_iterator4[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref7;if(_isArray4){if(_i5>=_iterator4.length)break;_ref7=_iterator4[_i5++];}else{_i5=_iterator4.next();if(_i5.done)break;_ref7=_i5.value;}var child=_ref7;
if(child.props.clone){
if(clones.indexOf(child)===-1){
clones.push(child);
}
}
}
var initialRouteName=void 0;
var initialRouteParams=void 0;var _loop=function _loop(
_child){
(0,_Util.assert)(_child.key,'key should be defined for '+_child);
var key=_child.key;
var init=key===children[0].key;
(0,_Util.assert)(reservedKeys.indexOf(key)===-1,'Scene name cannot be reserved word: '+_child.key);var _child$props=
_child.props,component=_child$props.component,_child$props$type=_child$props.type,type=_child$props$type===undefined?tabs||drawer?'jump':'push':_child$props$type,onEnter=_child$props.onEnter,onExit=_child$props.onExit,on=_child$props.on,failure=_child$props.failure,success=_child$props.success,wrap=_child$props.wrap,props=_objectWithoutProperties(_child$props,['component','type','onEnter','onExit','on','failure','success','wrap']);
if(!_this.states[key]){
_this.states[key]={};
}
for(var _iterator6=Object.keys(props),_isArray6=Array.isArray(_iterator6),_i7=0,_iterator6=_isArray6?_iterator6:_iterator6[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref9;if(_isArray6){if(_i7>=_iterator6.length)break;_ref9=_iterator6[_i7++];}else{_i7=_iterator6.next();if(_i7.done)break;_ref9=_i7.value;}var transition=_ref9;
if(reservedKeys.indexOf(transition)===-1&&props[transition]instanceof Function){
_this.states[key][transition]=props[transition];
}
}
delete props.children;
if(success){
_this.states[key].success=success instanceof Function?
success:function(args){console.log('Transition to state='+success);_this[success](args);};
}
if(failure){
_this.states[key].failure=failure instanceof Function?
failure:function(args){console.log('Transition to state='+failure);_this[failure](args);};
}

var screen={
screen:createWrapper(component,wrapBy)||_this.processScene(_child,commonProps,clones)||lightbox&&_reactNative.View,
navigationOptions:createNavigationOptions(_extends({},commonProps,getProperties(component),_child.props,{init:init,component:component}))};



var wrapNavBar=drawer||tabs||wrap;
if(component&&wrapNavBar){
res[key]={screen:_this.processScene({key:key,props:{children:{key:'_'+key,props:_extends({},_child.props,{wrap:false})}}},commonProps,clones,wrapBy)};
}else{
res[key]=screen;
}


props.init=true;
if(!_this[key]){
_this[key]=new Function('actions','props','type','return function '+
key+'(params){ actions.execute(type, \''+key+'\', props, params)}')(_this,_extends({},commonProps,props),type);
}

if((onEnter||on||component&&component.onEnter)&&!_this[key+_Util.OnEnter]){
_this[key+_Util.OnEnter]=onEnter||on||component.onEnter;
}

if((onExit||component&&component.onExit)&&!_this[key+_Util.OnExit]){
_this[key+_Util.OnExit]=onExit||component.onExit;
}

order.push(key);
if(_child.props.initial||!initialRouteName){
initialRouteName=key;
initialRouteParams=_extends({},commonProps,props);
}};for(var _iterator5=children,_isArray5=Array.isArray(_iterator5),_i6=0,_iterator5=_isArray5?_iterator5:_iterator5[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref8;if(_isArray5){if(_i6>=_iterator5.length)break;_ref8=_iterator5[_i6++];}else{_i6=_iterator5.next();if(_i6.done)break;_ref8=_i6.value;}var _child=_ref8;_loop(_child);
}
var mode=modal?'modal':'card';
if(navigator){
return navigator(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,contentComponent:contentComponent,order:order},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}
if(lightbox){
return(0,_LightboxNavigator2.default)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}else if(tabs){
return(0,_reactNavigation.TabNavigator)(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,order:order},commonProps,{
tabBarOptions:createTabBarOptions(commonProps),navigationOptions:createNavigationOptions(commonProps)}));
}else if(drawer){
return(0,_reactNavigation.DrawerNavigator)(res,_extends({initialRouteName:initialRouteName,contentComponent:contentComponent,order:order},commonProps));
}else if(overlay){
return(0,_OverlayNavigator2.default)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,order:order,contentComponent:contentComponent,initialRouteName:initialRouteName},commonProps,{
navigationOptions:createNavigationOptions(commonProps)}));
}
return(0,_reactNavigation.StackNavigator)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
};this.

nextState=function(state,cmd){return _this.reducer?_this.reducer(state,cmd):(0,_Reducer.reducer)(state,cmd);};this.

dispatch=function(cmd){
_this.setState(_this.nextState(_this.state,cmd));
};_initDefineProp(this,'setState',_descriptor4,this);this.






















































execute=function(actionType,routeName){for(var _len=arguments.length,params=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){params[_key-2]=arguments[_key];}
var res=uniteParams(routeName,params);
var overridenType=res.type||actionType;
var type=actionMap[overridenType]||overridenType;
_this[type](routeName,res);
};this.

push=function(routeName,data){
var params=filterParam(data);
_this.dispatch({type:ActionConst.PUSH,routeName:routeName,params:params});
};this.

jump=function(routeName,data){
var params=filterParam(data);
_this.dispatch({type:ActionConst.JUMP,routeName:routeName,params:params});
};this.

drawerOpen=function(){
_this.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerOpen'}));
};this.

drawerClose=function(){
_this.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerClose'}));
};this.

refresh=function(data){
var key=(0,_State.getActiveState)(_this._state).key;
var params=filterParam(data);
_this.dispatch(_reactNavigation.NavigationActions.setParams({key:key,params:params}));
};this.

pop=function(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
var res=filterParam(params);
_this.dispatch(_reactNavigation.NavigationActions.back());
if(res.refresh){
_this.refresh(res.refresh);
}
};this.

popTo=function(routeName,data){
var params=filterParam(data);
_this.dispatch({type:ActionConst.POP_TO,routeName:routeName,params:params});
};this.

popAndPush=function(routeName,data){
var params=filterParam(data);
_this.dispatch({type:ActionConst.POP_AND_PUSH,routeName:routeName,params:params});
};this.

replace=function(routeName,data){
var params=filterParam(data);
_this.dispatch({type:ActionConst.REPLACE,routeName:routeName,params:params});
};this.

reset=function(routeName,data){
var params=filterParam(data);
_this.dispatch(_reactNavigation.NavigationActions.reset({key:null,index:0,actions:[_reactNavigation.NavigationActions.navigate({
routeName:routeName,
params:params})]}));

};}_createClass(NavigationStore,[{key:'state',get:function get(){var scene=this.currentScene;var params=this.currentParams;return this._state;}}]);return NavigationStore;}(),(_descriptor=_applyDecoratedDescriptor(_class.prototype,'currentScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor2=_applyDecoratedDescriptor(_class.prototype,'prevScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor3=_applyDecoratedDescriptor(_class.prototype,'currentParams',[_mobx.observable],{enumerable:true,initializer:null}),_descriptor4=_applyDecoratedDescriptor(_class.prototype,'setState',[_mobx.action],{enumerable:true,initializer:function initializer(){var _this2=this;return function _callee(newState){var state,currentScene,prevScene,exitHandler,res,handler,_success,_failure,params,_res;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(newState){_context.next=2;break;}return _context.abrupt('return');case 2:state=(0,_State.getActiveState)(newState);currentScene=_this2.currentScene;prevScene=_this2.prevScene;_this2._state=newState;_this2.currentScene=state.routeName;_this2.currentParams=state.params;if(!(currentScene!==_this2.currentScene)){_context.next=29;break;}_this2.dispatch({type:ActionConst.BLUR,routeName:prevScene});exitHandler=_this2[prevScene+_Util.OnExit];if(exitHandler){try{res=exitHandler();if(res instanceof Promise){res.then(defaultSuccess,defaultFailure);}}catch(e){console.error('Error during onExit handler:',e);}}_this2.dispatch({type:ActionConst.FOCUS,routeName:_this2.currentScene,params:_this2.currentParams});if(!_this2.states[_this2.currentScene]){_context.next=29;break;}handler=_this2[_this2.currentScene+_Util.OnEnter];_success=_this2.states[_this2.currentScene].success||defaultSuccess;_failure=_this2.states[_this2.currentScene].failure||defaultFailure;if(!handler){_context.next=29;break;}_context.prev=18;params=(0,_State.getActiveState)(_this2._state).params;_context.next=22;return regeneratorRuntime.awrap(handler(params));case 22:_res=_context.sent;if(_res){_success(_res);}else{_failure();}_context.next=29;break;case 26:_context.prev=26;_context.t0=_context['catch'](18);_failure({error:_context.t0});case 29:_this2.prevScene=currentScene;case 30:case'end':return _context.stop();}}},null,_this2,[[18,26]]);};}})),_class);exports.default=



new NavigationStore();