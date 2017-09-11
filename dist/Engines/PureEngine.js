Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/Engines/PureEngine.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

function WrapState(RouterComponent){var _class,_temp;
return _temp=_class=function(_Component){_inherits(_class,_Component);




function _class(){var _ref;_classCallCheck(this,_class);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}var _this=_possibleConstructorReturn(this,(_ref=_class.__proto__||Object.getPrototypeOf(_class)).call.apply(_ref,[this].concat(
args)));_this.












getState=function(){return _this.state.navigationState;};_this.

dispatch=function(action){
var newState=stateManagerInstance.reducer(_this.state.navigationState,action);

if(!newState)return;

stateManagerInstance.stateChangeHandler(newState);

_this.setState({
navigationState:newState});

};_this.state={navigationState:null};stateManagerInstance.setupStateManager(_this.getState,_this.dispatch);return _this;}_createClass(_class,[{key:'componentDidMount',value:function componentDidMount(){stateManagerInstance.emptyQueue();}},{key:'render',value:function render()

{
if(!this.state.navigationState)return null;

return _react2.default.createElement(RouterComponent,_extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:41}}));
}}]);return _class;}(_react.Component),_class.propTypes={children:_propTypes2.default.any},_temp;

}var

StateManager=function(){function StateManager(){var _this2=this;_classCallCheck(this,StateManager);this.
getState=null;this.
internalDispatch=null;this.

reducer=null;this.
stateChangeHandler=null;this.

queue=[];this.
queueEmptied=false;this.














dispatch=function(action){
if(_this2.internalDispatch&&_this2.queueEmptied){
_this2.internalDispatch(action);
}else{
_this2.queue.push(action);
}
};this.

setupHandlers=function(reducer,setChangedHandler){
_this2.reducer=reducer;
_this2.stateChangeHandler=setChangedHandler;
};}_createClass(StateManager,[{key:'setupStateManager',value:function setupStateManager(getStateFunc,dispatchFunc){this.getState=getStateFunc;this.internalDispatch=dispatchFunc;}},{key:'emptyQueue',value:function emptyQueue(){this.queueEmptied=true;for(var _iterator=this.queue,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref2;if(_isArray){if(_i>=_iterator.length)break;_ref2=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref2=_i.value;}var action=_ref2;this.dispatch(action);}}}]);return StateManager;}();


var stateManagerInstance=new StateManager();exports.default=

{
appHoc:WrapState,
stateManager:stateManagerInstance};