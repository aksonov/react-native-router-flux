Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _jsxFileName='src/Router.js',_class,_class2,_temp2;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _native=require('mobx-react/native');
var _reactNative=require('react-native');
var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);
var _Scene=require('./Scene');var _Scene2=_interopRequireDefault(_Scene);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _Util=require('./Util');
var _reactNavigation=require('react-navigation');
var _NavBar=require('./NavBar');
var _LightboxNavigator=require('./LightboxNavigator');var _LightboxNavigator2=_interopRequireDefault(_LightboxNavigator);
var _menu_burger=require('../images/menu_burger.png');var _menu_burger2=_interopRequireDefault(_menu_burger);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}
var RightNavBarButton=void 0;
var LeftNavBarButton=void 0;
var reservedKeys=[
'children',
'execute',
'popTo',
'navigate',
'replace',
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
'renderTitle',
'navBar',
'title',
'drawerOpen',
'drawerClose'];


var dontInheritKeys=[
'component',
'wrap',
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

function getProperties(){var component=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
var res={};
for(var _iterator=reservedKeys,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var key=_ref;
if(component[key]){
res[key]=component[key];
}
}
return res;
}
function createTabBarOptions(_ref2){var tabBarStyle=_ref2.tabBarStyle,activeTintColor=_ref2.activeTintColor,inactiveTintColor=_ref2.inactiveTintColor,activeBackgroundColor=_ref2.activeBackgroundColor,inactiveBackgroundColor=_ref2.inactiveBackgroundColor,showLabel=_ref2.showLabel,labelStyle=_ref2.labelStyle,tabStyle=_ref2.tabStyle,props=_objectWithoutProperties(_ref2,['tabBarStyle','activeTintColor','inactiveTintColor','activeBackgroundColor','inactiveBackgroundColor','showLabel','labelStyle','tabStyle']);
return _extends({},props,{style:tabBarStyle,activeTintColor:activeTintColor,inactiveTintColor:inactiveTintColor,activeBackgroundColor:activeBackgroundColor,inactiveBackgroundColor:inactiveBackgroundColor,showLabel:showLabel,labelStyle:labelStyle,tabStyle:tabStyle});
}
function createNavigationOptions(params){var
title=


params.title,backButtonImage=params.backButtonImage,navTransparent=params.navTransparent,hideNavBar=params.hideNavBar,hideTabBar=params.hideTabBar,backTitle=params.backTitle,right=params.right,rightButton=params.rightButton,left=params.left,leftButton=params.leftButton,navigationBarStyle=params.navigationBarStyle,headerStyle=params.headerStyle,navBarButtonColor=params.navBarButtonColor,tabBarLabel=params.tabBarLabel,tabBarIcon=params.tabBarIcon,icon=params.icon,getTitle=params.getTitle,renderTitle=params.renderTitle,panHandlers=params.panHandlers,navigationBarTitleImage=params.navigationBarTitleImage,navigationBarTitleImageStyle=params.navigationBarTitleImageStyle,component=params.component,rightTitle=params.rightTitle,leftTitle=params.leftTitle,leftButtonTextStyle=params.leftButtonTextStyle,rightButtonTextStyle=params.rightButtonTextStyle,backButtonTextStyle=params.backButtonTextStyle,headerTitleStyle=params.headerTitleStyle,titleStyle=params.titleStyle,navBar=params.navBar,onRight=params.onRight,onLeft=params.onLeft,rightButtonImage=params.rightButtonImage,leftButtonImage=params.leftButtonImage,init=params.init,back=params.back,props=_objectWithoutProperties(params,['title','backButtonImage','navTransparent','hideNavBar','hideTabBar','backTitle','right','rightButton','left','leftButton','navigationBarStyle','headerStyle','navBarButtonColor','tabBarLabel','tabBarIcon','icon','getTitle','renderTitle','panHandlers','navigationBarTitleImage','navigationBarTitleImageStyle','component','rightTitle','leftTitle','leftButtonTextStyle','rightButtonTextStyle','backButtonTextStyle','headerTitleStyle','titleStyle','navBar','onRight','onLeft','rightButtonImage','leftButtonImage','init','back']);
var NavBar=navBar;
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
res.header=function(data){return _react2.default.createElement(NavBar,_extends({navigation:navigation},state,data,{__source:{fileName:_jsxFileName,lineNumber:103}}));};
}

if(panHandlers===null){
res.gesturesEnabled=false;
}

if(navigationBarTitleImage){
res.headerTitle=_react2.default.createElement(_reactNative.Image,{source:navigationBarTitleImage,style:navigationBarTitleImageStyle,__source:{fileName:_jsxFileName,lineNumber:111}});
}

if(tabBarLabel){
res.tabBarLabel=tabBarLabel;
}

if(tabBarIcon||icon){
res.tabBarIcon=tabBarIcon||icon;
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
navigationParams.rightTitle||navigationParams.rightButtonImage||rightButtonTextStyle){
res.headerRight=getValue(navigationParams.right||navigationParams.rightButton||params.renderRightButton,_extends({},
navigationParams,screenProps))||_react2.default.createElement(RightNavBarButton,_extends({},params,navigationParams,componentData,{__source:{fileName:_jsxFileName,lineNumber:136}}));
}

if(leftButtonImage||backButtonImage||backTitle||leftTitle||params.renderLeftButton||leftButtonTextStyle||
backButtonTextStyle||onLeft||navigationParams.leftTitle||navigationParams.onLeft||navigationParams.leftButtonImage||
navigationParams.backButtonImage||navigationParams.backTitle){
res.headerLeft=getValue(navigationParams.left||navigationParams.leftButton||params.renderLeftButton,_extends({},params,navigationParams,screenProps))||
onLeft&&(leftTitle||navigationParams.leftTitle||leftButtonImage)&&_react2.default.createElement(LeftNavBarButton,_extends({},params,navigationParams,componentData,{__source:{fileName:_jsxFileName,lineNumber:143}}))||(
init?null:(0,_NavBar.renderBackButton)(_extends({},params,navigationParams,screenProps)));
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

function createWrapper(Component,wrapBy){
if(!Component){
return null;
}
var wrapper=wrapBy||function(props){return props;};
function wrapped(_ref4){var navigation=_ref4.navigation,props=_objectWithoutProperties(_ref4,['navigation']);
return _react2.default.createElement(Component,_extends({},props,{navigation:navigation},navigation.state.params,{name:navigation.state.routeName,__source:{fileName:_jsxFileName,lineNumber:171}}));
}
wrapped.propTypes={
navigation:_propTypes2.default.object};

return wrapper(wrapped);
}var


App=(0,_native.observer)(_class=(_temp2=_class2=function(_React$Component){_inherits(App,_React$Component);function App(){var _ref5;var _temp,_this,_ret;_classCallCheck(this,App);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref5=App.__proto__||Object.getPrototypeOf(App)).call.apply(_ref5,[this].concat(args))),_this),_this.












onBackPress=function(){
_navigationStore2.default.pop();
return _navigationStore2.default.currentScene!==_navigationStore2.default.prevScene;
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(App,[{key:'componentDidMount',value:function componentDidMount(){_reactNative.BackHandler.addEventListener('hardwareBackPress',this.onBackPress);}},{key:'componentWillUnmount',value:function componentWillUnmount(){_reactNative.BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);}},{key:'render',value:function render()

{
var AppNavigator=this.props.navigator;
return(
_react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:_navigationStore2.default.dispatch,state:_navigationStore2.default.state}),__source:{fileName:_jsxFileName,lineNumber:201}}));

}}]);return App;}(_react2.default.Component),_class2.propTypes={navigator:_react2.default.PropTypes.func},_temp2))||_class;


