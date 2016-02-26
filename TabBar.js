import React from 'react-native'
const {View, InteractionManager} = React;
import Tabs from 'react-native-tabs';

import Actions from './Actions';
export default class TabBar extends React.Component {
    onSelect(el){
        if (!Actions[el.props.name]){
            throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(Actions)));
        }
        Actions[el.props.name]({hideTabBar: el.props.hideTabBar});

    }
    render(){
        if (this.props.hideTabBar){
            return <View/>
        }
        // choose initial route
        let selected = this.props.selected
        if (!selected){
            React.Children.forEach(this.props.children, el=>{
                if (!selected || el.props.initial){
                    selected = el.props.name;
                }
            });
        }
        return (
            <Tabs style={[{backgroundColor:'white'}, this.props.tabBarStyle]} onSelect={this.onSelect.bind(this)} {...this.props} selected={selected}>
                {React.Children.map(this.props.children, el=>{
                    const schema = this.props.router && this.props.router.schemas[el.props.schema] ? this.props.router.schemas[el.props.schema] : {};
                    let props = {...schema, ...el.props};
                    if (!el.props.name)
                        console.error("No name is defined for element");

                    var Icon = props.icon || console.error("No icon class is defined for "+el.name);
                    return <Icon key={el.props.name} {...props}/>;
                })}
            </Tabs>
        );
    }
}

