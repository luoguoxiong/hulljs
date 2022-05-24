
import { log, getFileExport } from '@hulljs/utils';
import { IBuildOptions, RunBuildOpts, IngetUserConfigRe } from '../types';
import { CONFIG_FILES } from '../constants';
import { getWebpackConfig } from './getWebpackConfig';
import { startDevServer, startBuildPro, startProServer } from './startAction';
import { configTool } from './config';

type CITYPE = 'dev'| 'build' | 'server'

const build = async(opts:IBuildOptions, ciType:CITYPE) => {
  try {
    const { appDirectory, env, analyzer, port } = opts;

    const configFnOrObj = await getFileExport<IngetUserConfigRe>(appDirectory, CONFIG_FILES);

    let config;
    if(typeof configFnOrObj === 'function'){
      const resConf = configFnOrObj(env);
      config = resConf;
    } else if(typeof configFnOrObj === 'object'){
      config = configFnOrObj;
    }else{
      log.error('hull.conf.js或你设置hull.conf.ts应该是函数或者对象！');
      return;
    }
    const buildOpts:RunBuildOpts = {
      ...opts,
      ...config,
      isUseBundleAnalyzer: analyzer || config.isUseBundleAnalyzer,
      port: port || (config.devServer || {}).port || 5000,
    };

    configTool.setConfig(buildOpts);

    const webpackConf = await getWebpackConfig();

    switch (ciType){
      case 'dev': await startDevServer(webpackConf, buildOpts);break;
      case 'build': await startBuildPro(webpackConf, buildOpts);break;
      case 'server':await startProServer(webpackConf, buildOpts);break;
      default: return;
    }

  } catch (error:any) {
    throw Error(error);
  }
};

export default build;
