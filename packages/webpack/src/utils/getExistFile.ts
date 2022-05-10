import { existsSync } from 'fs';
import { join } from 'path';

interface IGetExistFile{
    cwd:string;
    files?:string[];
    returnRelative?:boolean;
}
export function getExistFile({ cwd, files = [], returnRelative = false }:IGetExistFile):string {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
  return '';
}
