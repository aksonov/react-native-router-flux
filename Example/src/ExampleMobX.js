import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { observable, action } from 'mobx';
import { Reducer } from 'react-native-router-flux';

import Example from './Example';

@observer
export default class ExampleMobX extends Component {
  get state() {
    const state = this._state;
    return state;
  }

  @observable _state = null;

  reducer = new Reducer();

  @action dispatch = cmd => {
    console.log('mobx ftl');
    const newState = this.reducer(this._state, cmd);
    console.log(newState);
    this._state = newState;
  }

  render() {
    console.log('Rendering me!');

    return (
      <Example
        state={this.state}
        dispatch={this.dispatch}
      />
    );
  }
}
