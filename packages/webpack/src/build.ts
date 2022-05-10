
import { IBuildOptions } from './types';
import { getUserConfig } from './utils';
const build = (opts:IBuildOptions):void => {
  const { cwd } = opts;
  getUserConfig(cwd);
  console.log(opts);

};

export default build;
