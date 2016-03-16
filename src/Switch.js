import React, {Component} from 'react-native';
import DefaultRenderer from './DefaultRenderer';

export default class extends Component {
    render(){
        const selector = this.props.selector || console.error("selector should be defined");
        const selectedKey = selector(this.props) || console.error("selector should return key");
        const selected = this.props.navigationState.children.filter(el=>el.key==selectedKey) || console.error("key="+selectedKey+" doesn't exist");
        const state = selected[0] || console.error("Cannot find scene with key="+selectedKey);
        return <DefaultRenderer navigationState={state} />;
    }
}




