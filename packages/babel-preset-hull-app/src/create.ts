import path from 'path';
import { PersentRe, IGetBabelOptions } from './index';
export const persetForReact = (isProduction:boolean):PersentRe => ({
  presets: [
    [require.resolve('@babel/preset-react')],
  ],
  plugins: [
    [require.resolve('babel-plugin-react-require')],
    ...(isProduction ? [[
      require('babel-plugin-transform-react-remove-prop-types').default,
      {
        removeImport: true,
      },
    ]] : []),
  ],
});

export const persetForVue = ():PersentRe => ({
  presets: [],
  plugins: [],
});

function transformImportLess2Css() {
  return {
    name: 'transform-import-less-to-css',
    visitor: {
      ImportDeclaration(path:any) {
        const re = /\.less$/;
        if(re.test(path.node.source.value)){
          path.node.source.value = path.node.source.value.replace(re, '.css');
        }
      },
    },
  };
}
export const presetForCommon = (opts:IGetBabelOptions):PersentRe => {

  const { target, type, isTypeScript, lessInBabelMode, isUseRunTime, projectType } = opts;

  const isBrowser = target === 'browser';

  return {
    presets: [
      ...(isTypeScript ? [[require.resolve('@babel/preset-typescript'), {
        allExtensions: projectType === 'vue',
      }]] : []),
      [require.resolve('@babel/preset-env'), {
        useBuiltIns: 'entry',
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
      } ],
    ],
    plugins: [
      /** node构建时使用 */
      ...((type === 'cjs' && !isBrowser) ? [[require.resolve('@babel/plugin-transform-modules-commonjs'), { lazy: true }]] : []),
      /** less 文件转css */
      ...(lessInBabelMode ? [[transformImportLess2Css]] : []),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      ...(isUseRunTime ? [ [require.resolve('@babel/plugin-transform-runtime'), {
        useESModules: isBrowser && type === false,
        version: require('@babel/runtime/package.json').version,
        /** 如果不设置absoluteRuntime，在ci调试环境会找不到@babel/runtime */
        absoluteRuntime: path.dirname(
          require.resolve('@babel/runtime/package.json')
        ),
      }]] : []),
    ],
  };
};

