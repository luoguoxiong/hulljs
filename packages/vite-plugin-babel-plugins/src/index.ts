import { transform } from '@babel/core';


function useViteBabelPlugins(plugins?: any[]) {

  return {
    name: 'vite-plugin-babel-plugins',
    enforce: 'post',
    async transform(code: string, id: string) {

      if (/\.(js|mjs|jsx|ts|tsx)$/.test(id) && !/node_modules\/vite/.test(id)) {
        plugins = plugins || [];
        const result = transform(code, {
          ast: true,
          plugins,
          sourceFileName: id,
        }) as babel.BabelFileResult;

        return {
          code: result.code,
          map: result.map,
        };
      }
    },
  };
}

export default useViteBabelPlugins;
