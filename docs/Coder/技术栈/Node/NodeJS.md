# NodeJs

## 1.文件系统模块

**fs模块**是Nodejs官方提供的. 用来操作文件的模块。它提供了一些列的方法和属性，用来满足用户对文件的操作需求。
例如：

```javascript
const fs = require('fs')

fs.readFiles(path [, options], callback) // 用于读取之地文件中的内容
fs.writeFile(path , data, callback) // 用来向指定的文件中写入内容
```

### 1.1 读取指定文件中的内容

```javascript
const fs = require('fs')

fs.readFile(`${__dirname}/test.txt`, 'utf8', (err, result) => {
  if (err) return console.log(`文件读取失败！${err.message}`)
  console.log(`文件读取成功，内容是：\n${result}`)
})
```

```javascript
const fs = require('fs')
const path = require('path')

const readDir = (entry) => {
  const files = fs.readdirSync(entry)
  files.forEach(item => {
    const assetPath = path.join(entry, item)
    const asset = fs.statSync(assetPath)
    if (asset.isDirectory()) { // 是目录
      readDir(assetPath)
    } else {
      const info = fs.readFileSync(assetPath, 'utf-8')
      console.log(info)
    }
  })
}

readDir(path.join(__dirname, './hello'))
```

### 1.2 向指定的文件中写入内容

```javascript
const fs = require('fs')

fs.writeFile(`${__dirname}/test.txt`, 'hello world!', err => {
  console.log(err)
})
```

### 1.3 分离js. css. html的DEMO

```javascript
const fs = require('fs')
const path = require('path')

// 匹配标签的正则
// \s 表示空白字符；\S表示非空白字符；* 表示匹配任意次数；()分组
const regStyle = /<style>(?<content>[\s\S]*)<\/style>/
const regScript = /<script>(?<content>[\s\S]*)<\/script>/

const file = path.join(__dirname, '..', 'index.html')


function makeDir (_path) { // 没有文件夹则创建文件夹
  if (!fs.existsSync(path.resolve(_path))) {
    fs.mkdirSync(_path)
  }
}

function resloveCSS (htmlStr) {
  const r1 = regStyle.exec(htmlStr)
  const newCSS = r1.groups.content
  
  fs.writeFile(path.join(__dirname, '..', './clock/index.css'), newCSS, err => {
    if (err) return console.log(`写入 CSS 样式失败！${err.message}`)
    console.log('写入 CSS 样式成功！')
  })
}

function resloveJS (htmlStr) {
  const r1 = regScript.exec(htmlStr)
  const newJS = r1.groups.content
  
  fs.writeFile(path.join(__dirname, '..', './clock/index.js'), newJS, err => {
    if (err) return console.log(`写入 JS 脚本失败！${err.message}`)
    console.log('写入 JS 脚本成功！')
  })
}

function resloveHTML (htmlStr) {
  const newHTML = htmlStr
    .replace(regStyle, '<link href="./index.css" rel="stylesheet"></link>')
    .replace(regScript, '<script src="./index.js"></script>')
  fs.writeFile(path.join(__dirname, '..', './clock/index.html'), newHTML, err => {
    if (err) return console.log(`写入 HTML 失败！${err.message}`)
    console.log('写入 HTML 成功！')
  })
}


fs.readFile(file, 'utf8', (err, result) => {
  if (err) return console.log(`文件读取失败！${err.message}`)
  
  makeDir('./clock')
  resloveCSS(result)
  resloveJS(result)
  resloveHTML(result)

})
```

## 2. path 模块

**path模块**是官方提供的. 用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。
例如：

```javascript
const path = require('path')

path.join([...paths]) // 用来将多个路径片段拼接成一个完整的路径字符串
path.basename() // 用来从路径字符串中，将文件名解析出来
```

## 2.1 路径拼接

