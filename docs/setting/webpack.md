---
nav:
  title: webpack 专属配置
  order: 1
toc: menu
---
# webpack 专属配置

## extraBabelPresets

- Type: Array
- Default: []
  额外配置的babel Presets

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