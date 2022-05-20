import path from 'path';

export default (env) => {
  console.log('env', env);
  return {
    projectType: 'react',
    entry: path.resolve(__dirname, './src/index'),
    outputPath: path.resolve(__dirname, './build'),
    htmlPluginConfig: {
      title: 'hull-webpack-react',
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.join(__dirname, './public/favicon.ico'),
    },
    splitChunks: {
      cacheGroups: {
        reactChunks: {
          name: 'reactChunks',
          test: (module) => new RegExp(/react/).test(module.context),
          chunks: 'all',
        },
      },
    },
  };
};