```javascript
const path = require('path')

const pathStr = path.join('/a', '/b/c', '..', './d', 'e')
console.log(pathStr) // /a/b/d/e

const pathStr2 = path.join(__dirname, 'test.txt')
console.log(pathStr2) // 当前文件目录/test.txt

const pathStr3 = path.resolve('./test.txt') // 当前工作目录的文件
```

## 2.2 获取路径的文件名

```javascript
const path = require('path')

console.log(path.basename('../test.txt')) // test.txt
console.log(path.basename('../test.txt', '.txt')) // test
```

## 3. express

## 3.1 托管静态资源

```javascript
const express = require('express')

app.use(express.static('./static'))
app.use('./files', express.static('./files'))
```

## 3.2 获取post的数据

### 3.2.1 json

```javascript
const express = require('express')
app.use(express.json())

app.post('/test', (req, res) => {
  console.log(req.body)
})
```

### 3.2.2 urlencoded

```javascript
const express = require('express')
app.use(express.urlencoded({ extended: true }))

app.post('/test', (req, res) => {
  console.log(req.body)
})
```

### 3.2.3  form-data

**express** 本身不具备解析`form-data`的能，所以需要通过第三方插件。

```javascript
const express = require('express')
const formidable = require('express-formidable')

app.use(formidable())

app.post('/test', (req, res) => {
  console.log(req.fields) // 不携带文件
  console.log(req.files) // 携带文件
})
```

## 3.2 路由

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块。

```javascript
const express = require('express')
const router = express.Router()

router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})

router.get('/user/add', (req, res) => {
  res.send('Add new user.')
})

module.exports = router
```

```javascript
const app = express()
const router = require('./src/router/index')
app.use(router)
app.use('/api', router) // 添加前缀
```

## 3.3 中间件

