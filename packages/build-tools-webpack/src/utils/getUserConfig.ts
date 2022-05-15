import{ CONFIG_FILES } from '../constants';
import { isDefault, getExistFile, registerBabel, log } from './';

export const getUserConfig = async(appDirectory:string) => {
  try {
    registerBabel({
      appDirectory,
      only: CONFIG_FILES,
    });
    const filePath = getExistFile({ appDirectory, files: CONFIG_FILES, returnRelative: false });
    return isDefault(await import(filePath));
  } catch (error) {
    log.error(error);
  }
};
