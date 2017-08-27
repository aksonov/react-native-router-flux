import React, { Component } from 'react';

import ExampleMobX from './ExampleMobX';
import ExampleRedux from './ExampleRedux';

export default class ExampleSwitcher extends Component {
  state = {
    showingMobXExample: true,
  }

  handleToggleExample = () => {
    this.setState({
      showingMobXExample: !this.state.showingMobXExample,
    });
  }

  render() {
    return this.state.showingMobXExample ? <ExampleMobX /> : <ExampleRedux />;
  }
}
