import{ CONFIG_FILES } from '../constants';
import { IngetUserConfigRe } from '../types';
import { isDefault, getExistFile, registerBabel, log } from '.';

export const getUserConfig = async(appDirectory:string):IngetUserConfigRe => {
  try {
    registerBabel({
      appDirectory,
      only: CONFIG_FILES,
    });

    const filePath = getExistFile({ appDirectory, files: CONFIG_FILES, returnRelative: false });
    return isDefault(await import(filePath || ''));
  } catch (error:any) {
    log.error(error);
    throw Error(error);
  }
};
