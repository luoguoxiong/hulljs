import path from 'path';

export default{
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, './test/index.js'),
  output: {
    path: path.join(__dirname, './test/output'),
    filename: '[name].js',
    publicPath: '',
  },
};
