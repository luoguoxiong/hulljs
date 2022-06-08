#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 提交编译后的文件
git add -A
git commit -m "chore(build): 打包编译"

# 生成 CHANGELOG.md，修改版本号，打上版本号的 tag
npm run version

# 发布
git push

# 提交所有 tag
git push --tags