中间件（Middleware），特指业务流程的中间处理环节。
中间件是能够访问**请求对象(req)**. **响应对象(res)**和应用程序请求响应周期的**next函数**的函数。next函数是Express路由器中的一个函数，当调用该函数时，它将执行下一个中间件。
![image.png](<https://cdn.nlark.com/yuque/0/2022/png/21870146/1665466817855-7dea7793-27ed-4c06-84b2-5ec78a62a442.png##> averageHue=%23fbfafa&clientId=u355bf577-8096-4&errorMessage=unknown%20error&from=paste&height=335&id=u1ae48f82&originHeight=335&originWidth=987&originalType=binary&ratio=1&rotation=0&showTitle=false&size=74928&status=error&style=none&taskId=u428ac7ed-47cc-475e-b3c5-0ae17aac81d&title=&width=987)
中间件是一个典型的洋葱模型，也是设计模式中的过滤器模式，它们像流水线一样，按指定顺序执行中间件的方法。

### 3.3.1 定义 app 中间件

```javascript
const express = require('express')

function nw (req, res, next) {
 console.log('这是一个简单的中间件')
 next()
}

// app 中间件
app.use(nw)
app.use(nw)

// app 中的局部中间件
app.get('/user', nw1, (req, res) {
 res.send('局部生效的中间件')
})
```

所有的中间件**共享同一份req和res**。基于这样的特性，外卖可以在上游的中间件中，**统一为req或res对象添加自定义的属性或方法**，供下游的中间件或路由进行使用。

### 3.3.2 定义 router 中间件

绑定到 express.Router() 实例上的中间件，叫做路由中间件。它的用法和**app中间件**没有任何区别。

```javascript
const express = require('express')
const router = express.Router()

function nw(req, res, next) {
 next()
}

router.use([nw, [nw1, ...]])
```

### 3.3.3 错误处理中间件

当使用四个参数时，它将成为错误处理中间件。
错误处理中间件必须放在路由之后，否则不会执行。

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## 3.4 跨域

这里使用的第三方模块跨域

```javascript
const app = require('express')
const cors = require('cors')

app.use(cors())
```

也可以设置响应头跨域

```javascript
app.all("*", function (req, res, next) {
 //设置允许跨域的域名，*代表允许任意域名跨域
 res.header("Access-Control-Allow-Origin", "*")
 //允许的header类型
 res.header("Access-Contro1-Allow-Headers", "content-type")
 //跨域允许的请求方式
 res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
 if (req.method.toLowerCase() == 'options ')
  res.send(200);//让options尝试请求快速结束else
 next()
})
```

## 3.5 JWT 认证

![image.png](<https://cdn.nlark.com/yuque/0/2022/png/21870146/1665564977513-28c77cf1-09e5-4f5a-b041-a799b85478e2.png##> averageHue=%23f6f4f4&clientId=ub92ef005-a1ab-4&errorMessage=unknown%20error&from=paste&height=359&id=u971715b3&originHeight=359&originWidth=687&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107236&status=error&style=none&taskId=u80472670-44f6-4b04-ae2a-e8a471671d9&title=&width=687)
JWT 通常由三部分组成，分别时 Header（头部）. Payload（有效载荷）. Signature（签名）。
三者直接使用英文的“.”分隔，格式：`Header.Payload.Signature`。

- Payload 是真正的用户信息，它是用户信息经过加密之后生产的字符串。
- Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。

### 3.5.1 在 Express 中使用 JWT

```bash
npm install jsonwebtoken ##  生成 JWT 字符串
npm install express-jwt ##  还原 JWT 为 JSON 对象
```

### 3.5.2 定义 secret 密钥

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个**加密和解密的 secret 密钥**

### 3.5.3 生成 JWT

```javascript
const jwt = require('jsonwebtoken')

const secretKey = 'hello ^_^!'

jwt.sign({{username: userinfo.username, id: userinfo.id}, secretKey, expiresIn: '30s'})
```

### 3.5.4 解析 JWT

```javascript
const { expressjwt } = require('express-jwt')

// unless 指定哪些接口不需要认证
expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] })
```

在 **expressJWT** 配置成功之后，在那些由权限的接口中，使用`req.auth`对象即可访问解析出来的用户信息。

```javascript
exports.getUserInfo = async (req, res) => {
  const { id } = req.auth
  const sql = 'SELECT id,username,avatar,mobile FROM users WHERE id=? AND actived=0'
  const [rows] = await db.promise().query(sql, [id])
  res.msg('用户信息获取成功！', 200, rows[0])
}
```

当 JWT 过期时，可以在错误处理中间件中捕获，返还相应的错误。

## 4. 连接 MYSQL

```bash
npm install mysql2 ##  MYSQL的高版本不支持 mysql 模块，所以用 mysql2
```

```javascript
const mysql = require('mysql2')

const db = mysql.createPool({
  host: '192.168.0.141',
  port: '3307',
  user: 'root',
  password: '123456',
  database: 'test'
})

db.query('SELECT 1', (err, results) => {
  console.log(err, results)
})
```

### 4.1 连接远程数据库

这是由于MySQL配置了不支持远程连接引起的，需要连接服务器进行如下配置（需登陆 root 账号）：

```bash
mysql -u root -p
use mysql;
select host from user where user='root';
update user set host = '%' where user ='root';
// 如果 Host = '%'，表示所有 IP 都有连接权限，实际应根据生产环境的 IP 进行设置
flush privileges;
```

### 4.2 查询

```javascript
db.query('SELECT * FROM users', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})
```

### 4.3 插入

```javascript
const user = {
  username: 'jesse',
  password: 'jesse123'
}
// ？ 表示占位符
const sqlStr = 'INSERT INTO users (username, password) VALUES (?, ?)'
// 使用数组的形式，依次为占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})
```

快捷插入数据

```javascript
const user = {
  username: 'jesse3',
  password: 'jesse123'
}
// 直接将 ？ 表示按顺序插入的占位符
const sqlStr = 'INSERT INTO users SET ?'
// 将数据对象当作占位符的值
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})
```

### 4.4 更新

```javascript
const user = {
  id: 13,
  username: 'aaa',
  password: '000'
}
const sqlStr = 'UPDATE users SET username=?, password=? WHERE id=?'
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('更新数据成功！')
})
```

快捷更新数据

```javascript
const user = {
  id: 13,
  username: 'bbb',
  password: '000'
}
const sqlStr = 'UPDATE users SET ? WHERE id=?'
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('更新数据成功！')
})
```

### 4.5 删除

```javascript
const sqlStr = 'DELETE FROM users WHERE id=?'
const field = 14
db.query(sqlStr, field,(err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('删除数据成功！')
})
```

**软删除：**
使用DELETE语句会把真正的数据从表中删除掉。为了保险起见，推荐使用软删除，来模拟删除的动作。**所谓的软删除，就是在表中设置 is_active 这样的状态字段，来标记这条数据是否被删除。**
当用户执行了删除的动作时，我们并没有执行DELETE语句，而是执行了UPDATE语句将这条数据的语句设置的状态为1。

## 5. 密码加密

为了保证密码的安全性，不建议在数据库以**明文**的形式保存用户密码，推荐对密码进行加密存储。
可使用 **bcryptjs**对用户进行加密，有点：

1. 加密之后的密码，无法被逆向破解。
2. 同一铭文密码多次加密，得到的加密结果各不相同，保证了安全性。

```bash
npm i bcryptjs
```

## 5.1 加盐使用

```javascript
const newPassword = bcrypt.hashSync(password, 10)
// bcrypt.hashSync(明文密码, 随机盐的长度)
```

## 5.2 比对

```javascript
bcrypt.compareSync(password, userinfo.password)
// bcrypt.compareSync(明文密码, 已加密的密码)，返回布尔值
```

## 6. 表单数据验证
>
> 表单验证的原则：前端验证为辅，后端验证为主，后端永远不要相信前端提交过来的任何内容。

在实际开发中，前后端都需要对扁担的数据进行合法性的验证，而且，**后端作为数据合法性验证的最后一个关口**，在拦截非法数据方面，起到了只管重要的作用。
单纯的使用`if...else...`的形式对数据合法性进行验证，效率低下. 出错率高. 维护性差。因此，推荐使用第三方数据验证模块，来降低出错率. 提高验证的效率和可维护性，让后端把更多的精力放在核心业务逻辑的处理上。

1. 安装`joi`包，为表单中携带的每个数据项，定义验证规则：

```bash
npm install joi
```

[joiSite](https://joi.dev/)

2. 安装`@escook/express-joi`中间件，来实现自动对表单数据进行验证的功能：

```bash
npm i @escook/express-joi
```

或使用其他第三方数据验证模块：
[Getting Started · express-validator](https://express-validator.github.io/docs/)

## 7. 环境变量

这里环境变量指的是数据库密码等重要数据，而不是指普通变量传参。
在 Node 中，我们怎样使用环境变量呢？

## 7.1 **通过命令行传递**

```bash
PORT=65534 node bin/www
```

这是最基本. 最常用的方式，可是当变量数量过多，不免觉得很崩溃。

## 7.2 使用 .env 文件

通过 dotenv 这个 npm 包可以读取 .env 文件的配置到 Nodejs 程序中。

```bash
npm install dotenv
```

安装后，直接调用它解析，就可以从环境变量中拿到 .env 文件的配置信息了：

```bash
##  token 密钥
SECRET_KEY='jesse'
```

```javascript
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env)
```

这有个问题，不要将配置文件发送到 Git 仓库，可能会泄漏隐私数据。相对的部署私有 Git，把数据库密码提交到 Git 仓库才是最完美的方案！

## 7.3 vscode 启动配置

![image.png](<https://cdn.nlark.com/yuque/0/2022/png/21870146/1665996774084-9c5c31c7-7253-4292-a575-ba9f95086f14.png##> averageHue=%23e8e7e6&clientId=u876aa83a-5104-4&errorMessage=unknown%20error&from=paste&id=u3b651216&originHeight=720&originWidth=1280&originalType=url&ratio=1&rotation=0&showTitle=false&size=506760&status=error&style=none&taskId=u81e107f5-0855-4c2e-9430-d2cb8af29c4&title=)
为了和 .env 文件打通，我们可以在配置里设置 envFile 属性：

```json
{
  "envFile": "${workspaceFolder}/.env"
}
```

## 8. typeorm

## 8.1 查询两个没有关联关系的实体

TypeORM 官方给的文档中，多表查询时使用的是通过实体关系进行leftjoin查询，我们知道TypeORM实体关系实际上是通过mysql的外键实现的。在实际开发中，外键因为有诸多限制不被推荐使用，大部分的都是无关系的表连接。

### 8.1.1 联表查询

```typescript
const user = await this.userModel
      .createQueryBuilder('user')
      .leftJoinAndSelect(ManageUserRole, 'role', 'role.id = user.role_id')
      .where('user.id =:id')
      .setParameters({ id })
      .select(
        `user.id as id,
        user.nickname as nickname,
        role.name as roleName
      `
      )
      .getRawOne()
```

这种方法使用getRawOne获取到sql查询后的原始数据，因为TypeORM会用别名，所以这里用select对字段进行了重命名，这个写法需要对每个需要的字段名进行重命名，否则返回的字段名称会带上表名。

### 8.1.2 通过 map 映射

```typescript
import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { Repository } from 'typeorm'
import { ManageUser } from '../../entity/ManageUser'
import { ManageUserRole } from '../../entity/ManageUserRole'

@Provide()
export class UserService {
  @InjectEntityModel(ManageUser)
  userModel: Repository<ManageUser>

  async findUsers(id: number) {
    const user = await this.userModel
      .createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.role',
        ManageUserRole, // 可以改为表名
        'userRole',
        'userRole.id = user.role_id'
      )
      .where('user.id =:id')
      .setParameters({ id })
      .getOne()
    return user
  }
}

```

返回：

```json
{
    "success": true,
    "message": "OK",
    "data": {
        "id": 173,
        "username": "18079050420",
        "mobile": "18079050420",
        ...
        "role": {
            "id": 1,
            "name": "超级管理员",
            "status": 1,
            "remarks": "拥有所有菜单权限的超级管理员角色",
            "menu_list": "[admin]",
            "create_at": null,
            "update_at": 1570871830,
            "is_deleted": 0
        }
    }
}
```

使用leftJoinAndMapOne作字段映射，如果一对多可以使用leftJoinAndMapMany。这样就不用挨个对字段重命名，但是可能存在嵌套较深的问题。

## 8.2 JSON 查询

建议在值为数字时使用

```typescript
const [list, total] = await this.userModel
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.avatar',
        'user.create_at',
        'user.lastlogin_at',
        'user.mobile',
        'user.nickname',
        'user.remarks',
        'user.role_ids',
        'user.sex',
        'user.status',
        'user.update_at',
        'user.username'
      ])
      .leftJoinAndMapMany(
        'user.role',
        ManageUserRole,
        'userRole',
        'JSON_CONTAINS(user.role_ids, JSON_ARRAY(userRole.id))' // 查询JSON 数组
        // 'JSON_CONTAINS(user.role_ids, CAST(userRole.id AS char))' // 查询单个JSON id
      )
      .where({ id: 173 })
      .take(size)
      .skip(page > 1 ? page * size : 0)
      .getManyAndCount()
```

或者使用`JSON_SEARCH`函数：
建议在值为字符串时使用

```sql
SELECT * FROM `manage_user` WHERE id = 173 && JSON_SEARCH(role_ids, 'one', '1')
```

和json_contains相比，该函数不需要指定具体的path，更像是like一样的模糊查询。如果查询的str存在，则返回具体的path,如果不存在则返回null。
