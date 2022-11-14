
import path from 'path';
import{ getModulesFromConfig, getExistFile } from '@hulljs/utils';
import reactRefresh from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from '@hulljs/vite-plugin-html';
import viteBabelPlugins from '@hulljs/vite-plugin-babel-plugins';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import postcssPreset from 'postcss-preset-env';
import { DevServer } from '../types';
import { configTool } from './defineConfig';
export const getViteConfig = (): any => {
  const buildConfig = configTool.getConfig();

  const { appDirectory, lessLoaderOptions, sassLoaderOptions,
    shouldUseSourceMap, fileSizeLimit, projectType, isUseBundleAnalyzer,
    viteExtraBuildOptions, proxy, htmlPluginOpts, extraBabelPlugins, extraBabelPresets, isProd, viteExtraPlugins } = buildConfig;

  const { alias } = getModulesFromConfig(appDirectory);

  const isUseSourceMap = isProd ? shouldUseSourceMap : false;

  const devServer = buildConfig.devServer as DevServer;

  const { isOk, absFilePath } = getExistFile({ appDirectory, files: ['postcss.config.js', 'postcss.config.cjs'] });

  const postcssPlugins = [];

  if(isOk){
    const plugin = require(absFilePath).plugins || [];
    postcssPlugins.push(...plugin);
  }

  const projectPlugins = projectType === 'react'
    ? [ reactRefresh() ]
    : [
      vueJsx({}),
      vue({}),
    ] ;
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
        template: htmlPluginOpts ? htmlPluginOpts.template : '',
        inject: htmlPluginOpts.inject,
      }),
      ...projectPlugins,
      legacy(),
      viteBabelPlugins(
        extraBabelPlugins || [],
        extraBabelPresets || [],
      ),
      viteExtraPlugins,
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
          ...sassLoaderOptions,
        },
        sass: {
          ...sassLoaderOptions,
        },
      },
      postcss: {
        plugins: [
          postcssPreset({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          ...postcssPlugins,
        ],
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
          ...(
            isUseBundleAnalyzer ? [ visualizer({
              filename: path.resolve(appDirectory, './visualizer.html'),
              brotliSize: true,
              gzipSize: true,
              open: true,
            })] : []
          ),
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
