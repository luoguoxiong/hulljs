import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { WEBPACK_COMMON_CONF, WEBPACK_DEV_CONF, WEBPACK_PROD_CONF } from '../constants';
import { IBuildOptions, SelfWebpackConfig } from '../types';
import { getAliasAndModulesFromConfig } from './modules';

export const getWebpackConfig = (selfConfig:IBuildOptions):Configuration => {

  const { appDirectory, env, buildArgs } = selfConfig;

  const { modules, alias } = getAliasAndModulesFromConfig(appDirectory);

  const { shouldUseSourceMap = false, outputPath, outputPublicPath, resolveAlias } = buildArgs as SelfWebpackConfig;

  const isProduction = env === 'production';

  const isUseSourceMap = isProduction ? shouldUseSourceMap : true;

  const devtool = isProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map';

  const config:Configuration = {
    devtool,
    output: {
      path: outputPath,
      publicPath: outputPublicPath,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(appDirectory, `node_modules/.${isProduction ? 'prod' : 'dev'}cache`),
    },
    optimization: {
    },
    resolve: {
      modules,
      alias: {
        ...resolveAlias,
        ...alias,
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        ...(isUseSourceMap ? [{
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          use: ['source-map-loader'],
        }] : []),
      ],

    },
  };

  return merge(isProduction ? WEBPACK_PROD_CONF : WEBPACK_DEV_CONF, WEBPACK_COMMON_CONF, config);
};
