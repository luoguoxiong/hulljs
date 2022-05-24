
import chalk1 from 'chalk';
export { log } from './log';
export { getExistFile } from './getExistFile';
export { getFileExport } from './getFileExport';
export { registerNodeCiBabel } from './registerNodeCiBabel';
export { createConfig } from './config';
export { startStaticServer } from './startStaticServer';
export { getModulesFromConfig } from './getModulesFromConfig';
export { checkPort, choosePort } from './usePort';
export const isDefault = <T>(obj:any):T => obj.default || obj;
export const chalk = chalk1;
