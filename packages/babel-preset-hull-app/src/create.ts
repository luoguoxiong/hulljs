import path from 'path';
import { PersentRe, IGetBabelOptions } from './index';
export const persetForReact = (isProduction: boolean): PersentRe => ({
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

export const persetForVue = (): PersentRe => ({
  presets: [],
  plugins: [
    require.resolve('@vue/babel-plugin-jsx'),
  ],
});

export const presetForCommon = (opts: IGetBabelOptions): PersentRe => {

  const { isTypeScript } = opts;

  return {
    presets: [
      ...(isTypeScript ? [[require.resolve('@babel/preset-typescript'),
        {
          allExtensions: true,
          isTSX: true,
        }]] : []),
      [require.resolve('@babel/preset-env'), {
        useBuiltIns: 'entry',
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
      } ],
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      [require.resolve('@babel/plugin-transform-runtime'), {
        version: require('@babel/runtime/package.json').version,
        /** 如果不设置absoluteRuntime，在ci调试环境会找不到@babel/runtime */
        absoluteRuntime: path.dirname(
          require.resolve('@babel/runtime/package.json'),
        ),
      }],
    ],
  };
};

