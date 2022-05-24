module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    rules: {
      'no-unused-vars': 'off',
    },
  }],
};
