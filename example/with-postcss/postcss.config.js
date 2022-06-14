module.exports = {
  plugins: [
    require('postcss-px-to-viewport')({
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
