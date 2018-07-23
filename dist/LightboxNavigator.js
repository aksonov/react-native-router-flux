Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/LightboxNavigator.js';

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNavigation=require('react-navigation');
var _reactNative=require('react-native');
var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var NavigationView=function NavigationView(_ref){var navigation=_ref.navigation,screenProps=_ref.screenProps,navigationConfig=_ref.navigationConfig,descriptors=_ref.descriptors;var
state=navigation.state,dispatch=navigation.dispatch;var
routes=state.routes,index=state.index;

console.log('DATA:',JSON.stringify(navigationConfig));
return _react2.default.createElement(_reactNative.View,{style:{flex:1},__source:{fileName:_jsxFileName,lineNumber:13}});





































};

var LightboxNavigator=function LightboxNavigator(routeConfigs){var tabsConfig=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};
var router=(0,_reactNavigation.TabRouter)(routeConfigs,tabsConfig);

return(0,_reactNavigation.createNavigator)(NavigationView,router,tabsConfig);
};exports.default=

LightboxNavigator;