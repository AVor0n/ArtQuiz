module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-rational-order',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'empty-line-between-groups': true,
      },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
    'declaration-empty-line-before': null, //конфликтует с rational-order
  },
  ignoreFiles: ['**/reset.css'],
};
