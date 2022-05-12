import path from 'path';
import { Configuration } from 'webpack';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];
export const WEBPACK_COMMON_CONF:Configuration = {
  output: {
    path: '',
    publicPath: '',
  },
  target: 'web',
  infrastructureLogging: {
    level: 'none',
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
};
