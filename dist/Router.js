Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/Router.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _native=require('mobx-react/native');
var _reactNative=require('react-native');
var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);
var _Scene=require('./Scene');var _Scene2=_interopRequireDefault(_Scene);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _Util=require('./Util');
var _reactNavigation=require('react-navigation');
var _NavBar=require('./NavBar');
var _LightboxNavigator=require('./LightboxNavigator');var _LightboxNavigator2=_interopRequireDefault(_LightboxNavigator);
var _menu_burger=require('../images/menu_burger.png');var _menu_burger2=_interopRequireDefault(_menu_burger);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}

var reservedKeys=[
'children',
'navigate',
'currentState',
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
'navBar',
'title',
'drawerOpen',
'drawerClose'];


var dontInheritKeys=[
'component',
'modal',
'drawer',
'tabs',
'navigator',
'children',
'key',
'ref',
'style',
'title',
'hideNavBar',
'hideTabBar'];


function getValue(value,params){
return value instanceof Function?value(params):value;
}

function createTabBarOptions(_ref){var tabBarStyle=_ref.tabBarStyle,activeTintColor=_ref.activeTintColor,inactiveTintColor=_ref.inactiveTintColor,activeBackgroundColor=_ref.activeBackgroundColor,inactiveBackgroundColor=_ref.inactiveBackgroundColor,showLabel=_ref.showLabel,labelStyle=_ref.labelStyle,tabStyle=_ref.tabStyle,props=_objectWithoutProperties(_ref,['tabBarStyle','activeTintColor','inactiveTintColor','activeBackgroundColor','inactiveBackgroundColor','showLabel','labelStyle','tabStyle']);
return _extends({},props,{style:tabBarStyle,activeTintColor:activeTintColor,inactiveTintColor:inactiveTintColor,activeBackgroundColor:activeBackgroundColor,inactiveBackgroundColor:inactiveBackgroundColor,showLabel:showLabel,labelStyle:labelStyle,tabStyle:tabStyle});
}
function createNavigationOptions(params){var
title=


params.title,backButtonImage=params.backButtonImage,navTransparent=params.navTransparent,hideNavBar=params.hideNavBar,hideTabBar=params.hideTabBar,backTitle=params.backTitle,right=params.right,rightButton=params.rightButton,left=params.left,leftButton=params.leftButton,navigationBarStyle=params.navigationBarStyle,headerStyle=params.headerStyle,navBarButtonColor=params.navBarButtonColor,tabBarLabel=params.tabBarLabel,tabBarIcon=params.tabBarIcon,icon=params.icon,getTitle=params.getTitle,renderTitle=params.renderTitle,panHandlers=params.panHandlers,navigationBarTitleImage=params.navigationBarTitleImage,navigationBarTitleImageStyle=params.navigationBarTitleImageStyle,component=params.component,rightTitle=params.rightTitle,leftTitle=params.leftTitle,leftButtonTextStyle=params.leftButtonTextStyle,rightButtonTextStyle=params.rightButtonTextStyle,backButtonTextStyle=params.backButtonTextStyle,headerTitleStyle=params.headerTitleStyle,titleStyle=params.titleStyle,navBar=params.navBar,onRight=params.onRight,onLeft=params.onLeft,rightButtonImage=params.rightButtonImage,leftButtonImage=params.leftButtonImage,init=params.init,back=params.back,props=_objectWithoutProperties(params,['title','backButtonImage','navTransparent','hideNavBar','hideTabBar','backTitle','right','rightButton','left','leftButton','navigationBarStyle','headerStyle','navBarButtonColor','tabBarLabel','tabBarIcon','icon','getTitle','renderTitle','panHandlers','navigationBarTitleImage','navigationBarTitleImageStyle','component','rightTitle','leftTitle','leftButtonTextStyle','rightButtonTextStyle','backButtonTextStyle','headerTitleStyle','titleStyle','navBar','onRight','onLeft','rightButtonImage','leftButtonImage','init','back']);
var NavBar=navBar;
if(component&&component.navigationOptions){
return component.navigationOptions;
}
return function(_ref2){var navigation=_ref2.navigation,screenProps=_ref2.screenProps;
var navigationParams=navigation.state.params||{};
var res=_extends({},
props,{
headerTintColor:navBarButtonColor,
headerTitleStyle:headerTitleStyle||titleStyle,
title:getValue(navigationParams.title||title||getTitle,_extends({navigation:navigation},params,navigationParams,screenProps)),
headerBackTitle:getValue(navigationParams.backTitle||backTitle,_extends({navigation:navigation},params,navigationParams,screenProps)),
headerRight:getValue(navigationParams.right||right||rightButton||params.renderRightButton,_extends({navigation:navigation},navigationParams,screenProps)),
headerLeft:getValue(navigationParams.left||left||leftButton||params.renderLeftButton,_extends({navigation:navigation},params,navigationParams,screenProps)),
headerTitle:getValue(navigationParams.renderTitle||renderTitle||params.renderTitle,_extends({navigation:navigation},params,navigationParams,screenProps)),
headerStyle:getValue(navigationParams.headerStyle||headerStyle||navigationBarStyle,_extends({navigation:navigation},params,navigationParams,screenProps)),
headerBackImage:navigationParams.backButtonImage||backButtonImage});

if(NavBar){
res.header=function(data){return _react2.default.createElement(NavBar,_extends({navigation:navigation},data,params,{__source:{fileName:_jsxFileName,lineNumber:87}}));};
}

if(panHandlers===null){
res.gesturesEnabled=false;
}

if(navigationBarTitleImage){
res.headerTitle=_react2.default.createElement(_reactNative.Image,{source:navigationBarTitleImage,style:navigationBarTitleImageStyle,__source:{fileName:_jsxFileName,lineNumber:95}});
}

if(tabBarLabel){
res.tabBarLabel=tabBarLabel;
}

if(tabBarIcon||icon){
res.tabBarIcon=tabBarIcon||icon;
}

if((rightButtonImage||rightTitle||params.renderRightButton)&&onRight){
res.headerRight=getValue(navigationParams.right||right||rightButton||params.renderRightButton,_extends({},
navigationParams,screenProps))||(0,_NavBar.renderRightButton)(_extends({},params,navigationParams));
}

if(leftButtonImage||backButtonImage||backTitle||leftTitle||params.renderLeftButton||leftButtonTextStyle||backButtonTextStyle||onLeft){
res.headerLeft=getValue(navigationParams.left||left||leftButton||params.renderLeftButton,_extends({},params,navigationParams,screenProps))||
(0,_NavBar.renderLeftButton)(_extends({},params,navigationParams))||(init?null:(0,_NavBar.renderBackButton)(_extends({},params,navigationParams,screenProps)));
}

if(back){
res.headerLeft=(0,_NavBar.renderBackButton)(_extends({},params,navigationParams));
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

function createWrapper(Component){
if(!Component){
return null;
}
return(0,_native.observer)(function(_ref3){var navigation=_ref3.navigation,props=_objectWithoutProperties(_ref3,['navigation']);
return _react2.default.createElement(Component,_extends({},props,{navigation:navigation},navigation.state.params,{name:navigation.state.routeName,__source:{fileName:_jsxFileName,lineNumber:139}}));
});
}


var App=(0,_native.observer)(function(props){
var AppNavigator=props.navigator;
return(
_react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:_navigationStore2.default.dispatch,state:_navigationStore2.default.state}),__source:{fileName:_jsxFileName,lineNumber:147}}));

});

