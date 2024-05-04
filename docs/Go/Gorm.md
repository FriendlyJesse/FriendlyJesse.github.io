# Gorm
## 连接数据库
### pgsql 连接
_pgsql.go_
```go
package pgsql

import (
  "fmt"
  "log"

  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

var (
  host     = "localhost"
  user     = "postgres"
  password = 123456
  dbname   = "gorm"
  port     = 5432
  sslmode  = "disable"
  TimeZone = "Asia/Shanghai"
)

var DB *gorm.DB

func InitDB() {
  dsn := fmt.Sprintf("host=%s user=%s password=%d dbname=%s port=%d sslmode=%s TimeZone=%s", host, user, password, dbname, port, sslmode, TimeZone)
  database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
  if err != nil {
    log.Println("DB connect error:", err)
  }
  DB = database
}

```
_main.go_
```go
package main

import (
  pgsql "example.com/m/v2/db"
  "example.com/m/v2/models"
)

func main() {
  pgsql.InitDB()
  pgsql.DB.AutoMigrate(&models.Student{})
}

```
### 显示日志
gorm的默认日志是只打印错误和慢SQL，我们可以自己设置日志
```go
var mysqlLogger = logger.Default.LogMode(logger.Info)

database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
  Logger: mysqlLogger,
})
```
这样就可以显示出详细的日志了。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710219128998-973126da-c136-41ff-9f48-ee220135b982.png#averageHue=%23283140&clientId=ud13f2c69-a038-4&from=paste&height=246&id=ub81dd195&originHeight=491&originWidth=2431&originalType=binary&ratio=2&rotation=0&showTitle=false&size=179821&status=done&style=none&taskId=uf5c263a3-5d27-40a4-9e49-4d3130aa0c8&title=&width=1215.5)
**部分展示日志：**
```go
var model Student
session := DB.Session(&gorm.Session{Logger: newLogger})
session.First(&model)
// SELECT * FROM `students` ORDER BY `students`.`name` LIMIT 1
```
**如果只想某些语句显示日志：**
```go
pgsql.DB.Debug().Create(&s1)
// or
pgsql.DB.Debug().AutoMigrate(&models.Student{})
```
## 模型
模型是标准的 struct，由 Go 的基本数据类型、实现了 Scanner 和 Valuer 接口的自定义类型及其指针或别名组成
```go
type Student struct {
  ID    uint // 默认使用ID作为主键
  Name  string
  Email *string // 使用指针是为了存空值
}
```
### gorm.Model
GORM 提供了一个预定义结构体，方便我们使用：
```go
// gorm.Model 的定义
type Model struct {
  ID        uint           `gorm:"primaryKey"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt gorm.DeletedAt `gorm:"index"`
}
// 使用
type Student struct {
  gorm.Model
  Name string
}
```
### 自动生成表字段
```go
// 可以放多个
DB.AutoMigrate(&Student{})
```
AutoMigrate 的逻辑是只新增，不删除，不修改（大小会修改）
例如将Name修改为Name1，进行迁移，会多出一个name1的字段
### Gorm tag
type 定义字段类型
size 定义字段大小
column 自定义列名
primaryKey 将列定义为主键
unique 将列定义为唯一键
default 定义列的默认值
not null 不可为空
embedded 嵌套字段
embeddedPrefix 嵌套字段前缀
comment 注释
```go
type StudentInfo struct {
  Email  *string `gorm:"size:32"` // 使用指针是为了存空值
  Addr   string  `gorm:"column:y_addr;size:16"`
  Gender bool    `gorm:"default:true"`
}
type Student struct {
  Name string      `gorm:"type:varchar(12);not null;comment:用户名"`
  UUID string      `gorm:"primaryKey;unique;comment:主键"`
  Info StudentInfo `gorm:"embedded;embeddedPrefix:s_"`
}
```
## Create
```go
email := "123@qq.com"
s1 := models.Student{
  Name:   "清清",
  Age:    26,
  Gender: true,
  Email:  &email,
}
err := pgsql.DB.Debug().Create(&s1).Error
if err != nil {
  log.Println(err)
}
log.Println(s1) // {6 清清 26 0xc000116370 true}
```
tips:

1. 指针类型是为了更好的存null类型，但是传值的时候，也记得传指针
2. Create接收的是一个指针，而不是值，由于我们传递的是一个指针，调用完Create之后，student这个对象上面就有该记录的信息了，如创建的id
### 批量插入
```go
email := "htt123@qq.com"
studentList := []models.Student{}
for i := 0; i < 10; i++ {
  studentList = append(studentList, models.Student{
    Name:   "清清",
    Age:    uint(26 + i),
    Gender: true,
    Email:  &email,
  })
}
err := pgsql.DB.Debug().Create(&studentList).Error
if err != nil {
  log.Println("err: ", err)
}
```
### 根据 map 创建
GORM支持通过 `map[string]interface{}` 与 `[]map[string]interface{}{}`来创建记录。
```go
db.Model(&User{}).Create(map[string]interface{}{
  "Name": "jinzhu", "Age": 18,
})

