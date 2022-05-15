import { Configuration } from 'webpack';

export const WEBPACK_DEV_CONF:Configuration = {
  mode: 'development',
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  },
};
