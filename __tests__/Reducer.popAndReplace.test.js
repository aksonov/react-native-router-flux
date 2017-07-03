import React from 'react';
import { expect } from 'chai';

import Scene from '../src/Scene';
import Actions from '../src/Actions';
import * as ActionConst from '../src/ActionConst';

import createReducer, { getCurrent, findElement } from '../src/Reducer';
import getInitialStateFromRoot from '../src/State';

const id = 0;
const guid = () => id + 1;
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
    <Scene key="cloneModalComponent" component="cloneComponent" clone="true" type="modal" />
    <Scene key="login">
      <Scene key="loginModal1" component="Login1" />
      <Scene key="loginModal2" component="Login2" />
    </Scene>
  </Scene>);

describe('popAndReplace', () => {
  let latestState;
  let currentScene;
  let reducer;

  beforeEach(() => {
    const scenes = Actions.create(scenesData);
    const initialState = getInitialStateFromRoot(scenes);
    reducer = createReducer({ initialState, scenes });
    latestState = null;
  });

  it('pop and replace on root stack', () => {
    latestState = reducer(latestState, {
      key: 'privacyPolicy',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'termsOfService',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'termsOfService',
      type: ActionConst.POP_AND_REPLACE,
    });

    expect(latestState.index).equal(1);
    currentScene = getCurrent(latestState);
    expect(currentScene.sceneKey).equal('termsOfService');
    expect(currentScene.type).equal(ActionConst.POP_AND_REPLACE);
  });

  it('pop 2 and replace on root stack', () => {
    latestState = reducer(latestState, {
      key: 'privacyPolicy',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'termsOfService',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'termsOfService',
      type: ActionConst.POP_AND_REPLACE,
      popNum: 2,
    });

    expect(latestState.index).equal(0);
    currentScene = getCurrent(latestState);
    expect(currentScene.popNum).equal(undefined);
    expect(currentScene.sceneKey).equal('termsOfService');
    expect(currentScene.type).equal(ActionConst.POP_AND_REPLACE);
  });

  it('pop out of root stack - standing on root', () => {
    try {
      latestState = reducer(latestState, {
        key: 'termsOfService',
        type: ActionConst.POP_AND_REPLACE,
      });
    } catch (err) {
      expect(err.message).equal('[react-native-router-flux] You are already in the root scene.');
    }
  });

  it('pop out of root stack', () => {
    try {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'termsOfService',
        type: ActionConst.POP_AND_REPLACE,
        popNum: 2,
      });
    } catch (err) {
      expect(err.message).equal('[react-native-router-flux] The data is the number of scenes ' +
        'you want to pop, it must be smaller than scenes stack\'s length.');
    }
  });

  it('pop and replace on child stack', () => {
    latestState = reducer(latestState, {
      key: 'conversations',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'cloneModalComponent',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'cloneModalComponent',
      type: ActionConst.POP_AND_REPLACE,
    });

    currentScene = getCurrent(latestState);
    expect(findElement(latestState, currentScene.parent).index).equal(0);
    expect(currentScene.sceneKey).equal('cloneModalComponent');
    expect(currentScene.type).equal(ActionConst.POP_AND_REPLACE);
  });

  it('pop and replace on root stack from nested child', () => {
    latestState = reducer(latestState, {
      key: 'conversations',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'login',
      type: ActionConst.PUSH,
    });

    latestState = reducer(latestState, {
      key: 'termsOfService',
      type: ActionConst.POP_AND_REPLACE,
    });

    expect(latestState.index).equal(0);
    currentScene = getCurrent(latestState);
    expect(currentScene.sceneKey).equal('termsOfService');
    expect(currentScene.type).equal(ActionConst.POP_AND_REPLACE);
  });
});
