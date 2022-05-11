
import { IBuildOptions } from '../types';
import { getUserConfig } from '../utils';

const build = async(opts:IBuildOptions) => {
  const { cwd } = opts;
  const config = await getUserConfig(cwd);
  if(typeof config === 'function'){
    config(true, {});
  }
};

export default build;
