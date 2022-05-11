import { Configuration } from 'webpack';


const getWebpackConfig = ():Configuration => {

  const config:Configuration = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
  };
  return {};
};
