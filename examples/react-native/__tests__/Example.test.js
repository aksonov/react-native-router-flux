import * as React from 'react';
import { render } from 'react-native-testing-library';

import Example from '../Example';

test('Example renders successfully', () => {
  expect(() => {
    render(<Example />);
  }).not.toThrow();
});
