---
title: 快速开始
order: 1
---
# 快速开始

## 安装 node
Hulljs 项目基于node，需确保 node 环境（>=14.0.0）。

## 安装 cli
```shell
# 使用 npm 安装 CLI
$ npm install -g @hulljs/cli

# OR 使用 yarn 安装 CLI
$ yarn global add @hulljs/cli

# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @hulljs/cli
```
## 项目初始化
```shell
$ hull init <app-name>
```
app-name 遵循 npm package.json name字段的规范

![](/images/init.png)

## 其他CLI命令
```shell
Usage:
  $ hull <command> [options]

Commands:
  init <app>  create app project!

For more info, run any command with the `--help` flag:
  $ hull init --help

Options:
  -v, --version  Display version number 
  -h, --help     Display this message 
```