Object.defineProperty(exports,"__esModule",{value:true});exports.actionMap=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _actionMap,_jsxFileName='src/navigationStore.js',_desc,_value,_class2,_descriptor,_descriptor2,_descriptor3,_descriptor4;var _react=require('react');var _react2=_interopRequireDefault(_react);
var _mobx=require('mobx');
var _ActionConst=require('./ActionConst');var ActionConst=_interopRequireWildcard(_ActionConst);
var _Util=require('./Util');
var _reactNative=require('react-native');
var _reactNavigation=require('react-navigation');
var _NavBar=require('./NavBar');
var _LightboxNavigator=require('./LightboxNavigator');var _LightboxNavigator2=_interopRequireDefault(_LightboxNavigator);
var _menu_burger=require('../images/menu_burger.png');var _menu_burger2=_interopRequireDefault(_menu_burger);
var _Scene=require('./Scene');var _Scene2=_interopRequireDefault(_Scene);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _State=require('./State');
var _Reducer=require('./Reducer');
var _lodash=require('lodash.isequal');var _lodash2=_interopRequireDefault(_lodash);
var _Modal=require('./Modal');var _Modal2=_interopRequireDefault(_Modal);
var _Lightbox=require('./Lightbox');var _Lightbox2=_interopRequireDefault(_Lightbox);
var _Drawer=require('./Drawer');var _Drawer2=_interopRequireDefault(_Drawer);
var _Tabs=require('./Tabs');var _Tabs2=_interopRequireDefault(_Tabs);
var _Overlay=require('./Overlay');var _Overlay2=_interopRequireDefault(_Overlay);
var _OverlayNavigator=require('./OverlayNavigator');var _OverlayNavigator2=_interopRequireDefault(_OverlayNavigator);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0});}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key];});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true;}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc;},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined;}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null;}return desc;}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var RightNavBarButton=void 0;
var LeftNavBarButton=void 0;
var BackNavBarButton=void 0;
var counter=0;

var actionMap=exports.actionMap=(_actionMap={},_defineProperty(_actionMap,
ActionConst.JUMP,'jump'),_defineProperty(_actionMap,
ActionConst.PUSH,'push'),_defineProperty(_actionMap,
ActionConst.REPLACE,'replace'),_defineProperty(_actionMap,
ActionConst.BACK,'pop'),_defineProperty(_actionMap,
ActionConst.BACK_ACTION,'pop'),_defineProperty(_actionMap,
ActionConst.POP_TO,'popTo'),_defineProperty(_actionMap,
ActionConst.REFRESH,'refresh'),_defineProperty(_actionMap,
ActionConst.RESET,'reset'),_defineProperty(_actionMap,
ActionConst.PUSH_OR_POP,'push'),_actionMap);


var reservedKeys=[
'children',
'refs',
'addRef',
'removeRef',
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
'contentComponent',
'tabBarComponent',
'modal',
'drawer',
'lightbox',
'overlay',
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
'hideTabBar',
'backToInitial'];


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



params.title,backButtonImage=params.backButtonImage,navTransparent=params.navTransparent,backToInitial=params.backToInitial,hideNavBar=params.hideNavBar,hideTabBar=params.hideTabBar,backTitle=params.backTitle,right=params.right,rightButton=params.rightButton,left=params.left,leftButton=params.leftButton,navigationBarStyle=params.navigationBarStyle,headerStyle=params.headerStyle,navBarButtonColor=params.navBarButtonColor,tabBarLabel=params.tabBarLabel,tabBarIcon=params.tabBarIcon,icon=params.icon,getTitle=params.getTitle,renderTitle=params.renderTitle,panHandlers=params.panHandlers,navigationBarTitleImage=params.navigationBarTitleImage,navigationBarTitleImageStyle=params.navigationBarTitleImageStyle,component=params.component,rightTitle=params.rightTitle,leftTitle=params.leftTitle,leftButtonTextStyle=params.leftButtonTextStyle,rightButtonTextStyle=params.rightButtonTextStyle,backButtonTextStyle=params.backButtonTextStyle,headerTitleStyle=params.headerTitleStyle,titleStyle=params.titleStyle,navBar=params.navBar,onRight=params.onRight,onLeft=params.onLeft,rightButtonImage=params.rightButtonImage,leftButtonImage=params.leftButtonImage,init=params.init,back=params.back,renderBackButton=params.renderBackButton,renderNavigationBar=params.renderNavigationBar,hideDrawerButton=params.hideDrawerButton,drawerIcon=params.drawerIcon,drawerImage=params.drawerImage,drawerPosition=params.drawerPosition,props=_objectWithoutProperties(params,['title','backButtonImage','navTransparent','backToInitial','hideNavBar','hideTabBar','backTitle','right','rightButton','left','leftButton','navigationBarStyle','headerStyle','navBarButtonColor','tabBarLabel','tabBarIcon','icon','getTitle','renderTitle','panHandlers','navigationBarTitleImage','navigationBarTitleImageStyle','component','rightTitle','leftTitle','leftButtonTextStyle','rightButtonTextStyle','backButtonTextStyle','headerTitleStyle','titleStyle','navBar','onRight','onLeft','rightButtonImage','leftButtonImage','init','back','renderBackButton','renderNavigationBar','hideDrawerButton','drawerIcon','drawerImage','drawerPosition']);
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


