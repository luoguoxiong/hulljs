import { IGetBabelOptions } from 'babel-preset-hull';
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
        test: [/\.avif$/],
        type: 'asset',
        mimetype: 'image/avif',
        parser: {
          dataUrlCondition: {
            maxSize: fileSizeLimit,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
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
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
    ];
  }

  return [];

};

export const getJsLoaderConfig = (opts:IngetJsLoaderConfig) => {
  const config = configTool.getConfig();
  if(config){
    const { appDirectory, projectType, extraBabelPlugins = [] } = config;
    const { isTypeScript, isProduction } = opts;
    const babelOptions:IGetBabelOptions = {
      target: 'browser',
      isTypeScript,
      projectType,
      type: 'auto',
      isProduction,
      isUseRunTime: true,
    };

    return [
      // 处理appDirectory
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: appDirectory,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              require.resolve('babel-preset-hull'),
              babelOptions,
            ],
          ],
          plugins: extraBabelPlugins,
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          compact: true,
        },
      },
      // 处理appDirectory外的js
      {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              require.resolve('babel-preset-hull'),
              babelOptions,
            ],
          ],
          babelrc: false,
          configFile: false,
          compact: false,
          cacheDirectory: true,
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
