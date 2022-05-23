import { isDefault, getExistFile, registerBabel } from '.';

export const getFileExport = async<T>(appDirectory:string, files:string[]):Promise<T> => {
  try {
    registerBabel({
      appDirectory,
      only: files,
    });

    const { isOk, absFilePath } = getExistFile({ appDirectory, files: files, returnRelative: false });
    if(isOk){
      return isDefault<T>(await import(absFilePath));
    }else{
      throw Error(`${appDirectory} isn't has any ${files.join('、')}`);
    }
  } catch (error:any) {
    throw Error(error);
  }
};
