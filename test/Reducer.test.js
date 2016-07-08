import React from 'react';
import { expect } from 'chai';

import Scene from '../src/Scene';
import Actions from '../src/Actions';
import * as ActionConst from '../src/ActionConst';

import createReducer from '../src/Reducer';
import getInitialState from '../src/State';

// TODO: this function is from Reducer!!! Export it from Reducer or move to some sort of helpers.
export function getCurrent(state) {
  if (!state.children) {
    return state;
  }
  return getCurrent(state.children[state.index]);
}

let id = 0;
const guid = () => id++;
const scenesData = (
  <Scene
    key="root"
    component="Modal"
    getInitialState={() => ({ foo: guid() })}
  >
    <Scene key="launch" component="Launch" />
    <Scene key="sideMenu" component="Drawer" initial>
      <Scene component="CubeBar" key="cubeBar" type="tabs">
        <Scene key="main" tabs>
          <Scene key="home" component="Home" />
          <Scene key="map" component="Map" />
          <Scene key="myAccount" component="MyAccount" />
        </Scene>
        <Scene key="messaging" initial>
          <Scene
            key="conversations"
            component="Conversations"
            getInitialState={() => ({ foo: 'what', bar: guid() })}
          />
        </Scene>
      </Scene>
    </Scene>
    <Scene key="privacyPolicy" component="PrivacyPolicy" type="modal" />
    <Scene key="termsOfService" component="TermsOfService" type="modal" />
    <Scene key="login">
      <Scene key="loginModal1" component="Login1" />
      <Scene key="loginModal2" component="Login2" />
    </Scene>
  </Scene>);

describe('createReducer', () => {
  it('initilize state correct and reducer works', () => {
    // create scenes and initialState
    // For creating scenes we use external modules.
    // TODO: Think about fully isolated test.
    const scenes = Actions.create(scenesData);
    const initialState = getInitialState(scenes); // TODO: write test for this.

    const reducer = createReducer({ initialState, scenes });

    let latestState;
    let currentScene;
    // Testing reducer.
    // Normally actions came from Actions module, but we will generate it manually.
    latestState = reducer(latestState, {
      key: 'conversations',
      type: ActionConst.PUSH,
      param1: 'Hello world',
    });

    currentScene = getCurrent(latestState);
    expect(currentScene.name).equal('conversations');
    expect(currentScene.sceneKey).equal('conversations');
    expect(currentScene.type).equal(ActionConst.PUSH);
    expect(currentScene.param1).equal('Hello world');

    latestState = reducer(latestState, {
      key: 'login', // we go to `login` but first renderable child is `loginModal1`
      type: ActionConst.PUSH,
      param2: 'Hello world2',
    });
    currentScene = getCurrent(latestState);
    expect(currentScene.name).equal('loginModal1');
    expect(currentScene.sceneKey).equal('loginModal1');
    expect(currentScene.type).equal(ActionConst.PUSH);
    expect(currentScene.param2).equal('Hello world2');

    latestState = reducer(latestState, {
      key: 'privacyPolicy',
      type: ActionConst.PUSH,
      param3: 'Accept policy',
    });
    currentScene = getCurrent(latestState);
    expect(currentScene.name).equal('privacyPolicy');
    expect(currentScene.sceneKey).equal('privacyPolicy');
    expect(currentScene.type).equal(ActionConst.PUSH);
    expect(currentScene.param3).equal('Accept policy');

    latestState = reducer(latestState, {
      key: 'cubeBar', // we go to cubeBar but first renderable child is `conversations`
      type: ActionConst.PUSH,
      param1: 'Conversations new param',
    });
    currentScene = getCurrent(latestState);
    expect(currentScene.name).equal('conversations');
    expect(currentScene.sceneKey).equal('conversations');
    expect(currentScene.type).equal(ActionConst.PUSH);
    expect(currentScene.param1).equal('Conversations new param');
  });
});
