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

  const { appDirectory, lessLoaderOptions, sassLoaderOptions,
    shouldUseSourceMap, fileSizeLimit, projectType, isUseBundleAnalyzer,
    viteExtraBuildOptions, proxy, htmlPligunOpts, extraBabelPlugins, isProd } = buildConfig;

  const { alias } = getModulesFromConfig(appDirectory);

  const isUseSourceMap = isProd ? shouldUseSourceMap : false;

  const devServer = buildConfig.devServer as DevServer;

  const projectPlugins = projectType === 'react'
    ? [
      reactRefresh(),
    ] : [
      vueJsx({}),
      vue({}),
    ];

  return {
    root: buildConfig.appDirectory,
    base: buildConfig.outputPublicPath,
    define: buildConfig.definePluginOptions,
    mode: isProd ? 'production' : 'development',
    publicDir: false,
    plugins: [
      createHtmlPlugin({
        minify: isProd,
        entry: buildConfig.entry,
        template: htmlPligunOpts ? htmlPligunOpts.template : '',
        inject: htmlPligunOpts?.inject,
      }),
      ...projectPlugins,
      legacy(),
      viteBabelPlugins(
        extraBabelPlugins,
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
      sourcemap: isProd ? isUseSourceMap : 'inline',
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
