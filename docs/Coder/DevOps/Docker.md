# Docker
Docker 是一个开源的容器化平台，它允许你构建，测试，并且作为可移动的容器去部署应用，这些容器可以在任何地方运行。一个容器表示一个应用的运行环境，并且包含软件运行所需要的所有依赖软件。
Docker 是现代软件开发，持续集成，持续交付的一部分。
## 1. Ubuntu 20.04 上安装 Docker
[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/#set-up-the-repository)
### 1.1 安装 docker desktop
#### 1.1.1 安装
安装 desktop 是最简单的方法，但是它只支持 ubuntu、debian、fedora、arch这几个linux发行版。这里我用的是ubuntu，它对64位的`Ubuntu Jammy Jellyfish 22.04 (LTS)` or `Ubuntu Impish Indri 21.10`支持。
对于非`Gnome Desktop`环境需要安装`gnome-terminal`：
```bash
sudo apt install gnome-terminal
```
先下载**deb**文件安装：
```bash
sudo apt-get update
sudo apt-get install ./docker-desktop-<version>-<arch>.deb
```
然后就可以使用 docker 了。
#### 1.1.2 卸载 docker desktop：
如果之前安装过需要清理`docker-desktop`
```bash
sudo apt remove docker-desktop
```
完整的清理：
```bash
rm -r $HOME/.docker/desktop
sudo rm /usr/local/bin/com.docker.cli
sudo apt purge docker-desktop
```
### 1.2 安装 docker engine
旧版本的Docker被命名为 **docker**, **docker.io**，即 **docker-engine**。在尝试安装新版本之前，请先卸载任何这样的旧版本:
```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```
#### 1.2.1 **设置存储库**
**更新apt包索引并安装包，并允许apt通过HTTPS使用存储库:**
```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
**添加Docker的官方GPG密钥:**
```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
**使用以下命令设置存储库：**
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
#### 1.2.1 安装
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
### 1.3 以非 Root 用户身份执行 Docker
默认情况下，只有 root 或者 有 sudo 权限的用户可以执行 Docker 命令。
想要以非 root 用户执行 Docker 命令，你需要将你的用户添加到 Docker 用户组，该用户组在 Docker CE 软件包安装过程中被创建。想要这么做，输入：
```bash
sudo usermod -aG docker $USER
```
$USER是一个环境变量，代表当前用户名。
登出，并且重新登录，以便用户组会员信息刷新。
### 1.4 验证安装过程
想要验证 Docker 是否已经成功被安装，你可以执行docker命令，前面不需要加`sudo, 我们将会运行一个测试容器:
```bash
docker container run hello-world
```
如果本地没有该镜像，这个命令将会下载测试镜像，在容器中运行它，打印出 “Hello from Docker”，并且退出。
这个容器将会在打印消息后停止运行，因为它没有任何长期运行的进程。
### 1.5 卸载 Docker
在卸载 Docker 之前，你最好 移除所有的容器，镜像，卷和网络。
运行下面的命令停止所有正在运行的容器，并且移除所有的 docker 对象：
```bash
docker container stop $(docker container ls -aq)
docker system prune -a --volumes
```
现在你可以使用apt像卸载其他软件包一样来卸载 Docker：
```bash
sudo apt purge docker-ce
sudo apt autoremove
```
### 1.6 映射宿主机ip
Docker版本高于v20.10(2020年12月4日更新）
在启动docker时，加入如下语句：
```bash
--add-host=host.docker.internal:host-gateway 
```
而在container内，可以直接请求host.docker.internal:PORT，来获取宿主机上提供的各种服务
如果使用了Docker Compose，则应该将下面的句子加入container的声明中：
```yaml
extra_hosts: - "host.docker.internal:host-gateway"
```
### 1.7 WSL 连接Docker daemon
```bash
 echo "export DOCKER_HOST=tcp://localhost:2375" >> ~/.bashrc && source ~/.bashrc 
```
不通过deamon连接的话，你在Ubuntu里运行docker，就会出现错误(这个错误恶心了我很久)：
```bash
 docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running? 
```
## 3. Drone
Drone是一款基于容器技术的持续集成工具，使用简单的YAML配置文件即可完成复杂的自动化构建、测试、部署任务，在Github上已经有22K+Star。
### 3.1 问题列表
#### 3.1.1 drone 重启后访问失败
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669470505404-064834b9-9ac6-4621-b8fd-1e85a975fe0d.png#averageHue=%23fefbfa&clientId=u346c5d57-0863-4&from=paste&height=322&id=ub7c6d64b&originHeight=402&originWidth=557&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24573&status=done&style=none&taskId=u8479cf00-61c3-43e9-9e3e-d661a0852bb&title=&width=445.6)
前往 gogs 用户->授权下删除授权，再登录就可以了。
#### 3.1.2 用户非gogs管理员用户
**错误效果**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669469272077-8537237b-c448-4d8e-8c5f-26b51a32736a.png#averageHue=%23fefdfd&clientId=u346c5d57-0863-4&from=paste&id=u4bb7cb5d&originHeight=795&originWidth=960&originalType=url&ratio=1&rotation=0&showTitle=false&size=68895&status=done&style=none&taskId=u60fd5887-759c-4ee8-a242-ec5ba6e02c4&title=)
**正确效果**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669469272367-1f01d431-ee10-4037-b758-dd41d016aa42.png#averageHue=%23fdfdfd&clientId=u346c5d57-0863-4&from=paste&id=u263ef9e8&originHeight=256&originWidth=959&originalType=url&ratio=1&rotation=0&showTitle=false&size=34621&status=done&style=none&taskId=u7f45589d-7005-4256-92a0-356879424e2&title=)
**解决**
确保`gogs`用户是管理员用户
确保`docker-compose`配置中`git`用户是`Gitea`的管理员用户

- DRONE_USER_CREATE=username:git,admin:true

PS: 修改配置之后记得重启drone服务
#### 3.1.3 不受信任的仓库 untrusted repositories cannot mount host volumes
**错误效果**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669469273718-0b63ba77-8fdd-473d-853b-3e9417d93b8b.png#averageHue=%23eff0ef&clientId=u346c5d57-0863-4&from=paste&id=u515fcea4&originHeight=348&originWidth=1978&originalType=url&ratio=1&rotation=0&showTitle=false&size=86093&status=done&style=none&taskId=u761c4855-e392-48a4-8b4a-8c179027bf3&title=)
**解决：**
确保Trusted选项已勾选
Settings –> Project Settings –> Trusted
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669469272900-2fad7963-b3ef-4ad6-906f-76787ffb573f.png#averageHue=%23fdfdfd&clientId=u346c5d57-0863-4&from=paste&id=u36c0d2ef&originHeight=256&originWidth=959&originalType=url&ratio=1&rotation=0&showTitle=false&size=34621&status=done&style=none&taskId=u1ba70e77-8d23-4f99-806e-919675816ba&title=)
#### 3.1.4 拉取代码失败 Fatal: could not read Username for
**错误效果**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669469273854-cb08d3f6-bcc1-44b0-b427-f778de41220e.png#averageHue=%23adaeae&clientId=u346c5d57-0863-4&from=paste&id=ueaa4dadf&originHeight=568&originWidth=2354&originalType=url&ratio=1&rotation=0&showTitle=false&size=172433&status=done&style=none&taskId=ufeaeb01b-35fa-405e-a612-0cae46584f8&title=)
**解决：**

- [官方解答](https://discourse.drone.io/t/fatal-could-not-read-username-for/6198)
- 方向1:
   - 开启私有仓库选项 「Settings –> Project Visibility –> Public改成Private」
   - 开启认证, docker-compose.yml 中 DRONE_GIT_ALWAYS_AUTH=true 「为true开启认证」
- 方向2: 验证用户密码是有有错, 如下配置是否错误:
```nginx
## 如果有配置用户密码, 验证 docker-compose.yml 配置的用户密码是否有错
DRONE_GIT_USERNAME=<username>
DRONE_GIT_PASSWORD=<password>
```
#### 3.1.5 拉取代码失败：无法访问
```bash
Initialized empty Git repository in /drone/src/.git/
+ git fetch origin +refs/heads/master:
fatal: unable to access 'http://192.168.100.181:3000/scofield/demo.git/': Failed to connect to 192.168.100.181 port 3000: Connection refused
```
Drone执行pipeline之前会克隆项目，url就是gogs的http地址，我们需要将gogs中的地址修改一下。
或者直接关闭默认的 clone ，自定义 clone：
```yaml
clone:
  disable: true
steps: ## 管道的执行步骤
  - name: clone
    image: alpine/git
    commands:
      - git clone http://host.docker.internal:3000/jesse/test.git
      - git checkout $DRONE_COMMIT
```
### 3.2 实现 场景一

- 打包: 拉取代码 –> 更新依赖(npm i) –> 构建项目(build)
- 部署: 删除旧的资源包 –> 替换新构建的资源包

**知识点:**

- 将宿主机的卷轴映射(挂载)进Drone执行器里面 「公共卷轴」; 简要说明 Drone 提供的Volume
   - Host Volume：数据挂载到宿主机上与宿主机公用卷轴
   - Temporary Volume: 临时卷轴, 不同Step「步骤」共享, Pipeline「管道」 执行完毕后清除.
- 使用Nginx简单部署打包产物
- 拓展: 使用 appleboy/drone-scp 上传文件到另外的服务器
- 拓展: 使用 Setting --> Secrets配置 储存敏感数据

**前提条件:**

- 有可以正常打包访问的前端项目(本例子是由vite脚手架, 简单构建出来的ts-react项目)
- 部署服务已安装nginx, 并可以正常使用
##### drone和部署的服务在同一台主机
PS: 在同一台部署服务器, 直接共享卷轴, 就可以完成打包并部署
重要说明:

- 通过与宿主机共享Volume, 缓存node_modules 「每次构建都是全新的drone-runner-docker容器, 共享卷轴可以省去install时间」
- drone服务和部署服务器同一台主机, 而主机上又有nginx. 通过共享目录, 达到直接部署的目的

项目的.drone.yml 文件：
```yaml
## 项目的.drone.yml 文件
kind: pipeline ## 定义一个管道
type: docker ## 定义管道类型
name: build-test1 ## 定义管道名称

## 声明宿主机 映射到 drone执行器的数据卷
volumes: 
  - name: node_modules ## 数据卷名称
    ## Host Volume, 挂载到宿主机上的卷轴
    host: 
      ## 宿主机的绝对路径
      path: /home/gite/drone/cache/node_modules
  - name: web_build_dir
    host:
      path: /usr/share/nginx/test1

steps:
  - name: build-project ## 步骤名称
    image: node:16.13.1 ## 使用镜像和版本
    depends_on: [clone] ## 依赖 clone 步骤，
    volumes: ## 当前步骤使用(挂载)的卷轴
      - name: node_modules ## 数据卷名称
        path: /drone/src/node_modules ## 容器内的绝对路径
      - name: web_build_dir
        path: /drone/src/dist
    ## 执行的命令
    commands: 
      - pwd ## 查看当前目录 `/drone/src`
      - npm config set registry https://registry.npm.taobao.org ## 切换淘宝镜像
      - npm install ## 安装依赖
      - npm run build ## 执行构建指令
```

- 检查构建物 ll /usr/share/nginx/test1
- 浏览器访问查看效果
### 3.3 实现 场景二(Docker)
**场景2(Docker)：**

- 打包: 拉取代码 –> 更新依赖(npm i) –> 构建项目(build) –> 打包镜像(DockerFile) –> 推送到镜像仓库
- 部署: SSH连接到服务器 –> 拉取新镜像 –> 停止和移除旧容器 —> 启动新容器

**知识点:**

- drone多个pipeline使用
- 利用Dockerfile打包docker镜像
- 利用 appleboy/drone-ssh 插件远程到部署服务器部署项目

**前提条件:**

- 有可以正常打包访问的前端项目(本例子是由vite脚手架, 简单构建出来的ts-react项目)
- 部署服务器已安装docker和docker-compose
- 部署服务器允许密码登陆 「PS: 若使用SSH, [请参考官网修改](https://plugins.drone.io/appleboy/drone-ssh/)」

**项目的.drone.yml 文件：**
```yaml
kind: pipeline ## 定义一个管道
type: docker ## 定义管道类型
name: build-test1 ## 定义管道名称

## 声明宿主机 映射到 drone执行器的数据卷
volumes: 
  - name: node_modules ## 缓存
    host: 
      path: /home/gite/drone/cache/node_modules

## 这里禁用是没有效果的, 因为第一步clone默认执行
## clone:
##   disable: false ## 禁用代码拉取

steps:
  - name: build-project ## 步骤名称
    image: node:16.13.1 ## 使用镜像和版本
    depends_on: [clone] ## 依赖 clone 步骤，
    volumes: ## 当前步骤使用(挂载)的卷轴
      - name: node_modules ## 数据卷名称
        path: /drone/src/node_modules ## 容器内的绝对路径
    ## 执行的命令
    commands: 
      - pwd ## 查看当前目录
      - npm config set registry https://registry.npm.taobao.org ## 切换淘宝镜像
      - npm install ## 安装依赖
      - npm run build ## 执行构建指令

  - name: build-image ## 构建镜像
    image: plugins/docker 
    depends_on: [build-project] ## 依赖build-project
    settings: ## 当前设置
      username: ## 账号名称
        from_secret: docker_username
      password: ## 账号密码
        from_secret: docker_password
      dockerfile: deploy/Dockerfile ## Dockerfile地址， 注意是相对地址
      repo: soulweapon/test1 ## docker仓库名称

---

## 新的pipeline
kind: pipeline
type: docker
name: deploy

depends_on: ## 依赖build管道
  - build-test1

clone:
  disable: true ## 禁用拉取、

steps:
  - name: deploy-project
    image: appleboy/drone-ssh
    settings:
      host: o2packs.com
      username: 
        from_secret: deploy_username ## 使用secrets
      password: 
        from_secret: deploy_password
      port: 22
      command_timeout: 2m
      script:
        - echo ==-----==开始部署==-----==
        - docker pull soulweapon/test1:latest
        - docker-compose -p test1 down
        ## - docker volume rm xxx ## 有挂载卷轴的记得卸载
        - docker-compose -f /home/ubuntu/compose-file/test1.yml -p test1 up -d
        ## 过滤出dockerImages的id, 删除none镜像
        - docker rmi $(docker images | grep test1 | grep none | awk '{print $3}')
        - echo ==-----==部署成功==-----==
```
**必备文件1「deploy/Dockerfile」:**
```dockerfile
## 基于nginx镜像
FROM nginx:latest

## 复制打包文件
COPY ./dist /usr/share/nginx/html

## 复制配置文件
COPY ./deploy/nginx.conf /etc/nginx

## 容器应用端口
EXPOSE 80
```
**必备文件2「deploy/nginx.conf」:**
```nginx
events {
  worker_connections 1024;
}

http {
  include mime.types;
  default_type text/html;
  sendfile on;
  keepalive_timeout 65;
  charset utf-8;
  error_log /var/log/nginx/error.log;
  access_log /var/log/nginx/access.log;

  server {
    listen 80;

    location / {
      root /usr/share/nginx/html;
      index index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    ## 反向代理
    ## location ~* /api/(.*) {
    ##     resolver 8.8.8.8;
    ##     proxy_set_header Host $proxy_host;
    ##     proxy_set_header X-Real-IP $remote_addr;
    ##     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    ##     proxy_set_header X-NginX-Proxy true;
    ##     proxy_pass $SERVER_URL/$1$is_args$args;
    ## }
  }
}
```
**必备文件3「部署服务器 - /home/ubuntu/compose-file/test1.yml」：**
```yaml
version: '3.0'

services:
  nginx: 
    image: soulweapon/test1:latest
    container_name: test1_web ## 服务名称
    restart: always ## 重启方式
    ports: 
      - "8088:80"
```
## 4. gogs
### 4.1 本地网络无法使用web hooks
在`security`下添加`LOCAL_NETWORK_ALLOWLIST`属性，设置为本地IP地址，如果是多个IP用逗号分开
```nginx
[security]
LOCAL_NETWORK_ALLOWLIST = 192.168.108.200
```

