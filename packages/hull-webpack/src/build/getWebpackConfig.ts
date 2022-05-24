import path from 'path';
import webpack, { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { VueLoaderPlugin } from 'vue-loader';
import{ choosePort, getModulesFromConfig } from '@hulljs/utils';
import { WEBPACK_COMMON_CONF, WEBPACK_DEV_CONF, WEBPACK_PROD_CONF } from '../constants';
import { getFileLoaderConfig, getJsLoaderConfig, getCssLoaderConfig } from './getLoaderConfig';
import { configTool } from './config';

export const getWebpackConfig = async():Promise<Configuration> => {
  const buildConfig = configTool.getConfig();

  const { appDirectory, env, shouldUseSourceMap = false, outputPath,
    outputPublicPath, resolveAlias, entry, htmlPluginConfig,
    extraWebpackPlugins, extraModuleRules,
    definePluginOptions = {}, isUseBundleAnalyzer = false, splitChunks = {} } = buildConfig;

  const { modules, alias, isTypeScript } = getModulesFromConfig(appDirectory);

  const isProduction = (env || '').includes('prod');

  const isUseSourceMap = isProduction ? shouldUseSourceMap : false;

  const devtool = isProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map';

  const config:Configuration = {
    devtool,
    context: appDirectory,
    entry,
    output: {
      path: outputPath,
      publicPath: outputPublicPath,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(appDirectory, `node_modules/.${isProduction ? 'prod' : 'dev'}_cache`),
    },
    resolve: {
      modules,
      alias: {
        ...resolveAlias,
        ...alias,
      },
    },
    optimization: {
      splitChunks: isProduction ? splitChunks : {},
    },
    module: {
      strictExportPresence: true,
      rules: [
        ...(isUseSourceMap ? [{
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          use: ['source-map-loader'],
        }] : []),
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        ...getFileLoaderConfig(),
        ...getJsLoaderConfig({ isTypeScript, isProduction }),
        ...getCssLoaderConfig(),
        ...(extraModuleRules ? extraModuleRules : []),
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        cache: false,
        minify: isProduction,
        template: path.join(__dirname, '../../public/index.html'),
        favicon: path.join(__dirname, '../../public/favicon.ico'),
        ...htmlPluginConfig,
      }),
      new webpack.DefinePlugin({
        ...definePluginOptions,
        'DEBUG': !isProduction,
      }),
      ...(isUseBundleAnalyzer ? [new BundleAnalyzerPlugin({ analyzerPort: await choosePort(8888) })] : []),
      ...(extraWebpackPlugins ? extraWebpackPlugins : []),
    ],
  };

  return merge(isProduction ? WEBPACK_PROD_CONF : WEBPACK_DEV_CONF, WEBPACK_COMMON_CONF, config);
};
