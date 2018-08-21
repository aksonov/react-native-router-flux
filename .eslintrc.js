module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jest'],
  env: {
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  rules: {
    'no-new-func': 'warn',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',

    'react/forbid-prop-types': 'warn',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'no-param-reassign': 0,
    'no-console': 0,
    'new-cap': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'max-len': ['error', 180],
    'import/no-unresolved': [
      2,
      {
        ignore: ['^react$', '^react-native$', '^react-native/'],
      },
    ],
    'import/no-cycle': 'warn',
    'import/no-self-import': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-bitwise': [
      'error',
      {
        allow: ['^'],
      },
    ],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js'],
      },
    },
    node: true,
    react: {
      version: '16.4.2',
    },
  },
};
