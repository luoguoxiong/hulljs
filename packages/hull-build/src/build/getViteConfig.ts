import path from 'path';
import{ getModulesFromConfig } from '@hulljs/utils';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import htmlPlugin from 'vite-plugin-html-template';
import { ViteConfig, DevServer } from '../types';
import { configTool } from './config';

export const getViteConfig = (): ViteConfig => {
  const buildConfig = configTool.getConfig();

  const { appDirectory, env, lessLoaderOptions = {}, sassLoaderOptions = {},
    shouldUseSourceMap = false, fileSizeLimit = 1000, viteExtraBuildOptions, proxy = {} } = buildConfig;

  const isProduction = (env || '').includes('prod');

  const { alias } = getModulesFromConfig(appDirectory);

  const isUseSourceMap = isProduction ? shouldUseSourceMap : false;
  const devServer = buildConfig.devServer as DevServer;
  return {
    root: buildConfig.appDirectory,
    base: buildConfig.outputPublicPath,
    define: buildConfig.definePluginOptions,
    mode: isProduction ? 'development' : 'production',
    publicDir: false,
    plugins: [
      ...[
        reactRefresh(),
        visualizer(),
        legacy(),
        htmlPlugin({
          entry: path.resolve(appDirectory, './src/index.tsx'),
        //   template: path.resolve(__dirname, '/public/index.html'),
        }),
      ],
    ],
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
      ...viteExtraBuildOptions,
      outDir: buildConfig.outputPath,
      assetsInlineLimit: fileSizeLimit,
      sourcemap: isProduction ? isUseSourceMap : 'inline',
      assetsDir: 'static',
    },
    server: {
      port: devServer.port,
      https: devServer.https,
      host: true,
      proxy,
    },
  };
};
