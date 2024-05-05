# Nginx
> Nginx 是一款轻量级的 HTTP 服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的 IO 性能，时常用于服务端的反向代理和负载均衡。

Nginx 是全球排名前三的服务器，并且近年来用户增长非常快。有人统计，世界上约有三分之一的网址采用了Nginx。在大型网站的架构中，Nginx被普遍使用，如 百度、阿里、腾讯、京东、网易、新浪、大疆等。
## Nginx 的优势

- 设计思想是事件驱动的异步非阻塞处理（类node.js），所以处理并发能力很强。
- 占用内存少、启动速度快、并发能力强。
- 在互联网项目中广泛应用。
- 支持热部署
- 动静分离
- 可以做 web 服务器
- 可以做反向代理
- 可以做负载均衡
### Nginx的Master-Worker模式
启动Nginx后，其实就是在80端口启动了Socket服务进行监听，如图所示，Nginx涉及Master进程和Worker进程。
![](https://cdn.nlark.com/yuque/0/2022/webp/21870146/1669549173647-1df5d802-94e8-487c-b788-88622d4b164c.webp#averageHue=%23f3f3f3&clientId=ue5f28806-f06a-4&from=paste&id=u9b6fca84&originHeight=446&originWidth=599&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uafaa078e-0350-4e25-ab54-3cb7549054c&title=)
**Master进程的作用是？**
读取并验证配置文件nginx.conf；管理worker进程。
**Worker进程的作用是？**
每一个Worker进程都维护一个线程（避免线程切换），处理连接和请求；注意Worker进程的个数由配置文件决定，一般和CPU个数相关（有利于进程切换），配置几个就有几个Worker进程。
**热部署：**
所谓热部署，就是配置文件nginx.conf修改后，不需要stop Nginx，不需要中断请求，就能让配置文件生效！（nginx -s reload 重新加载/nginx -t检查配置/nginx -s stop）
通过上文我们已经知道worker进程负责处理具体的请求，那么如果想达到热部署的效果，可以想象：
方案一：
修改配置文件nginx.conf后，主进程master负责推送给woker进程更新配置信息，woker进程收到信息后，更新进程内部的线程信息。（有点valatile的味道）
方案二：
修改配置文件nginx.conf后，重新生成新的worker进程，当然会以新的配置进行处理请求，而且新的请求必须都交给新的worker进程，至于老的worker进程，等把那些以前的请求处理完毕后，kill掉即可。
Nginx采用的就是方案二来达到热部署的！
### Nginx如何做到高并发下的高效处理？
Nginx采用了Linux的epoll模型，epoll模型基于事件驱动机制，它可以监控多个事件是否准备完毕，如果OK，那么放入epoll队列中，这个过程是异步的。worker只需要从epoll队列循环处理即可。
### Nginx 配置
nginx 的配置路径在：

- `/usr/share/nginx/html`静态文件目录
- `/etc/nginx/conf.d`配置文件目录（自动导入所有 *.conf 文件）
```nginx
server {
    ## 当nginx接到请求后，会匹配其配置中的service模块
    ## 匹配方法就是将请求携带的host和port去跟配置中的server_name和listen相匹配
    listen       80;
    listen  [::]:80;
    server_name  localhost; ## 定义当前虚拟主机（站点）匹配请求的主机名

    #access_log  /var/log/nginx/host.access.log  main;

    location / { ## 路由
        root   /usr/share/nginx/html; ## 根目录
        index  index.html index.htm; ## 先找根目录下的index.html，如果没有再找index.htm
    }

    #error_page  404              /404.html;

    ## redirect server error pages to the static page /50x.html
    #
    #error_page   500 502 503 504  /50x.html;
    #location = /50x.html {
    ##    root   /usr/share/nginx/html;
    #}
}

```
#### 指定静态资源目录
root 方式
```nginx
location /assets {
    root   /usr/share/nginx/html; ## 解析为 /usr/share/nginx/html/assets
    index  index.html index.htm;
}
```
alias 方式
```nginx
location /assets/ { ## 解析为 /usr/share/nginx/html/assets
    alias   /usr/share/nginx/html/assets/;
    index  index.html index.htm;
}
```
#### 开启索引目录
```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /assets/ {
        autoindex on; ## 开启
        autoindex_localtime on; ## 开启显示功能
        alias   /usr/share/nginx/html/assets/;
        index  index.html index.htm;
    }
}
```
#### spa 项目配置
```nginx
location / {
    root   /usr/share/nginx/html/manage_dev;
    index  index.html index.htm;
  	try_files $uri $uri/ /index.html;
}
```
### 动静分离
静态请求直接从 nginx 服务器所设定的根目录路径去取对应的资源，动态请求转发给真实的后台去处理。这样做不仅能给应用服务器减轻压力，将后台api接口服务化，还能将前后端代码分开并行开发和部署。
一般来说，都需要将动态资源和静态资源分开，由于 Nginx 的高并发和静态资源缓存等特性，经常将静态资源部署在 Nginx 上。如果请求的是静态资源，直接到静态资源目录获取资源，如果是动态资源的请求，则利用反向代理的原理，把请求转发给对应后台应用去处理，从而实现动静分离。
使用前后端分离后，可以很大程度提升静态资源的访问速度，即使动态服务不可用，静态资源的访问也不会受到影响。
### Nginx的反向代理
**正向代理：**相比反向代理，正向代理好像用得不多，通常直接称为代理、梯子等。**【客户端中配置代理服务器】**
**反向代理：**通过一个代理服务器分发请求到其他服务器就是反向代理。对我们来说，客户端对代理是无感知的，客户端不需要任何配置就可以访问，我们只需要把请求发送给反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器的地址。**【在服务器中配置代理服务器】**
**配置反向代理：**
```nginx
server {  
    listen       80;        
    server_name  localhost;
    
    location / {
        root   html; ## Nginx默认值
        index  index.html index.htm;
    }
    proxy_pass http://localhost:8000; ## 反向代理配置，请求会被转发到8000端口
}
```
### 负载均衡
随着业务的不断增长和用户的不断增多，一台服务已经满足不了系统要求了。这个时候就出现了服务器 集群。
在服务器集群中，Nginx 可以将接收到的客户端请求“均匀地”（严格讲并不一定均匀，可以通过设置权重）分配到这个集群中所有的服务器上。这个就叫做**负载均衡**。
**负载均衡的作用：**
前面也提到了，负载均衡可以解决分摊服务器集群压力的问题。除此之外，Nginx还带有**健康检查**（服务器心跳检查）功能，会定期轮询向集群里的所有服务器发送健康检查请求，来检查集群中是否有服务器处于异常状态。
一旦发现某台服务器异常，那么在这以后代理进来的客户端请求都不会被发送到该服务器上（直健康检查发现该服务器已恢复正常），从而保证客户端访问的稳定性。
**配置负载均衡：**
```nginx
## 负载均衡：设置domain
upstream domain {
    server localhost:8000;
    server localhost:8001;
}
server {  
    listen       80;        
    server_name  localhost;

    location / {
        ## root   html; ## Nginx默认值
        ## index  index.html index.htm;
        
        proxy_pass http://domain; ## 负载均衡配置，请求会被平均分配到8000和8001端口
        proxy_set_header Host $host:$server_port;
    }
}
```
