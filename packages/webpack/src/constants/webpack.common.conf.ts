import path from 'path';
import { Configuration } from 'webpack';

export const WEBPACK_COMMON_CONF:Configuration = {
  target: 'web',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
  module: {
    rules: [],
  },
};
