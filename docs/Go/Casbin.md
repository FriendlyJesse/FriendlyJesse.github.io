# Casbin
Casbin是一个强大且高效的开源访问控制库，支持各种[访问控制模型](https://en.wikipedia.org/wiki/Access_control#Access_control_models)，用于在全局范围内执行授权。
## Casbin 是怎么运作的？
在Casbin中，访问控制模型被抽象为基于**PERM元模型（策略，效果，请求，匹配器）**的CONF文件。
### Request
定义请求参数。至少需要一个**主体、被访问资源、和动作**。例如，请求定义可能看起来像这样：
`r={sub(主体),obj(资源),act(动作)}`
```nginx
sub, obj, act
alice, data1, read
```
### Policy
定义访问策略的模型。 它指定了策略规则文档中字段的名称和顺序。
例如：`p={sub, obj, act}` 或 `p={sub, obj, act, eft}`
### Matcher
定义请求和策略的匹配规则。
例如：`m = r.sub == p.sub && r.act == p.act && r.obj == p.obj` 这个简单而常见的匹配规则意味着，如果请求的参数（实体，资源和方法）等于策略中找到的那些，那么返回策略结果（p.eft）。 策略的结果将保存在p.eft中。
### Effect
对匹配器的匹配结果进行逻辑组合判断。
例如：`e = some(where(p.eft == allow))`这个语句意味着，如果匹配策略结果p.eft有（一些）允许的结果，那么最终结果为真。
让我们看另一个例子：
`e = some(where (p.eft == allow)) && !some(where (p.eft == deny))`
这个例子组合的逻辑意义是：如果有一个策略匹配到允许的结果，并且没有策略匹配到拒绝的结果，结果为真。 换句话说，当多条相同的 policy 存在时，其中一个是 deny，那么为 false。
### 例子
Casbin中最基本和最简单的模型是ACL。 **ACL的模型CONF如下：**
```nginx
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```
**policy：**
```nginx
p, alice, data1, read
p, bob, data2, write
```
**request：**
```nginx
alice, data1, read ## true
bob, data2, write ## true
```
这意味着：

- alice可以读取data1
- bob可以写入data2
## 集成到 Go
```go
e, _ := casbin.NewEnforcer("./model.conf", "./policy.csv")

// 添加 policy
e.AddPolicy("alice", "data1", "read")

// 测试 request
sub := "alice" // the user that wants to access a resource.
obj := "data1" // the resource that is going to be accessed.
act := "read"  // the operation that the user performs on the resource.
ok, err := e.Enforce(sub, obj, act)

if err != nil {
    fmt.Println("err: ", err)
    // handle err
}

if ok {
    // permit alice to read data1
    fmt.Println("通过")
} else {
    // deny the request, show an error
    fmt.Println("未通过")
}
```
### 用数据库存储 policy
如果我们用 csv 文件存储是极为不便的，Casbin 为我们提供了相应的 api，让我们能够存储到数据库中。
**你的策略文件**
```nginx
p, data2_admin, data2, read
p, data2_admin, data2, write
g, alice, admin
```
**对应的数据库结构（如MySQL）**

| id | ptype | v0 | v1 | v2 | v3 | v4 | v5 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | p | data2_admin | data2 | read |  |  |  |
| 2 | p | data2_admin | data2 | write |  |  |  |
| 3 | g | alice | admin |  |  |  |  |

**每列的含义**

- id：数据库中的主键。 它并不存在于casbin策略的一部分。 它的生成方式取决于具体的适配器。
- ptype：它对应于p，g，g2等。
- v0-v5：列名没有具体的含义，对应于策略csv中从左到右的值。 列的数量取决于你自己定义的数量。 理论上，可以有无限多的列，但适配器中通常只实现了**6**列。 如果这对你来说还不够，请向相应的适配器仓库提交问题。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1712647141545-db9eb1ef-d3db-4fe8-8c61-3edc5a2e581f.png#averageHue=%23fdfbfa&clientId=u4105e909-55df-4&from=paste&height=519&id=u5b6750cf&originHeight=1037&originWidth=1627&originalType=binary&ratio=2&rotation=0&showTitle=false&size=50045&status=done&style=none&taskId=u6d15929e-b837-4eae-95c8-f3e70e43e2d&title=&width=813.5)
`alice, data1_admin`用于匹配：`g(r.sub, p.sub)`
**例子：**
```go
a, _ := gormadapter.NewAdapter("mysql", "root:123456@tcp(127.0.0.1:3306)/test", true) // Your driver and data source.
e, _ := casbin.NewEnforcer("./model.conf", a)

// 加载策略
e.LoadPolicy()

// 添加策略，自动在数据库中添加
// e.AddPolicy("alice", "data2", "read")
// 根据指定的 index(策略的 v0, v1...) 获取它所有策略
// filterdPolicy := e.GetFilteredPolicy(0, "alice")
// fmt.Println("policy：", filterdPolicy)
// 修改策略
// e.UpdatePolicy([]string{"alice", "data2", "read"}, []string{"alice", "data666", "read"})

// 获取用户拥有的角色
roles, _ := e.GetRolesForUser("alice")
fmt.Println("roles: ", roles) // [data1_admin]

// 获取用户拥有的隐式权限（也就是根据角色来的权限、和自身的权限）
permission, _ := e.GetImplicitPermissionsForUser("alice")
fmt.Println("permission: ", permission) // [[data1_admin data1 read] [data1_admin data666 read]]

// 添加策略组
e.AddGroupingPolicy("alice", "data1_admin")

// 测试 request
sub := "alice" // the user that wants to access a resource.
obj := "data1" // the resource that is going to be accessed.
act := "read"  // the operation that the user performs on the resource.
ok, err := e.Enforce(sub, obj, act)

if err != nil {
  fmt.Println("err: ", err)
}

if ok {
  fmt.Println("通过")
} else {
  fmt.Println("未通过")
}
```
### 自定义函数
[Functions | Casbin](https://casbin.org/zh/docs/function)
**config.conf：**
```nginx
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
## m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
m = g(r.sub, p.sub) && my_func(r.obj, p.obj) && r.act == p.act
```
**自定义函数：**
```go
func KeyMatch(r string, p string) bool {
  return r == p
}

func KeyMatchFunc(args ...interface{}) (interface{}, error) {
  name1 := args[0].(string)
  name2 := args[1].(string)
  return (bool)(KeyMatch(name1, name2)), nil
}

e.AddFunction("my_func", KeyMatchFunc)
```
我们可以看到两者的效果是一致的
