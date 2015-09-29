'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var {Actions, ContainerStore} = require('react-native-router-flux');
var Tabs = require('react-native-tabs');

class TabBarFlux extends React.Component {
    onSelect(el){
        Actions.switch({name: el.props.name, data:el.props});
        return {selected: true};
    }
    render(){
        var children = [];
        React.Children.forEach(this.props.children, function(el){
            if (!el.props.name)
                console.error("No name is defined for element");
            var Icon = el.props.icon || console.error("No icon class is defined for "+el.name);
            children.push(<Icon key={el.props.name} {...el.props}/>);
        });

        return (
            <Tabs style={{backgroundColor:'white'}} onSelect={this.onSelect.bind(this)}>
                {children}
            </Tabs>
        );
    }
}

module.exports = TabBarFlux;