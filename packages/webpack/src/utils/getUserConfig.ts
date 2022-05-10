import{ CONFIG_FILES } from '../constants';
import { IBundleOptions } from '../types';
import { getExistFile } from './getExistFile';
import { registerBabel } from './registerBabel';
export const getUserConfig = (cwd:string):IBundleOptions => {

  registerBabel({
    cwd,
    only: CONFIG_FILES,
  });
  const filePath = getExistFile({ cwd, files: CONFIG_FILES, returnRelative: false });

  console.log(require(filePath));

  return { port: 1 };
};
