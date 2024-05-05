# Linux
## 变量
### 本地变量
用户自定义变量（也叫本地变量）：只在当前的shell中生效。
```bash
name=chenwei     ## 变量赋值
echo $name       ## 变量调用（chenwei）
name="$name"is   ## 变量叠加
echo $name       ## 变量调用（chenweiis）
name=${name}poet ## 变量叠加
echo $name       ## 变量调用（chenweiispoet）
set              ## 查看所有变量
unset name       ## 变量删除
```
### 环境变量
环境变量：变量中保存的是和系统操作环境相关的数据。（值无法更改，可以新建）
环境变量会在当前shell和这个shell的所有子shell当中生效，如果把环境变量写入相应的配置文件，那么这个环境变量就会在所有的shell中生效。
```bash
export name=farwish ## 声明环境变量
env                 ## 查询环境变量
unset name          ## 删除变量
```
**系统常见环境变量：**
PATH：冒号分割的路径（系统查找命令的路径），可以使用 `echo $PATH` 查看，系统命令之所以不需要指定路径，是因为系统会去 PATH 定义的路径里面顺序查找，找不到才会提示不存在。例如：
如果我们自己编写个脚本 `vim hello.sh; chmod 755 hello.sh; cp hello.sh /usr/local/bin；` 放入到 `$PATH` 中存在目录内，在任意位置输入hello.sh就可以执行了。（但是实际中不这样做，容易让人误解为是系统命令）
```bash
PATH="$PATH":/home/weichen/test ## PATH变量叠加，把我们的脚本所在路径加进去（命令行修改只是临时生效，重启将失效）
PATH=$PATH:/home/weichen/test   ## 环境变量也可以不加引号

echo $PWD ## 一致
echo $(pwd) ## 与 $PWD 变量一致
```
### 位置参数变量

- `$n`：n为数字，`$0`代表命令本身，`$1-$9` 代表第一个到第九个参数，十以上的参数需要用大括号包含，如 `${10}` 、`${11}`
- `$*`：这个变量代表命令行中所有的参数，`$*`把所有的参数看成一个整体（如果循环 `$*` 输出参数，将只输出一次）
- `$@`：这个变量也代表命令行中所有的参数，不过`$@`把每个参数区分对待（如果循环 `$@` 输出参数，将单独输出每个参数）
- `$#`：这个变量代表命令行中所有参数的个数

例子：
```bash
#!/bin/bash
## 注释：pam.sh
echo $0
echo $1
echo $2
echo $3
echo $*
echo $@
echo $#

num1=$1
num2=$2
sum=$(( $sum1 + $sum2 ))    ## 变量sum的和是num1+num2, $((  ))用于运算; 
　　　　　　　　　　　　　　　## 或者直接 sum=$(( $1 + $2 ))
echo $sum
```
```bash
./pam.sh abc def hhh
## output:
./pam.sh
abc
def
hhh
abc def hhh
abc def hhh
3
abcdef
```
### 预定义变量

- `$?`：(echo $?)最后一次执行的命令返回的状态。值为0，证明上一个命令正确执行；如果非0（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确。程序判断命令是否正确执行，只能依赖$?
- `$$`：当前进程的进程号（PID）
- `$!`：后台运行的最后一个进程的进程号（PID）
## 查找
### 查看软件安装位置
```bash
whatis openssl
```
### 查找文件

1. 使用grep命令与ls命令的结合：
```bash
ls -R <搜索路径> | grep <关键字>
```

   - -R选项：表示递归地搜索子目录。
   - <搜索路径>：表示要搜索的起始路径。
   - <关键字>：表示要搜索的文件名的关键字。

