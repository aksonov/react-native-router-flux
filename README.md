# react-native-router-flux
React Native Router using Flux architecture

## Why I need to use it?
- Use Flux actions to replace/push/pop screens with easy syntax like Actions.login for navigation to login screen
- Forget about passing navigator object to all React elements, use actions from anywhere in your UI code.
- Configure all of your screens ("routes") once (define animations, nav bars, etc.), at one place and then just use short actions commands. For example if you use some special animation for Login screen, you don't need to code it anywhere where an user should be redirected to login screen.
- Use route "schemas" to define common property for some screens. For example some screens are "modal" (i.e. have animation from bottom and have Cancel/Close nav button), so you could define group for them to avoid any code repeatition.
- Use popup with Flux actions (see Error popup within Example project)
- Hide nav bar for some screens easily
- Use tab bars for some screens with Flux actions (see demo)
- Simplify processing of data flow in your app (see Getting Started, #4)
- Define your custom Flux actions (like fetch or validation actions) with the component too, so you will have all app actions in the one place.

## Example
![demo-2](https://cloud.githubusercontent.com/assets/1321329/9466261/de64558e-4b33-11e5-8ada-0fcd49442769.gif)


```javascript
'use strict';

var React = require('react-native');
var {AppRegistry, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var {Router, Route, Container, Actions, Animations, Schema} = require('react-native-router-flux');
var {NavBar, NavBarModal} = require('./components/NavBar');
var Error = require('./components/Error');
var Home = require('./components/Home');
var TabView = require('./components/TabView');
var TabIcon = require('./components/TabIcon');
var TabBarFlux = require('./components/TabBarFlux');

class Example extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                <Router>
                    <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
                    <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                    <Schema name="withoutAnimation" navBar={NavBar}/>
                    <Schema name="tab" navBar={NavBar}/>

                    <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch"/>
                    <Route name="register" component={Register} title="Register"/>
                    <Route name="home" component={Home} title="Home" type="replace"/>
                    <Route name="login" component={Login} schema="modal"/>
                    <Route name="register2" component={Register} schema="withoutAnimation"/>
                    <Route name="error" component={Error} schema="popup"/>
                    <Route name="tabbar" hideNavBar={true} >
                        <Container component={TabBarFlux}>
                            <Route name="tab1" component={TabView} title="Tab #1" icon={TabIcon} schema="tab"/>
                            <Route name="tab2" component={TabView} title="Tab #2" icon={TabIcon} schema="tab"/>
                            <Route name="tab3" component={TabView} title="Tab #3" icon={TabIcon} schema="tab"/>
                            <Route name="tab4" component={TabView} title="Tab #4" icon={TabIcon} schema="tab"/>
                            <Route name="tab5" component={TabView} title="Tab #5" icon={TabIcon} schema="tab"/>
                        </Container>
                    </Route>
                </Router>

            </View>
        );
    }
}

AppRegistry.registerComponent('Example', () => Example);
```

components/Launch.js (initial screen)
```javascript
'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;
class Launch extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={()=>Actions.error("Error message")}>Go to Error page</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

module.exports = Launch;
```

## Getting started
1. `npm install react-native-router-flux --save`
2. In top-level index.js:
    * Define Route for each app screen. Its 'type' attribute is 'push' by default, but you also could define 'replace', so navigator will replace current route with new route.
'component' attribute is React component class which will be created for this route and all route attributes will be passed to it.
'name' is unique name of Route.
    * If some your Routes have common attributes, you may define Schema element and just use 'schema' attribute for 'route'
    * If you want to define some your custom actions, just add 'Action' element inside Router. That action will not be processed by the component, it will call Actions.custom({name:ACTION_NAME, ...params}) so you could handle it in your stores. It allows to add Fetch actions (which downloads web content), etc.
3. In any app screen:
    * var {Actions} = require('react-native-router-flux');
    * Actions.ACTION_NAME(PARAMS) will call appropriate action and params will be passed to next screen.
4. In your Flux stores (optional).  You may subscribe to any push/replace/pop 'page' actions in your store.
It could be necessary if you want to process user data somehow. For example, if some component manages user form and have "Save" button which should store that data and pop the screen, you may use Actions.pop(this.state) in that component and then subscribe to Actions.pop actions within store:
    
    ```javascript
    class SearchFilterStore {
        constructor(){
            this.bindAction(Actions.pop, this.onSet);
        }
    
        onSet(data){
            this.waitFor(PageStore.dispatchToken);
            var route = PageStore.getState().currentRoute;
    
            if (route == 'yourFORM'){
                // save data
    
                this.saveData(data);
                return true;
            }
            return false;
        }
    }
    module.exports = alt.createStore(SearchFilterStore, 'SearchFilterStore');
    ```


Here PageStore.getState().currentRoute is used to check current page, so the store will process only data for needed route.
