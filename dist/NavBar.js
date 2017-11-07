Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/NavBar.js';exports.














BackButton=BackButton;exports.




























































LeftButton=LeftButton;exports.














































































RightButton=RightButton;var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNavigation=require('react-navigation');var _reactNative=require('react-native');var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);var _back_chevron=require('../images/back_chevron.png');var _back_chevron2=_interopRequireDefault(_back_chevron);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var hitSlop={top:15,bottom:15,left:15,right:15};function BackButton(state){var textButtonStyle=[styles.barBackButtonText,state.backButtonTextStyle];var style=[styles.backButton,state.leftButtonStyle];var buttonImage=state.backButtonImage||_back_chevron2.default;var tintColor=getValue(state.backButtonTintColor,state)||state.tintColor||state.navBarButtonColor||state.headerTintColor;var onPress=state.onBack;if(onPress){onPress=onPress.bind(null,state);}else{onPress=_navigationStore2.default.pop;}if(!state.backButtonImage){return _react2.default.createElement(_reactNavigation.HeaderBackButton,{onPress:onPress,title:state.backTitle,titleStyle:textButtonStyle,tintColor:tintColor,truncatedTitle:state.truncatedTitle,__source:{fileName:_jsxFileName,lineNumber:38}});}var text=state.backTitle?_react2.default.createElement(_reactNative.Text,{style:textButtonStyle,__source:{fileName:_jsxFileName,lineNumber:49}},state.backTitle):null;return _react2.default.createElement(_reactNative.TouchableOpacity,{testID:'backNavButton',style:styles.backButtonContainer,onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:55}},_react2.default.createElement(_reactNative.View,{style:style,__source:{fileName:_jsxFileName,lineNumber:60}},buttonImage&&!state.hideBackImage&&_react2.default.createElement(_reactNative.Image,{source:buttonImage,style:[styles.backButtonImage,state.barButtonIconStyle,state.leftButtonIconStyle,{tintColor:tintColor}],__source:{fileName:_jsxFileName,lineNumber:61}}),text));}function LeftButton(state){var onPress=state.onLeft;var buttonImage=getValue(state.leftButtonImage,state);var menuIcon=getValue(state.drawerIcon,state);var style=[styles.leftButton,state.leftButtonStyle];var leftButtonTextStyle=getValue(state.leftButtonTextStyle,state);var leftButtonIconStyle=getValue(state.leftButtonIconStyle,state);var leftButtonStyle=[styles.defaultImageStyle,leftButtonIconStyle];var leftTitle=state.getLeftTitle?state.getLeftTitle(state):getValue(state.leftTitle,state);var textColor=getValue(state.leftButtonTintColor,state);var tintColor=textColor||state.tintColor||state.navBarButtonColor||state.headerTintColor;var textStyle=[styles.barLeftButtonText,tintColor&&{color:tintColor},leftButtonTextStyle,textColor&&{color:textColor}];if(state.leftButton||state.left){var Button=state.leftButton||state.left;return _react2.default.createElement(Button,_extends({},state,{key:'leftNavBarBtn',testID:'leftNavButton',style:[].concat(style,leftButtonStyle),textStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:93}}));}if(!onPress&&!state.hideDrawerButton&&(state.drawerImage||menuIcon)&&state.drawerPosition!=='right'){buttonImage=state.drawerImage;if(buttonImage||menuIcon){onPress=_navigationStore2.default.drawerOpen;}if(!menuIcon){menuIcon=_react2.default.createElement(_reactNative.Image,{source:buttonImage,style:[state.leftButtonIconStyle||styles.defaultImageStyle,{tintColor:tintColor}],__source:{fileName:_jsxFileName,lineNumber:110}});}}if(onPress&&(leftTitle||buttonImage||menuIcon)){onPress=onPress.bind(null,state);return _react2.default.createElement(_reactNative.TouchableOpacity,{key:'leftNavBarBtn',testID:'leftNavButton',style:style,onPress:onPress,hitSlop:state.hitSlop||hitSlop,__source:{fileName:_jsxFileName,lineNumber:121}},leftTitle&&_react2.default.createElement(_reactNative.Text,{style:textStyle,__source:{fileName:_jsxFileName,lineNumber:128}},leftTitle),!leftTitle&&(menuIcon||buttonImage)&&_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:'center',alignItems:'flex-start'},__source:{fileName:_jsxFileName,lineNumber:132}},menuIcon||_react2.default.createElement(_reactNative.Image,{source:buttonImage,style:[state.leftButtonIconStyle||styles.defaultImageStyle,{tintColor:tintColor}],__source:{fileName:_jsxFileName,lineNumber:133}})));}if(!!state.onLeft^!!(leftTitle||buttonImage||menuIcon)){console.warn('Both onLeft and leftTitle/leftButtonImage\n            must be specified for the scene: '+state.name);}return null;}function getValue(value,params){return value instanceof Function?value(params):value;}function RightButton(state){
if(!state){
return null;
}

var onPress=state.onRight;
var buttonImage=getValue(state.rightButtonImage,state);
var menuIcon=state.drawerIcon;
var style=[styles.rightButton,state.rightButtonStyle];
var rightButtonTextStyle=getValue(state.rightButtonTextStyle,state);
var rightButtonIconStyle=getValue(state.rightButtonIconStyle,state);
var rightButtonStyle=[styles.defaultImageStyle,rightButtonIconStyle];
var rightTitle=state.getRightTitle?state.getRightTitle(state):getValue(state.rightTitle,state);
var textColor=getValue(state.rightButtonTintColor,state);
var tintColor=textColor||state.tintColor||state.navBarButtonColor||state.headerTintColor;
var textStyle=[styles.barRightButtonText,tintColor&&{color:tintColor},rightButtonTextStyle,textColor&&{color:textColor}];

if(state.rightButton||state.right){
var Button=state.rightButton||state.right;
return(
_react2.default.createElement(Button,_extends({},
state,{
key:'rightNavBarBtn',
testID:'rightNavButton',
style:style,
textButtonStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:176}})));


}

