import React, {View, Text, Component, NavigationExperimental} from 'react-native';
import Tabs from 'react-native-tabs';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';

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
        const selected = state.children[state.index];
        const hideTabBar = selected.hideTabBar;
        return <View style={{flex:1}}>
                    <NavigationView
                        navigationState={this.props.navigationState}
                        style={{flex:1}}
                        renderScene={(tabState, index) => (
                          <TabView
                            key={tabState.key}
                            navigationState={tabState}
                          />
                        )}
                    />
            {!hideTabBar && <Tabs style={[{backgroundColor:'white'}, state.tabBarStyle]} onSelect={this.onSelect.bind(this)} {...state} selected={selected.key}>
                    {state.children.map(el=>{
                        const Icon = el.icon;
                        return <Icon {...el}/>
                    })}
                </Tabs>}

            </View>
    }
}

class TabView extends Component {
    componentWillMount() {
        this._renderHeader = this._renderHeader.bind(this);
        this._renderScene = this._renderScene.bind(this);
    }

    render() {
        return (
            <NavigationCardStack
                style={{flex:1}}
                navigationState={this.props.navigationState}
                renderOverlay={this._renderHeader}
                renderScene={this._renderScene}
            />
        );
    }
    _renderHeader(props) {
        if (props.navigationState.hideNavBar){
            return null;
        }
        return (
            <NavigationHeader
                {...props}
                getTitle={state => state.title}
            />
        );
    }

    _renderScene(props) {
        const Component = props.scene.navigationState.component;
        if (!Component){
            return <DefaultRenderer key={props.scene.navigationState.key} navigationState={props.scene.navigationState}/> // TODO How to go to nested container?
        } else {
            return <Component key={props.scene.navigationState.key} {...props.scene.navigationState}  navigationState={props.scene.navigationState}/>;
        }

    }

}
TabView = NavigationContainer.create(TabView);

