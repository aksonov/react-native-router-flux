Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/NavBar.js';exports.










































renderBackButton=renderBackButton;exports.













































renderLeftButton=renderLeftButton;exports.




























































renderRightButton=renderRightButton;var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _navigationStore=require('./navigationStore');var _navigationStore2=_interopRequireDefault(_navigationStore);var _back_chevron=require('../images/back_chevron.png');var _back_chevron2=_interopRequireDefault(_back_chevron);var _menu_burger=require('../images/menu_burger.png');var _menu_burger2=_interopRequireDefault(_menu_burger);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function renderBackButton(state){var textButtonStyle=[styles.barBackButtonText,state.backButtonTextStyle];var style=[styles.backButton,state.leftButtonStyle];var buttonImage=state.backButtonImage||_back_chevron2.default;var onPress=state.onBack;if(onPress){onPress=onPress.bind(null,state);}else{onPress=_navigationStore2.default.pop;}var text=state.backTitle?_react2.default.createElement(_reactNative.Text,{style:textButtonStyle,__source:{fileName:_jsxFileName,lineNumber:62}},state.backTitle):null;return _react2.default.createElement(_reactNative.TouchableOpacity,{testID:'backNavButton',style:{position:'absolute',top:0,left:0,height:50,width:70},onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:68}},_react2.default.createElement(_reactNative.View,{style:style,__source:{fileName:_jsxFileName,lineNumber:73}},buttonImage&&!state.hideBackImage&&_react2.default.createElement(_reactNative.Image,{source:buttonImage,style:[styles.backButtonImage,state.barButtonIconStyle,state.leftButtonIconStyle],__source:{fileName:_jsxFileName,lineNumber:75}}),text));}function renderLeftButton(state,wrapBy){var onPress=state.onLeft;var buttonImage=state.leftButtonImage;var menuIcon=state.drawerIcon;var style=[styles.leftButton,state.leftButtonStyle];var textStyle=[styles.barLeftButtonText,state.leftButtonTextStyle];var leftButtonStyle=[styles.defaultImageStyle,state.leftButtonIconStyle];var leftTitle=state.getLeftTitle?state.getLeftTitle(navProps):state.leftTitle;if(state.leftButton){var Button=state.leftButton;if(wrapBy){Button=wrapBy(Button);}return _react2.default.createElement(Button,_extends({},state,{key:'leftNavBarBtn',testID:'leftNavButton',style:[].concat(style,leftButtonStyle),textStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:105}}));}if(onPress&&(leftTitle||buttonImage)){onPress=onPress.bind(null,state);return _react2.default.createElement(_reactNative.TouchableOpacity,{key:'leftNavBarBtn',testID:'leftNavButton',style:style,onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:118}},leftTitle&&_react2.default.createElement(_reactNative.Text,{style:textStyle,__source:{fileName:_jsxFileName,lineNumber:125}},leftTitle),!leftTitle&&buttonImage&&_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:'center',alignItems:'flex-start'},__source:{fileName:_jsxFileName,lineNumber:130}},menuIcon||_react2.default.createElement(_reactNative.Image,{source:buttonImage,style:state.leftButtonIconStyle||styles.defaultImageStyle,__source:{fileName:_jsxFileName,lineNumber:131}})));}if(!!state.onLeft^!!(leftTitle||buttonImage)){console.warn('Both onLeft and leftTitle/leftButtonImage\n            must be specified for the scene: '+state.name);}return null;}function renderRightButton(state,wrapBy){
var drawer=null;
if(!state){
return null;
}

var onPress=state.onRight;
var buttonImage=state.rightButtonImage;
var menuIcon=state.drawerIcon;
var style=[styles.rightButton,state.rightButtonStyle];
var textStyle=[styles.barRightButtonText,state.rightButtonTextStyle];
var rightButtonStyle=[styles.defaultImageStyle,state.rightButtonIconStyle];
var rightTitle=state.getRightTitle?state.getRightTitle(navProps):state.rightTitle;

if(state.rightButton){
var Button=state.rightButton;
if(wrapBy){
Button=wrapBy(Button);
}
return(
_react2.default.createElement(Button,_extends({},
state,{
key:'rightNavBarBtn',
testID:'rightNavButton',
style:style,
textButtonStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:171}})));


}

