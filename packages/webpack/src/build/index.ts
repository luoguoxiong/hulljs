
import { IBuildOptions } from '../types';
import { getUserConfig } from '../utils';
import { getWebpackConfig } from './getWebpackConfig';

const build = async(opts:IBuildOptions) => {
  opts.buildArgs = {
    outputPath: '',
    outputPublicPath: '',
    shouldUseSourceMap: false,
  };
  const { appDirectory } = opts;
  const webpackConf = getWebpackConfig(opts);
//   console.log(webpackConf);
//   const config = await getUserConfig(appDirectory);
//   if(typeof config === 'function'){
//     config(true, {});
//   }
};

export default build;
