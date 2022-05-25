import webpack, { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
export const WEBPACK_COMMON_CONF: Configuration = {
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
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json',
      '.web.js',
      '.js',
      '.web.jsx',
      '.jsx',
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [],
  },
  plugins: [
    new WebpackBar(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};
