import { expect } from 'chai';

import React from 'react';

import Actions from '../src/Actions';
import Scene from '../src/Scene';

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

let scenes;

describe('Actions', () => {
  before(() => {
    scenes = Actions.create(scenesData);
  });
  it('should produce needed actions', () => {
    // check scenes
    expect(scenes.conversations.component).to.equal('Conversations');

    // set callback which will extract generated action
    let latestAction = null;
    Actions.callback = action => { latestAction = action; };

    // test generated actions
    Actions.conversations({ param1: 'Hello world' });
    expect(latestAction.param1).equal('Hello world');
    expect(latestAction.key).equal('conversations');

    Actions.sideMenu({ param2: 'Hello world2' });
    expect(latestAction.param1).equal(undefined);
    expect(latestAction.param2).equal('Hello world2');
    expect(latestAction.key).equal('sideMenu');

    Actions.messaging({ param3: 'Hello world3' });
    expect(latestAction.param3).equal('Hello world3');
    expect(latestAction.key).equal('messaging');
  });
});
