module.exports = {
  extends: [
    require.resolve('./index.js'),
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
