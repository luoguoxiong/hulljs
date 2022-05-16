import webpack, { Configuration } from 'webpack';
export const WEBPACK_COMMON_CONF:Configuration = {
  target: 'web',
  infrastructureLogging: {
    level: 'none',
  },
  watchOptions: {
    poll: 1000,
  },
  resolve: {
    extensions: [
      '.web.mjs',
      '.mjs',
      '.web.js',
      '.js',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json',
      '.web.jsx',
      '.jsx',
      '.less',
      '.scss',
      '.sass',
      '.css',
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [],
  },
  plugins: [
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: 'entries',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};
