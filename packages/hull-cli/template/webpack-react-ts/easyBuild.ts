import path from 'path';
import { SelfWebpackConfig } from 'build-tools-webpack';

export default (env:string):SelfWebpackConfig => {
  console.log('env:', env);
  const config:SelfWebpackConfig = {
    projectType: 'react',
    entry: path.resolve(__dirname, './src/index'),
    outputPath: path.resolve(__dirname, './output'),
    outputPublicPath: '/',
    htmlPluginConfig: {
      title: 'easyBuild',
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.join(__dirname, './public/favicon.ico'),
    },
  };
  return config;
};
