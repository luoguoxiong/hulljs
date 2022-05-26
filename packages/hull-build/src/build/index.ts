
import { log, getFileExport } from '@hulljs/utils';
import { IBuildOptions, RunBuildOpts, IngetUserConfigRe } from '../types';
import { CONFIG_FILES } from '../constants';
import { getWebpackConfig } from './getWebpackConfig';
import { getViteConfig } from './getViteConfig';
import * as webpackDo from './webpackAction';
import * as viteDo from './viteAction';
import { configTool } from './config';

type CITYPE = 'dev'| 'build' | 'server'

const build = async(opts: IBuildOptions, ciType: CITYPE) => {
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
      log.error('hull.conf export is a funtion or object！');
      return;
    }
    config.buildTool = config.buildTool || 'webpack';
    const buildOpts: RunBuildOpts = {
      ...opts,
      ...config,
      isUseBundleAnalyzer: analyzer || config.isUseBundleAnalyzer,
      port: port || (config.devServer || {}).port || 5000,
    };

    configTool.setConfig(buildOpts);

    if(buildOpts.buildTool === 'webpack'){
      const webpackConf = await getWebpackConfig();
      switch (ciType){
        case 'dev': await webpackDo.startDevServer(webpackConf, buildOpts);break;
        case 'build': await webpackDo.startBuildPro(webpackConf, buildOpts);break;
        case 'server':await webpackDo.startProServer(webpackConf, buildOpts);break;
        default: return;
      }
    }else{
      const viteConf = await getViteConfig();
      switch (ciType){
        case 'dev': await viteDo.startDevServer(viteConf, buildOpts);break;
        case 'build': await viteDo.startBuildPro(viteConf, buildOpts);break;
        case 'server':await viteDo.startProServer(viteConf, buildOpts);break;
        default: return;
      }
    }

  } catch (error: any) {
    throw Error(error);
  }
};

export default build;
