import 'react-native';
import React from 'react';

import Example from '../Example';
jest.unmock('Image');

import renderer from 'react-test-renderer';

describe('Example', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Example />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
