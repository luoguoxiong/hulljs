---
nav:
  title: 插件工具
  order: 2
toc: menu
---

#  hulljs 插件工具

## babel-preset-hull-app
提供了React、Vue3的babel插件集

eg: vue3使用 .babelrc
```json
{
  "presets": [
        ["@hulljs/babel-preset-hull-app",
            { 
                "isTypeScript": true,
                "projectType": "vue3",
            }
        ]
    ]
}
```

eg: react使用 .babelrc
```json
{
  "presets": [
        ["@hulljs/babel-preset-hull-app",
            { 
                "isTypeScript": true,
                "projectType": "react",
            }
        ]
    ]
}
```

## eslint-config-hull-app
统一lints规范工具
```js
// .eslintrc.js
// vue
module.exports = {
  extends: ['@hulljs/eslint-config-hull-app/vue']
};
// react
module.exports = {
  extends: ['@hulljs/eeslint-config-hull-app/react']
};
```
## vite-plugin-babel-plugins
vite插件 使用额外的babel插件进行构建

eg: 使用babel-plugin-import
```js
import viteBabelPlugins from '@hulljs/vite-plugin-babel-plugins';
viteBabelPlugins(
    [
        ["babel-plugin-import", { "libraryName": "antd", "libraryDirectory": "es"}]
    ]
)
```
## vite-plugin-html
vite 插件 类似于webpack-html-plugin

eg: 
```js
import { createHtmlPlugin } from '@hulljs/vite-plugin-html';
createHtmlPlugin({
    minify: true,
    entry: '/src/main.js',
    template: path.resolve(__dirname, './public/index.html'),
    inject: {
      title: 'welcome-use-hulljs',
    },
})
```

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