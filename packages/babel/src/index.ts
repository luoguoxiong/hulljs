import { extname } from 'path';
export interface IGetBabelOptions {
    target:'browser' | 'node';
    type?:'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
    isTypeScript?:boolean;
    runtimeHelpers?:boolean;
    filePath?:string;
    browserFiles?:{
      [value:string]:any;
    };
    nodeVersion?:number;
    nodeFiles?:{
      [value:string]:any;
    };
    lazy?:boolean;
    lessInBabelMode?:boolean|{
      paths?:any[];
      plugins?:any[];
    };
  }
interface PersentRe{
    presets:any[];
    plugins:any[];
}

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (_context:any, options:IGetBabelOptions):PersentRe => {
  const { target, isTypeScript, type, runtimeHelpers, filePath, browserFiles,
    nodeFiles, nodeVersion, lazy, lessInBabelMode } = options;
  let isBrowser = target === 'browser';
  if (filePath) {
    if (extname(filePath) === '.tsx' || extname(filePath) === '.jsx') {
      isBrowser = true;
    } else {
      if (isBrowser) {
        if (nodeFiles && nodeFiles.includes(filePath)) isBrowser = false;
      } else {
        if (browserFiles && browserFiles.includes(filePath)) isBrowser = true;
      }
    }
  }
  const targets = isBrowser ? { browsers: ['last 2 versions', 'IE 10'] } : { node: nodeVersion || 6 };

  return {
    presets: [
      ...(isTypeScript ? [require.resolve('@babel/preset-typescript')] : []),
      [require.resolve('@babel/preset-env'), {
        targets,
        modules: type,
      }],
      ...(isBrowser ? [require.resolve('@babel/preset-react')] : []),
    ],
    plugins: [
      ...((type === 'cjs' && lazy && !isBrowser)
        ? [[require.resolve('@babel/plugin-transform-modules-commonjs'), {
          lazy: true,
        }]] : []),
      ...(lessInBabelMode ? [transformImportLess2Css] : []),
      require.resolve('babel-plugin-react-require'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      ...(runtimeHelpers
        ? [[require.resolve('@babel/plugin-transform-runtime'), {
          useESModules: isBrowser && type === false,
          version: require('@babel/runtime/package.json').version,
        }]]
        : []),
    ],
  };
};
