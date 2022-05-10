import { path } from 'path';

export default{
  entry: path.join(dirname, './test/index.js'),
  output: {
    path: path.join(dirname, './test/output'),
    filename: '[name].js',
    publicPath: '',
  },
};
