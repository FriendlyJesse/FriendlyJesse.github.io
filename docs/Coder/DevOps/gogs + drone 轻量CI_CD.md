# gogs + drone 轻量CI_CD
## 1. 为什么需要 CI/CD？
CI/CD，指的是持续集成/持续交付。它是一种软件开发实践，旨在通过自动化的过程来实现快速、频繁、可靠的软件交付。持续集成是将开发人员的工作成果不断地合并到主干代码中，而持续交付则是将这些合并后的代码部署到生产环境中。
主要目的是通过快速反馈来提高软件质量，并缩短交付周期。使用CI/CD流程，开发人员可以在短时间内将代码集成到主干中，并在每次提交代码时进行自动化构建、测试和部署。这样，可以最大程度地保证软件的质量，并确保新功能能够快速上线。
## 2. 系统需求
### 2.1 项目直接部署(文章主讲)
对于普通的项目，我们一般做到以下步骤即可：

1. 拉取代码
2. 更新依赖
3. 构建项目
4. 运行/重启项目
### 2.2 Docker 部署
对于容器化项目，我们则需要这么做：

1. 拉取代码
2. 更新依赖
3. 构建项目
4. 打包镜像
5. 推送到镜像仓库
6. SSH 连接服务器
7. 拉取新镜像
8. 停止并移除旧容器
9. 启动新容器
## 3. docker compose
```yaml
services:
  web:
    image: nginx
    container_name: web
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./nginx/html:/usr/share/nginx/html ## 静态项目部署地址
      - ./nginx/conf.d:/etc/nginx/conf.d ## nginx 配置
    environment:
      - NGINX_PORT=80
  drone-server:
    image: drone/drone:2
    container_name: drone-server
    restart: always
    ports:
      - 9557:80
    volumes:
      - ./drone:/data
    environment:
      DRONE_AGENTS_ENABLED: true
      DRONE_SERVER_PROTO: http
      DRONE_SERVER_HOST: ****:9557 ## drone-server 的 host
      DRONE_GOGS_SERVER: ****:3000 ## gogs 地址
      DRONE_RPC_SECRET: dronerpc666  ## rpc 密钥
      DRONE_USER_CREATE: username:jianqing,admin:true ## 管理员账户，需要与 gogs 用户一致
  drone-runner:
    image: drone/drone-runner-docker:1
    container_name: drone-runner
    restart: always
    depends_on: ## 依赖 drone-server
      - drone-server
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock ## 用于直接与 docker 通信
    ports:
      - 6666:3000
    environment:
      DRONE_RPC_PROTO: http
      DRONE_RPC_HOST: ****:9557 ## drone-server 的 host
      DRONE_RPC_SECRET: dronerpc666 ## rpc 密钥
      DRONE_RUNNER_CAPACITY: 2
      DRONE_RUNNER_NAME: drone-runner
```
### 3.1 gogs docker-compose
```yaml
services:
  gogs:
    image: gogs/gogs
    container_name: gogs
    restart: always
    ports:
      - 10022:22
      - 3000:3000
    volumes:
      - ./gogs:/data ## gogs 数据库、配置等目录映射
```
gogs 在本机网络是无法使用 hooks的，可用以下方法解决：
在`security`下添加`LOCAL_NETWORK_ALLOWLIST`属性，设置为本地IP地址，如果是多个IP用逗号分开
```nginx
[security]
LOCAL_NETWORK_ALLOWLIST = 192.168.108.200
```
## 4. 激活仓库
首次进入 drone，drone 会与 gogs 的账户进行绑定，直接输入 gogs 的账户即可。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1670915583159-39c4de8b-9fe3-4864-b12c-75e679c63914.png#averageHue=%23f5f7f9&clientId=u4e13b203-6507-4&from=paste&height=772&id=u1f1ae5e3&originHeight=772&originWidth=1641&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40295&status=done&style=none&taskId=u603fa5f1-947f-4174-a844-6ce86180706&title=&width=1641)
随后点击激活，drone 会在对于的仓库中创建一个 hooks
## 5. 项目持续部署
drone 会根据项目根目录的`.drone.yml`，进行相应的 CI/CD。
### 5.1 前端项目部署
```yaml
kind: pipeline ## 定义流水线
type: docker ## 流水线类型
name: deploy ## 名称

volumes: ## 映射到宿主机的目录
  - name: manage_master
    host:
      path: /www/manage_master
  - name: manage_dev
    host:
      path: /www/manage_dev
  - name: node_modules_master
    host: 
      path: /root/website/docker-compose/drone/manage_master/node_modules
  - name: node_modules_dev
    host: 
      path: /root/website/docker-compose/drone/manage_dev/node_modules

steps:
  - name: master build
    image: node:lts
    volumes: ## 挂载目录
      - name: manage_master
        path: /drone/src/dist
      - name: node_modules_master
        path: /drone/src/node_modules
    commands:
      - pwd
      - node -v
      - npm -v
      - npm config set registry https://registry.npm.taobao.org
      - npm config set strict-ssl false
      - npm install
      - npm run build
    when:
      branch: master

  - name: dev build
    image: node:lts
    volumes:
      - name: manage_dev
        path: /drone/src/dist
      - name: node_modules_dev
        path: /drone/src/node_modules
    commands:
      - pwd
      - node -v
      - npm -v
      - npm config set registry https://registry.npm.taobao.org
      - npm config set strict-ssl false
      - npm install
      - npm run build
    when:
      branch: dev

trigger: ## 触发条件
  branch:
  - master
  - dev
```
在同一台服务器时，可直接通过nginx共享目录完成自动部署。
### 5.2 node 项目部署
```yaml
kind: pipeline
type: docker
name: deploy

volumes: 
  - name: qh_server
    host:
      path: /www/qh_server
  - name: node_modules_master
    host: 
      path: /root/website/docker-compose/drone/qh_server/node_modules

steps:
  - name: master build
    image: node:lts
    volumes:
      - name: qh_server
        path: /drone/src/www
      - name: node_modules_master
        path: /drone/src/node_modules
    commands:
      - pwd
      - node -v
      - npm -v
      - npm install cnpm -g --registry=https://registry.npm.taobao.org
      - cnpm install --registry=https://registry.npm.taobao.org
      - npm run build
      - rm -rf www/dist
      - mv dist www/dist
      - mv bootstrap.js www/bootstrap.js
      - mv package.json www/package.json
      - cd www
      - cnpm install
    when:
      branch:
        - master

trigger:
  branch:
  - master
  - dev
```
因为类型是docker，我们无法操作宿主机。并且因为是在同一个服务器，就不是很想 scp 过去，于是创建了一个 www 目录映射到宿主机。
这样做有一个缺点就是无法重启服务，于是我们在宿主机内使用 pm2 的 watch 功能监听内容变化就重启服务。
### 5.3 不在同一个服务器
```yaml
- name: deploy-project ## 上传文件步骤
    image: appleboy/drone-scp
    depends_on: [build-project] ## 依赖 build-project 步骤，
    settings:
      ## 服务器地址, 账号, 密码
      host: o2packs.com ## 不使用secrets, 明文
      username: 
        from_secret: deploy_username ## 使用secrets
      password: 
        from_secret: deploy_password
      ## 需要上传的文件 「需要相对路径, 如果用绝对路径会整条路径打包上传」
      ## source: ./dist ##  单个
      source:  ##  多个
        ## - !* ## 全都忽略
        - ./dist
      ## 上传的目录文件夹
      target: /usr/share/nginx/test1
      ## ps: 移除的目录是test1, 将source所有中定义的所有内容放入test1目录中
      rm: true 
      port: 22
      command_timeout: 2m
```
使用 appleboy/drone-scp 镜像进行上传文件 [地址](https://plugins.drone.io/appleboy/drone-scp)

