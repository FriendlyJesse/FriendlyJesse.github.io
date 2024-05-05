# Windows
## WSL
### 查看wsl的ip
在WSL子系统中，使用下面的命令。获取WSL的ip：
```bash
ip addr | grep eth0
```
![](https://cdn.nlark.com/yuque/0/2022/webp/21870146/1669034923268-474d77c3-2a09-49d5-8de6-f43ca287f192.webp#averageHue=%23340f29&clientId=u7a0d68f6-e209-4&from=paste&id=IP9ye&originHeight=651&originWidth=942&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8cb960ef-a500-4913-8ac0-fa412df1444&title=)
### WSL与宿主机文件传输
我们可以从加载盘拷贝文件过去
```bash
cp -r /mnt/c/Users/jesse/Desktop/hkzf-mobile ~/
mv /mnt/c/Users/jesse/Desktop/hkzf-mobile ~/
```
`/mnt/c`: 我们挂载的盘，也就是我们的`c`盘。
`-r`：表示传输文件夹，不加则是传输文件
### 10.1 远程文件传输
### 局域网访问wsl
#### 端口转发
可以[在.wslconfig文件中的[wsl2]下设置networkingMode=mirrored](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config#configuration-setting-for-wslconfig)，以启用镜像模式网络。

1. 在用户目录下配置添加：`.wslconfig`文件
```latex
networkingMode=mirrored
```

2. 运行 `wsl --shutdown && wsl`重启 wsl

可以看到 wsl ip 已经跟本地 ip 一致了
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21870146/1702901908519-6975d898-24d0-40b5-a39a-2865706a529f.png#averageHue=%2337122b&clientId=u3d81acd0-d158-4&from=paste&height=59&id=ydUJB&originHeight=117&originWidth=1913&originalType=binary&ratio=2&rotation=0&showTitle=false&size=29115&status=done&style=none&taskId=ua6bc3e7f-e34a-479b-9805-36d09a45eed&title=&width=956.5)
## 防火墙开启端口
让局域网可以访问对应端口
**(1) 找到Windows 防火墙的设置页面, 点击高级设置**
![](https://cdn.nlark.com/yuque/0/2023/png/21870146/1702901801649-e7311068-3a9e-41f1-a213-4cccc69ed754.png#averageHue=%23f5f5f5&clientId=u3d81acd0-d158-4&from=paste&id=Lxxgn&originHeight=932&originWidth=1200&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u042bdb9b-372f-4747-a1e7-1cbb9c68968&title=)
**(2) 入栈规则 -> 新建规则 -> 端口 -> 下一页**
![](https://cdn.nlark.com/yuque/0/2023/webp/21870146/1702901801695-ae713d27-0d49-4ece-a892-d7554883a49e.webp#averageHue=%23f1f0ef&clientId=u3d81acd0-d158-4&from=paste&id=VSPlk&originHeight=791&originWidth=1061&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u14fa135c-e353-4369-ac0f-d7bc32f6138&title=)
**(3) TCP 特定本地端口, 输入22, 即想要开放的端口**
![](https://cdn.nlark.com/yuque/0/2023/png/21870146/1702901801707-5db34ab5-cda4-46e0-8bae-133e757fc14b.png#averageHue=%23f1efef&clientId=u3d81acd0-d158-4&from=paste&id=HQEz6&originHeight=791&originWidth=1061&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue21ca01f-69ea-4a52-8a51-12f05ce3f0e&title=)
**(4) 允许连接**
![](https://cdn.nlark.com/yuque/0/2023/png/21870146/1702901801690-98d9e288-44e9-46a8-affe-1de9fe5f9035.png#averageHue=%23f0efee&clientId=u3d81acd0-d158-4&from=paste&id=WYtZU&originHeight=791&originWidth=1061&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u20f8c453-c94b-4c63-bb9a-b55d3e1142c&title=)
**(5) 指定可用域**
![](https://cdn.nlark.com/yuque/0/2023/png/21870146/1702901801692-c6475dc8-8708-420f-bf7d-3e069cd6e301.png#averageHue=%23f2f0f0&clientId=u3d81acd0-d158-4&from=paste&id=aizWE&originHeight=791&originWidth=1061&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uce8c434a-876d-486a-9ca4-b9cabbac6ec&title=)
**(6) 添加描述(自己定义)**
![](https://cdn.nlark.com/yuque/0/2023/webp/21870146/1702901802335-420cdb7b-fefb-4fec-8f28-ed22c81f2c9a.webp#averageHue=%23f3f2f2&clientId=u3d81acd0-d158-4&from=paste&id=wrNMq&originHeight=791&originWidth=1061&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u29709301-fb14-480b-9d2a-bb4e547c866&title=)
**(7) 查看验证**
![](https://cdn.nlark.com/yuque/0/2023/png/21870146/1702901802454-bfa9456f-4e3d-428b-82a1-6a42af0f77ed.png#averageHue=%23f3f2f1&clientId=u3d81acd0-d158-4&from=paste&id=nbtmD&originHeight=791&originWidth=1061&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u0646bd06-25d8-4be4-affb-5d2888d53df&title=)
## 通过端口号中止进程
```bash
C:\Users\dell>netstat -ano | findstr "8920"
  TCP    127.0.0.1:8920         0.0.0.0:0              LISTENING       25016
  TCP    127.0.0.1:8920         127.0.0.1:57061        TIME_WAIT       0
  TCP    127.0.0.1:8920         127.0.0.1:60884        ESTABLISHED     25016
  TCP    127.0.0.1:57062        127.0.0.1:8920         TIME_WAIT       0
  TCP    127.0.0.1:60884        127.0.0.1:8920         ESTABLISHED     11308

C:\Users\dell>taskkill /pid 25016 /f
成功: 已终止 PID 为 25016 的进程。
```
## 设置静态ip
通过 `ipconfig`查看：
```bash
以太网适配器 以太网:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::fe28:1b0:7596:e9fd%26
   IPv4 地址 . . . . . . . . . . . . : 192.168.0.141
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.0.1
```
我们可以配置ip为：`192.168.0.1-192.168.0.255`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1671678936056-0efea73e-7be8-4528-b22f-1e700aa2fca8.png#averageHue=%23f8f8f8&clientId=u935c2447-5652-4&from=paste&height=742&id=ud0deefb5&originHeight=742&originWidth=313&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19405&status=done&style=none&taskId=u086a229f-d499-4fd9-ba65-e146330c1b8&title=&width=313)
## 通过 hosts 映射本地域名
```latex
## ...
127.0.0.1 tfp.com
```
然后通过 `ipconfig/flushdns` 刷新本地 dns 缓存就可以了
## 因为翻墙导致的没网
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21870146/1703768225841-b451edf1-1581-4cf8-9057-08ccf995fa96.png#averageHue=%23e2e2e1&clientId=u63c57408-5e5d-4&from=paste&height=519&id=u15abdcd8&originHeight=1037&originWidth=839&originalType=binary&ratio=2&rotation=0&showTitle=false&size=95448&status=done&style=none&taskId=uaeab684d-79bb-4f39-a133-7948f192e4b&title=&width=419.5)
搜索`Internet`，关闭 `Proxy server`即可。
