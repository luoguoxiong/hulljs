import path from 'path';

export default (env) => {
  const config = {
    projectType: 'react',
    entry: path.resolve(__dirname, './src/index.jsx'),
    outputPath: path.resolve(__dirname, './output'),
    htmlPluginConfig: {
      title: 'hull-webpack-react',
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.join(__dirname, './public/favicon.ico'),
    },
  };
  return config;
};
