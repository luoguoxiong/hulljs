import { fileURLToPath } from 'url';
import { dirname } from 'path';

// These CommonJS variables are not available in ES modules.
// No require, exports, module.exports, __filename, __dirname
interface Paths{
    filename:string;
    dirname:string;
}

export const getPath = (pathStr:string):Paths => {
  const filename = fileURLToPath(pathStr);
  return {
    filename,
    dirname: dirname(filename),
  };
};


