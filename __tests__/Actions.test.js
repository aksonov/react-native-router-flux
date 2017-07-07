import { expect } from 'chai';

import React from 'react';

import * as ActionConst from '../src/ActionConst';
import { ActionsTest } from '../src/Actions';
import Scene from '../src/Scene';

const id = 0;
const guid = () => id + 1;
const noop = () => {};

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

describe('Actions', () => {
  it('should produce needed actions', () => {
    const Actions = new ActionsTest();
    const scenes = Actions.create(scenesData);

    // check scenes
    expect(scenes.conversations.component).to.equal('Conversations');

    // set callback which will extract generated action
    let latestAction = null;
    Actions.callback = (action) => { latestAction = action; };

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

  it('throws when not providing a root scene', () => {
    const Actions = new ActionsTest();
    const scene = undefined;
    expect(() => Actions.create(scene)).to.throw(Error, 'root scene');
  });

  it('throws when using a reserved method', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="create" component={noop} />
      </Scene>
    );

    const Actions = new ActionsTest();
    expect(() => Actions.create(scene)).to.throw(Error, 'create');
  });

  it('throws when using an action method', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="push" component={noop} />
      </Scene>
    );

    const Actions = new ActionsTest();
    expect(() => Actions.create(scene)).to.throw(Error, 'push');
  });

  it('wraps child scenes if the parent is tabs', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="main" tabs>
          <Scene key="home" component={noop} />
          <Scene key="map" component={noop} />
          <Scene key="myAccount" component={noop} />
        </Scene>
      </Scene>
    );
    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);

    const tabKeys = ['home', 'map', 'myAccount'];
    tabKeys.forEach((key) => {
      expect(scenes[key].component).to.eq(undefined);
      expect(scenes[key].type).to.eq(ActionConst.JUMP);

      const wrappedKey = scenes[key].children[0];
      expect(scenes[wrappedKey].component).to.not.eq(undefined);
      expect(scenes[wrappedKey].type).to.eq(ActionConst.PUSH);
    });
  });

  it('provides keys to children of a scene', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="home" component={noop} />
        <Scene key="map" component={noop} />
        <Scene key="myAccount" component={noop} />
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);

    const childrenKeys = ['home', 'map', 'myAccount'];
    expect(scenes.root.children).to.include.all(...childrenKeys);
  });

  it('substates have their base set to their parent', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="view" type={ActionConst.REFRESH} />
        <Scene key="edit" type={ActionConst.REFRESH} edit />
        <Scene key="save" type={ActionConst.REFRESH} save />
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);

    const subStates = ['view', 'edit', 'save'];
    subStates.forEach((key) => {
      expect(scenes[key].base).to.eq('root');
      expect(scenes[key].parent).to.eq(scenes.root.parent);
    });
  });

  it('substates do not need to specify REFRESH type', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="view" />
        <Scene key="edit" edit />
        <Scene key="save" save />
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);

    const subStates = ['view', 'edit', 'save'];
    subStates.forEach((key) => {
      expect(scenes[key].type).to.eq(ActionConst.REFRESH);
    });
  });

  it('allows mixing of substates with children', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="view" />
        <Scene key="edit" edit />
        <Scene key="save" save />
        <Scene key="messaging" component={noop}>
          <Scene key="conversations" component={noop} />
        </Scene>
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);

    const subStates = ['view', 'edit', 'save'];
    subStates.forEach((key) => {
      expect(scenes[key].type).to.eq(ActionConst.REFRESH);
    });
    expect(scenes.messaging.type).to.eq(ActionConst.PUSH);
  });
});
