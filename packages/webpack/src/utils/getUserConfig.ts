import{ CONFIG_FILES } from '../constants';
import { isDefault, getExistFile, registerBabel, log } from './';

export const getUserConfig = async(cwd:string) => {
  try {
    registerBabel({
      cwd,
      only: CONFIG_FILES,
    });
    const filePath = getExistFile({ cwd, files: CONFIG_FILES, returnRelative: false });
    return isDefault(await import(filePath));
  } catch (error) {
    log.error(error);
  }
};
