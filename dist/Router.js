Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _class,_class2,_temp2,_jsxFileName='src/Router.js';var _react=require('react');var _react2=_interopRequireDefault(_react);
var _native=require('mobx-react/native');
var _reactNative=require('react-native');
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNavigation=require('react-navigation');
var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);
var _pathParser=require('./pathParser');var _pathParser2=_interopRequireDefault(_pathParser);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


App=(0,_native.observer)(_class=(_temp2=_class2=function(_React$Component){_inherits(App,_React$Component);function App(){var _ref;var _temp,_this,_ret;_classCallCheck(this,App);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=App.__proto__||Object.getPrototypeOf(App)).call.apply(_ref,[this].concat(args))),_this),_this.





















onBackPress=function(){return _navigationStore2.default.pop();},_this.

handleDeepURL=function(e){return _this.parseDeepURL(e.url);},_this.

parseDeepURL=function(url){

if(!url){return;}


var cleanUrl=_this.props.uriPrefix?url.split(_this.props.uriPrefix)[1]:url;

var allPaths=Object.values(_navigationStore2.default.states).map(function(obj){return obj.path;}).filter(function(path){return path;});

var parsedPath=(0,_pathParser2.default)(cleanUrl,allPaths);


if(!parsedPath){return;}var


path=parsedPath.path,params=parsedPath.params;


var actionKey=Object.entries(_navigationStore2.default.states).
filter(function(_ref2){var _ref3=_slicedToArray(_ref2,2),value=_ref3[1];return value.path===path;}).
map(function(_ref4){var _ref5=_slicedToArray(_ref4,1),key=_ref5[0];return key;}).
find(function(key){return key;});

if(_this.props.onDeepLink){
_this.props.onDeepLink({url:url,action:actionKey,params:params});
}else if(actionKey&&_navigationStore2.default[actionKey]){

_navigationStore2.default[actionKey](params);
}
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(App,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;_reactNative.BackHandler.addEventListener('hardwareBackPress',this.props.backAndroidHandler||this.onBackPress);_reactNative.Linking.getInitialURL().then(function(url){return _this2.parseDeepURL(url);});_reactNative.Linking.addEventListener('url',this.handleDeepURL);}},{key:'componentWillUnmount',value:function componentWillUnmount(){_reactNative.BackHandler.removeEventListener('hardwareBackPress',this.props.backAndroidHandler||this.onBackPress);_reactNative.Linking.removeEventListener('url',this.handleDeepURL);}},{key:'render',value:function render()

{
var AppNavigator=this.props.navigator;
return(
_react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:_navigationStore2.default.dispatch,state:_navigationStore2.default.state}),__source:{fileName:_jsxFileName,lineNumber:70}}));

}}]);return App;}(_react2.default.Component),_class2.propTypes={navigator:_propTypes2.default.func,backAndroidHandler:_propTypes2.default.func,uriPrefix:_propTypes2.default.string,onDeepLink:_propTypes2.default.func},_temp2))||_class;


var Router=function Router(_ref6){var createReducer=_ref6.createReducer,sceneStyle=_ref6.sceneStyle,scenes=_ref6.scenes,uriPrefix=_ref6.uriPrefix,navigator=_ref6.navigator,getSceneStyle=_ref6.getSceneStyle,children=_ref6.children,state=_ref6.state,dispatch=_ref6.dispatch,onDeepLink=_ref6.onDeepLink,_ref6$wrapBy=_ref6.wrapBy,wrapBy=_ref6$wrapBy===undefined?function(props){return props;}:_ref6$wrapBy,props=_objectWithoutProperties(_ref6,['createReducer','sceneStyle','scenes','uriPrefix','navigator','getSceneStyle','children','state','dispatch','onDeepLink','wrapBy']);
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
return _react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:dispatch,state:state}),uriPrefix:uriPrefix,__source:{fileName:_jsxFileName,lineNumber:89}});
}
return _react2.default.createElement(App,_extends({},props,{onDeepLink:onDeepLink,navigator:AppNavigator,uriPrefix:uriPrefix,__source:{fileName:_jsxFileName,lineNumber:91}}));
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
children:_propTypes2.default.element,
uriPrefix:_propTypes2.default.string,
onDeepLink:_propTypes2.default.func};exports.default=


Router;