示例：ls -R /path/to/search | grep keyword
## 权限
### 查看文件权限
```bash
ls -l
## or
ll
```
### 权限分类
```bash
## 文件类型
- --- --- ---    ## 普通文件
d --- --- ---    ## 目录（文件夹）
l --- --- ---    ## 链接
b --- --- ---    ## 块设备文件
c --- --- ---    ## 字符设备文件
p --- --- ---    ## 管道文件
s --- --- ---    ## 套接口文件

## 文件所有者(owner)
- rwx --- ---    ## 对应文件所有者(owner)拥有读写及执行权限，设定值为700，其值等于下面三项值相加
- r-- --- ---    ## 对应文件所有者(owner)拥有读权限，设定值为400
- -w- --- ---    ## 对应文件所有者(owner)拥有写权限，设定值为200
- --x --- ---    ## 对应文件所有者(owner)拥有执行权限，设定值为100

## 文件所属用户群组
- --- rwx ---    ## 对应文件所属群组(owner)拥有读写及执行权限，设定值为070，其值等于下面三项值相加
- --- r-- ---    ## 对应文件所属群组(owner)拥有读权限，设定值为040
- --- -w- ---    ## 对应文件所属群组(owner)拥有写权限，设定值为020
- --- --x ---    ## 对应文件所属群组(owner)拥有执行权限，设定值为010

## 其他用户(others)
- --- --- rwx    ## 对应其他用户(others)对文件拥有读写及执行权限，设定值为007，其值等于下面三项值相加
- --- --- r--    ## 对应其他用户(others)对文件拥有读写及执行权限，设定值为004
- --- --- -w-    ## 对应其他用户(others)对文件拥有读写及执行权限，设定值为002
- --- --- --x    ## 对应其他用户(others)对文件拥有读写及执行权限，设定值为001
```
### 修改文件/文件夹所属用户
`chown` 修改文件/文件夹所属的用户：`chown[选项] 新所属用户名 文件名/文件夹名`
```bash
chown jesse ./protobuf
```
| 常用参数                             | 描述                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------- |
| -R, --recursive                      | 递归地更改指定目录及其子目录中所有文件和目录的所有者。                    |
| --reference=RFILE                    | 把指定文件的拥有者和用户组应用到其他文件， RFILE为参考文件。              |
| --from=CURRENT_OWNER[:CURRENT_GROUP] | 仅在文件的当前所有者或用户组匹配指定的值时才更改文件的所有者和/或用户组。 |
| --preserve-root                      | 不允许在 “/” 上递归操作                                                   |
| -v, --verbose                        | 显示详细的操作信息。                                                      |

### 修改文件/文件夹权限
在Linux中，可以使用chmod命令来给文件夹设置权限。这里是一些基本的用法示例：

1. 给用户（u）赋予读写执行权限（rwx）：
```bash
chmod u+rwx /path/to/directory
```

2. 给组（g）赋予读执行权限（rx）：
```bash
chmod g+rx /path/to/directory
```

3. 给其他人（o）赋予读权限（r）：
```bash
chmod o+r /path/to/directory
```
| **用户表示符** | **说明**       |
| -------------- | -------------- |
| u              | 所有者         |
| g              | 拥有者同组用户 |
| o              | 其它用户       |
| a              | 所有用户       |

| **权限操作符** | **含义**               |
| -------------- | ---------------------- |
| +              | 表示添加权限           |
| -              | 表示移除权限           |
| =              | 表示设置权限为特定的值 |

**optional：**

| **参数** | **作用**                     |
| -------- | ---------------------------- |
| -c       | 改变权限成功后再输出成功信息 |
| -R       | 递归处理所有子文件           |
| -f       | 改变权限失败后不显示错误信息 |
| -v       | 显示执行过程详细信息         |

### 修改文件/文件夹所属群组
```bash
chgrp [选项] 用户组名 文件名/文件夹名
```
| 参数              | 描述                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| -R, --recursive   | 递归地更改指定目录及其子目录中所有文件和目录的所属用户组。               |
| --reference=RFILE | 把指定文件的用户组应用到其他文件。                                       |
| --preserve-root   | 不要跨越文件系统的边界，这对于递归操作非常重要。                         |
| -v, --verbose     | 显示详细的操作信息。                                                     |
| --dereference     | 在符号链接指向文件本身时，处理符号链接指向的文件而不是符号链接文件本身。 |

## zip/unzip
### zip
zip 指令用于在Linux系统上创建和管理ZIP压缩文件。
命令格式：`zip [选项] <压缩文件名> <文件/目录列表>`

| 选项 | 作用                                                            |
| ---- | --------------------------------------------------------------- |
| -r   | 递归地将一个目录及其所有子目录和文件压缩到ZIP文件中             |
| -q   | 在压缩文件时启用静默模式，即不显示压缩过程的详细信息            |
| -d   | 从现有的ZIP文件中删除指定的文件或目录                           |
| -u   | 用于更新现有的ZIP文件，将新的文件或修改后的文件添加到ZIP存档中  |
| -f   | 用于刷新（更新）现有ZIP文件中的指定文件                         |
| -m   | 用于移动（归档）文件到一个ZIP压缩文件中，并在移动后将源文件删除 |
| -e   | 用于对ZIP压缩文件进行加密                                       |
| -z   | 为压缩文件添加注释                                              |

例子：
```bash
zip mytxt.zip t1.txt t2.txt
zip -r mytxt1.zip t1.txt t2.txt a/
```
### unzip
unzip命令在Ubuntu系统中用于解压缩.zip文件。它可以解压缩一个或多个.zip文件，并将文件解压缩到当前目录或指定的目录。
unzip命令的一般格式
`unzip [选项] zipfile [file...]`
其中，zipfile是要解压的.zip文件，file是.zip文件中的特定文件。