var NavBarFromParams=navigationParams.renderNavigationBar||navigationParams.navBar;
if(NavBarFromParams!=null){
if(NavBarFromParams){
res.header=function(data){return _react2.default.createElement(NavBarFromParams,_extends({navigation:navigation},state,data,{__source:{fileName:_jsxFileName,lineNumber:142}}));};
}
}else if(NavBar){
res.header=function(data){return _react2.default.createElement(NavBar,_extends({navigation:navigation},state,data,{__source:{fileName:_jsxFileName,lineNumber:145}}));};
}

if(typeof navigationParams.panHandlers!=='undefined'){
if(navigationParams.panHandlers===null){
res.gesturesEnabled=false;
}
}else if(panHandlers===null){
res.gesturesEnabled=false;
}

if(navigationBarTitleImage){
res.headerTitle=_react2.default.createElement(_reactNative.Image,{source:navigationBarTitleImage,style:navigationBarTitleImageStyle,__source:{fileName:_jsxFileName,lineNumber:157}});
}

if(tabBarLabel){
res.tabBarLabel=tabBarLabel;
}

if(tabBarIcon||icon){
var Icon=tabBarIcon||icon;
res.tabBarIcon=function(data){return _react2.default.createElement(Icon,_extends({},state,data,{__source:{fileName:_jsxFileName,lineNumber:166}}));};
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
(drawerImage||drawerIcon)&&!hideDrawerButton&&drawerPosition==='right'){
res.headerRight=getValue(navigationParams.right||navigationParams.rightButton||params.renderRightButton,_extends({},
navigationParams,screenProps))||_react2.default.createElement(RightNavBarButton,_extends({},params,navigationParams,componentData,{__source:{fileName:_jsxFileName,lineNumber:184}}));
}

if(leftButtonImage||backButtonImage||backTitle||leftTitle||params.renderLeftButton||leftButtonTextStyle||renderBackButton||
backButtonTextStyle||onLeft||navigationParams.leftTitle||navigationParams.onLeft||navigationParams.leftButtonImage||
navigationParams.backButtonImage||navigationParams.backTitle||(drawerImage||drawerIcon)&&!hideDrawerButton&&drawerPosition!=='right'){
res.headerLeft=getValue(navigationParams.left||navigationParams.leftButton||params.renderLeftButton,_extends({},params,navigationParams,screenProps))||
(onLeft&&(leftTitle||navigationParams.leftTitle||leftButtonImage||navigationParams.leftButtonImage)||drawerImage||drawerIcon)&&
_react2.default.createElement(LeftNavBarButton,_extends({},params,navigationParams,componentData,{__source:{fileName:_jsxFileName,lineNumber:192}}))||res.headerLeft||(
init?null:renderBackButton&&renderBackButton(state)||_react2.default.createElement(BackNavBarButton,_extends({},state,{__source:{fileName:_jsxFileName,lineNumber:193}})));
}

if(back){
res.headerLeft=renderBackButton&&renderBackButton(state)||_react2.default.createElement(BackNavBarButton,_extends({},state,{__source:{fileName:_jsxFileName,lineNumber:197}}));
}

