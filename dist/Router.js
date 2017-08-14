Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _class,_class2,_temp2,_jsxFileName='src/Router.js';var _react=require('react');var _react2=_interopRequireDefault(_react);
var _native=require('mobx-react/native');
var _reactNative=require('react-native');
var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNavigation=require('react-navigation');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


App=(0,_native.observer)(_class=(_temp2=_class2=function(_React$Component){_inherits(App,_React$Component);function App(){var _ref;var _temp,_this,_ret;_classCallCheck(this,App);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=App.__proto__||Object.getPrototypeOf(App)).call.apply(_ref,[this].concat(args))),_this),_this.













onBackPress=function(){
_navigationStore2.default.pop();
return _navigationStore2.default.currentScene!==_navigationStore2.default.prevScene;
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(App,[{key:'componentDidMount',value:function componentDidMount(){_reactNative.BackHandler.addEventListener('hardwareBackPress',this.props.backAndroidHandler||this.onBackPress);}},{key:'componentWillUnmount',value:function componentWillUnmount(){_reactNative.BackHandler.removeEventListener('hardwareBackPress',this.props.backAndroidHandler||this.onBackPress);}},{key:'render',value:function render()

{
var AppNavigator=this.props.navigator;
return(
_react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:_navigationStore2.default.dispatch,state:_navigationStore2.default.state}),__source:{fileName:_jsxFileName,lineNumber:31}}));

}}]);return App;}(_react2.default.Component),_class2.propTypes={navigator:_propTypes2.default.func,backAndroidHandler:_propTypes2.default.func},_temp2))||_class;


var Router=function Router(_ref2){var createReducer=_ref2.createReducer,sceneStyle=_ref2.sceneStyle,scenes=_ref2.scenes,navigator=_ref2.navigator,getSceneStyle=_ref2.getSceneStyle,children=_ref2.children,state=_ref2.state,dispatch=_ref2.dispatch,_ref2$wrapBy=_ref2.wrapBy,wrapBy=_ref2$wrapBy===undefined?function(props){return props;}:_ref2$wrapBy,props=_objectWithoutProperties(_ref2,['createReducer','sceneStyle','scenes','navigator','getSceneStyle','children','state','dispatch','wrapBy']);
var data=_extends({},props);
if(getSceneStyle){
data.cardStyle=getSceneStyle(props);
}
if(sceneStyle){
data.cardStyle=sceneStyle;
}
var AppNavigator=scenes||navigator||_navigationStore2.default.create(children,data,wrapBy);
_navigationStore2.default.reducer=createReducer&&createReducer(props);
if(dispatch&&state){

_navigationStore2.default.setState(state);
_navigationStore2.default.dispatch=dispatch;
return _react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:dispatch,state:state}),__source:{fileName:_jsxFileName,lineNumber:50}});
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
sceneStyle:_propTypes2.default.object,
children:_propTypes2.default.element};exports.default=


Router;