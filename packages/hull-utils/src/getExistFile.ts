import { existsSync } from 'fs';
import { join } from 'path';

interface IGetExistFile{
    appDirectory:string;
    files?:string[];
    returnRelative?:boolean;
}

interface IGetExistFileRe{
    isOk:boolean;
    absFilePath:string;
}

export function getExistFile({ appDirectory, files = [], returnRelative = false }:IGetExistFile):IGetExistFileRe {
  for (const file of files) {
    const absFilePath = join(appDirectory, file);
    if (existsSync(absFilePath)) {
      return {
        isOk: true,
        absFilePath,
      };
    }
  }
  return {
    isOk: false,
    absFilePath: '',
  };
}
