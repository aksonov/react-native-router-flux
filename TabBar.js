import React from 'react-native'
const {View, InteractionManager} = React;
import Tabs from 'react-native-tabs';

import Actions from './Actions';
export default class TabBar extends React.Component {
    constructor(props){
        super(props);
        this.onRoute = this.onRoute.bind(this);
        Actions.addEventListener('route', this.onRoute);
    }
    isChild(route) {
        router = route.parent;
        while(router.parentRoute) {
            if(this.props.router == router) {
                return true;
            }
            router = router.parentRoute.parent;
        }
        return false;
    }
    onRoute(route) {
        hideTabBar = route.props.hideTabBar ? true : false;
        if(this.isChild(route) && hideTabBar != this.state.hideTabBar) {
            this.setState({hideTabBar});
        }
    }
    onSelect(el){
        if (!Actions[el.props.name]){
            throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(Actions)));
        }
        if (el.props.selected && Actions[el.props.defaultRoute]) {
          Actions[el.props.defaultRoute]({hideTabBar: el.props.hideTabBar});
        } else {
          Actions[el.props.name]({hideTabBar: el.props.hideTabBar});
        }
        InteractionManager.runAfterInteractions(() =>
            this.setState({hideTabBar: el.props.hideTabBar}));
        return {selected: true};
    }
    getChildrenState(selectedRoute){
        var self = this;
        let selected = false;
        var children = [];
        React.Children.forEach(this.props.children, function(el, index){
            const schema = self.props.router && self.props.router.schemas[el.props.schema] ? self.props.router.schemas[el.props.schema] : {};
            let props = {...schema, ...el.props};
            if (!el.props.name)
                console.error("No name is defined for element");
            if (selectedRoute){
                if (selectedRoute == el.props.name){
                    props.selected = true;
                } else {
                    props.selected = false;
                }
            }

            var Icon = props.icon || console.error("No icon class is defined for "+el.name);
            children.push(<Icon key={el.props.name} {...props}/>);
            if (props.selected || index === 0){
                selected = el;
            }
        });
        return {children, hideTabBar: selected.props.hideTabBar};
    }
    componentWillMount(){
        if (!this.props.children){
            return;
        }
        this.state = this.getChildrenState(this.props.selected);

    }

    componentWillReceiveProps({selected}){
        //console.log("TABBAR "+selected);
        InteractionManager.runAfterInteractions(() =>
            this.setState(this.getChildrenState(selected)));
    }
    render(){
        if (this.state.hideTabBar){
            return <View/>
        }
        return (
            <Tabs style={[{backgroundColor:'white'}, this.props.tabBarStyle]} onSelect={this.onSelect.bind(this)} {...this.props}>
                {this.state.children}
            </Tabs>
        );
    }
}

