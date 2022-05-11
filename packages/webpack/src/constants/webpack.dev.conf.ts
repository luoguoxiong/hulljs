import { Configuration } from 'webpack';

export const WEBPACK_DEV_CONF:Configuration = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
};
