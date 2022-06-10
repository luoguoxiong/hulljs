import { transform } from '@babel/core';
import type { PluginOption } from 'vite';
function useViteBabelPlugins(plugins?: any[]): PluginOption {

  return {
    name: 'vite-plugin-babel-plugins',
    enforce: 'post',
    async transform(code: string, id: string) {

      if (/\.(js|mjs|jsx|ts|tsx)$/.test(id) && !/node_modules\/vite/.test(id)) {
        plugins = plugins || [];
        const result = await transform(code, {
          ast: true,
          plugins,
          sourceFileName: id,
        });

        return {
          code: result.code as string,
          map: result.map,
        };
      }
    },
  };
}

export default useViteBabelPlugins;
