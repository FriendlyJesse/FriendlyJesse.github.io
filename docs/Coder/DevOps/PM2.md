# PM2
[PM2](https://github.com/Unitech/pm2) 是带有内置负载平衡器的 Node.js 应用程序的生产过程管理器。可以利用它来简化很多 Node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等。
##  安装
```bash
npm install pm2 -g    ## 命令行安装 pm2
```
## 常用命令
```bash
pm2 start     ## 启动一个服务
pm2 list      ## 列出当前的服务
pm2 stop          ## 停止某个服务
pm2 restart       ## 重启某个服务
pm2 delete        ## 删除某个服务
pm2 logs          ## 查看服务的输出日志
pm2 monit ## 监控
```
## 启动应用
```bash
NODE_ENV=production pm2 start ./bootstrap.js --name midway_app -i 4
```

- --name 用于指定应用名
- -i 用于指定启动的实例数（进程），会使用 cluster 模式启动
### Docker 容器启动
```bash
NODE_ENV=production pm2-runtime start ./bootstrap.js --name midway_app -i 4
```
