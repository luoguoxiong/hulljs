
import webpack from 'webpack';
import { IBuildOptions } from '../types';
import { getUserConfig, log } from '../utils';
import { getWebpackConfig } from './getWebpackConfig';
import { startDevServer } from './startDevServer';
const build = async(opts:IBuildOptions) => {
  try {
    const { appDirectory, env } = opts;
    const config = await getUserConfig(appDirectory);
    opts.buildArgs;
    if(typeof config === 'function'){
      const resConf = config(env);
      opts.buildArgs = resConf;
    } else if(typeof config === 'object'){
      opts.buildArgs = config;
    }else{
      log.error('你设置easyBuild必须配置的是函数或者对象！');
      return;
    }

    const webpackConf = getWebpackConfig(opts);
    const compiler = webpack(webpackConf);
    await startDevServer(compiler, { port: 5000 });
  } catch (error:any) {
    log.error(error);
    throw Error(error);
  }
};

export default build;