if(!onPress&&!!drawer&&typeof drawer.toggle==='function'&&drawer.props.side==='right'){
buttonImage=state.drawerImage;
if(buttonImage||menuIcon){
onPress=drawer.toggle;
}
if(!menuIcon){
menuIcon=
_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:rightButtonStyle,__source:{fileName:_jsxFileName,lineNumber:188}});


}
}

if(onPress&&(rightTitle||buttonImage)){
onPress=onPress.bind(null,state);
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
key:'rightNavBarBtn',
testID:'rightNavButton',
style:style,
onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:199}},

rightTitle&&
_react2.default.createElement(_reactNative.Text,{style:textStyle,__source:{fileName:_jsxFileName,lineNumber:206}},
rightTitle),


buttonImage&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:'center',alignItems:'flex-end'},__source:{fileName:_jsxFileName,lineNumber:211}},
menuIcon||_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:state.rightButtonIconStyle||styles.defaultImageStyle,__source:{fileName:_jsxFileName,lineNumber:212}}))));






}
if(!!state.onRight^!!(typeof rightTitle!=='undefined'||
typeof buttonImage!=='undefined')){
console.warn('Both onRight and rightTitle/rightButtonImage\n            must be specified for the scene: '+

state.name);

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

rightButton:_extends({
position:'absolute'},
_reactNative.Platform.select({
ios:{
top:12},

android:{
top:10},

windows:{
top:8}}),{


right:2,
paddingRight:8}),

leftButton:_extends({
position:'absolute'},
_reactNative.Platform.select({
ios:{
top:12},

android:{
top:8},

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

backButtonImage:{
width:13,
height:21},

defaultImageStyle:{
height:24,
resizeMode:'contain'}});



var propTypes={
navigationState:_react.PropTypes.object,
backButtonImage:_reactNative.Image.propTypes.source,
wrapBy:_react.PropTypes.any,
component:_react.PropTypes.any,
backButtonTextStyle:_reactNative.Text.propTypes.style,
leftButtonStyle:_reactNative.ViewPropTypes.style,
leftButtonIconStyle:_reactNative.Image.propTypes.style,
getTitle:_react.PropTypes.func,
titleWrapperStyle:_reactNative.Text.propTypes.style,
titleStyle:_reactNative.Text.propTypes.style,
titleOpacity:_react.PropTypes.number,
titleProps:_react.PropTypes.any,
position:_react.PropTypes.object,
navigationBarStyle:_reactNative.ViewPropTypes.style,
navigationBarBackgroundImage:_reactNative.Image.propTypes.source,
navigationBarBackgroundImageStyle:_reactNative.Image.propTypes.style,
navigationBarTitleImage:_reactNative.Image.propTypes.source,
navigationBarTitleImageStyle:_reactNative.Image.propTypes.style,
navigationBarShowImageSelection:_react.PropTypes.bool,
navigationBarSelecionStyle:_reactNative.ViewPropTypes.style,
renderTitle:_react.PropTypes.any};


var contextTypes={
drawer:_react.PropTypes.object};


var defaultProps={
backButtonImage:_back_chevron2.default,
titleOpacity:1};var


NavBar=function(_React$Component){_inherits(NavBar,_React$Component);

function NavBar(props){_classCallCheck(this,NavBar);var _this=_possibleConstructorReturn(this,(NavBar.__proto__||Object.getPrototypeOf(NavBar)).call(this,
props));

_this.renderRightButton=_this.renderRightButton.bind(_this);
_this.renderBackButton=_this.renderBackButton.bind(_this);
_this.renderLeftButton=_this.renderLeftButton.bind(_this);
_this.renderTitle=_this.renderTitle.bind(_this);
_this.renderImageTitle=_this.renderImageTitle.bind(_this);return _this;
}_createClass(NavBar,[{key:'renderBackButton',value:function renderBackButton()

{
var state=this.props.navigation.state;
var childState=state.children[state.index];
var BackButton=childState.component&&childState.component.backButton||state.backButton||
childState.backButton;
var textButtonStyle=[
styles.barBackButtonText,
this.props.backButtonTextStyle,
state.backButtonTextStyle,
childState.backButtonTextStyle];

var style=[
styles.backButton,
this.props.leftButtonStyle,
state.leftButtonStyle,
childState.leftButtonStyle];


if(state.index===0&&(!state.parentIndex||state.parentIndex===0)){
return null;
}

if(BackButton){
return(
_react2.default.createElement(BackButton,_extends({
testID:'backNavButton',
textButtonStyle:textButtonStyle},
childState,{
style:style,__source:{fileName:_jsxFileName,lineNumber:430}})));


}
var buttonImage=childState.backButtonImage||
state.backButtonImage||this.props.backButtonImage;
var onPress=childState.onBack||childState.component.onBack;
if(onPress){
onPress=onPress.bind(null,state);
}else{
onPress=_navigationStore2.default.pop;
}

var text=childState.backTitle?
_react2.default.createElement(_reactNative.Text,{style:textButtonStyle,__source:{fileName:_jsxFileName,lineNumber:448}},
childState.backTitle):

null;

return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
testID:'backNavButton',
style:style,
onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:454}},

buttonImage&&!childState.hideBackImage&&
_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:[
styles.backButtonImage,
this.props.leftButtonIconStyle,
state.barButtonIconStyle,
state.leftButtonIconStyle,
childState.leftButtonIconStyle],__source:{fileName:_jsxFileName,lineNumber:460}}),



text));


}},{key:'renderRightButton',value:function renderRightButton(

navProps){
var self=this;
var drawer=this.context.drawer;
function tryRender(state,wrapBy){
if(!state){
return null;
}

var onPress=state.onRight;
var buttonImage=state.rightButtonImage;
var menuIcon=state.drawerIcon;
var style=[styles.rightButton,self.props.rightButtonStyle,state.rightButtonStyle];
var textStyle=[styles.barRightButtonText,self.props.rightButtonTextStyle,
state.rightButtonTextStyle];
var rightButtonStyle=[styles.defaultImageStyle,state.rightButtonIconStyle];
var rightTitle=state.getRightTitle?state.getRightTitle(navProps):state.rightTitle;

if(state.rightButton){
var Button=state.rightButton;
if(wrapBy){
Button=wrapBy(Button);
}
return(
_react2.default.createElement(Button,_extends({},
self.props,
state,{
key:'rightNavBarBtn',
testID:'rightNavButton',
style:style,
textButtonStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:499}})));


}

if(!onPress&&!!drawer&&typeof drawer.toggle==='function'&&drawer.props.side==='right'){
buttonImage=state.drawerImage;
if(buttonImage||menuIcon){
onPress=drawer.toggle;
}
if(!menuIcon){
menuIcon=
_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:rightButtonStyle,__source:{fileName:_jsxFileName,lineNumber:517}});


}
}