if(typeof navigationParams.left!=='undefined'||typeof navigationParams.leftButton!=='undefined'||
typeof navigationParams.renderLeftButton!=='undefined'){
if(navigationParams.left===null||navigationParams.leftButton===null||navigationParams.renderLeftButton===null){
res.headerLeft=null;
}
}



if(navigationParams.hideTabBar!=null){
if(navigationParams.hideTabBar){
res.tabBarVisible=false;
}
}else if(hideTabBar){
res.tabBarVisible=false;
}

if(navigationParams.hideNavBar!=null){
if(navigationParams.hideNavBar){
res.header=null;
}
}else if(hideNavBar){
res.header=null;
}

if(navTransparent){
res.headerStyle={position:'absolute',backgroundColor:'transparent',zIndex:100,top:0,left:0,right:0,
borderBottomWidth:0,elevation:1};
}

if(backToInitial){
res.tabBarOnPress=function(_ref4){var scene=_ref4.scene,jumpToIndex=_ref4.jumpToIndex;
if(scene.focused){
if(scene.route.index!==0){






for(var i=1;i<scene.route.routes.length;i++){
navigation.dispatch(_reactNavigation.NavigationActions.back());
}
}
}else{
jumpToIndex(scene.index);
}
};
}
return res;
};
}
function originalRouteName(routeName){
if(routeName.startsWith('_')){
return routeName.substring(1);
}
return routeName;
}
function extendProps(props,store){
if(!props){
return{};
}
var res=_extends({},props);var _loop=function _loop(
transition){
if(reservedKeys.indexOf(transition)===-1&&transition.startsWith('on')&&
transition.charAt(2)>='A'&&transition.charAt(2)<='Z'&&typeof props[transition]==='string'){
if(store[props[transition]]){
res[transition]=function(params){return store[props[transition]](params);};
}
}};for(var _iterator2=Object.keys(props),_isArray2=Array.isArray(_iterator2),_i3=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref5;if(_isArray2){if(_i3>=_iterator2.length)break;_ref5=_iterator2[_i3++];}else{_i3=_iterator2.next();if(_i3.done)break;_ref5=_i3.value;}var transition=_ref5;_loop(transition);
}
return res;
}

function createWrapper(Component,wrapBy,store){
if(!Component){
return null;
}
var wrapper=wrapBy||function(props){return props;};




if(!Component.prototype||Component.prototype.render){var _class,_temp;var
Wrapped=(_temp=_class=function(_React$Component){_inherits(Wrapped,_React$Component);



function Wrapped(){_classCallCheck(this,Wrapped);var _this=_possibleConstructorReturn(this,(Wrapped.__proto__||Object.getPrototypeOf(Wrapped)).call(this));

_this.onRef=_this.onRef.bind(_this);return _this;
}_createClass(Wrapped,[{key:'componentDidMount',value:function componentDidMount()
{
var navigation=this.props.navigation;
if(this.ref&&navigation&&navigation.state&&navigation.state.routeName){
store.addRef(originalRouteName(navigation.state.routeName),this.ref);
}
}},{key:'componentWillUnmount',value:function componentWillUnmount()
{
var navigation=this.props.navigation;
this.ref=null;
if(this.ref&&navigation&&navigation.state&&navigation.state.routeName){
store.deleteRef(originalRouteName(navigation.state.routeName));
}
}},{key:'onRef',value:function onRef(
ref){
this.ref=ref;
}},{key:'render',value:function render()
{
var navigation=this.props.navigation;
if(!navigation||!navigation.state){
return _react2.default.createElement(Component,_extends({ref:this.onRef},this.props,{__source:{fileName:_jsxFileName,lineNumber:311}}));
}
return _react2.default.createElement(Component,_extends({ref:this.onRef},this.props,extendProps(navigation.state.params,store),{name:navigation.state.routeName,__source:{fileName:_jsxFileName,lineNumber:313}}));
}}]);return Wrapped;}(_react2.default.Component),_class.propTypes={navigation:_propTypes2.default.object},_temp);

return wrapper(Wrapped);
}


function StatelessWrapped(_ref6){var navigation=_ref6.navigation,props=_objectWithoutProperties(_ref6,['navigation']);
return _react2.default.createElement(Component,_extends({},props,{navigation:navigation},extendProps(navigation.state.params,store),{name:navigation.state.routeName,__source:{fileName:_jsxFileName,lineNumber:321}}));
}
StatelessWrapped.propTypes={
navigation:_propTypes2.default.object};

return wrapper(StatelessWrapped);
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
for(var _iterator3=params,_isArray3=Array.isArray(_iterator3),_i4=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref7;if(_isArray3){if(_i4>=_iterator3.length)break;_ref7=_iterator3[_i4++];}else{_i4=_iterator3.next();if(_i4.done)break;_ref7=_i4.value;}var param=_ref7;
if(param){
res=_extends({},res,filterParam(param));
}
}
res.routeName=routeName;
return res;
}

