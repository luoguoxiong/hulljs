import { Configuration } from 'webpack';

export const WEBPACK_PROD_CONF:Configuration = {
  mode: 'production',
  devtool: 'hidden-source-map',
};
