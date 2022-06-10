# 确保脚本抛出遇到的错误
set -e

# 读取当前分支
branch=`git symbolic-ref --short HEAD`

if [ "$branch" = "main" ]; then
 
  git add -A

  standard-version

  npm run version

  git add -A

  git push origin main
  
  git push --follow-tags origin main

else

  echo -e "\033[31m 只能在 main 执行  release！ \033[0m"
fi