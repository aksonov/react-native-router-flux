import React, { Component } from 'react';

import Example from './Example';

export default class App extends Component {
  state = {
    example: 'normal',
  }

  handleExampleChange = example => {
    this.setState({
      example,
    });
  }

  render() {
    return (
      <Example />
    );
  }
}