function processScene(scene){var inheritProps=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var clones=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];
(0,_Util.assert)(scene.props,'props should be defined');
if(!scene.props.children){
return null;
}
var res={};
var order=[];var _scene$props=
scene.props,tabs=_scene$props.tabs,modal=_scene$props.modal,lightbox=_scene$props.lightbox,navigator=_scene$props.navigator,wrap=_scene$props.wrap,contentComponent=_scene$props.contentComponent,lazy=_scene$props.lazy,drawer=_scene$props.drawer,parentProps=_objectWithoutProperties(_scene$props,['tabs','modal','lightbox','navigator','wrap','contentComponent','lazy','drawer']);

var commonProps=_extends({},parentProps,inheritProps);

for(var _iterator=Object.keys(commonProps),_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref4;if(_isArray){if(_i>=_iterator.length)break;_ref4=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref4=_i.value;}var pkey=_ref4;
if(dontInheritKeys.indexOf(pkey)!==-1){
delete commonProps[pkey];
}
}

if(drawer&&!commonProps.left&&!commonProps.leftButtonImage&&!commonProps.leftTitle&&!commonProps.back){
commonProps.leftButtonImage=commonProps.drawerImage||_menu_burger2.default;
commonProps.onLeft=_navigationStore2.default.drawerOpen;
}

var children=!Array.isArray(parentProps.children)?[parentProps.children]:[].concat(_toConsumableArray(parentProps.children));

if(!drawer&&!tabs){
children.push.apply(children,_toConsumableArray(clones));
}

