import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { WEBPACK_COMMON_CONF, WEBPACK_DEV_CONF, WEBPACK_PROD_CONF } from '../constants';
import { IBuildOptions, SelfWebpackConfig } from '../types';
export const getWebpackConfig = (selfConfig:IBuildOptions):Configuration => {

  const { appDirectory, env, buildArgs } = selfConfig;

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
      modules: ['node_modules', appDirectory],
      // tsconfig.json、jsconfig.json 需要配置paths  "@/*": ["./*"] 和 "baseUrl": ".",
      alias: {
        '@': appDirectory,
        ...resolveAlias,
      },
    },
  };

  return merge(isProduction ? WEBPACK_PROD_CONF : WEBPACK_DEV_CONF, WEBPACK_COMMON_CONF, config);
};
