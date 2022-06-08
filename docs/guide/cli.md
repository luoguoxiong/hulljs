---
title: CLI 命令
order: 2
---

# CLI 命令
## 查看所有命令及帮助
```shell
hull --help
```

## dev
```shell
# webpack devServer
hull dev

# vite devServer
hull dev --vite

# 启用某个端口
hull dev --port 8000
```

## build
```shell
# webpack 构建
hull build

# vite 构建
hull build --vite

# 启用打包分析
hull build --vite --analyzer
```

## server
```shell
# 启用webpack构建后，访问静态网页资源
hull server

# 启用vite构建后，访问静态网页资源
hull server --vite

# 启用vite构建后，指定某个端口访问静态网页资源
hull server --vite --port 6001
```