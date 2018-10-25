module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2017
  },
  root: true,
  rules: {
    "eqeqeq": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error"
  }
};
