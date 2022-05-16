import { presetForCommon, persetForVue, persetForReact } from './create';
export interface IGetBabelOptions {
    target:'browser' | 'node';
    type?:'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
    projectType:'react' | 'vue' | false;
    isTypeScript?:boolean;
    isProduction?:boolean;
    isUseRunTime?:boolean;
    lessInBabelMode?:boolean|{
      paths?:any[];
      plugins?:any[];
    };
}
export interface PersentRe{
    presets:any[];
    plugins:any[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (_context:any, options:IGetBabelOptions):PersentRe => {

  const {
    target, isTypeScript, type = 'auto', isProduction = false,
    lessInBabelMode = false, projectType, isUseRunTime } = options;

  const presetCommon = presetForCommon({
    target,
    type,
    lessInBabelMode,
    isTypeScript,
    isUseRunTime,
  });

  const presetReact = persetForReact(isProduction);

  const persetVue = persetForVue();

  const plugins = [
    ...(projectType === 'react' ? presetReact.plugins : []),
    ...(projectType === 'vue' ? persetVue.plugins : []),
    ...presetCommon.plugins,
  ];
  const presets = [
    ...(projectType === 'react' ? presetReact.presets : []),
    ...(projectType === 'vue' ? persetVue.presets : []),
    ...presetCommon.presets,
  ];

  return {
    plugins,
    presets,
  };
};
