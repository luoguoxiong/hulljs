import path from 'path';
import{ getModulesFromConfig } from '@hulljs/utils';
import { ViteConfig } from '../types';
import { configTool } from './config';

export const getViteConfig = (): ViteConfig => {
  const buildConfig = configTool.getConfig();

  const { appDirectory, env, lessLoaderOptions = {}, sassLoaderOptions = {},
    shouldUseSourceMap = false, fileSizeLimit = 1000, viteExtraBuildOptions } = buildConfig;

  const isProduction = (env || '').includes('prod');

  const { alias } = getModulesFromConfig(appDirectory);

  const isUseSourceMap = isProduction ? shouldUseSourceMap : false;
  return {
    root: buildConfig.appDirectory,
    base: buildConfig.outputPublicPath,
    define: buildConfig.definePluginOptions,
    mode: isProduction ? 'development' : 'production',
    publicDir: false,
    plugins: [],
    resolve: {
      alias,
      extensions: [
        '.web.mjs',
        '.mjs',
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.json',
        '.web.js',
        '.js',
        '.web.jsx',
        '.jsx',
      ],
    },
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          ...lessLoaderOptions,
        },
        scss: {
          javascriptEnabled: true,
          ...sassLoaderOptions,
        },
        sass: {
          javascriptEnabled: true,
          ...sassLoaderOptions,
        },
      },
      devSourcemap: isUseSourceMap,
    },
    cacheDir: path.resolve(appDirectory, 'node_modules/.hull_vite'),
    build: {
      outDir: buildConfig.outputPath,
      assetsInlineLimit: fileSizeLimit,
      sourcemap: isProduction ? isUseSourceMap : 'inline',
      assetsDir: 'static',
      ...viteExtraBuildOptions,
    },
    server: {
      host: true,
      port: 5000,
      proxy: {
        '/foo': 'http://localhost:4567',
      },
    },
  };
};
