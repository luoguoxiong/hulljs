# 确保脚本抛出遇到的错误
set -e

# 读取当前分支
branch=`git symbolic-ref --short HEAD`

if [ "$branch" = "main" ]; then
 
  git add -A

  git commit -m "chore(build): release"

  npm run test

  git add -A

  git commit -m "chore(build): release"

  npm run version

  git push
  
  # 提交所有 tag
  git push --tags

  echo -e "\033[31m 只能在 master 或者 dev 分支上执行 yarn release！ \033[0m"

elif  [ "$branch" = "dev" ]; then
  # dev分支不打tag，也不生成CHANGELOG.md

  # 编译
  yarn build

  # 提交编译后的文件
  git add -A
  git commit -m "chore(release): dev"

  # 上传远程仓库
  git push origin dev

else


  git add -A

  git commit -m "chore(build): release"

  npm run test


  git add -A

  git commit -m "chore(build): release"

  npm run version


  git push
  
  # 提交所有 tag
  git push --tags

  echo -e "\033[31m 只能在 master 或者 dev 分支上执行 yarn release！ \033[0m"
fi