import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

export const WEBPACK_PROD_CONF:Configuration = {
  mode: 'production',
  bail: true,
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  },
  optimization: {
    // 生产环境开启
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // esbuild 是一个非常快的 JavaScript 打包器和压缩器。
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {
          parse: {
            ecma: 5,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
            drop_debugger: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
};
