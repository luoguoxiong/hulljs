---
nav:
  title: hull-conf.js 配置
  order: 2
toc: menu
---

#  hull-conf.js 配置

## projectType

- Type: `string`
- Default: `react`
可选 `react`、`vue3`
约定项目构建规则

## entry
- Type: `string`
打包入口

## outputPath
- Type: `string`
打包出口

## outputPublicPath
- Type: `string`
打包出口公共路径,开发环境默认/,生成环境推荐使用CDN地址。

## resolveAlias
- Type: `object`
默认值是从tsconfig.json或jsconfig.json配置中读取compilerOptions.paths
```js
export default {
  resolveAlias: {
    foo: '/tmp/a/b/foo',
  },
};
```
## shouldUseSourceMap
- Type: `boolean`
- Default: false
在开发环境默认会开启，生产环境默认不生成sourceMap;如果生产需要生成，需将该配置改为true

## extraBabelPlugins
- Type: Array
- Default: []
额外配置的babel插件
```js
export default {
    extraBabelPlugins: [
      ['import',
        {
          'libraryName': 'antd',
          'style': true,
        }],
    ],
}
```

## extraBabelPresets
- Type: Array
- Default: []
额外配置的babel Presets

## fileSizeLimit
- Type: number
- Default: 1000 (1k)
针对图片资源、svg等，进行base64编译的阈值

## htmlPligunOpts
- Type: `object`

```js
export default {
  htmlPligunOpts: {
    template: path.resolve(__dirname, './public/index.html'),
    inject: {
      title: 'welcome-use-hulljs',
    },
  }
}
```
`ejs语法`统一使用<%= htmlWebpackPlugin.options.title %>格式
```html
<!-- ./public/index.html -->
<!DOCTYPE html>
<html>
<head lang="zh-CN">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
## definePluginOptions
- Type: `object`
[DefinePlugin 插件配置](https://webpack.js.org/plugins/define-plugin/#root)

## isUseBundleAnalyzer
- Type: `boolean`
- Default: false
是否展示打包构建分析

## devServer
- Type: `object`
WebpackDevServer 配置

## extraWebpackPlugins
- Type: Array
- Default: []
额外的webpack插件

## extraModuleRules
- Type: Array
- Default: []
额外的webpackModuleRules规则配置

## splitChunks
- Type: `object`
Webpackpack 代码分割

```js
export default {
    splitChunks: {
      cacheGroups: {
        reactChunks: {
          name: 'reactChunks',
          test: (module) => new RegExp(/react/).test(module.context),
          chunks: 'all',
        },
      },
    }
}
```
## sassLoaderOptions
- Type: `object`
sassLoader配置

## lessLoaderOptions
- Type: `object`
lessLoader配置

## postcss 配置
在项目根目录创建postcss.config.js或postcss.config.cjs进行配置，已设置postcss-preset-env

postcss 配置，它期望接收与 postcss.config.js 一致的格式。但对于 plugins 属性有些特别，只接收使用 [数组格式](https://github.com/postcss/postcss-load-config/blob/main/README.md#array)。


```js
module.exports = {
  plugins: [
    require('postcss-px-to-viewport')({
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
```

## 关于样式处理方案
1. 内部集成了less和sass两种样式方案。
2. css module,统一使用xx.module.（less|sass|css）命名规范。