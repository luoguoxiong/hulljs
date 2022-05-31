import path from 'path';
import{ getModulesFromConfig } from '@hulljs/utils';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from '@hulljs/vite-plugin-html';
import viteBabelPlugins from '@hulljs/vite-plugin-babel-plugins';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import { ViteConfig, DevServer } from '../types';
import { configTool } from './config';

export const getViteConfig = (): ViteConfig => {
  const buildConfig = configTool.getConfig();

  const { appDirectory, env, lessLoaderOptions = {}, sassLoaderOptions = {},
    shouldUseSourceMap = false, fileSizeLimit = 1000, projectType, isUseBundleAnalyzer, viteExtraBuildOptions = [], proxy = {}, htmlTemplatePath, extraBabelPlugins } = buildConfig;

  const isProduction = (env || '').includes('prod');

  const { alias } = getModulesFromConfig(appDirectory);

  const isUseSourceMap = isProduction ? shouldUseSourceMap : false;

  const devServer = buildConfig.devServer as DevServer;

  const projectPlugins = projectType === 'react' ? [
    reactRefresh(),
  ] : [
    vueJsx({}),
    vue({}),
  ];

  return {
    root: buildConfig.appDirectory,
    base: buildConfig.outputPublicPath,
    define: buildConfig.definePluginOptions,
    mode: isProduction ? 'production' : 'development',
    publicDir: false,
    plugins: [
      createHtmlPlugin({
        minify: isProduction,
        entry: buildConfig.entry,
        template: htmlTemplatePath || './static/index.html',
      }),
      ...projectPlugins,
      legacy(),
      viteBabelPlugins(
        extraBabelPlugins
      ),
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
      rollupOptions: {
        plugins: [
          ...isUseBundleAnalyzer ? [ visualizer({
            filename: path.resolve(appDirectory, './visualizer.html'),
            open: true,
          })] : [],
        ],
      },
      sourcemap: isProduction ? isUseSourceMap : 'inline',
      assetsDir: 'static',
    },
    server: {
      port: devServer.port,
      https: devServer.https,
      host: true,
      open: true,
      proxy,
    },
  };
};
