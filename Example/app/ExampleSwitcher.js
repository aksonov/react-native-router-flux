import React, { Component } from 'react';

import ExampleMobX from './ExampleMobX';
import ExampleRedux from './ExampleRedux';

export default class ExampleSwitcher extends Component {
  state = {
    showingMobXExample: true, // Set this to false to play with the redux example.
  }

  render() {
    return this.state.showingMobXExample ? <ExampleMobX /> : <ExampleRedux />;
  }
}
