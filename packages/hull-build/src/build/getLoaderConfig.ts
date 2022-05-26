import { IGetBabelOptions } from '@hulljs/babel-preset-hull-app';
import minCssExtract from 'mini-css-extract-plugin';
import { getExistFile } from '@hulljs/utils';
import { configTool } from './config';


interface IngetJsLoaderConfig{
  isProduction: boolean;
  isTypeScript: boolean;
}

export const getFileLoaderConfig = () => {
  const config = configTool.getConfig();

  const { fileSizeLimit = 1000 } = config;
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
};

export const getJsLoaderConfig = (opts: IngetJsLoaderConfig) => {
  const config = configTool.getConfig();

  const { appDirectory, extraBabelPlugins = [], extraBabelPresets = [], projectType } = config;
  const { isTypeScript, isProduction } = opts;

  const babelOptions: IGetBabelOptions = {
    isTypeScript,
    projectType,
    isProduction,
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

};

export const getCssLoaderConfig = () => {
  const config = configTool.getConfig();

  const { env, shouldUseSourceMap = false, appDirectory, sassLoaderOptions = {}, lessLoaderOptions = {} } = config;

  const isProduction = (env || '').includes('prod');

  const isUseSourceMap = isProduction ? shouldUseSourceMap : false;

  const { isOk, absFilePath } = getExistFile({ appDirectory, files: ['postcss.config.js', 'postcss.config.cjs'] });

  const defaultLessOpts = {
    lessOptions: {
      javascriptEnabled: true,
    },
  };

  const defaultSassOpts = {};
  const getStyleLoaders = (isCssModule: boolean, otherCssLoader?: string, otherLoaderOpts?: any) => {
    const loaders: any[] = [
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
            config: isOk ? absFilePath : false,
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
            ...otherLoaderOpts,
          },
        },
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
      use: getStyleLoaders(false, 'less-loader', {
        ...defaultLessOpts,
        ...lessLoaderOptions,
      }),
      sideEffects: true,
    },
    {
      test: /\.module\.less$/,
      use: getStyleLoaders(true, 'less-loader', {
        ...defaultLessOpts,
        ...lessLoaderOptions,
      }),
    },
    {
      test: /\.(sass|scss)$/,
      exclude: /\.module\.(sass|scss)$/,
      use: getStyleLoaders(false, 'sass-loader', {
        ...defaultSassOpts,
        ...sassLoaderOptions,
      }),
      sideEffects: true,
    },
    {
      test: /\.module\.(sass|scss)$/,
      use: getStyleLoaders(true, 'sass-loader', {
        ...defaultSassOpts,
        ...sassLoaderOptions,
      }),
    },
  ];
};
