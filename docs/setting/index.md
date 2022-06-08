---
nav:
  title: hull-conf.js 配置
  order: 0
toc: menu
---

#  公共配置
1. 配置文件在项目根目录，支持hull.conf.js或hull.config.ts
2. 支持导出一个函数或者一个对象
eg: 函数形式

函数：能拿到env参数,production或者development，可以根据这个值去区分生成跟开发环境的配置差异
```js
import path from 'path';

export default (env) => {
  console.log('env:', env);
  return {
    projectType: 'react',
    entry: path.resolve(__dirname, './src/index'),
  };
};
```
eg: 对象形式
```js
import path from 'path';

export default {
  projectType: 'vue3',
  entry: path.resolve(__dirname, './src/index'),
};
```

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

- Default: `/`

  打包出口公共路径,开发环境默认/,生产环境推荐使用CDN地址。

## resolveAlias
- Type: `object`
默认会从tsconfig.json或jsconfig.json配置中读取compilerOptions.paths
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

## fileSizeLimit
- Type: number
- Default: 1000 (1k)
针对图片资源、svg等，进行base64编译的阈值

## htmlPluginOpts
- Type: `object`

```js
export default {
  htmlPluginOpts: {
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
生产环境是否生成打包构建分析

## devServer
- Type: `object`

```js
export default {
  devServer: {
    port: 8080,
    https: false
  }
}
```

## sassLoaderOptions
- Type: `object`
sassLoader配置

## lessLoaderOptions
- Type: `object`
lessLoader配置

## proxy

* Type: `object`
  开发服务器配置自定义代理规则

```javascript
export default {
  proxy: {
     '/api': 'http://localhost:3000',
  }
}
```

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

## 关于样式

1. 内部集成了less和sass两种样式方案。
2. css module,统一使用xx.module.（less|sass|css）命名规范。

## 关于浏览器兼容性

针对js模块使用了@babel/preset-env,css模块使用了postcss-preset-env。都是根据根目录的.browserslistrc进行浏览器解析

eg:

```browserlistrc
defaults
not ie < 8
last 2 versions
> 1%
iOS 7
ie 8
last 3 iOS versions
```