if(!onPress&&!state.hideDrawerButton&&state.drawerImage&&state.drawerPosition==='right'){
buttonImage=state.drawerImage;
if(buttonImage||menuIcon){
onPress=_navigationStore2.default.drawerOpen;
}
if(!menuIcon){
menuIcon=
_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:[rightButtonStyle,{tintColor:tintColor}],__source:{fileName:_jsxFileName,lineNumber:193}});


}
}

if(onPress&&(rightTitle||buttonImage)){
onPress=onPress.bind(null,state);
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
key:'rightNavBarBtn',
testID:'rightNavButton',
style:style,
onPress:onPress,
hitSlop:state.hitSlop||hitSlop,__source:{fileName:_jsxFileName,lineNumber:204}},

rightTitle&&_react2.default.createElement(_reactNative.Text,{style:textStyle,__source:{fileName:_jsxFileName,lineNumber:211}},
rightTitle),


!rightTitle&&buttonImage&&_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:'center',alignItems:'flex-end'},__source:{fileName:_jsxFileName,lineNumber:215}},
menuIcon||_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:[state.rightButtonIconStyle||styles.defaultImageStyle,{tintColor:tintColor}],__source:{fileName:_jsxFileName,lineNumber:216}}))));






}
if(!!state.onRight^!!(typeof rightTitle!=='undefined'||
typeof buttonImage!=='undefined')){
console.warn('Both onRight and rightTitle/rightButtonImage\n            must be specified for the scene: '+

state.routeName);

}
return null;
}
var styles=_reactNative.StyleSheet.create({
title:{
textAlign:'center',
color:'#0A0A0A',
fontSize:18,
width:180,
alignSelf:'center'},

titleImage:{
width:180,
alignSelf:'center'},

titleWrapper:_extends({
marginTop:10,
position:'absolute'},
_reactNative.Platform.select({
ios:{
top:20},

android:{
top:5},

windows:{
top:5}}),{


left:0,
right:0}),

header:_extends({
backgroundColor:'#EFEFF2',
paddingTop:0,
top:0},
_reactNative.Platform.select({
ios:{
height:64},

android:{
height:54},

windows:{
height:54}}),{


right:0,
left:0,
borderBottomWidth:0.5,
borderBottomColor:'#828287',
position:'absolute'}),

backButton:_extends({
position:'absolute'},
_reactNative.Platform.select({
ios:{
top:12},

android:{
top:10},

windows:{
top:8}}),{


left:2,
paddingLeft:8,
flexDirection:'row',
transform:[{scaleX:_reactNative.I18nManager.isRTL?-1:1}]}),

rightButton:_extends({},
_reactNative.Platform.select({
ios:{
position:'absolute',
top:12},

android:{
top:0},

windows:{
top:8}}),{


right:2,
paddingRight:8}),

leftButton:_extends({},
_reactNative.Platform.select({
ios:{
position:'absolute',
top:12},

android:{
top:0},

windows:{
top:8}}),{


left:2,
paddingLeft:8}),

barRightButtonText:{
color:'rgb(0, 122, 255)',
textAlign:'right',
fontSize:17},

barBackButtonText:{
color:'rgb(0, 122, 255)',
textAlign:'left',
fontSize:17,
paddingLeft:6},

barLeftButtonText:{
color:'rgb(0, 122, 255)',
textAlign:'left',
fontSize:17},

backButtonContainer:_extends({},
_reactNative.Platform.select({
ios:{
position:'absolute',
top:0,
left:0}}),{


height:50,
width:70}),

backButtonImage:_extends({},
_reactNative.Platform.select({
android:{
marginTop:5}}),{


width:13,
height:21}),

defaultImageStyle:{
height:24,
resizeMode:'contain'}});