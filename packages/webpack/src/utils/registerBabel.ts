import { join } from 'path';
import getBabelConfig from './getBabelConfig';

interface IRegisterBabelOpts {
  cwd:string;
  only:string[];
}

const slash = (input:string) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(input);

  if (isExtendedLengthPath) {
    return input;
  }
  return input.replace(/\\/g, '/');
};

export const registerBabel = function(opts:IRegisterBabelOpts):void {
  const { cwd, only } = opts;
  const { opts: babelConfig } = getBabelConfig({
    target: 'node',
    typescript: true,
  });
  require('@babel/register')({
    ...babelConfig,
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
    only: only.map((file) => slash(join(cwd, file))),
    babelrc: false,
    cache: false,
  });
};
