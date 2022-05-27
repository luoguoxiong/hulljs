import { presetForCommon, persetForVue, persetForReact } from './create';
export interface IGetBabelOptions {
  projectType: 'react' | 'vue3' | 'node';
  isTypeScript?: boolean;
  isProduction?: boolean;
  lessInBabelMode?: boolean|{
    paths?: any[];
    plugins?: any[];
  };
}
export interface PersentRe{
  presets: any[];
  plugins: any[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (_context: any, options: IGetBabelOptions): PersentRe => {

  const { isProduction = false, projectType } = options;

  const presetCommon = presetForCommon(options);

  const presetReact = persetForReact(isProduction);

  const persetVue = persetForVue();

  const plugins = [
    ...(projectType === 'react' ? presetReact.plugins : []),
    ...(projectType === 'vue3' ? persetVue.plugins : []),
    ...presetCommon.plugins,
  ];
  const presets = [
    ...(projectType === 'react' ? presetReact.presets : []),
    ...(projectType === 'vue3' ? persetVue.presets : []),
    ...presetCommon.presets,
  ];

  return {
    plugins,
    presets,
  };
};