if(onPress&&(rightTitle||buttonImage)){
onPress=onPress.bind(null,state);
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
key:'rightNavBarBtn',
testID:'rightNavButton',
style:style,
onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:528}},

rightTitle&&
_react2.default.createElement(_reactNative.Text,{style:textStyle,__source:{fileName:_jsxFileName,lineNumber:535}},
rightTitle),


buttonImage&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:'center',alignItems:'flex-end'},__source:{fileName:_jsxFileName,lineNumber:540}},
menuIcon||_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:state.rightButtonIconStyle||styles.defaultImageStyle,__source:{fileName:_jsxFileName,lineNumber:541}}))));






}
if(!!state.onRight^!!(typeof rightTitle!=='undefined'||
typeof buttonImage!=='undefined')){
console.warn('Both onRight and rightTitle/rightButtonImage\n            must be specified for the scene: '+

state.name);

}
return null;
}
return tryRender(this.props.component,this.props.wrapBy)||tryRender(this.props);
}},{key:'renderLeftButton',value:function renderLeftButton(

navProps){
var self=this;
var drawer=this.context.drawer;
function tryRender(state,wrapBy){
var onPress=state.onLeft;
var buttonImage=state.leftButtonImage;
var menuIcon=state.drawerIcon;
var style=[styles.leftButton,self.props.leftButtonStyle,state.leftButtonStyle];
var textStyle=[styles.barLeftButtonText,self.props.leftButtonTextStyle,
state.leftButtonTextStyle];
var leftButtonStyle=[styles.defaultImageStyle,state.leftButtonIconStyle];
var leftTitle=state.getLeftTitle?state.getLeftTitle(navProps):state.leftTitle;

if(state.leftButton){
var Button=state.leftButton;
if(wrapBy){
Button=wrapBy(Button);
}
return(
_react2.default.createElement(Button,_extends({},
self.props,
state,{
key:'leftNavBarBtn',
testID:'leftNavButton',
style:style,
textStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:582}})));


}

if(!onPress&&!!drawer&&typeof drawer.toggle==='function'&&drawer.props.side==='left'){
buttonImage=state.drawerImage;
if(buttonImage||menuIcon){
onPress=drawer.toggle;
}
if(!menuIcon){
menuIcon=
_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:leftButtonStyle,__source:{fileName:_jsxFileName,lineNumber:600}});


}
}