// batch insert from `[]map[string]interface{}{}`
db.Model(&User{}).Create([]map[string]interface{}{
  {"Name": "jinzhu_1", "Age": 18},
  {"Name": "jinzhu_2", "Age": 20},
})
```
> 注意，当使用map来创建时，钩子方法不会执行，关联不会被保存且不会回写主键。

## Read
### 查询单条记录
> 在查询单条记录时不会调用`MarshalJSON`、`UnMarshalJSON`

```go
var student models.Student
pgsql.DB.Take(&student)
pgsql.DB.First(&student)
pgsql.DB.Last(&student)
```
**根据主键查询：**
```go
pgsql.DB.Debug().Take(&student, 5)
```
Take的第二个参数，默认会根据主键查询，可以是字符串，可以是数字。
**根据其他条件查询：**
```go
DB.Take(&student, "name = ?", "机器人27号")
```
**根据 struct 查询：**
```go
var student models.Student
// 只能有一个主要值
student.ID = 7
//student.Name = "清清"
pgsql.DB.Debug().Take(&student)
```
#### 查询结果
**查询数量：**
```go
count := pgsql.DB.Debug().Take(&student).RowsAffected
```
**查询错误：**
```go
var student Student
err := DB.Take(&student, "xx").Error
switch err {
case gorm.ErrRecordNotFound:
  fmt.Println("没有找到")
default:
  fmt.Println("sql错误")
}
```
### 查询多条记录
```go
var studentList []models.Student
count := pgsql.DB.Find(&studentList).RowsAffected
log.Println(studentList, count)
```
#### 根据主键列表查询
```go
var studentList []Student
DB.Find(&studentList, []int{1, 3, 5, 7})
DB.Find(&studentList, 1, 3, 5, 7)  // 一样的
fmt.Println(studentList)
```
#### 根据其他条件查询
```go
DB.Find(&studentList, "name in ?", []string{"清清", "清清2"})
```
### 条件查询
```go
var student = models.Student{} // 如果查询多条，则将其换成数组
// 相等
db.Where("name = ?", "清清").Find(&student)

// 全等
db.Where("name <> ?", "清清").Find(&users)

// IN
db.Where("name IN ?", []string{"清清", "清清2"}).Find(&users)

// LIKE
db.Where("name LIKE ?", "%清清%").Find(&users)

// AND
db.Where("name = ? AND age >= ?", "清清", 22).Find(&users)
db.Where("name", "清清").Where("age", 22).Find(&users)

// OR
db.Where("name = ? OR age = ?", "清清", 22).Find(&users)
db.Where("name = ?", "清清").OR("age = ?", 22).Find(&users)

// Time
db.Where("updated_at > ?", lastWeek).Find(&users)

