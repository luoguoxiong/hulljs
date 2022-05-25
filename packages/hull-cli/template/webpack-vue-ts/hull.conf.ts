import path from 'path';
import { SelfWebpackConfig } from '@hulljs/webpack';
export default (env: any): SelfWebpackConfig => {
  console.log('env:', env);
  const config = {
    projectType: 'vue',
    entry: path.resolve(__dirname, './src/index.ts'),
    outputPath: path.resolve(__dirname, './build'),
    outputPublicPath: '/',
    htmlPluginConfig: {
      title: 'hull-webpack-vue',
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.join(__dirname, './public/favicon.ico'),
    },
    splitChunks: {
      cacheGroups: {
        vueChunks: {
          name: 'vueChunks',
          test: (module) => new RegExp(/vue/).test(module.context),
          chunks: 'all',
        },
      },
    },
  };
  return config;
};
