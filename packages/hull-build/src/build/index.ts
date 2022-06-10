
import { log, getFileExport } from '@hulljs/utils';
import { IBuildOptions, RunBuildOpts, IngetUserConfigRe } from '../types';
import { CONFIG_FILES } from '../constants';
import { getWebpackConfig } from './getWebpackConfig';
import { getViteConfig } from './getViteConfig';
import * as webpackDo from './webpackAction';
import * as viteDo from './viteAction';
import { defineConfig } from './defineConfig';

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

    const buildOpts: RunBuildOpts = {
      ...opts,
      ...config,
      buildTool: opts.buildTool || config.buildTool || 'webpack',
      isUseBundleAnalyzer: (analyzer || config.isUseBundleAnalyzer),
      devServer: {
        port: port || (config.devServer || {}).port || 8080,
        https: !!(config.devServer || {}).https,
      },
      isProd: env.includes('prod'),
    };


    const defindBuildOpts = defineConfig(buildOpts);

    if(buildOpts.buildTool === 'webpack'){
      const webpackConf = await getWebpackConfig();
      switch (ciType){
        case 'dev': await webpackDo.startDevServer(webpackConf, defindBuildOpts);break;
        case 'build': await webpackDo.startBuildPro(webpackConf, defindBuildOpts);break;
        case 'server':await webpackDo.startProServer(webpackConf, defindBuildOpts);break;
        default: return;
      }
    }else{
      const viteConf = await getViteConfig();
      switch (ciType){
        case 'dev': await viteDo.startDevServer(viteConf, defindBuildOpts);break;
        case 'build': await viteDo.startBuildPro(viteConf);break;
        case 'server':await viteDo.startProServer(viteConf, defindBuildOpts);break;
        default: return;
      }
    }
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
};

export default build;