for(var _iterator2=children,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref5;if(_isArray2){if(_i2>=_iterator2.length)break;_ref5=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref5=_i2.value;}var child=_ref5;
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
_child.props,component=_child$props.component,_child$props$type=_child$props.type,type=_child$props$type===undefined?'push':_child$props$type,onEnter=_child$props.onEnter,onExit=_child$props.onExit,on=_child$props.on,failure=_child$props.failure,success=_child$props.success,props=_objectWithoutProperties(_child$props,['component','type','onEnter','onExit','on','failure','success']);
if(!_navigationStore2.default.states[key]){
_navigationStore2.default.states[key]={};
}
for(var _iterator4=Object.keys(props),_isArray4=Array.isArray(_iterator4),_i4=0,_iterator4=_isArray4?_iterator4:_iterator4[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref7;if(_isArray4){if(_i4>=_iterator4.length)break;_ref7=_iterator4[_i4++];}else{_i4=_iterator4.next();if(_i4.done)break;_ref7=_i4.value;}var transition=_ref7;
if(reservedKeys.indexOf(transition)===-1&&transition[props]instanceof Function){
_navigationStore2.default.states[key][transition]=props[transition];
}
}
delete props.children;
if(success){
_navigationStore2.default.states[key].success=success instanceof Function?success:function(args){console.log('Transition to state='+success);_navigationStore2.default[success](args);};
}
if(failure){
_navigationStore2.default.states[key].failure=failure instanceof Function?failure:function(args){console.log('Transition to state='+failure);_navigationStore2.default[failure](args);};
}

var screen={
screen:createWrapper(component)||processScene(_child,commonProps,clones)||lightbox&&_reactNative.View,
navigationOptions:createNavigationOptions(_extends({},commonProps,component,_child.props,{init:init,component:component}))};



var wrapNavBar=drawer||tabs||wrap;
if(component&&wrapNavBar){
res[key]={screen:processScene({key:key,props:{children:{key:'_'+key,props:_child.props}}},commonProps,clones)};
}else{
res[key]=screen;
}


props.init=true;
if(!_navigationStore2.default[key]){
_navigationStore2.default[key]=new Function('actions','props','type','return function '+
key+'(params){ actions[type](\''+key+'\', props, params)}')(_navigationStore2.default,_extends({},commonProps,props),type);
}

if((onEnter||on)&&!_navigationStore2.default[key+_Util.OnEnter]){
_navigationStore2.default[key+_Util.OnEnter]=onEnter||on;
}

if(onExit&&!_navigationStore2.default[key+_Util.OnExit]){
_navigationStore2.default[key+_Util.OnExit]=onExit;
}

order.push(key);
if(_child.props.initial||!initialRouteName){
initialRouteName=key;
initialRouteParams=_extends({},commonProps,props);
}};for(var _iterator3=children,_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref6;if(_isArray3){if(_i3>=_iterator3.length)break;_ref6=_iterator3[_i3++];}else{_i3=_iterator3.next();if(_i3.done)break;_ref6=_i3.value;}var _child=_ref6;_loop(_child);
}
var mode=modal?'modal':'card';
if(lightbox){
return(0,_LightboxNavigator2.default)(res,{mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName,navigationOptions:createNavigationOptions(parentProps)});
}else if(tabs){
return(0,_reactNavigation.TabNavigator)(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,order:order},parentProps,{
tabBarOptions:createTabBarOptions(parentProps),navigationOptions:createNavigationOptions(parentProps)}));
}else if(drawer){
return(0,_reactNavigation.DrawerNavigator)(res,_extends({initialRouteName:initialRouteName,contentComponent:contentComponent,order:order,backBehavior:'none'},parentProps));
}
if(navigator){
return navigator(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,order:order},parentProps,{navigationOptions:createNavigationOptions(parentProps)}));
}
return(0,_reactNavigation.StackNavigator)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},parentProps,{navigationOptions:createNavigationOptions(parentProps)}));
}

var Router=function Router(_ref8){var createReducer=_ref8.createReducer,props=_objectWithoutProperties(_ref8,['createReducer']);
var scene=props.children;
var AppNavigator=processScene(scene,props);
_navigationStore2.default.router=AppNavigator.router;
_navigationStore2.default.reducer=createReducer&&createReducer(props);

return _react2.default.createElement(App,{navigator:AppNavigator,__source:{fileName:_jsxFileName,lineNumber:265}});
};
Router.propTypes={
createReducer:_propTypes2.default.func,
children:_propTypes2.default.element};exports.default=


Router;