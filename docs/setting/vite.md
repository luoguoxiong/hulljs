---
nav:
  title: vite 专属配置
  order: 2
toc: menu
---
# vite 专属配置

## viteExtraBuildOptions

* Type: `ViteExtraBuildOptions`

额外的Vite构建参数配置

```js
import { UserConfig, BuildOptions } from 'vite';

type ViteExtraBuildOptions = Omit<BuildOptions, 'outDir' | 'assetsInlineLimit' | 'sourcemap' | 'assetsDir'>;
```

## viteExtraPlugins

额外的Vite插件

* Type: `PluginOption`

```js
import { PluginOption } from 'vite';
```