// BETWEEN
db.Where("created_at BETWEEN ? AND ?", lastWeek, today).Find(&users)
```
#### struct 和 map 条件
```go
// Struct
db.Where(&User{Name: "jinzhu", Age: 20}).First(&user)
// SELECT * FROM users WHERE name = "jinzhu" AND age = 20 ORDER BY id LIMIT 1;

// Map
db.Where(map[string]interface{}{"name": "jinzhu", "age": 20}).Find(&users)
// SELECT * FROM users WHERE name = "jinzhu" AND age = 20;

// Slice of primary keys
db.Where([]int64{20, 21, 22}).Find(&users)
// SELECT * FROM users WHERE id IN (20, 21, 22);
```
tips: 零值不会参与 struct 的条件查询。
**指定结构体查询字段：**
```go
db.Where(&User{Name: "jinzhu"}, "name", "Age").Find(&users)
// SELECT * FROM users WHERE name = "jinzhu" AND age = 0;

db.Where(&User{Name: "jinzhu"}, "Age").Find(&users)
// SELECT * FROM users WHERE age = 0;
```
#### 选择需要查询的字段
```go
db.Select("name", "age").Find(&users)
// SELECT name, age FROM users;

db.Select([]string{"name", "age"}).Find(&users)
// SELECT name, age FROM users;

db.Table("users").Select("COALESCE(age,?)", 42).Rows()
// SELECT COALESCE(age,'42') FROM users;
```
### 排序
```go
DB.Order("age desc").Find(&users)
```
### 分页查询
```go
var users []Student
limit := 10 // size
page := 1 // page
offset := (page - 1) * limit
DB.Limit(limit).Offset(offset).Find(&users)
```
### 去重
```go
var ageList []int
DB.Table("students").Select("age").Distinct("age").Scan(&ageList)
```
### 分组查询
```go
type Group struct {
    Gender   bool
    NameList string
    Count    int
    Age      int
}
var GroupList []Group
DB.Model(models.Student{}).Select("ARRAY_AGG(name) as name_list", "COUNT(*)", "gender").Group("gender").Scan(&GroupList)
// 对于 mysql 则使用 GROUP_CONCAT 替代 ARRAY_AGG
log.Println(GroupList)
```
tips：使用统计函数后，需要使用别名，否则可能出错。
### 子查询
使用上次查询的结果作为这次查询的参数，这就是子查询。
```go
var studentList []models.Student
DB.Model(&models.Student{}).Where("avg > (?)", DB.Model(&models.Student{}).Select("AVG(age)")).Find(&studentList)
```
### Scope
GORM中的 Scopes 是一个强大的特性，它允许您将常用的查询条件定义为可重用的方法。 这些作用域可以很容易地在查询中引用，从而使代码更加模块化和可读。
**定义 scope：**
```go
// 用于筛选 amount > 1000 的记录的 Scope
func AmountGreaterThan1000(db *gorm.DB) *gorm.DB {
  return db.Where("amount > ?", 1000)
}

//  用于按状态筛选订单的 Scope
func OrderStatus(status []string) func(db *gorm.DB) *gorm.DB {
  return func(db *gorm.DB) *gorm.DB {
    return db.Where("status IN (?)", status)
  }
}
```
**使用 scope：**
```go
// 使用 scopes 来寻找所有的 金额大于1000的信用卡订单
db.Scopes(AmountGreaterThan1000, PaidWithCreditCard).Find(&orders)

