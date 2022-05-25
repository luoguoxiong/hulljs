---
nav:
  title: hull-conf.js 配置
  order: 2
toc: menu
---

#  hull-conf.js 配置

以下配置项通过字母排序。

## 404

- Type: `boolean`
- Default: `true`

约定式路由中 404 页面的生效规则，可通过设置为 false 关闭。

## alias

- Type: `object`
- Default: `{}`

配置别名，对引用路径进行映射。

比如：

```js
export default {
  alias: {
    foo: '/tmp/a/b/foo',
  },
};
```