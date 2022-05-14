import path from 'path';
import { SelfWebpackConfig } from 'webbuild';

export default (env, isSetOptions) => {
  console.log(env, isSetOptions);
  const config:SelfWebpackConfig = {
    projectType: 'react',
    entry: path.resolve(__dirname, './src/index.ts'),
    outputPath: path.resolve(__dirname, './output'),
    outputPublicPath: '',
    fileSizeLimit: 1000,
  };
  return config;
};
