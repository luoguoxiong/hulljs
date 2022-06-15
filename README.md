# hulljs

easy and quickly to build you web App

hulljs 是通过更简单的配置、更快的构建web应用（react、vue3）。

hulljs 支持vite和webpack两种构建方式。

## Getting Started

### install

```shell
# 使用 npm 安装 CLI
$ npm install -g @hulljs/cli

# OR 使用 yarn 安装 CLI
$ yarn global add @hulljs/cli

# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @hulljs/cli
```

### init project
```shell
$ hull init <app-name>
```

![](https://github.com/luoguoxiong/hulljs/blob/main/public/images/init.png?raw=true)


### dev
```shell
# webpack devServer
hull dev

# vite devServer
hull dev --vite

# 启用某个端口
hull dev --port 8000
```

### build
```shell
# webpack 构建
hull build

# vite 构建
hull build --vite

# 启用打包分析
hull build --vite --analyzer
```

### server
```shell
# 启用webpack构建后，访问静态网页资源
hull server

# 启用vite构建后，访问静态网页资源
hull server --vite

# 启用vite构建后，指定某个端口访问静态网页资源
hull server --vite --port 6001
```