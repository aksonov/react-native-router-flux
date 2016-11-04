import React from 'react';
import { expect } from 'chai';

import Scene from '../src/Scene';
import Actions from '../src/Actions';
import * as ActionConst from '../src/ActionConst';

import createReducer, { getCurrent, findElement } from '../src/Reducer';
import getInitialState from '../src/State';

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
    <Scene key="cloneModalComponent" component="cloneComponent" clone="true" type="modal" />
    <Scene key="login">
      <Scene key="loginModal1" component="Login1" />
      <Scene key="loginModal2" component="Login2" />
    </Scene>
  </Scene>);

describe('modifyStack', () => {
  let latestState;
  let currentScene;
  let reducer;

  beforeEach(() => {
    const scenes = Actions.create(scenesData);
    const initialState = getInitialState(scenes);
    reducer = createReducer({ initialState, scenes });
    latestState = null;
  });

  describe('REMOVE', () => {
    it('from root stack using sceneKey', () => {
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
        type: ActionConst.MODIFY_STACK,
        commands: [
          {type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'privacyPolicy'},
        ],
      });

      expect(latestState.index).equal(1);
      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('termsOfService');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('from root stack using index', () => {
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
        type: ActionConst.MODIFY_STACK,
        commands: [
          {type: ActionConst.ModifyStackTypes.REMOVE, index: 1},
        ],
      });

      expect(latestState.index).equal(1);
      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('termsOfService');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('2 from root stack', () => {
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
        type: ActionConst.MODIFY_STACK,
        commands: [
          {type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'privacyPolicy'},
          {type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'sideMenu'},
        ],
      });

      expect(latestState.index).equal(0);
      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('termsOfService');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('current scene not allowed', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      const action = {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          {type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'privacyPolicy'},
        ],
      };
      expect(() => reducer(latestState, action)).to.throw(/You are not allowed to remove current scene/);
    });

    it('cannot find scene in the stack', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      const action = {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          {type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'termsOfService'},
        ],
      };
      expect(() => reducer(latestState, action)).to.throw(/could not be found in the stack/);
    });

    it('cannot no sceneKey or index', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      const action = {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          {type: ActionConst.ModifyStackTypes.REMOVE},
        ],
      };
      expect(() => reducer(latestState, action)).to.throw(/sceneKey or index has to be defined/);
    });
  });

  describe('INSERT', () => {
    it('to root stack, no position', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService' },
        ],
      });

      expect(latestState.index).equal(2);
      expect(latestState.children[0].sceneKey).equal('termsOfService');
      expect(latestState.children[1].sceneKey).equal('sideMenu');
      expect(latestState.children[2].sceneKey).equal('privacyPolicy');

      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('privacyPolicy');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('with index to root stack', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService', index: 1 },
        ],
      });

      expect(latestState.index).equal(2);
      expect(latestState.children[0].sceneKey).equal('sideMenu');
      expect(latestState.children[1].sceneKey).equal('termsOfService');
      expect(latestState.children[2].sceneKey).equal('privacyPolicy');

      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('privacyPolicy');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('with beforeSceneKey to root stack', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService', beforeSceneKey: 'privacyPolicy' },
        ],
      });

      expect(latestState.index).equal(2);
      expect(latestState.children[0].sceneKey).equal('sideMenu');
      expect(latestState.children[1].sceneKey).equal('termsOfService');
      expect(latestState.children[2].sceneKey).equal('privacyPolicy');

      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('privacyPolicy');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('2 to root stack', () => {

      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService' },
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'privacyPolicy', index: 1 },
        ],
      });

      expect(latestState.index).equal(2);
      expect(latestState.children[0].sceneKey).equal('termsOfService');
      expect(latestState.children[1].sceneKey).equal('privacyPolicy');
      expect(latestState.children[2].sceneKey).equal('sideMenu');
      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('conversations');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });

    it('cannot change current scene', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      const action = {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService', index: 2 },
        ],
      };
      expect(() => reducer(latestState, action)).to.throw(/You are not allowed change current scene/);
    });
  });

  describe('REPLACE', () => {
    it('on root stack', () => {
      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'termsOfService',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'privacyPolicy',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'privacyPolicy' },
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'cloneModalComponent' },
        ],
      });

      expect(latestState.index).equal(2);
      expect(latestState.children[0].sceneKey).equal('sideMenu');
      expect(latestState.children[1].sceneKey).equal('cloneModalComponent');
      expect(latestState.children[2].sceneKey).equal('termsOfService');

      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('termsOfService');
      expect(currentScene.type).equal(ActionConst.PUSH);
    });
  });

  describe('child stack', () => {
    it('REPLACE on child stack', () => {
      latestState = reducer(latestState, {
        key: 'conversations',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'cloneModalComponent',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'conversations',
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.REMOVE, sceneKey: 'conversations' },
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService' },
        ],
      });

      currentScene = getCurrent(latestState);
      const parent = findElement(latestState, currentScene.parent);
      expect(parent.children[0].sceneKey).equal('termsOfService');
      expect(parent.index).equal(1);
      expect(currentScene.sceneKey).equal('cloneModalComponent');
    });

    it('INSERT on root stack from nested child', () => {
      latestState = reducer(latestState, {
        key: 'conversations',
        type: ActionConst.PUSH,
      });

      latestState = reducer(latestState, {
        key: 'login',
        type: ActionConst.PUSH,
      });
      latestState = reducer(latestState, {
        type: ActionConst.MODIFY_STACK,
        commands: [
          { type: ActionConst.ModifyStackTypes.INSERT, sceneKey: 'termsOfService', index: 1 },
        ],
      });

      expect(latestState.index).equal(2);
      expect(latestState.children[0].sceneKey).equal('sideMenu');
      expect(latestState.children[1].sceneKey).equal('termsOfService');
      expect(latestState.children[2].sceneKey).equal('login');
      currentScene = getCurrent(latestState);
      expect(currentScene.sceneKey).equal('loginModal1');
    });
  });
});