unzip命令的主要参数：
-l：列出.zip文件的内容，但不解压。
-v：在列出.zip文件的内容时，显示更多的信息。
-d：指定解压缩的目录。
-p：将文件解压缩到标准输出。
-q：安静模式，减少命令的输出。
-n：只解压缩新的或更新的文件。
-o：无论目标文件是否存在，都覆盖目标文件。
## 操作排除文件/文件夹
```bash
cp !(file1|dir2) /data/ ## 复制文件到/data/，排除file1和dir2
mv !(file1|dir2) /data/ ## 移动文件到/data/，排除file1和dir2
rm -rf !(file1|dir2) ./ ## 删除当前目录下的文件，排除file1和dir2
```
**sh:**
```shell
mv `ls | grep -v "www"` www
```
## 文件传输
我们可以从加载盘拷贝文件过去
```bash
cp -r /mnt/c/Users/dell/Desktop/hkzf-mobile ~/   
```
`/mnt/c`: 我们挂载的盘，也就是我们的`c`盘。
`-r`：表示传输文件夹，不加则是传输文件
### 远程文件传输
```bash
scp -r /mnt/c/Users/dell/Desktop/hkzf-mobile 用户名@192.xx.xx(IP):/路径/
```
### kill 进程
随后我们可以`kill`进程，随后重启服务即可
```bash
kill 进程pid // 普通kill
kill -9 进程pid // 强制kill
```
## 服务器资源排查
**现象**：从某一刻开始，[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)进程持续性消耗cpu100%，并且在剔除流量后，居高不下。
**问题**：cpu持续性被单个服务消耗，既影响服务本身功能和用户体验，也威胁到其他系统和进程的正常运行，更重要的是，存在随时发生生产故障的可能性。
### 监控资源
#### top 命令
使用命令`top`可以监控资源
```bash
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   77 jesse     20   0  713356  63380  36088 S   0.3   0.8   0:25.63 npm run dev
  135 jesse     20   0  644652  53152  32456 S   0.3   0.7   0:15.89 node
  231 jesse     20   0  972880 109740  41388 S   0.3   1.4   0:33.87 node
    1 root      20   0    1832   1124   1108 S   0.0   0.0   0:00.82 init
    9 root      20   0    2172    372      0 S   0.0   0.0   0:00.00 init
   10 root      20   0    2180    372      0 S   0.0   0.0   0:00.01 init
   11 jesse     20   0   11948   5684   3776 S   0.0   0.1   0:00.02 bash
```
#### htop
`htop`更加详细也更方便，某些低版本系统没有安装需要手动安装：
```bash
yum install htop
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669100763426-996db8ef-8dfe-4854-ac55-cd3a40857b2d.png#averageHue=%23403643&clientId=uc363afb5-0257-4&from=paste&height=437&id=u69467159&originHeight=437&originWidth=1412&originalType=binary&ratio=1&rotation=0&showTitle=false&size=745125&status=done&style=none&taskId=udc2e9892-8c68-40d2-bb08-0dca2c203b3&title=&width=1412)
#### vmstat 命令
使用命令`vmstat`可以根据时间监控资源
```bash
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 5149076 301828 1242988    0    0    13    38   10   64  0  0 100  0  0
 0  0      0 5149068 301828 1242988    0    0     0    10   39  312  0  0 100  0  0
 0  0      0 5149068 301828 1242988    0    0     0     0   42  366  0  0 100  0  0
