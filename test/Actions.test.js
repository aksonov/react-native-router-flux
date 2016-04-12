import { expect } from 'chai';
import Actions from '../src/Actions';
import getInitialState from '../src/State';
import React from 'react-native';
import Scene from '../src/Scene';
import createReducer from '../src/Reducer';

const scenesData = <Scene component="Modal" key="modal">
    <Scene key="launch" component="Launch"/>
    <Scene key="sideMenu" component="Drawer" initial={true}>
        <Scene component="CubeBar" key="cubeBar" type="tabs">
            <Scene key="main" tabs={true}>
                <Scene key="home" component="Home"/>
                <Scene key="map" component="Map"/>
                <Scene key="myAccount" component="MyAccount"/>
            </Scene>
            <Scene key="messaging" initial={true}>
                <Scene key="conversations" component="Conversations"/>
            </Scene>
        </Scene>
    </Scene>
    <Scene key="privacyPolicy" component="PrivacyPolicy" type="modal"/>
    <Scene key="termsOfService" component="TermsOfService" type="modal"/>
    <Scene key="login">
        <Scene key="loginModal1" component="Login1"/>
        <Scene key="loginModal2" component="Login2"/>
    </Scene>
</Scene>;

describe('Actions', () => {
    it('should create needed actions', () => {
        const scenes = Actions.create(scenesData);
        expect(scenes.conversations.component).to.equal("Conversations");

        let currentScene = null;
        Actions.callback = scene=>{currentScene = scene};
        Actions.conversations({param1: "Hello world"});
        expect(currentScene.param1).equal("Hello world");
        expect(currentScene.key).equal("conversations");

        Actions.sideMenu({param2: "Hello world2"});
        expect(currentScene.param1).equal(undefined);
        expect(currentScene.param2).equal("Hello world2");
        expect(currentScene.key).equal("sideMenu");

        Actions.messaging({param3: "Hello world3"});
        expect(currentScene.param3).equal("Hello world3");
        expect(currentScene.key).equal("messaging");

        const initialState = getInitialState(scenes);
        expect(initialState.component).equal("Modal");
        expect(initialState.index).equal(0);

        const reducer = createReducer({initialState, scenes});
        let state = undefined;
        Actions.callback = scene=>state = reducer(state, scene);
        expect(state).equal(undefined);
        Actions.init();
        expect(state.key).equal("0_modal");

        Actions.messaging();
        expect(currentScene.key).equal("messaging");
        //Actions.pop();
        Actions.login();
        expect(state.children[1].key).equal("1_login");
        expect(state.children[1].children.length).equal(1);
        expect(state.children[1].children[0].key).equal("0_loginModal1");

    });

});
