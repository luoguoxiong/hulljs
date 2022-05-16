import path from 'path';
import { SelfWebpackConfig } from 'build-tools-webpack';

export default (env:string):SelfWebpackConfig => {
  const config:SelfWebpackConfig = {
    projectType: 'react',
    entry: path.resolve(__dirname, './src/index.ts'),
    outputPath: path.resolve(__dirname, './output'),
    outputPublicPath: '',
    fileSizeLimit: 1000,
    extraBabelPlugins: [],
    shouldUseSourceMap: false,
    htmlPluginConfig: {
      template: path.resolve(__dirname, './public/index.html'),
    },
    definePluginOptions: {
      VERSION: JSON.stringify('0.0.1'),
    },
    isUseBundleAnalyzer: false,
  };
  return config;
};
