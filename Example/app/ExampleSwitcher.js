import React, { Component } from 'react';

import ExamplePure from './ExamplePure';
import ExampleMobX from './ExampleMobX';
import ExampleRedux from './ExampleRedux';

export default class ExampleSwitcher extends Component {
  state = {
    showingMobXExample: true, // Set this to false to play with the redux example.
  }

  render() {
    return <ExamplePure />;
    //return this.state.showingMobXExample ? <ExampleMobX /> : <ExampleRedux />;
  }
}
