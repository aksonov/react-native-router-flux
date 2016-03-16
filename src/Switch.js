import React, {Component} from 'react-native';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';

export default class extends Component {
    constructor(props){
        super(props);
        this.updateState = this.updateState.bind(this);
    }

    updateState(props){
        const navState = props.navigationState;
        const selector = props.selector || console.error("selector should be defined");
        const selectedKey = selector(props) || console.error("selector should return key");
        const selected = navState.children.filter(el=>el.key==selectedKey) || console.error("key="+selectedKey+" doesn't exist");
        this.state = selected[0] || console.error("Cannot find scene with key="+selectedKey);
        if (this.state.key != navState.children[navState.index].key){
            Actions.jump({key: this.state.key});
        }
    }
    componentDidMount(){
        this.updateState(this.props);

    }
    
    componentWillReceiveProps(props){
        this.updateState(props);
    }
    render(){
        return <DefaultRenderer navigationState={this.state} />;
    }
}




