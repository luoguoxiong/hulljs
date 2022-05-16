import { IGetBabelOptions } from 'babel-preset-build-tools';
import { ProjectType } from '../types';

interface IngetJsLoaderConfig{
    isProduction:boolean;
    appDirectory:string;
    isTypeScript:boolean;
    projectType:ProjectType;
    extraBabelPlugins:any[];
}

export const getFileLoaderConfig = (fileSizeLimit:number) => [
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
        loader: '@svgr/webpack',
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

export const getJsLoaderConfig = (opts:IngetJsLoaderConfig) => {
  const { appDirectory, isTypeScript, projectType, extraBabelPlugins = [], isProduction } = opts;
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
      loader: 'babel-loader',
      options: {
        presets: [
          [
            require.resolve('babel-preset-build-tools'),
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
    // 例如node_modules内的@babel_runtime@7.17.9@@babel/runtime/helpers/classCallCheck.js
    {
      test: /\.(js|mjs)$/,
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            require.resolve('babel-preset-build-tools'),
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
};

// export const getCssLoaderConfig = () => {};