function processScene(scene){var inheritProps=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var clones=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var wrapBy=arguments[3];
(0,_Util.assert)(scene.props,'props should be defined');
if(!scene.props.children){
return null;
}
var res={};
var order=[];var _scene$props=
scene.props,tabs=_scene$props.tabs,modal=_scene$props.modal,lightbox=_scene$props.lightbox,navigator=_scene$props.navigator,contentComponent=_scene$props.contentComponent,lazy=_scene$props.lazy,drawer=_scene$props.drawer,parentProps=_objectWithoutProperties(_scene$props,['tabs','modal','lightbox','navigator','contentComponent','lazy','drawer']);

var commonProps=_extends({},inheritProps,parentProps);
delete commonProps.children;
delete commonProps.component;

for(var _iterator2=Object.keys(commonProps),_isArray2=Array.isArray(_iterator2),_i3=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref6;if(_isArray2){if(_i3>=_iterator2.length)break;_ref6=_iterator2[_i3++];}else{_i3=_iterator2.next();if(_i3.done)break;_ref6=_i3.value;}var pkey=_ref6;
if(dontInheritKeys.includes(pkey)&&!parentProps[pkey]){
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

for(var _iterator3=children,_isArray3=Array.isArray(_iterator3),_i4=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref7;if(_isArray3){if(_i4>=_iterator3.length)break;_ref7=_iterator3[_i4++];}else{_i4=_iterator3.next();if(_i4.done)break;_ref7=_i4.value;}var child=_ref7;
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
if(!_navigationStore2.default.states[key]){
_navigationStore2.default.states[key]={};
}
for(var _iterator5=Object.keys(props),_isArray5=Array.isArray(_iterator5),_i6=0,_iterator5=_isArray5?_iterator5:_iterator5[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref9;if(_isArray5){if(_i6>=_iterator5.length)break;_ref9=_iterator5[_i6++];}else{_i6=_iterator5.next();if(_i6.done)break;_ref9=_i6.value;}var transition=_ref9;
if(reservedKeys.indexOf(transition)===-1&&props[transition]instanceof Function){
_navigationStore2.default.states[key][transition]=props[transition];
}
}
delete props.children;
if(success){
_navigationStore2.default.states[key].success=success instanceof Function?
success:function(args){console.log('Transition to state='+success);_navigationStore2.default[success](args);};
}
if(failure){
_navigationStore2.default.states[key].failure=failure instanceof Function?
failure:function(args){console.log('Transition to state='+failure);_navigationStore2.default[failure](args);};
}

var screen={
screen:createWrapper(component,wrapBy)||processScene(_child,commonProps,clones)||lightbox&&_reactNative.View,
navigationOptions:createNavigationOptions(_extends({},commonProps,getProperties(component),_child.props,{init:init,component:component}))};



var wrapNavBar=drawer||tabs||wrap;
if(component&&wrapNavBar){
res[key]={screen:processScene({key:key,props:{children:{key:'_'+key,props:_extends({},_child.props,{wrap:false})}}},commonProps,clones,wrapBy)};
}else{
res[key]=screen;
}


props.init=true;
if(!_navigationStore2.default[key]){
_navigationStore2.default[key]=new Function('actions','props','type','return function '+
key+'(params){ actions.execute(type, \''+key+'\', props, params)}')(_navigationStore2.default,_extends({},commonProps,props),type);
}

if((onEnter||on||component&&component.onEnter)&&!_navigationStore2.default[key+_Util.OnEnter]){
_navigationStore2.default[key+_Util.OnEnter]=onEnter||on||component.onEnter;
}

if((onExit||component&&component.onExit)&&!_navigationStore2.default[key+_Util.OnExit]){
_navigationStore2.default[key+_Util.OnExit]=onExit||component.onExit;
}

order.push(key);
if(_child.props.initial||!initialRouteName){
initialRouteName=key;
initialRouteParams=_extends({},commonProps,props);
}};for(var _iterator4=children,_isArray4=Array.isArray(_iterator4),_i5=0,_iterator4=_isArray4?_iterator4:_iterator4[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref8;if(_isArray4){if(_i5>=_iterator4.length)break;_ref8=_iterator4[_i5++];}else{_i5=_iterator4.next();if(_i5.done)break;_ref8=_i5.value;}var _child=_ref8;_loop(_child);
}
var mode=modal?'modal':'card';
if(navigator){
return navigator(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,order:order},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}
if(lightbox){
return(0,_LightboxNavigator2.default)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}else if(tabs){
return(0,_reactNavigation.TabNavigator)(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,order:order},commonProps,{
tabBarOptions:createTabBarOptions(commonProps),navigationOptions:createNavigationOptions(commonProps)}));
}else if(drawer){
return(0,_reactNavigation.DrawerNavigator)(res,_extends({initialRouteName:initialRouteName,contentComponent:contentComponent,order:order},commonProps));
}
return(0,_reactNavigation.StackNavigator)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}

var Router=function Router(_ref10){var createReducer=_ref10.createReducer,getSceneStyle=_ref10.getSceneStyle,_ref10$wrapBy=_ref10.wrapBy,wrapBy=_ref10$wrapBy===undefined?function(props){return props;}:_ref10$wrapBy,props=_objectWithoutProperties(_ref10,['createReducer','getSceneStyle','wrapBy']);
(0,_Util.assert)(!Array.isArray(props.children),'Router should contain only one scene, please wrap your scenes with Scene ');
var scene=props.children;
var data=_extends({},props);
if(getSceneStyle){
data.cardStyle=getSceneStyle();
}
var AppNavigator=processScene(scene,data,[],wrapBy);
_navigationStore2.default.router=AppNavigator.router;
_navigationStore2.default.reducer=createReducer&&createReducer(props);
RightNavBarButton=wrapBy(_NavBar.RightButton);
LeftNavBarButton=wrapBy(_NavBar.LeftButton);
return _react2.default.createElement(App,{navigator:AppNavigator,__source:{fileName:_jsxFileName,lineNumber:330}});
};
Router.propTypes={
createReducer:_propTypes2.default.func,
wrapBy:_propTypes2.default.func,
getSceneStyle:_propTypes2.default.func,
children:_propTypes2.default.element};exports.default=


Router;