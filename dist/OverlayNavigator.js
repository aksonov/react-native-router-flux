Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/OverlayNavigator.js';

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNavigation=require('react-navigation');
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var OverlayNavigator=function OverlayNavigator(
routeConfigs)

{var tabsConfig=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};
var router=(0,_reactNavigation.TabRouter)(routeConfigs,tabsConfig);

var navigator=(0,_reactNavigation.createNavigator)(
router,
routeConfigs,
tabsConfig,
'react-navigation/STACK')(
function(_ref){var navigation=_ref.navigation;var
state=navigation.state,dispatch=navigation.dispatch;var
routes=state.routes;


var Component=routeConfigs[tabsConfig.initialRouteName].screen;
var initialIndex=0;
var routesMap={};
for(var i=0;i<routes.length;i++){
var route=routes[i];
if(route.routeName===tabsConfig.initialRouteName){
initialIndex=i;
}
routesMap[route.routeName]=route;
}
var initialRouteName=tabsConfig.initialRouteName||routes[initialIndex].routeName;
var overlays=[];
for(var _i=0;_i<tabsConfig.order.length;_i++){
var routeName=tabsConfig.order[_i];
if(initialRouteName!==routeName){
var Overlay=routeConfigs[routeName].screen;
overlays.push(_react2.default.createElement(Overlay,{key:routeName,navigation:{dispatch:dispatch,state:routesMap[routeName]},__source:{fileName:_jsxFileName,lineNumber:39}}));
}
}
var ContentComponent=tabsConfig.contentComponent||_reactNative.View;
return _react2.default.createElement(ContentComponent,{style:{flex:1},__source:{fileName:_jsxFileName,lineNumber:43}},
_react2.default.createElement(Component,{navigation:{dispatch:dispatch,state:routes[initialIndex]},__source:{fileName:_jsxFileName,lineNumber:44}}),
overlays);

});

return(0,_reactNavigation.createNavigationContainer)(navigator,tabsConfig.containerOptions);
};exports.default=

OverlayNavigator;