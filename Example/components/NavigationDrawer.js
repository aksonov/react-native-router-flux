import React, {Component} from "react-native"
import TabView from "./TabView"
import Drawer from "react-native-drawer"
import {DefaultRenderer} from "react-native-router-flux";

export default class extends Component {
    render(){
        const children = this.props.navigationState.children;
        return (
            <Drawer
                ref="navigation"
                type="displace"
                content={<TabView />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
                <DefaultRenderer navigationState={children[0]} />
            </Drawer>
        );
    }
}
