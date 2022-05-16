import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import { choosePort } from '../utils';

type DevServeConfig = {port:number} & WebpackDevServer.Configuration

export const startDevServer = async(compiler:webpack.Compiler, devConfig:DevServeConfig) => {
  try {

    const port = await choosePort(devConfig.port as number);
    const config:DevServeConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      hot: true,
      historyApiFallback: true,
      open: false,
      ...devConfig,
      port,
    };
    const devServer = new WebpackDevServer(config, compiler);
    await devServer.start();
  } catch (error:any) {
    throw Error(error);
  }
};
