/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
interface Options {
    us:boolean;
}

interface PersentRe{
    presets:any[];
    plugins:any[];
}

export default (_context:any, options:Options):PersentRe => {
  const presets:any[] = [];
  const plugins:any[] = [];
  return {
    presets,
    plugins,
  };
};
