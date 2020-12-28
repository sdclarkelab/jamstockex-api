module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'prettier',
    'airbnb',
    'eslint:recommended',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'no-unused-vars': 'warn',
  },
};