//使用 scopes 来寻找所有的 具有特定状态且金额大于1000的订单
db.Scopes(AmountGreaterThan1000, OrderStatus([]string{"paid", "shipped"})).Find(&orders)
```
我们通常会把它定义在 model 层，便于我们使用。
## Update
### 保存所有字段
```go
var student models.Student
pgsql.DB.Take(&student, 4)
student.Name = "清清2"
pgsql.DB.Save(student)
```
### 更新单个列
当使用 Update 更新单列时，需要有一些条件，否则将会引起ErrMissingWhereClause 错误，查看 [阻止全局更新](https://gorm.io/zh_CN/docs/update.html#block_global_updates) 了解详情。 当使用 Model 方法，并且它有主键值时，主键将会被用于构建条件，例如：
```go
// 根据条件更新
var student models.Student
pgsql.DB.Model(&student).Where("id = ?", 4).Update("age", 16)

// 根据 model 的值来更新
var student = models.Student{
  ID: 4,
}
pgsql.DB.Model(&student).Update("age", 18)

// 根据条件和 model 的值进行更新
var student = models.Student{
  ID: 4,
}
pgsql.DB.Model(&student).Where("name = ?", "清清3").Update("age", 19)
```
### 更新多列
```go
// 根据 `struct` 更新属性，只会更新非零值的字段
var student = models.Student{
  ID: 4,
}
pgsql.DB.Model(&student).Updates(models.Student{Name: "清清", Age: 20})

// 根据 `map` 更新属性
var student = models.Student{
  ID: 4,
}
pgsql.DB.Model(&student).Updates(map[string]interface{}{"name": "hello", "age": 18})
```
### 更新指定字段
```go
// 选择 Map 的字段
// User 的 ID 是 `111`:
db.Model(&user).Select("name").Updates(map[string]interface{}{"name": "hello", "age": 18, "active": false})
// UPDATE users SET name='hello' WHERE id=111;

db.Model(&user).Omit("name").Updates(map[string]interface{}{"name": "hello", "age": 18, "active": false})
// UPDATE users SET age=18, active=false, updated_at='2013-11-17 21:34:10' WHERE id=111;

// 选择 Struct 的字段（会选中零值的字段）
db.Model(&user).Select("Name", "Age").Updates(User{Name: "new_name", Age: 0})
// UPDATE users SET name='new_name', age=0 WHERE id=111;

// 选择所有字段（选择包括零值字段的所有字段）
db.Model(&user).Select("*").Updates(User{Name: "jinzhu", Role: "admin", Age: 0})

// 选择除 Role 外的所有字段（包括零值字段的所有字段）
db.Model(&user).Select("*").Omit("Role").Updates(User{Name: "jinzhu", Role: "admin", Age: 0})
```
## Delete
**删除单条记录：**
```go
// 根据结构体删除
db.Delete(&email)

// 带额外条件的删除
db.Where("name = ?", "jinzhu").Delete(&email)
```
**根据主键删除：**
```go
db.Delete(&User{}, 10)
// DELETE FROM users WHERE id = 10;

db.Delete(&User{}, "10")
// DELETE FROM users WHERE id = 10;

db.Delete(&users, []int{1,2,3})
// DELETE FROM users WHERE id IN (1,2,3);
```
### 批量删除
如果指定的值不包括主属性，那么 GORM 会执行批量删除，它将删除所有匹配的记录。
```go
db.Where("email LIKE ?", "%jinzhu%").Delete(&Email{})
// DELETE from emails where email LIKE "%jinzhu%";

db.Delete(&Email{}, "email LIKE ?", "%jinzhu%")
// DELETE from emails where email LIKE "%jinzhu%";
```
可以将一个主键切片传递给Delete 方法，以便更高效的删除数据量大的记录
```go
var users = []User{{ID: 1}, {ID: 2}, {ID: 3}}
db.Delete(&users)
// DELETE FROM users WHERE id IN (1,2,3);

