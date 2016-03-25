import React, {View, Text, Component, NavigationExperimental} from 'react-native';
import Tabs from 'react-native-tabs';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';
import NavBar from './NavBar';
const {
    AnimatedView: NavigationAnimatedView,
    CardStack: NavigationCardStack,
    Container: NavigationContainer,
    Header: NavigationHeader,
    Reducer: NavigationReducer,
    RootContainer: NavigationRootContainer,
    View: NavigationView,
    } = NavigationExperimental;


export default class extends Component {
    onSelect(el){
        const state = this.props.navigationState;
        if (!Actions[el.props.name]){
            throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(Actions)));
        }
        Actions[el.props.name]();
    }
    render(){
        const state = this.props.navigationState;
        let selected = state.children[state.index];
        while (selected.hasOwnProperty("children")) {
            selected = selected.children[selected.index]
        }
        const hideTabBar = state.hideTabBar || selected.hideTabBar;
        return <View style={{flex:1}}>
                    <NavigationView
                        navigationState={this.props.navigationState}
                        style={{flex:1}}
                        renderScene={(tabState, index) => (
                          <DefaultRenderer
                            key={tabState.key}
                            navigationState={tabState}
                          />
                        )}
                    />
            {!hideTabBar && state.children.filter(el=>el.icon).length>0 && <Tabs style={[{backgroundColor:'white'}, state.tabBarStyle]} onSelect={this.onSelect.bind(this)} {...state}
                                                                                 selected={state.children[state.index].sceneKey}>
                    {state.children.filter(el=>el.icon || this.props.tabIcon).map(el=>{
                        const Icon = el.icon || this.props.tabIcon;
                        return <Icon  {...this.props} {...el}/>
                    })}
                </Tabs>}

            </View>
    }
}

