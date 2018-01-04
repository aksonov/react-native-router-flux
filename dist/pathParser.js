Object.defineProperty(exports,"__esModule",{value:true});exports.matchPath=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _pathToRegexp=require('path-to-regexp');var _pathToRegexp2=_interopRequireDefault(_pathToRegexp);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toArray(arr){return Array.isArray(arr)?arr:Array.from(arr);}































var compilePathToRegex=function compilePathToRegex(path){
var keys=[];
var re=(0,_pathToRegexp2.default)(path,keys);


return{re:re,keys:keys};
};



























var matchPath=exports.matchPath=function matchPath(path,url){var _url$split=


url.split('?'),_url$split2=_slicedToArray(_url$split,1),urlCleaned=_url$split2[0];


var urlToMatch=!urlCleaned.endsWith('/')?urlCleaned+'/':urlCleaned;var _compilePathToRegex=


compilePathToRegex(path),re=_compilePathToRegex.re,keys=_compilePathToRegex.keys;


var match=re.exec(urlToMatch);


if(!match){return null;}var _match=_toArray(



match),compiledUrl=_match[0],values=_match.slice(1);



if(urlToMatch!==compiledUrl){return null;}

var params=keys.reduce(function(acc,key,index){return(
_extends({},acc,_defineProperty({},key.name,values[index])));},{});


return{path:path,params:params};
};











var pathParser=function pathParser(url){var possibleMatchingpaths=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];return(
possibleMatchingpaths.
map(function(path){return matchPath(path,url);}).
find(function(obj){return obj;}));};exports.default=

pathParser;