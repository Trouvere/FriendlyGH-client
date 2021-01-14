module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'prettier'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'react/prop-types': 1,
    'react/jsx-filename-extension': 0,
    'comma-dangle': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off'
  },
  overrides: [
    {
      files: ['*.jsx', '*.js']
    }
  ]
};
