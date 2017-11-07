Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _class,_temp,_jsxFileName='src/Router.js';var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNavigation=require('react-navigation');

var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Router=(_temp=_class=function(_React$Component){_inherits(Router,_React$Component);












function Router(){var _ref;_classCallCheck(this,Router);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}var _this=_possibleConstructorReturn(this,(_ref=Router.__proto__||Object.getPrototypeOf(Router)).call.apply(_ref,[this].concat(
args)));var _this$props=

_this.props,createReducer=_this$props.createReducer,sceneStyle=_this$props.sceneStyle,scenes=_this$props.scenes,navigator=_this$props.navigator,getSceneStyle=_this$props.getSceneStyle,children=_this$props.children,state=_this$props.state,dispatch=_this$props.dispatch,_this$props$wrapBy=_this$props.wrapBy,wrapBy=_this$props$wrapBy===undefined?function(props){return props;}:_this$props$wrapBy,props=_objectWithoutProperties(_this$props,['createReducer','sceneStyle','scenes','navigator','getSceneStyle','children','state','dispatch','wrapBy']);

var data=_extends({},props);

if(getSceneStyle){
data.cardStyle=getSceneStyle(props);
}
if(sceneStyle){
data.cardStyle=sceneStyle;
}

_this.AppNavigator=scenes||navigator||_navigationStore2.default.create(children,data,wrapBy);


_navigationStore2.default.integrateNavigator(_this.AppNavigator);

_navigationStore2.default.reducer=createReducer&&createReducer(props);

if(dispatch&&state){


_navigationStore2.default.setState(state);
_navigationStore2.default.dispatch=dispatch;
}return _this;
}_createClass(Router,[{key:'componentDidMount',value:function componentDidMount()

{var _this2=this;
if(!_navigationStore2.default.dispatch){
_navigationStore2.default.dispatch=this.navigator._navigation.dispatch;
_navigationStore2.default.getState=function(){return _this2.navigator._navigation.state;};
}
return _react2.default.createElement(App,_extends({},props,{navigator:AppNavigator,__source:{fileName:_jsxFileName,lineNumber:52}}));
};
Router.propTypes={
createReducer:_propTypes2.default.func,
dispatch:_propTypes2.default.func,
state:_propTypes2.default.object,
scenes:_propTypes2.default.func,
navigator:_propTypes2.default.func,
wrapBy:_propTypes2.default.func,
getSceneStyle:_propTypes2.default.func,
sceneStyle:_reactNative.ViewPropTypes.style,
children:_propTypes2.default.element};exports.default=

{var _this3=this;var _props=
this.props,dispatch=_props.dispatch,state=_props.state;
var AppNavigator=this.AppNavigator;

return(
_react2.default.createElement(AppNavigator,{
ref:function ref(r){_this3.navigator=r;},
navigation:dispatch&&state?(0,_reactNavigation.addNavigationHelpers)({dispatch:dispatch,state:state}):null,
onNavigationStateChange:_navigationStore2.default.onNavigationStateChange,__source:{fileName:_jsxFileName,lineNumber:61}}));


}}]);return Router;}(_react2.default.Component),_class.propTypes={createReducer:_propTypes2.default.func,dispatch:_propTypes2.default.func,state:_propTypes2.default.object,scenes:_propTypes2.default.func,navigator:_propTypes2.default.func,wrapBy:_propTypes2.default.func,getSceneStyle:_propTypes2.default.func,sceneStyle:_propTypes2.default.object,children:_propTypes2.default.element},_temp);exports.default=Router;