if(onPress&&(leftTitle||buttonImage)){
onPress=onPress.bind(null,state);
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
key:'leftNavBarBtn',
testID:'leftNavButton',
style:style,
onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:611}},

leftTitle&&
_react2.default.createElement(_reactNative.Text,{style:textStyle,__source:{fileName:_jsxFileName,lineNumber:618}},
leftTitle),


buttonImage&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:'center',alignItems:'flex-start'},__source:{fileName:_jsxFileName,lineNumber:623}},
menuIcon||_react2.default.createElement(_reactNative.Image,{
source:buttonImage,
style:state.leftButtonIconStyle||styles.defaultImageStyle,__source:{fileName:_jsxFileName,lineNumber:624}}))));






}
if(!!state.onLeft^!!(leftTitle||buttonImage)){
console.warn('Both onLeft and leftTitle/leftButtonImage\n            must be specified for the scene: '+

state.name);

}
return null;
}
return tryRender(this.props.component,this.props.wrapBy)||tryRender(this.props);
}},{key:'renderTitle',value:function renderTitle(

childState,index){
var title=this.props.getTitle?this.props.getTitle(childState):childState.title;
if(title===undefined&&childState.component&&childState.component.title){
title=childState.component.title;
}
if(typeof title==='function'){
title=title(childState);
}
return(
_react2.default.createElement(_reactNative.Animated.View,{
key:childState.key,
style:[
styles.titleWrapper,
this.props.titleWrapperStyle],__source:{fileName:_jsxFileName,lineNumber:654}},


_react2.default.createElement(_reactNative.Animated.Text,_extends({
lineBreakMode:'tail',
numberOfLines:1},
this.props.titleProps,{
style:[
styles.title,
this.props.titleStyle,
this.props.navigationState.titleStyle,
childState.titleStyle,
{
opacity:this.props.position.interpolate({
inputRange:[index-1,index,index+1],
outputRange:[0,this.props.titleOpacity,0]}),

left:this.props.position.interpolate({
inputRange:[index-1,index+1],
outputRange:[200,-200]}),

right:this.props.position.interpolate({
inputRange:[index-1,index+1],
outputRange:[-200,200]})}],__source:{fileName:_jsxFileName,lineNumber:661}}),




title)));



}},{key:'renderImageTitle',value:function renderImageTitle()

{
var state=this.props.navigationState;
var navigationBarTitleImage=this.props.navigationBarTitleImage||
state.navigationBarTitleImage;
var navigationBarTitleImageStyle=this.props.navigationBarTitleImageStyle||
state.navigationBarTitleImageStyle;
var navigationBarShowImageSelection=this.props.navigationBarShowImageSelection||
state.navigationBarShowImageSelection||false;
var navigationBarSelecionStyle=this.props.navigationBarSelecionStyle||
state.navigationBarSelecionStyle||{};
return(
_react2.default.createElement(_reactNative.Animated.View,{
style:[
styles.titleWrapper,
this.props.titleWrapperStyle],__source:{fileName:_jsxFileName,lineNumber:703}},


_react2.default.createElement(_reactNative.Animated.Image,{
style:[styles.titleImage,navigationBarTitleImageStyle],
source:navigationBarTitleImage,__source:{fileName:_jsxFileName,lineNumber:709}}),

navigationBarShowImageSelection&&_react2.default.createElement(_reactNative.Animated.View,{style:navigationBarSelecionStyle,__source:{fileName:_jsxFileName,lineNumber:713}})));


}},{key:'render',value:function render()

{
var state=this.props.navigation.state;
var selected=state.children[state.index];
while({}.hasOwnProperty.call(selected,'children')){
state=selected;
selected=selected.children[selected.index];
}
var navProps=_extends({},this.props,selected);

var wrapByStyle=function wrapByStyle(component,wrapStyle){
if(!component){return null;}
return function(props){return _react2.default.createElement(_reactNative.View,{style:wrapStyle,__source:{fileName:_jsxFileName,lineNumber:729}},component(props));};
};

var leftButtonStyle=[styles.leftButton,{alignItems:'flex-start'},this.props.leftButtonStyle,state.leftButtonStyle];
var rightButtonStyle=[styles.rightButton,{alignItems:'flex-end'},this.props.rightButtonStyle,state.rightButtonStyle];

var renderLeftButton=wrapByStyle(selected.renderLeftButton,leftButtonStyle)||
wrapByStyle(selected.component.renderLeftButton,leftButtonStyle)||
this.renderLeftButton;
var renderRightButton=wrapByStyle(selected.renderRightButton,rightButtonStyle)||
wrapByStyle(selected.component.renderRightButton,rightButtonStyle)||
this.renderRightButton;
var renderBackButton=wrapByStyle(selected.renderBackButton,leftButtonStyle)||
wrapByStyle(selected.component.renderBackButton,leftButtonStyle)||
this.renderBackButton;
var renderTitle=selected.renderTitle||
selected.component.renderTitle||
this.props.renderTitle;
var navigationBarBackgroundImage=this.props.navigationBarBackgroundImage||
state.navigationBarBackgroundImage;
var navigationBarBackgroundImageStyle=this.props.navigationBarBackgroundImageStyle||
state.navigationBarBackgroundImageStyle;
var navigationBarTitleImage=this.props.navigationBarTitleImage||
state.navigationBarTitleImage;
var imageOrTitle=null;
if(navigationBarTitleImage){
imageOrTitle=this.renderImageTitle();
}else{
imageOrTitle=renderTitle?renderTitle(navProps):
state.children.map(this.renderTitle,this);
}
var contents=
_react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:761}},
imageOrTitle,
renderBackButton(navProps)||renderLeftButton(navProps),
renderRightButton(navProps));


return(
_react2.default.createElement(_reactNative.Animated.View,{
style:[
styles.header,
this.props.navigationBarStyle,
state.navigationBarStyle,
selected.navigationBarStyle],__source:{fileName:_jsxFileName,lineNumber:768}},


navigationBarBackgroundImage?
_react2.default.createElement(_reactNative.Image,{style:navigationBarBackgroundImageStyle,source:navigationBarBackgroundImage,__source:{fileName:_jsxFileName,lineNumber:777}},
contents):

contents));


}}]);return NavBar;}(_react2.default.Component);


NavBar.propTypes=propTypes;
NavBar.contextTypes=contextTypes;
NavBar.defaultProps=defaultProps;exports.default=

NavBar;