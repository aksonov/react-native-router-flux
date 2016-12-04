import React from 'react';
import { expect } from 'chai';

import Scene from '../src/Scene';
import { ActionsTest } from '../src/Actions';
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

describe('createReducer', () => {
  it('initilize state correct and reducer works', () => {
    // create scenes and initialState
    // For creating scenes we use external modules.
    // TODO: Think about fully isolated test.
    const Actions = new ActionsTest();
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

describe('handling actions', () => {
  let Actions;
  let state;
  let current;

  beforeEach(() => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="main" tabs>
          <Scene key="hello" component={noop} initial />
          <Scene key="world" component={noop} />
        </Scene>
      </Scene>
    );

    Actions = new ActionsTest();
    const scenes = Actions.create(scene);
    const initialState = getInitialState(scenes);
    const reducer = createReducer({ initialState, scenes });

    state = { ...initialState, scenes };
    current = getCurrent(state);
    Actions.callback = action => {
      state = reducer(state, action);
      current = getCurrent(state);
    };
  });

  it('navigates to a correct scene on PUSH', () => {
    Actions.main();

    expect(current.key).to.eq('0_hello_');
  });

  it('switches to a corret tab on JUMP', () => {
    Actions.main();
    Actions.hello();

    expect(current.key).to.eq('0_hello_');
  });
});

describe('passing props from actions', () => {
  it('passes props for normal scenes', () => {
    const scene = (
      <Scene key="root" component={noop}>
        <Scene key="hello" component={noop} initial />
        <Scene key="world" component={noop} />
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);
    const initialState = getInitialState(scenes);
    const reducer = createReducer({ initialState, scenes });

    let state = { ...initialState, scenes };
    let current = getCurrent(state);
    Actions.callback = action => {
      state = reducer(state, action);
      current = getCurrent(state);
    };

    Actions.hello({ customProp: 'Hello' });
    expect(current.customProp).to.eq('Hello');
    Actions.world({ customProp: 'World' });
    expect(current.customProp).to.eq('World');

    Actions.hello();
    expect(current.customProp).to.eq(void 0);
  });

  it.skip('passes props for tab scenes', () => {
    const scene = (
      <Scene key="root" component={noop} tabs>
        <Scene key="home" component={noop} />
        <Scene key="map" component={noop} />
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);
    const initialState = getInitialState(scenes);
    const reducer = createReducer({ initialState, scenes });

    let state = { ...initialState, scenes };
    let current = getCurrent(state);
    Actions.callback = action => {
      state = reducer(state, action);
      current = getCurrent(state);
    };

    Actions.home({ customProp: 'Home' });
    expect(current.customProp).to.eq('Home');
    Actions.map({ customProp: 'Map', anotherProp: 'Another' });
    expect(current.customProp).to.eq('Map');
    expect(current.anotherProp).to.eq('Another');

    Actions.home();
    expect(current.customProp).to.eq(void 0);
    expect(current.anotherProp).to.eq(void 0);
  });

  it.skip('passes props for nested tab scenes', () => {
    const scene = (
      <Scene key="root" component={noop} tabs>
        <Scene key="home" component={noop} />
        <Scene key="map" component={noop} tabs>
          <Scene key="nested" component={noop} />
          <Scene key="nested2" component={noop} />
        </Scene>
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);
    const initialState = getInitialState(scenes);
    const reducer = createReducer({ initialState, scenes });

    let state = { ...initialState, scenes };
    let current = getCurrent(state);
    Actions.callback = action => {
      state = reducer(state, action);
      current = getCurrent(state);
    };

    Actions.home({ customProp: 'Home', anotherProp: 'Another' });
    expect(current.customProp).to.eq('Home');
    expect(current.anotherProp).to.eq('Another');

    Actions.map();
    expect(current.customProp).to.eq(void 0);
    expect(current.anotherProp).to.eq(void 0);

    Actions.nested2({ customProp: 'Custom' });
    expect(current.customProp).to.eq('Custom');
    expect(current.anotherProp).to.eq(void 0);
  });

  it.skip('passes props for very nested tab scenes', () => {
    const scene = (
      <Scene key="root" component={noop} tabs>
        <Scene key="home" component={noop} />
        <Scene key="map" component={noop} tabs>
          <Scene key="nested" component={noop} />
          <Scene key="nested2" component={noop} />
          <Scene key="nestedTabs" component={noop} tabs>
            <Scene key="nestedTab" component={noop} />
            <Scene key="nestedTab2" component={noop} />
          </Scene>
        </Scene>
        <Scene key="normal" component={noop} />
      </Scene>
    );

    const Actions = new ActionsTest();
    const scenes = Actions.create(scene);
    const initialState = getInitialState(scenes);
    const reducer = createReducer({ initialState, scenes });

    let state = { ...initialState, scenes };
    let current = getCurrent(state);
    Actions.callback = action => {
      state = reducer(state, action);
      current = getCurrent(state);
    };

    Actions.home({ customProp: 'Home', anotherProp: 'Another' });
    expect(current.customProp).to.eq('Home');
    expect(current.anotherProp).to.eq('Another');

    Actions.map();
    expect(current.customProp).to.eq(void 0);
    expect(current.anotherProp).to.eq(void 0);

    Actions.nestedTabs({ customProp: 'Custom' });
    expect(current.customProp).to.eq('Custom');
    expect(current.anotherProp).to.eq(void 0);

    Actions.nestedTab2();
    expect(current.customProp).to.eq(void 0);

    Actions.map({ customProp: 'Custom' });
    expect(current.customProp).to.eq('Custom');
  });
});
