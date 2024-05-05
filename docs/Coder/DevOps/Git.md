# Git
## 1. 生成ssh
ssh-keygen ssh免密协议生成[公钥](https://so.csdn.net/so/search?q=%E5%85%AC%E9%92%A5&spm=1001.2101.3001.7020)和私钥的一个命令
你可以按如下命令来生成 sshkey：
```bash
ssh-keygen -t rsa -C "jessexinyu@foxmail.com"
```

- -t 指定用哪种[加密算法](https://so.csdn.net/so/search?q=%E5%8A%A0%E5%AF%86%E7%AE%97%E6%B3%95&spm=1001.2101.3001.7020)来生成[rsa](https://so.csdn.net/so/search?q=rsa&spm=1001.2101.3001.7020)非对称加密协议
- -C 描述
- 敲三次回车（注意不要设置密码，不然后面拉取和提交代码的时候都要输密码，很麻烦）
## 2. Tag
### 2.1 列出标签
```bash
git tag #列出所有标签
git tag -l 'v1.8.5*' #模糊匹配
```
### 2.2 创建标签
```bash
git tag -a v1.4 -m 'my version 1.4'#附注标签
git tag v1.4-lw #轻量标签
```
### 2.1 给过去的提交打标签
现在，假设在 v1.2 时你忘记给项目打标签，你可以在之后补上标签:
```bash
git tag -a v1.2 9fceb02
```
### 2.3 推送标签
```bash
git push origin v1.5 #推送指定标签
git push origin --tags #推送所有标签
```
### 2.4进入标签
```bash
git checkout v1.5
```
### 2.5 从标签创建新分支
```bash
git checkout -b new_branch v1.5
```
### 2.6 其他创建标签的方式
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21870146/1657162120419-9b6e3faa-ce67-4d08-bf13-d7c71981ac4d.png#averageHue=%23fcfbfb&clientId=ue7ea4f80-0882-4&from=paste&height=599&id=u6fa4f9bc&originHeight=599&originWidth=1092&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55192&status=done&style=none&taskId=u64a95491-be43-4561-8159-0a5b4ecaeca&title=&width=1092)
以**Gogs、Github**为例，它可以在版本中直接创建丰富信息的标签
## 3. **合并commit**
### 3.1 变基
在项目开发时，每天会提交大量的代码，也会有很多 commit 记录，那么要不要处理这些 commit 记录。
当然不处理这些 commit 记录也能进行代码合并，就是记录有点多，并且每个 commit 可能获知的信息不那么全，如果合并一下这些 commit 并添加一些这些 commit 的总的概览，这样看起来 commit 记录也少了很多，并且都是有用的提交记录。
#### 3.1.1 合并commit
**git rebase -i HEAD~4** 合并前面四个 commit 记录
也可以指定合并某个版本之前的版本：**git rebase -i 3a4226b** 但不包含 3a4226b，至合并他之前的。
执行了 [rebase](https://so.csdn.net/so/search?q=rebase&spm=1001.2101.3001.7020) 之后会弹出一个窗口，让你选择合并哪些 commit 记录
```bash
pick 3ca6ec3   '注释**********'
s 1b40566   '注释*********'
s 53f244a   '注释**********'
```
保存退出，**按下 esc 再按 ：然后输入 wq 或 x 保存**
如果有冲突，可以先解决冲突，解决完之后执行：
```bash
git add .
git rebase --continue
```

如果不想执行或者想放弃的话可以执行：
```bash
git rebase --abort
```
如果没有冲突，或者冲突已经解决，会弹出窗口，让你注释掉一些提交记录，这里是让我们编辑自己合并的这些记录的概览，如：完成了什么功能，按照实际情况填写。
```bash
## This is a combination of 4 commits.  
## 写上合并的这些 commit 做了什么事，如：
完成了 api 的编写：
	1. 完成了用户相关的 api 编写
	2. 完成了用户列表相关 api 编写

## 下面的都注释
## The first commit’s message is:  
## 注释......
## The 2nd commit’s message is:  
## 注释......
## The 3rd commit’s message is:  
## 注释......
## Please enter the commit message for your changes. Lines starting ## with ‘#’ will be ignored, and an empty message aborts the commit.
```
#### 3.1.2 提交合并之后的 commit
```bash
git push -f origin/feature
```
合并之后由于 commit 记录发生了变基，需要使用 **-f** 关键字提交，由于我们都是在自己分支开发，不会覆盖其他人提交的记录，如果在主分支请谨慎使用 **-f** 提交，因为会覆盖别人的代码。
### 3.2 合并
我们现在将合并功能分支即。feature1 与 master 分支一起压缩。
首先，我们将切换到 master 分支。
```bash
git checkout master
git merge --squash feature
```
当我们使用 --squash 选项执行 merge 时，Git 不会像在正常合并中那样在目标分支中创建合并提交。相反，Git 接受源分支中的所有更改。feature1 并将其作为本地更改放入目标分支即 master 的工作副本中。
## 4. **撤销操作**
### 4.1 取消修改的文件
```bash
git checkout test.js #取消某个文件的修改
git checkout . #取消所有文件修改
```
此命令可以让你的分支在没有暂存的情况下回到最初的情况
### 4.2 取消暂存的文件
```bash
git reset
## 或
git reset HEAD

## 取消暂存单个文件
git reset test.js
```
### 4.3 取消合并
```bash
git merge --abort
```
### 4.4 reset 撤销
**使用git reset回退公共远程分支的版本后，需要其他所有人手动用远程master分支覆盖本地master分支。在多人合作的仓库更推荐使用revert**
```bash
git reset --soft *****(commit id)
git reset --mixed *****(commit id)
git reset --hard *****(commit id)
```

1. git reset后的三个参数回退程度是依次递进。soft最轻微，它不会重置当前工作区和暂存区，只会将回退版本后续的提交加到暂存区。
2. mixed会改变暂存区，使它和回退版本同步。
3. hard则会重置工作区和暂存区，使它和回退版本一致。
### 4.5 revert 撤销
**git revert 命令意思是撤销某次提交。它会产生一个新的提交，虽然代码回退了，但是版本依然是向前的，所以，当你用revert回退之后，所有人pull之后，他们的代码也自动的回退了。**
git revert 的作用是通过创建一个新的版本，这个版本的内容与我们要回退到的目标版本一样，但是HEAD指针是指向这个新生成的版本，而不是目标版本。如果我们想恢复之前的某一版本（该版本不是merge类型），但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法。我们使用`git revert HEAD`命令就可以创建一个新的版本，此版本与上一个版本相同。

- `git revert HEAD` ：撤销前一次 commit
- `git revert HEAD^` ：撤销前前一次 commit
- `git revert ****(commit id)`： 撤销指定的版本，撤销也会作为一次提交进行保存。

撤销`commit`有很多方法，个人比较推荐用 `reset` 或`rebase -i`，底下将会同时介绍 `revert` 和 `reset` 的方法。
commit 如下：
```git
A -> B -> C -> D -> E
```
想要还原到 commit C 之后的状态 (也就是把 D 和 E 回退)
用：
```txt
git revert E
git revert D
```
结果：
```txt
A -> B -> C -> D -> E -> F -> G
```
F 是还原 commit E 修改结果的 commit
G 是还原 commit D 修改结果的 commit
因此，revert 只会让 commit 继续往前
优点是可以针对某个 commit 进行还原，并且留下还原记录
### 4.6 远程代码覆盖本地代码
```bash
git fetch --all                拉取所有更新
git reset --hard origin/master  本地代码同步线上最新版本(会覆盖本地所有与远程仓库上同名的文件
git pull
```
## 5. **分支**
### 5.1 本地分支
#### 5.1.1 合并分支
```bash
git merge branch-name
```
#### **5.1.2 合并指定文件**
合并分支的指定`文件`或`文件夹`
```bash
git checkout branch-name src/main.js
git checkout branch-name src/view/folderName
```
#### 5.1.3 取消合并
```bash
git merge --abort
```
### 5.2 远程分支
#### 5.2.1 创建远程分支
```bash
git push --set-upstream origin branch-name
```
#### 5.2.2 删除远程分支
```bash
git push origin --delete branch-name
```
### 5.3 创建独立分支
```bash
git checkout --orphan newbranch
```
使用这种方式创建的方法，分支是没有历史记录的
### 5.4 强制覆盖分支
有2种方法可以实现强制覆盖分支的操作，假设有一个分支`test`，要将这个分支的内容完全覆盖掉主分支`master`
**方法1：**
```bash
git push origin test:master -f           //将test分支强制（-f）推送到主分支master
```
**方法2：**
```bash
git checkout master                          //将当前分支切换到主分支
git reset --hard test                            //将主分支重置为test分支
git push origin master -f             //将重置后的master分支强制推送到远程仓库
```
## 6. **Submodule**
有种情况我们经常会遇到：某个工作中的项目需要包含并使用另一个项目。 也许是第三方库，或者你独立开发的，用于多个父项目的库。 现在问题来了：你想要把它们当做两个独立的项目，同时又想在一个项目中使用另一个。
### 6.1 创建 submodule
```bash
git submodule add <submodule_url> <submodule_alias>
```

- submodule_url：子模块远程地址
- submodule_alias：子模块别名（可选）
### 6.2 获取 submodule
使用普通的`git clone`，只会获取到子模块的空目录，可以使用以下两种方式获取：
#### 6.2.1 clone 时获取
```bash
git clone <project_url> --recurse-submodules
```
这样会递归地将项目中所有子模块的代码拉取。
#### 6.2.2 手动获取
```bash
git submodule init
git submodule update
```
会根据主项目的配置信息，拉取更新子模块中的代码。
### 6.3 submodule 更新
对于子模块而言，并不需要知道引用自己的主项目的存在。对于自身来讲，子模块就是一个完整的 Git 仓库，按照正常的 Git 代码管理规范操作即可。
#### 6.3.1 子模块远程有更新
方式一：进入子模块更新
```bash
cd <submodule>
git pull
```
方式二：使用`submodule`命令
```bash
git submodule foreach 'git pull'
```
#### 6.3.2 直接修改子模块文件夹中的代码
进入子模块文件夹，按照子模块内部的版本控制体系提交代码
```bash
git checkout dev
git add .
git commit -m 'update'
```
当子模块版本变化时，在主项目中使用 `git status` 查看仓库状态时，会显示子模块有新的提交
在这种情况下，可以使用 `git add/commit` 将其添加到主项目的代码提交中，实际的改动就是那个子模块 `文件` 所表示的版本信息
```bash
git add .
git commit -m 'submodule change'
```
### 6.4 删除 submodule
#### 6.4.1 第一步
根据官方文档的说明，应该使用 `git submodule deinit` 命令卸载一个子模块。这个命令如果添加上参数 `--force`，则子模块工作区内即使有本地的修改，也会被移除。
```bash
git submodule deinit <submodule_name>
```
执行 `git submodule deinit <submodule_name>` 命令的实际效果，是自动在 `.git/config` 中删除了以下内容：
```bash
[submodule "<submodule_name>"]
url = <submodule_url>
```
#### 6.4.2 第二步
```bash
git rm <submodule_name>
```
执行 `git rm <submodule_name>` 的效果，是移除了 `<submodule_name>` 文件夹，并自动在 `.gitmodules` 中删除了以下内容：
```bash
[submodule "<submodule_name>"]
path = <submodule_name>
url = <submodule_url>
```
#### 6.4.3 第三步
在`.git/modules`中删除对应的模块，如果不删除的话，再次引入时必须使用下面的命令
```bash
git submodule add -f <submodule_url>
```
#### 6.4.4 第四步
```bash
git commit -m "delete submodule <submodule_name>"
```
至此完成对子模块的删除。
### 6.5 子模块遍历
```bash
git submodule foreach 'git pull'
```
它能在每一个子模块中运行任意命令
## 7. 解决问题
### 7.1 无法访问资源
解决git下载报错：fatal: unable to access ‘[https://github.com/](https://github.com/)…/.git/’:…
**清除代理：**
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```
**清理DNS缓存：**
在`cmd`下清理DNS缓存
```bash
ipconfig/flushdns
```
然后重新 clone 代码即可
## 8.历史版本
```bash
git log -10 ## 查看最近10次commit
git checkout <版本号> ## 输入前六位就可以了
git checkout <branch_name> ## 回到最新版本
```
