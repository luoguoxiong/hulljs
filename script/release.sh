# 确保脚本抛出遇到的错误
set -e

# 读取当前分支
branch=`git symbolic-ref --short HEAD`

if [ "$branch" = "main" ]; then
 
  npm run version

  git push origin main
  
  git push --follow-tags origin main

  echo -e "\033[31m 只能在 master 或者 dev 分支上执行 yarn release！ \033[0m"

else

  echo -e "\033[31m 只能在 master 或者 dev 分支上执行 yarn release！ \033[0m"
fi