var defaultSuccess=function defaultSuccess(){};
var defaultFailure=function defaultFailure(){};var

NavigationStore=(_class2=function(){function NavigationStore(){var _this2=this;_classCallCheck(this,NavigationStore);this.
refs={};this.
states={};this.
reducer=null;_initDefineProp(this,'currentScene',_descriptor,this);_initDefineProp(this,'prevScene',_descriptor2,this);_initDefineProp(this,'currentParams',_descriptor3,this);this.













addRef=function(name,ref){
_this2.refs[name]=ref;
};this.

deleteRef=function(name){
delete _this2.refs[name];
};this.

create=function(scene){var params=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var wrapBy=arguments.length>2&&arguments[2]!==undefined?arguments[2]:function(props){return props;};
(0,_Util.assert)(!Array.isArray(scene),'Router should contain only one scene, please wrap your scenes with root Scene ');
RightNavBarButton=wrapBy(_NavBar.RightButton);
LeftNavBarButton=wrapBy(_NavBar.LeftButton);
BackNavBarButton=wrapBy(_NavBar.BackButton);
var AppNavigator=_this2.processScene(scene,params,[],wrapBy);
_this2.router=AppNavigator.router;
_this2.dispatch(_reactNavigation.NavigationActions.init());
return AppNavigator;
};this.

processScene=function(scene){var inheritProps=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var clones=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var wrapBy=arguments[3];
(0,_Util.assert)(scene.props,'props should be defined');
if(!scene.props.children){
return null;
}
var res={};
var order=[];var _scene$props=
scene.props,navigator=_scene$props.navigator,contentComponent=_scene$props.contentComponent,drawerWidth=_scene$props.drawerWidth,drawerLockMode=_scene$props.drawerLockMode,lazy=_scene$props.lazy,duration=_scene$props.duration,parentProps=_objectWithoutProperties(_scene$props,['navigator','contentComponent','drawerWidth','drawerLockMode','lazy','duration']);var
tabs=parentProps.tabs,modal=parentProps.modal,lightbox=parentProps.lightbox,overlay=parentProps.overlay,tabBarPosition=parentProps.tabBarPosition,drawer=parentProps.drawer,tabBarComponent=parentProps.tabBarComponent,transitionConfig=parentProps.transitionConfig;
if(scene.type===_Modal2.default){
modal=true;
}else if(scene.type===_Drawer2.default){
drawer=true;
}else if(scene.type===_Lightbox2.default){
lightbox=true;
}else if(scene.type===_Tabs2.default){
tabs=true;
}else if(scene.type===_Overlay2.default){
overlay=true;
}

if(duration!==undefined&&!transitionConfig){
transitionConfig=function transitionConfig(){return{transitionSpec:{duration:duration,timing:_reactNative.Animated.timing,easing:_reactNative.Easing.step0}};};
}

var commonProps=_extends({},inheritProps,parentProps);
delete commonProps.children;
delete commonProps.component;

for(var _iterator4=Object.keys(commonProps),_isArray4=Array.isArray(_iterator4),_i5=0,_iterator4=_isArray4?_iterator4:_iterator4[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref8;if(_isArray4){if(_i5>=_iterator4.length)break;_ref8=_iterator4[_i5++];}else{_i5=_iterator4.next();if(_i5.done)break;_ref8=_i5.value;}var pkey=_ref8;
if(dontInheritKeys.includes(pkey)&&(pkey==='type'||pkey==='hideNavBar'||!parentProps[pkey])){
delete commonProps[pkey];
}
}

if(drawer){
commonProps.drawerImage=commonProps.drawerImage||_menu_burger2.default;
}

var children=!Array.isArray(parentProps.children)?[parentProps.children]:[].concat.apply([],parentProps.children);

if(!drawer&&!tabs&&!overlay){
children.push.apply(children,_toConsumableArray(clones));
}

for(var _iterator5=children,_isArray5=Array.isArray(_iterator5),_i6=0,_iterator5=_isArray5?_iterator5:_iterator5[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref9;if(_isArray5){if(_i6>=_iterator5.length)break;_ref9=_iterator5[_i6++];}else{_i6=_iterator5.next();if(_i6.done)break;_ref9=_i6.value;}var child=_ref9;
if(child.props.clone){
if(clones.indexOf(child)===-1){
clones.push(child);
}
}
}
var initialRouteName=void 0;
var initialRouteParams=void 0;var _loop2=function _loop2(
_child){
var key=_child.key||'key'+counter++;
var init=key===children[0].key;
(0,_Util.assert)(reservedKeys.indexOf(key)===-1,'Scene name cannot be reserved word: '+_child.key);var _child$props=
_child.props,component=_child$props.component,_child$props$type=_child$props.type,type=_child$props$type===undefined?tabs||drawer?'jump':'push':_child$props$type,path=_child$props.path,onEnter=_child$props.onEnter,onExit=_child$props.onExit,on=_child$props.on,failure=_child$props.failure,success=_child$props.success,wrap=_child$props.wrap,_child$props$initial=_child$props.initial,initial=_child$props$initial===undefined?false:_child$props$initial,props=_objectWithoutProperties(_child$props,['component','type','path','onEnter','onExit','on','failure','success','wrap','initial']);
if(!_this2.states[key]){
_this2.states[key]={};
}
for(var _iterator7=Object.keys(props),_isArray7=Array.isArray(_iterator7),_i8=0,_iterator7=_isArray7?_iterator7:_iterator7[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref11;if(_isArray7){if(_i8>=_iterator7.length)break;_ref11=_iterator7[_i8++];}else{_i8=_iterator7.next();if(_i8.done)break;_ref11=_i8.value;}var transition=_ref11;
if(reservedKeys.indexOf(transition)===-1&&props[transition]instanceof Function){
_this2.states[key][transition]=props[transition];
}
}
delete props.children;
if(success){
_this2.states[key].success=success instanceof Function?
success:function(args){console.log('Transition to state='+success);_this2[success](args);};
}
if(failure){
_this2.states[key].failure=failure instanceof Function?
failure:function(args){console.log('Transition to state='+failure);_this2[failure](args);};
}
if(path){
_this2.states[key].path=path;
}

var screen={
screen:createWrapper(component,wrapBy,_this2)||_this2.processScene(_child,commonProps,clones)||lightbox&&function(){return null;},
navigationOptions:createNavigationOptions(_extends({},commonProps,{hideNavBar:parentProps.hideNavBar},getProperties(component),_child.props,{init:init,component:component}))};



var wrapNavBar=drawer||tabs||wrap;
if(wrap===false||commonProps.wrap===false){
wrapNavBar=false;
}
if(component&&wrapNavBar){
res[key]={
screen:_this2.processScene({key:key,props:{children:{key:'_'+key,props:_extends({},_child.props,{wrap:false})}}},commonProps,clones,wrapBy),
navigationOptions:createNavigationOptions(_extends({},commonProps,_child.props,{hideNavBar:true}))};

}else{
res[key]=screen;
}


props.init=true;
if(!_this2[key]){
_this2[key]=new Function('actions','props','type','return function '+
key.replace(/\W/g,'_')+'(params){ actions.execute(type, \''+key+'\', props, params)}')(_this2,_extends({},commonProps,props),type);
}

if((onEnter||on||component&&component.onEnter)&&!_this2[key+_Util.OnEnter]){
_this2[key+_Util.OnEnter]=onEnter||on||component.onEnter;
}

if((onExit||component&&component.onExit)&&!_this2[key+_Util.OnExit]){
_this2[key+_Util.OnExit]=onExit||component.onExit;
}

order.push(key);
if(initial||_child.props.initial||!initialRouteName){
initialRouteName=key;
initialRouteParams=_extends({},commonProps,props);
}};for(var _iterator6=children,_isArray6=Array.isArray(_iterator6),_i7=0,_iterator6=_isArray6?_iterator6:_iterator6[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref10;if(_isArray6){if(_i7>=_iterator6.length)break;_ref10=_iterator6[_i7++];}else{_i7=_iterator6.next();if(_i7.done)break;_ref10=_i7.value;}var _child=_ref10;_loop2(_child);
}
var mode=modal?'modal':'card';
if(navigator){
return navigator(res,_extends({lazy:lazy,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,contentComponent:contentComponent,order:order},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}
if(lightbox){
return(0,_LightboxNavigator2.default)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},commonProps,{navigationOptions:createNavigationOptions(commonProps)}));
}else if(tabs){
if(!tabBarComponent){
tabBarComponent=tabBarPosition==='top'?function(props){return _react2.default.createElement(_reactNavigation.TabBarTop,_extends({},props,commonProps,{__source:{fileName:_jsxFileName,lineNumber:519}}));}:
function(props){return _react2.default.createElement(_reactNavigation.TabBarBottom,_extends({},props,commonProps,{__source:{fileName:_jsxFileName,lineNumber:520}}));};
}
if(!tabBarPosition){
tabBarPosition=_reactNative.Platform.OS==='android'?'top':'bottom';
}
return(0,_reactNavigation.TabNavigator)(res,_extends({lazy:lazy,tabBarComponent:tabBarComponent,tabBarPosition:tabBarPosition,initialRouteName:initialRouteName,initialRouteParams:initialRouteParams,order:order},commonProps,{
tabBarOptions:createTabBarOptions(commonProps),navigationOptions:createNavigationOptions(commonProps)}));
}else if(drawer){
var config=_extends({initialRouteName:initialRouteName,contentComponent:contentComponent,order:order},commonProps);
if(drawerWidth){
config.drawerWidth=drawerWidth;
}
if(drawerLockMode){
config.drawerLockMode=drawerLockMode;
}
return(0,_reactNavigation.DrawerNavigator)(res,config);
}else if(overlay){
return(0,_OverlayNavigator2.default)(res,_extends({lazy:lazy,initialRouteName:initialRouteName,contentComponent:contentComponent,initialRouteParams:initialRouteParams,order:order},commonProps,{
tabBarOptions:createTabBarOptions(commonProps),navigationOptions:createNavigationOptions(commonProps)}));
}
return(0,_reactNavigation.StackNavigator)(res,_extends({mode:mode,initialRouteParams:initialRouteParams,initialRouteName:initialRouteName},commonProps,{transitionConfig:transitionConfig,navigationOptions:createNavigationOptions(commonProps)}));
};this.

nextState=function(state,cmd){return _this2.reducer?_this2.reducer(state,cmd):(0,_Reducer.reducer)(state,cmd);};this.

dispatch=function(cmd){
_this2.setState(_this2.nextState(_this2.state,cmd));
};_initDefineProp(this,'setState',_descriptor4,this);this.



























































execute=function(actionType,routeName){for(var _len=arguments.length,params=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){params[_key-2]=arguments[_key];}
var res=uniteParams(routeName,params);
var overridenType=res.type||actionType;
var type=actionMap[overridenType]||overridenType;
if(type==='pop'){
_this2[type](res);
}else{
_this2[type](routeName,res);
}
};this.

push=function(routeName,data){
var params=filterParam(data);
_this2.dispatch({type:ActionConst.PUSH,routeName:routeName,params:params});
};this.

jump=function(routeName,data){
var params=filterParam(data);
_this2.dispatch({type:ActionConst.JUMP,routeName:routeName,params:params});
};this.

drawerOpen=function(){
_this2.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerOpen'}));
};this.

drawerClose=function(){
_this2.dispatch(_reactNavigation.NavigationActions.navigate({routeName:'DrawerClose'}));
};this.

refresh=function(data){
var key=(0,_State.getActiveState)(_this2._state).key;
var params=filterParam(data);
_this2.dispatch(_reactNavigation.NavigationActions.setParams({key:key,params:params}));
};this.

pop=function(){var _ref12=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},timeout=_ref12.timeout,params=_objectWithoutProperties(_ref12,['timeout']);
var previous=(0,_State.getActiveState)(_this2.state);
var res=filterParam(params);
if(timeout){
setTimeout(function(){return _this2.pop(params);},timeout);
}else{
_this2.dispatch(_reactNavigation.NavigationActions.back());
if(res.refresh){
_this2.refresh(res.refresh);
}
}
return!(0,_lodash2.default)(previous,(0,_State.getActiveState)(_this2.state));
};this.

popTo=function(routeName,data){
var params=filterParam(data);
_this2.dispatch({type:ActionConst.POP_TO,routeName:routeName,params:params});
};this.

popAndPush=function(routeName,data){
var params=filterParam(data);
_this2.dispatch({type:ActionConst.POP_AND_PUSH,routeName:routeName,params:params});
};this.

replace=function(routeName,data){
var params=filterParam(data);
_this2.dispatch({type:ActionConst.REPLACE,routeName:routeName,params:params});
};this.

reset=function(routeName,data){
var params=filterParam(data);
_this2.dispatch(_reactNavigation.NavigationActions.reset({key:null,index:0,actions:[_reactNavigation.NavigationActions.navigate({
routeName:routeName,
params:params})]}));

};}_createClass(NavigationStore,[{key:'state',get:function get(){var scene=this.currentScene;var params=this.currentParams;return this._state;}}]);return NavigationStore;}(),(_descriptor=_applyDecoratedDescriptor(_class2.prototype,'currentScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor2=_applyDecoratedDescriptor(_class2.prototype,'prevScene',[_mobx.observable],{enumerable:true,initializer:function initializer(){return'';}}),_descriptor3=_applyDecoratedDescriptor(_class2.prototype,'currentParams',[_mobx.observable],{enumerable:true,initializer:null}),_descriptor4=_applyDecoratedDescriptor(_class2.prototype,'setState',[_mobx.action],{enumerable:true,initializer:function initializer(){var _this3=this;return function _callee(newState){var state,currentScene,exitHandler,res,handler,_success,_failure,params,_res;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(newState){_context.next=2;break;}return _context.abrupt('return');case 2:state=(0,_State.getActiveState)(newState);if(!((0,_lodash2.default)(state.params,_this3._currentParams)&&state.routeName===_this3.currentScene)){_context.next=5;break;}return _context.abrupt('return');case 5:currentScene=_this3.currentScene;_this3._state=newState;_this3.currentScene=state.routeName;_this3.prevScene=currentScene;_this3.currentParams=state.params;_this3._currentParams=state.params;if(!(currentScene!==_this3.currentScene&&_this3.currentScene!=='DrawerOpen'&&_this3.currentScene!=='DrawerClose')){_context.next=32;break;}_this3.dispatch({type:ActionConst.BLUR,routeName:currentScene});exitHandler=_this3[currentScene+_Util.OnExit];if(exitHandler){try{res=exitHandler();if(res instanceof Promise){res.then(defaultSuccess,defaultFailure);}}catch(e){console.error('Error during onExit handler:',e);}}_this3.dispatch({type:ActionConst.FOCUS,routeName:_this3.currentScene,params:_this3._currentParams});if(!_this3.states[_this3.currentScene]){_context.next=32;break;}handler=_this3[_this3.currentScene+_Util.OnEnter];_success=_this3.states[_this3.currentScene].success||defaultSuccess;_failure=_this3.states[_this3.currentScene].failure||defaultFailure;if(!handler){_context.next=32;break;}_context.prev=21;params=(0,_State.getActiveState)(_this3._state).params;_context.next=25;return regeneratorRuntime.awrap(handler(params));case 25:_res=_context.sent;if(_res){_success(_res);}else{_failure();}_context.next=32;break;case 29:_context.prev=29;_context.t0=_context['catch'](21);_failure({error:_context.t0.message});case 32:case'end':return _context.stop();}}},null,_this3,[[21,29]]);};}})),_class2);exports.default=



new NavigationStore();