```
| 类型   | 详情                                                              | 描述                                                                                                                                                                                                                                                                                      |
| ------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| procs  | r                                                                 | 表示运行队列(就是说多少个进程真的分配到CPU)，当这个值超过了CPU数目，就会出现CPU瓶颈了。这个也和top的负载有关系，一般负载超过了3就比较高，超过了5就高，超过了10就不正常了，服务器的状态很危险。top的负载类似每秒的运行队列。如果运行队列过大，表示你的CPU很繁忙，一般会造成CPU使用率很高。 |
|        |
| b      | 表示阻塞的进程,在等待资源的进程，这个不多说，进程阻塞，大家懂的。 |
| memory | swpd                                                              | 虚拟内存已使用的大小，如果大于0，表示你的机器物理内存不足了，如果不是程序内存泄露的原因，那么你该升级内存了或者把耗内存的任务迁移到其他机器。                                                                                                                                             |
|        | free                                                              | 空闲的物理内存的大小                                                                                                                                                                                                                                                                      |
|        | buff                                                              | Linux/Unix系统是用来存储，目录里面有什么内容，权限等的缓存                                                                                                                                                                                                                                |
|        | cache                                                             | cache直接用来记忆我们打开的文件,给文件做缓冲，把空闲的物理内存的一部分拿来做文件和目录的缓存，是为了提高 程序执行的性能，当程序使用内存时，buffer/cached会很快地被使用。                                                                                                                  |
| swap   | si                                                                | 每秒从磁盘读入虚拟内存的大小，如果这个值大于0，表示物理内存不够用或者内存泄露了，要查找耗内存进程解决掉。我的机器内存充裕，一切正常。                                                                                                                                                     |
|        | so                                                                | 每秒虚拟内存写入磁盘的大小，如果这个值大于0，同上。                                                                                                                                                                                                                                       |
| io     | bi                                                                | 块设备每秒接收的块数量，这里的块设备是指系统上所有的磁盘和其他块设备，默认块大小是1024byte                                                                                                                                                                                                |
|        | bo                                                                | 块设备每秒发送的块数量，例如我们读取文件，bo就要大于0。bi和bo一般都要接近0，不然就是IO过于频繁，需要调整。                                                                                                                                                                                |
| system | in                                                                | 每秒CPU的中断次数，包括时间中断                                                                                                                                                                                                                                                           |
|        | cs                                                                | 每秒上下文切换次数，例如我们调用系统函数，就要进行上下文切换，线程的切换，也要进程上下文切换，这个值要越小越好，太大了，要考虑调低线程或者进程的数目                                                                                                                                      |
| cpu    | us                                                                | 用户CPU时间，我曾经在一个做加密解密很频繁的服务器上，可以看到us接近100,r运行队列达到80(机器在做压力测试，性能表现不佳)。                                                                                                                                                                  |
|        | sy                                                                | 系统CPU时间，如果太高，表示系统调用时间长，例如是IO操作频繁。                                                                                                                                                                                                                             |
|        | id                                                                | 空闲 CPU时间，一般来说，id + us + sy = 100,一般我认为id是空闲CPU使用率，us是用户CPU使用率，sy是系统CPU使用率。                                                                                                                                                                            |
|        | wt                                                                | 等待IO CPU时间。                                                                                                                                                                                                                                                                          |

procs r: 运行的进程比较多，系统很繁忙
bi/bo: 磁盘写的数据量稍大，如果是大文件的写，10M以内基本不用担心，如果是小文件写2M以内基本正常
cpu us: 持续大于50%，服务高峰期可以接受， 如果长期大于50 ，可以考虑优化
cpu sy: 现实内核进程所占的百分比，这里us + sy的参考值为80%，如果us+sy 大于 80%说明可能存在CPU不足。
cpu wa: 列显示了IO等待所占用的CPU时间的百分比。这里wa的参考值为30%，如果wa超过30%，说明IO等待严重，这可能是磁盘大量随机访问造成的， 也可能磁盘或者磁盘访问控制器的带宽瓶颈造成的(主要是块操作)
## shell 配置
查看当前系统下可用的 shell：
```bash
cat /etc/shells
```
### 安装 zsh
```bash
sudo apt install zsh
```
#### 安装 oh-my-zsh
[GitHub - ohmyzsh/ohmyzsh: 🙃 A delightful community-driven (with 2,000+ contributors) framework for managing your zsh configuration. Includes 300+ optional plugins (rails, git, macOS, hub, docker, homebrew, node, php, python, etc), 140+ themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community.](https://github.com/ohmyzsh/ohmyzsh)
### 设置默认 shell
```bash
chsh -s /bin/zsh
```
### neofetch
Neofetch 是一个简单但有用的命令行系统信息工具，它用 Bash 编写。它会收集有关系统软硬件的信息，并在终端中显示结果。
Neofetch 是一个使用 bash 3.2+ 编写的命令行系统信息工具。它以美观、视觉上令人愉悦的方式显示有关您的操作系统、软件和硬件的信息。
```bash
sudo apt install neofetch
```
## 错误修复
### apt-get update出错
在Ubuntu操作系统中，使用apt-get命令安装所需的开发软件非常方便，但也有不少时候由于链接不上软件源而不能正常安装，于是很多人都会想到使用sudo apt-get update命令来更新软件源，而恰恰这时屋漏偏逢连夜雨，更新命令也不能正常工作，出现大量“Failed to fetch”的错误，这是DNS服务器出错。  
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1669288772524-eb8c693e-a550-4bd4-b2a8-37a15ff25565.png#averageHue=%233a162e&clientId=ue69a2d8f-2118-4&from=paste&height=438&id=u18be39a8&originHeight=547&originWidth=1161&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82674&status=done&style=none&taskId=u9af7c70a-9512-4fc1-84a6-cb60c3e0c62&title=&width=928.8)
其实，解决这个问题十分简单，只要设置妥当DNS服务器即可，如电信网络的设置如下所示：
```bash
sudo vi /etc/resolv.conf
```
增加以下内容：
```bash
nameserver 223.5.5.5
nameserver 223.6.6.6
```
增加完阿里的DNS解析后就可以继续更新软件源了。
