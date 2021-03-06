#/bin/bash

taobao(){
   npm config set registry http://registry.npm.taobao.org
}

npm(){
  npm config set registry http://registry.cnpmjs.org
}

push(){
    git add .
    read -p "your commit msg" msg
    git commit -m "$msg"
    git push origin main
}

if [ $1 == 'taobao' ]; then
 taobao
elif [ $1 == 'npm' ]; then
  npm
elif [ $1 == 'push' ]; then
  push
fi
