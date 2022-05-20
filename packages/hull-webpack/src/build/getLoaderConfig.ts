import { IGetBabelOptions } from '@hulljs/babel-preset-hull-app';
import minCssExtract from 'mini-css-extract-plugin';
import { getExistFile } from '../utils';
import { configTool } from './config';


interface IngetJsLoaderConfig{
    isProduction:boolean;
    isTypeScript:boolean;
}

export const getFileLoaderConfig = () => {
  const config = configTool.getConfig();
  if(config){
    const { fileSizeLimit } = config;
    return [
      {
        test: [/\.avif|svg|jpe?g|png|gif$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: fileSizeLimit,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|mp3|mp4)$/,
        exclude: /node_modules/,
        type: 'asset',
      },
    ];
  }
  return [];
};

export const getJsLoaderConfig = (opts:IngetJsLoaderConfig) => {
  const config = configTool.getConfig();
  if(config){
    const { appDirectory, extraBabelPlugins = [], extraBabelPresets = [], projectType } = config;
    const { isTypeScript, isProduction } = opts;
    const babelOptions:IGetBabelOptions = {
      target: 'browser',
      isTypeScript,
      type: 'auto',
      projectType,
      isProduction,
      isUseRunTime: true,
    };

    return [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: appDirectory,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              require.resolve('@hulljs/babel-preset-hull-app'),
              babelOptions,
            ],
            ...extraBabelPresets,
          ],
          plugins: extraBabelPlugins,
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          compact: true,
        },
      },
    ];
  }
  return [];

};

export const getCssLoaderConfig = () => {
  const config = configTool.getConfig();

  if(config){

    const { env, shouldUseSourceMap, appDirectory } = config;

    const isProduction = (env || '').includes('prod');

    const isUseSourceMap = isProduction ? shouldUseSourceMap : false;

    const postcssConfigPath = getExistFile({ appDirectory, files: ['postcss.config.js', 'postcss.config.cjs'] });

    const getStyleLoaders = (isCssModule:boolean, otherCssLoader?:string) => {
      const loaders:any[] = [
        isProduction ? minCssExtract.loader : require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: isCssModule,
            sourceMap: isUseSourceMap,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              config: postcssConfigPath,
              plugins: [
                [
                  require.resolve('postcss-preset-env'),
                  { stage: 3 },
                ],
              ],
            },
            sourceMap: isUseSourceMap,
          },
        },
      ];
      if (otherCssLoader) {
        loaders.push(
          {
            loader: require.resolve('resolve-url-loader'),
            options: {
              root: appDirectory,
            },
          },
          {
            loader: require.resolve(otherCssLoader),
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }
        );
      }
      return loaders;
    };
    return [
      {
        test: /\.css$/,
        exclude: /\.module.css$/,
        use: getStyleLoaders(false),
        sideEffects: true,
      },
      {
        test: /\.module.css$/,
        use: getStyleLoaders(true),
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: getStyleLoaders(false, 'less-loader'),
        sideEffects: true,
      },
      {
        test: /\.module\.less$/,
        use: getStyleLoaders(true, 'less-loader'),
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        use: getStyleLoaders(false, 'sass-loader'),
        sideEffects: true,
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: getStyleLoaders(true, 'sass-loader'),
      },
    ];
  }
  return [];
};
