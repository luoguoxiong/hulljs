import { join } from 'path';
import babel, { IGetBabelOptions } from '@hulljs/babel-preset-hull-app';

const slash = (input:string) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(input);

  if (isExtendedLengthPath) {
    return input;
  }
  return input.replace(/\\/g, '/');
};

export const registerHullAppBabel = function(appDirectory:string, only:string[], babelOpts:IGetBabelOptions):void {
  const babelOptions:IGetBabelOptions = {
    target: 'node',
    isTypeScript: true,
    projectType: false,
    type: 'cjs',
    isProduction: true,
    isUseRunTime: true,
    ...babelOpts,
  };
  require('@babel/register')({
    presets: [[babel, babelOptions]],
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
    only: only.map((file) => slash(join(appDirectory, file))),
    babelrc: false,
    cache: false,
  });
};