db.Delete(&users, "name LIKE ?", "%jinzhu%")
// DELETE FROM users WHERE name LIKE "%jinzhu%" AND id IN (1,2,3); 
```
### 软删除
如果你的模型包含了 gorm.DeletedAt字段（该字段也被包含在gorm.Model中），那么该模型将会自动获得软删除的能力！
当调用Delete时，GORM并不会从数据库中删除该记录，而是将该记录的DeleteAt设置为当前时间，而后的一般查询方法将无法查找到此条记录。
如果你并不想嵌套gorm.Model，你也可以像下方例子那样开启软删除特性：
```go
type User struct {
  ID      int
  Deleted gorm.DeletedAt
  Name    string
}
```
**查找被软删除的记录：**
```go
db.Unscoped().Where("age = 20").Find(&users)
```
**永久删除：**
```go
db.Unscoped().Delete(&order)
```
### 阻止全局删除
当你试图执行不带任何条件的批量删除时，GORM将不会运行并返回ErrMissingWhereClause 错误
如果一定要这么做，你必须添加一些条件，或者使用原生SQL，或者开启AllowGlobalUpdate 模式，如下例：
```go
db.Delete(&User{}).Error // gorm.ErrMissingWhereClause

db.Delete(&[]User{{Name: "jinzhu1"}, {Name: "jinzhu2"}}).Error // gorm.ErrMissingWhereClause

db.Where("1 = 1").Delete(&User{})
// DELETE FROM `users` WHERE 1=1

db.Exec("DELETE FROM users")
// DELETE FROM users

db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&User{})
// DELETE FROM users
```
### 返回删除行的数据
返回被删除的数据，仅当数据库支持回写功能时才能正常运行，如下例：
```go
// 回写所有的列
var users []User
DB.Clauses(clause.Returning{}).Where("role = ?", "admin").Delete(&users)
// DELETE FROM `users` WHERE role = "admin" RETURNING *
// users => []User{{ID: 1, Name: "jinzhu", Role: "admin", Salary: 100}, {ID: 2, Name: "jinzhu.2", Role: "admin", Salary: 1000}}

// 回写指定的列
DB.Clauses(clause.Returning{Columns: []clause.Column{{Name: "name"}, {Name: "salary"}}}).Where("role = ?", "admin").Delete(&users)
// DELETE FROM `users` WHERE role = "admin" RETURNING `name`, `salary`
// users => []User{{ID: 0, Name: "jinzhu", Role: "", Salary: 100}, {ID: 0, Name: "jinzhu.2", Role: "", Salary: 1000}}
```
### 删除标志
如需更改删除标志，查看以下内容：
[删除](https://gorm.io/zh_CN/docs/delete.html#%E5%88%A0%E9%99%A4%E6%A0%87%E5%BF%97)
## Raw
```go
type Result struct {
  ID   int
  Name string
  Age  int
}

var result Result
db.Raw("SELECT id, name, age FROM users WHERE id = ?", 3).Scan(&result)

db.Raw("SELECT id, name, age FROM users WHERE name = ?", "jinzhu").Scan(&result)

var age int
db.Raw("SELECT SUM(age) FROM users WHERE role = ?", "admin").Scan(&age)

var users []User
db.Raw("UPDATE users SET name = ? WHERE age = ? RETURNING id, name", "jinzhu", 20).Scan(&users)

```
[SQL 构建器](https://gorm.io/zh_CN/docs/sql_builder.html)
## Hooks
Hook 是在创建、查询、更新、删除等操作之前、之后调用的函数。
如果您已经为模型定义了指定的方法，它会在创建、更新、查询、删除时自动被调用。如果任何回调返回错误，GORM 将停止后续的操作并回滚事务。
[Hook](https://gorm.io/zh_CN/docs/hooks.html)
## 关联
### 一对多关联
#### Belongs To（属于谁）
如下示例中，建立 Article 属于 User 的关系。
```go
package models

import "gorm.io/gorm"

type User struct {
  gorm.Model
  Name  string
  Email string
  Articles []Article
}

type Article struct {
  gorm.Model
  Title  string `gorm:"size:16"`
  UserID int
  User   User
}

