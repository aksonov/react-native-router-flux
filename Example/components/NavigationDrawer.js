import React,{
  Component
} from 'react-native'
import Launch from './Launch'
import Drawer from 'react-native-drawer'
import {DefaultRenderer} from 'react-native-router-flux';

export default class Navigation extends Component {
  render(){
    console.log(this.context);
    const navigationState = this.props.navigationState;
    let selected = navigationState.children[navigationState.index];
    // var activeScene = (selected.name == "root" : selected[0] ? selected);
    return (
        <Drawer
            ref="navigation"
            type="displace"
            content={<Launch />}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
              <DefaultRenderer navigationState={selected}  key={selected.key} {...selected} />
        </Drawer>
    );
  }
}
