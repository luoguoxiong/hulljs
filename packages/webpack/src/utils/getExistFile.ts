import { existsSync } from 'fs';
import { join } from 'path';

interface IGetExistFile{
    appDirectory:string;
    files?:string[];
    returnRelative?:boolean;
}
export function getExistFile({ appDirectory, files = [], returnRelative = false }:IGetExistFile):string {
  for (const file of files) {
    const absFilePath = join(appDirectory, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
  return '';
}
