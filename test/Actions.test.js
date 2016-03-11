import { expect } from 'chai';
import Actions from '../src/Actions';
import getInitialState from '../src/State';
import React from 'react-native';
import Stack from '../src/Stack';
import Route from '../src/Route';
import createReducer from '../src/Reducer';

const routesData = <Stack component="Modal" key="modal">
    <Route key="launch" component="Launch"/>
    <Stack key="sideMenu" component="Drawer" initial={true}>
        <Stack component="CubeBar" key="cubeBar" type="tabs">
            <Stack key="main" type="tabs">
                <Route key="home" component="Home"/>
                <Route key="map" component="Map"/>
                <Route key="myAccount" component="MyAccount"/>
            </Stack>
            <Stack key="messaging" initial={true}>
                <Route key="conversations" component="Conversations"/>
            </Stack>
        </Stack>
    </Stack>
    <Route key="privacyPolicy" component="PrivacyPolicy" type="modal"/>
    <Route key="termsOfService" component="TermsOfService" type="modal"/>
</Stack>;

describe('Actions', () => {
    it('should create needed actions', () => {
        const routes = Actions.create(routesData);
        expect(routes.conversations.component).to.equal("Conversations");

        let currentRoute = null;
        Actions.callback = route=>{currentRoute = route};
        Actions.conversations({param1: "Hello world"});
        expect(currentRoute.param1).equal("Hello world");
        expect(currentRoute.key).equal("conversations");

        Actions.sideMenu({param2: "Hello world2"});
        expect(currentRoute.param1).equal(undefined);
        expect(currentRoute.param2).equal("Hello world2");
        expect(currentRoute.key).equal("sideMenu");

        Actions.messaging({param3: "Hello world3"});
        expect(currentRoute.param3).equal("Hello world3");
        expect(currentRoute.key).equal("messaging");

        const initialState = getInitialState(routes);
        expect(initialState.component).equal("Modal");
        expect(initialState.index).equal(0);

        const reducer = createReducer({initialState, routes});
        let state = undefined;
        Actions.callback = route=>state = reducer(state, route);
        expect(state).equal(undefined);
        Actions.init();
        expect(state.key).equal("modal");

        Actions.messaging();
        //Actions.pop();
        Actions.conversations({param1: "Hello world"});

    });

});