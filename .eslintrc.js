module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:import/typescript', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-undef': 'off',
    'no-unused-vars': 'warn',
    'no-restricted-syntax': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
      },
    ],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'prettier/prettier': 'error',
  },
  globals: {
    GameMods: 'readonly',
    Category: 'readonly',
    Store: 'readonly',
  },
};