DB.Debug().AutoMigrate(&models.User{}, &models.Article{})
```
**重写外键名：**
要定义一个 belongs to 关系，数据库的表中必须存在外键。默认情况下，外键的名字，使用拥有者的类型名称加上表的主键的字段名字：`user_id`，我们可以自定义外键名：
```go
type User struct {
  gorm.Model
  Name     string
  Email    string
  Articles []Article `gorm:"foreignKey:UserRefer"`
}

type Article struct {
  gorm.Model
  Title     string `gorm:"size:16"`
  UserRefer int
  User      User `gorm:"foreignKey:UserRefer"`
}
```
可以看到，我们自定义了字段名，如下：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710329977530-d286f54b-9a15-46b3-a6f0-839f88b33700.png#averageHue=%23f2f1f0&clientId=u1c5aeb50-51a7-4&from=paste&height=111&id=uff09b305&originHeight=222&originWidth=1615&originalType=binary&ratio=2&rotation=0&showTitle=false&size=25901&status=done&style=none&taskId=u53220366-3a52-4d42-9eb9-65328f4b209&title=&width=807.5)
### 一对一关联
一对一关系比较少，一般用于表的扩展。例如一张用户表，有很多字段，那么就可以把它拆分为两张表，常用的字段放主表，不常用的字段放详情表。
```go
type User struct {
  ID       uint
  Name     string
  Age      int
  Gender   bool
  UserInfo UserInfo // 通过UserInfo可以拿到用户详情信息
}

type UserInfo struct {
  User *User  // 要改成指针，不然就嵌套引用了
  UserID uint // 外键
  ID     uint
  Addr   string
  Like   string
}
```
可以看到与一对多的区别就是嵌入的模型不是数组。
### 多对多
多对多用第三张表存储两张表的关系
```go
type Tag struct {
  ID       uint
  Name     string
  Articles []Article `gorm:"many2many:article_tags;"` // 用于反向引用
}

