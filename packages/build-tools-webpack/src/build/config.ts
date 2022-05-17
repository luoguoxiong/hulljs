import { RunBuildOpts } from '../types';
import { log } from '../utils';

const createConfig = () => {
  let config:RunBuildOpts;
  return {
    getConfig: ():RunBuildOpts | void => {
      if(config) return config;
      log.error('你没有设置config');
    },
    setConfig: (_config:RunBuildOpts) => {
      config = _config;
    },
  };
};

export const configTool = createConfig();
