module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  parser: 'babel-eslint',
  rules: {
    'no-console': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^react$',
          '^react-native$',
          '^react-native/',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.android.js',
          '.ios.js',
        ],
      },
    },
    node: true,
  },
};