type Article struct {
  ID    uint
  Title string
  Tags  []Tag `gorm:"many2many:article_tags;"`
}
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710346096997-ae2056d8-01f8-4c25-8862-7b97fc64d272.png#averageHue=%23f1f0ef&clientId=u082ca68f-31b9-4&from=paste&height=118&id=u3f373191&originHeight=236&originWidth=1582&originalType=binary&ratio=2&rotation=0&showTitle=false&size=29564&status=done&style=none&taskId=u1097545c-47e9-46e8-a65e-43052e133ea&title=&width=791)
**创建多对多关联：**
```go
DB.Create(&models.Article{
  Title:  "养猪技巧2",
  UserID: 2,
  Tags: []models.Tag{
    {Name: "养猪"},
    {Name: "养鸡"},
  },
})
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710346288010-487fb25f-9b85-4116-91af-49b55f18305b.png#averageHue=%23e0e0ab&clientId=u082ca68f-31b9-4&from=paste&height=66&id=u6a5e7c65&originHeight=132&originWidth=311&originalType=binary&ratio=2&rotation=0&showTitle=false&size=4244&status=done&style=none&taskId=u82281c3c-fca0-4040-bd1f-a49c7caf703&title=&width=155.5)
**查询多对多关联：**
```go
var article models.Article
DB.Debug().Preload("Tags").Preload("User").Take(&article, 9)
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710346483894-d6c55e55-610a-4cef-bc81-aaee7d1b67c3.png#averageHue=%23252a31&clientId=u082ca68f-31b9-4&from=paste&height=305&id=u8cba85eb&originHeight=609&originWidth=555&originalType=binary&ratio=2&rotation=0&showTitle=false&size=78284&status=done&style=none&taskId=u39dbcdcc-d3fc-4115-ab7b-d25ab031322&title=&width=277.5)
可以看到查询和使用与一对多并没有太大的区别，在此作回忆用。
**多对多的更新：**
```go
// 移除文章的标签
var article Article
DB.Preload("Tags").Take(&article, 1)
DB.Model(&article).Association("Tags").Delete(article.Tags)

// 更新文章的标签
var article Article
var tags []Tag
DB.Find(&tags, []int{2, 6, 7})
DB.Preload("Tags").Take(&article, 2)
DB.Model(&article).Association("Tags").Replace(tags)
```
## 关联 CRUD
### 创建时关联
```go
// 创建文章并关联已有用户
DB.Create(&models.Article{
  Title:  "PHP",
  UserID: 1, // 将用户的 id 填入即可
})
// or
var user models.User
DB.Take(&user, 2)
DB.Create(&models.Article{
  Title: "养猪技巧",
  User:  user,
})

// 创建用户、文章并关联
DB.Create(&models.User{
  Name:  "清清",
  Email: "123@qq.com",
  Articles: []models.Article{
    {
      Title: "Go",
    },
    {
      Title: "JS",
    },
  },
})

// 创建文章与用户并关联
DB.Create(&models.Article{
  Title: "JAVA",
  User: models.User{
    Name:  "清清2",
    Email: "456@qq.com",
  },
})
```
### 给已有数据关联（添加或修改关联）
```go
// 给现有用户绑定文章
var user User
DB.Take(&user, 2)

var article Article
DB.Take(&article, 5)

// 使用 save 方法关联
user.Articles = []Article{article}
DB.Save(&user)
// 使用 association 关联，与以上方法等价
DB.Model(&user).Association("Articles").Append(&article)

// 给现有文章关联用户
var article Article
DB.Take(&article, 5)

// save
article.UserID = 2
DB.Save(&article)
// or
DB.Model(&article).Association("User").Append(&user)
```
### 删除
#### 级联删除
删除用户，与用户关联的文章也会删除
```go

var user models.User
DB.Take(&user, 1)
DB.Select("Articles").Delete(&user)
```
#### 删除外键
与将与用户关联的文章，外键设置为null
```go
var user User
DB.Preload("Articles").Take(&user, 2)
DB.Model(&user).Association("Articles").Delete(&user.Articles) // 删除外键关系
DB.Delete(&user) // 删除用户
```
### 预加载（关联查询）
对于关联查询，我们需要使用 Preload 加载对应表。
```go
// 根据用户查文章
var user models.User
DB.Preload("Articles").Take(&user)

// 根据文章查用户
var article models.Article
DB.Preload("User").Take(&article)
```
#### 带条件的预加载
```go
var article models.Article
DB.Preload("User", "name = ?", "清清").Take(&article)
```
可以通过条件来过滤预加载的内容。
#### 自定义预加载
```go
var user User
DB.Preload("Articles", func(db *gorm.DB) *gorm.DB {
    return db.Where("id in ?", []int{1, 2})
}).Take(&user, 1)
```
#### 嵌套预加载
查询出的数据：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710334180744-6dfaee70-0356-4802-bc9f-8484784728a8.png#averageHue=%23262a31&clientId=u1c5aeb50-51a7-4&from=paste&height=302&id=u8b4d3d1b&originHeight=603&originWidth=597&originalType=binary&ratio=2&rotation=0&showTitle=false&size=81555&status=done&style=none&taskId=u222a9f54-4f4b-4551-86ec-37f326c16d9&title=&width=298.5)
这里可以看到我们查出的 `Articles`中没有包含用户的数据我们可以这样来操作：
```go
var article models.Article
DB.Preload("User.Articles").Take(&article)
log.Println(article)
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710334729830-de5729b4-d97b-4990-bc35-e0d8ce81cf7e.png#averageHue=%23252930&clientId=u1c5aeb50-51a7-4&from=paste&height=288&id=u17214c64&originHeight=575&originWidth=564&originalType=binary&ratio=2&rotation=0&showTitle=false&size=67406&status=done&style=none&taskId=u0b965e83-7370-4327-8765-88a1959bb24&title=&width=282)
可以看到，它再次嵌套了数据，甚至可以无限嵌套下去...。
