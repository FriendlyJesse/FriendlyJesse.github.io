---
order: 5
---

# Standard library
## Strconv
### Itoa()
Itoa()函数用于将int类型数据转换为对应的字符串表示
```go
i2 := 200
s2 := strconv.Itoa(i2)
fmt.Printf("type:%T value:%#v\n", s2, s2) //type:string value:"200"
```
### Parse 系列函数
Parse类函数用于转换字符串为给定类型的值：ParseBool()、ParseFloat()、ParseInt()、ParseUint()。
#### ParseBool()：
```go
func ParseBool(str string) (value bool, err error)
// example
b, err := strconv.ParseBool("true")
```
返回字符串表示的bool值。它接受1、0、t、f、T、F、true、false、True、False、TRUE、FALSE；否则返回错误。
#### ParseInt()：
```go
func ParseInt(s string, base int, bitSize int) (i int64, err error)

// example
i, err := strconv.ParseInt("-2", 10, 64)
```
返回字符串表示的整数值，接受正负号。

- `base`：指定进制（2到36），如果base为0，则会从字符串前置判断，”0x”是16进制，”0”是8进制，否则是10进制；
- `bitSize`：指定结果必须能无溢出赋值的整数类型，0、8、16、32、64 分别代表 int、int8、int16、int32、int64；
- 返回的err是*NumErr类型的，如果语法有误，err.Error = ErrSyntax；如果结果超出类型范围err.Error = ErrRange。
#### ParseUnit()
```go
func ParseUint(s string, base int, bitSize int) (n uint64, err error)
// example
u, err := strconv.ParseUint("2", 10, 64)
```
ParseUint类似ParseInt但不接受正负号，用于无符号整型。
#### ParseFloat()
```go
func ParseFloat(s string, bitSize int) (f float64, err error)
// example
f, err := strconv.ParseFloat("3.1415", 64)
```
解析一个表示浮点数的字符串并返回其值。
如果s合乎语法规则，函数会返回最为接近s表示值的一个浮点数（使用IEEE754规范舍入）。
bitSize指定了期望的接收类型，32是float32（返回值可以不改变精确值的赋值给float32），64是float64；
返回值err是*NumErr类型的，语法有误的，err.Error=ErrSyntax；结果超出表示范围的，返回值f为±Inf，err.Error= ErrRange。
### Format 系列函数
Format系列函数实现了将给定类型数据格式化为string类型数据的功能。
#### FormatBool()
```go
func FormatBool(b bool) string
```
根据b的值返回”true”或”false”。
#### FormatInt()
```go
func FormatInt(i int64, base int) string
```
返回i的base进制的字符串表示。base 必须在2到36之间，结果中会使用小写字母’a’到’z’表示大于10的数字。
#### FormatUint()
```go
func FormatUint(i uint64, base int) string
```
是FormatInt的无符号整数版本。
#### FormatFloat()
```go
func FormatFloat(f float64, fmt byte, prec, bitSize int) string
```
函数将浮点数表示为字符串并返回。
bitSize表示f的来源类型（32：float32、64：float64），会据此进行舍入。
fmt表示格式：’f’（-ddd.dddd）、’b’（-ddddp±ddd，指数为二进制）、’e’（-d.dddde±dd，十进制指数）、’E’（-d.ddddE±dd，十进制指数）、’g’（指数很大时用’e’格式，否则’f’格式）、’G’（指数很大时用’E’格式，否则’f’格式）。
prec控制精度（排除指数部分）：对’f’、’e’、’E’，它表示小数点后的数字个数；对’g’、’G’，它控制总的数字个数。如果prec 为-1，则代表使用最少数量的、但又必需的数字来表示f。
### Other
```go
func IsPrint(r rune) bool
```
返回一个字符是否是可打印的，和unicode.IsPrint一样，r必须是：字母（广义）、数字、标点、符号、ASCII空格。
```go
func CanBackquote(s string) bool
```
返回字符串s是否可以不被修改的表示为一个单行的、没有空格和tab之外控制字符的反引号字符串。
## 时间处理
日期和时间是编程语言中常用的功能之一，如果没有日期和时间，就会导致许多功能无法实现，比如日志记录、定时任务、等待延时等。内置包time为我们提供了操作日期和时间的函数方法。不同地区的时间会存在时间差，如泰国比北京时间晚了1小时，UTC(Universal Time Coordinated）是公认的世界协调时间，以 GMT(Greenwich Mean Time，格林尼治时间）时区的时间为主，根据GMT时间与时区之间的时间差就能计算当前时区的本地时间，如UTC+8小时=北京时间。
一般默认以操作系统的当前时间为基准，如果对时间没有太大要求，使用操作系统的当前时间即可。
在Go语言中，日期与时间可以分为3种表示方式：时间戳、结构体Time和字符串格式化，三者之间的数据类型能相互转换。
时间戳是指格林尼治时间1970年1月1日00时00分00秒，即北京时间1970年1月1日08时00分00秒至现在的总秒数。内置包提供`Unix()`和`UnixNano()`生成秒级和纳秒级的时间戳。
```go
var now = time.Now()
var t1 = now.Unix()                 // 秒
var t2 = now.UnixMilli()            // 毫秒
var t3 = now.UnixMicro()            // 微秒
var t4 = now.UnixNano()             // 纳秒
fmt.Printf("秒：%v，类型：%T\n", t1, t1)  // 秒：1712072923，类型：int64
fmt.Printf("毫秒：%v，类型：%T\n", t2, t2) // 毫秒：1712072923639，类型：int64
fmt.Printf("微秒：%v，类型：%T\n", t3, t3) // 微秒：1712072923639299，类型：int64
fmt.Printf("纳秒：%v，类型：%T\n", t4, t4) // 纳秒：1712072923639299901，类型：int64
```
### 结构体Time
```go
// 荻取当前时间
now := time.Now()
fmt.Printf("当前时间：%v\n", now)
//获取当前时间的年
year := now.Year()
fmt.Printf("获取当前时间的年：%v\n", year)
//获取当前时间的月
month := now.Month()
fmt.Printf("获取当前时间的月,英文格式：%v\n", month)
fmt.Printf("获取当前时间的月,数字格式：%v\n", int(month))
//获取当前时间的日
day := now.Day()
fmt.Printf("获取当前时间的日：%v\n", day)
// 获取当前时间的小时
hour := now.Hour()
fmt.Printf("获取当前时间的小时：%v\n", hour)
// 获取当前时间的分钟
minute := now.Minute()
fmt.Printf("获取当前时间的分钟：%v\n", minute)
// 获取当前时间的秒
second := now.Second()
fmt.Printf("获取当前时间的秒：%v\n", second)
// 获取当天是星期几
wk := now.Weekday()
fmt.Printf("获取当天是星期儿：%v\n", wk)
```

- 使用内置包 time 调用工厂函数 now，根据当前时间创建结构体 Time 对象。
- 由结构体对象调用结构体方法。
### 字符串格式化
```go
// 荻取当前时间
now := time.Now()
//24小时制
t1 := now.Format("2006-01-02 15:04:05.000 Mon Jan")
fmt.Printf("24小时制：%v\n", t1)
// 12小时制
t2 := now.Format("2006-01-02 03:04:05.000 PM Mon Jan")
fmt.Printf("12小时制：%v\n", t2)
// 时间显示格式为：年/月/日 时:分
t3 := now.Format("2006/01/02 15:04")
fmt.Printf("时间显示格式为：年/月/日 时：分：%v\n", t3)
// 时间显示格式为：时：分年/月/日
t4 := now.Format("15:04 2006/01/02")
fmt.Printf("时间显示格式为：时:分 年/月/日：%v\n", t4)
// 时间显示格式为：年/月/日
t5 := now.Format("2006/01/02")
fmt.Printf("时间显示格式为：年/月/日：%v\n", t5)
// 时间显示格式为：年-月-日
t6 := now.Format("2006-01-02")
fmt.Printf("时间显示格式为：年-月-日：%v\n", t6)
// 时间显示格式为：日-月-年
t7 := now.Format("02-01-2006")
fmt.Printf("时间显示格式为：日-月-年：%v\n", t7)
// 时间显示格式为：时：分：秒
t8 := now.Format("15:04:05.000")
fmt.Printf("时间显示格式为：时:分:秒：%v\n", t8)
// 时间显示格式为：时-分-秒
t9 := now.Format("15-04-05.000")
fmt.Printf("时间显示格式为：时-分-秒：%v\n", t9)
```

- 大部分编程语言的字符串格式模板采用YYYY-mm-dd HH:MM:SS，而Go语言则使用它的出生时间（2006年1月2日15点04分 Mon Jan）。换句话说，结构体方法Format()的参数layout设为字符串2006/01/02，即代表当前时间以2006/01/02的格式表示。
### 时间类型的相互转换
```go
/*时间戳*/
var timestamp int64 = 1630315335
// 时间戳转换为结构体Time
tm := time.Unix(timestamp, 0)
fmt.Printf("时间戳转换结构体Time：%v\n", tm)
// 时间戳转换为字符串格式化
tms := time.Unix(timestamp, 0).Format("2006-01-02 15:04:05")
fmt.Printf("时间戳转换字符串格式化：%v\n", tms)
/*结构体Time */
now := time.Now()
// 结构体Time转换为时间戳
// 生成秒级时间戳
fmt.Printf("结构体Time转换秒级时间戳：%v\n", now.Unix())
// 生成纳秒级时间戳
fmt.Printf("结构体Time转换纳秒级时间戳：%v\n", now.UnixNano())
// 结构体Time转换为字符串格式化
tms1 := now.Format("2006-01-02 15:04:05")
fmt.Printf("结构体Time转换字符串格式化：%v\n", tms1)
/*字符串格式化*/
layout := "2006-01-02 15:04:05"
timeStr := "2021-08-30 17:34:05.1099536"
// 字符串格式化转换为结构体Time
// 函数Parse()用于转换UTC时间格式
timeObj, _ := time.Parse(layout, timeStr)
fmt.Printf("字符串格式化转换结构体Time：%v\n", timeObj)
// 字符串格式化转换为结构体Time
// 函数ParseInLocation()用于转换当地时间格式
timeobj1, _ := time.ParseInLocation(layout, timeStr, time.Local)
fmt.Printf("字符串格式化转换结构体Time：%v\n", timeobj1)
// 字符串格式化转换为时间戳
// 先转换为结构体Time,再由结构体Time转换为时间戳
timeObj2, _ := time.ParseInLocation(layout, timeStr, time.Local)
//转换时间戳
t1 := timeObj2.Unix()
fmt.Printf("字符串格式化转换秒级时间戳：%v\n", t1)
t2 := timeObj2.UnixNano()
fmt.Printf("字符串格式化转换纳秒级时间戳：%v\n", t2)
```
### 时间操作计算
时间计算时对两个时间或者时间增量进行加减运算、对比两个时间信息等操作。
#### 计算时间差值
```go
//获取当前本地时间
now := time.Now()
fmt.Printf("当前本地时间：%v\n", now)
/*Sub()计算两个时间差值*/
layout := "2006-01-02 15:04:05"
timeStr := "2021-07-30 17:34:05.1099536"
// 字符串格式化转换为结构体Time
// 函数Parse()是转换为UTC时间格式
tp, _ := time.Parse(layout, timeStr)
fmt.Printf("某个时间点；%v\n", tp)
// 计算两个时间的差值
r := now.Sub(tp)
fmt.Printf("两个时间差值：%v\n", r)
fmt.Printf("两个时间相差小时数：%v\n", r.Hours())
fmt.Printf("两个时间相差分钟数：%v\n", r.Minutes())
fmt.Printf("两个时间相差秒数：%v\n", r.Seconds())
fmt.Printf("两个时间相差毫秒数：%v\n", r.Milliseconds())
fmt.Printf("两个时间相差微秒数：%v\n", r.Microseconds())
fmt.Printf("两个时间相差纳秒数：%v\n", r.Nanoseconds())
```
#### 时间增量
```go
//获取当前本地时间
now := time.Now()
fmt.Printf("当前本地时间：%v\n", now) /*Add()根据增量（时、分、秒）计算时间*/
// 当前时间加1小时后的时间
times1 := now.Add(time.Hour)
fmt.Printf("1小时后的时间：%v\n", times1)
// 当前时间加2小时后的时间
times2 := now.Add(2 * time.Hour)
fmt.Printf("2小时后的时间：%v\n", times2)
// 当前时间加15分钟后的时间
times3 := now.Add(15 * time.Minute)
fmt.Printf("15分钟后的时间：%v\n", times3)
// 当前时间加15分钟后的时间
times4 := now.Add(-2 * time.Hour)
fmt.Printf("2小时前的时间：%v\n", times4)
/* AddDate()根据增量（年月日）计算时间*/
// 当前时间的1年后的时间
times6 := now.AddDate(1, 0, 0)
fmt.Printf("1年后的时间：%v\n", times6)
// 当前时间的2年前的时间
times7 := now.AddDate(-2, 0, 0)
fmt.Printf("2年前的时间；%v\n", times7)
// 当前时间的3年2月10天后的时间
times8 := now.AddDate(3, 2, 10)
fmt.Printf("3年2月10天后的时间：%v\n", times8)
```
#### 时间判断
```go
//获取当前本地（CST）时间
now := time.Now()
fmt.Printf("当前本地（CST）时间：%v\n", now)
// 将当前时间转为UTC时间格式
now1 := now.UTC()
fmt.Printf("当前UTC时间：%v\n", now1)
// 获取当前UTC时间
now2 := time.Now().UTC()
fmt.Printf("当前UTC时间：%v\n", now2)
//判断本地（CST）时间和UTC时间是否相同
r := now.Equal(now1)
fmt.Printf("判断本地（CST）时间和UTC时间是否相同：%v\n", r)
//判断一个时间是否在另一个时间之前
r1 := now.Before(now2)
fmt.Printf("判断一个时间是否在另一个时间之前：%v\n", r1)
// 判断一个时间是否在另一个时间之后
r2 := now.After(now2)
fmt.Printf("判断一个时间是否在另一个时间之后：%v\n", r2)
```
#### 延时、超时与定时
延时、超时与定时是编程开发中十分常见的功能，三者的作用与说明如下：

1. 延时是程序在执行过程中进入休眠状态，当休眠结束后将继续往下执行，常用于网络爬虫或自动化测试开发，协调代码的执行速度与网络响应等多方面因素，保证程序能正常运行，也能实现定时功能。
2. 超时是防止程序出现无止境阻塞，当某个功能或某行代码出现阻塞的时候，超时可以使程序终止当前阻塞而继续往下执行。使用超时需要考虑程序异常情况，因为超时跳过某一功能或某行代码的执行结果，可能对后续代码造成一定影响。
3. 定时是在某个时刻或某个时间间隔自动执行程序，其原理是通过创建计时器实现定时功能，常用于数据刷新或归零、周期性的数据统计功能等。

延时是由内置包time的SleepO函数实现的，参数d的数据类型为Duration，它只能实现时、分、秒的延时功能，示例如下：
```go
fmt.Printf("当前时间：%v\n", time.Now())
// 延时1秒
time.Sleep(time.Second)
// 延时5秒
time.Sleep(5 * time.Second)
// 延时1分钟
time.Sleep(time.Minute)
// 延时2分钟
time.Sleep(2 * time.Minute)
// 延时1小时
time.Sleep(time.Hour)
```
超时是由内置包time的After()函数实现的，其原理是通过计时器实现超时，参数d的数据类型为Duration，返回值为Time类型（结构体Time）的通道，因此它经常与关键字select结合使用。
```go
fmt.Printf("当前时间：%v\n", time.Now())
var c = make(chan int, 1)
c <- 10
for {
  select {
    // 获取通道的值
    case m := <-c:
    fmt.Printf("通道c的值：%v\n", m)
    case <-time.After(2 * time.Second):
    // 通道为空的时候设置 2秒超时，并终止循环
    fmt.Printf("2秒后的时间：%v\n", time.Now())
    return
  }
}
```
使用select…case语句，由于没有设置default语句，当通道没有数据的时候，程序将会进入阻寨状态，只要在语句中加入内置包time的Afte()函数就能在指定时间解除阻塞，从而实现超时功能。
定时是由内置包time的`NewTicke()`函数实现的，参数d的数据类型为Duration，返回值为结构体Ticker的实例化对象，示例如下：
```go
var ticker = time.NewTicker(2 * time.Second)
var i = 0
for {
  // 执行定时间隔
  var t = <-ticker.C
  fmt.Printf("当前时间：%v\n", t)
  i++
  fmt.Printf("当前循环次数：%v\n", i)
  if i == 3 {
    // 重新设定定时器间隔
    ticker.Reset(3 * time.Second)
  }
  // 输出五次就停止
  if i == 5 {
    ticker.Stop()
    break
  }
}
```
## 目录与文件处理
### 使用 os 实现系统操作
任何编程语言必须依赖操作系统，程序在运行过程中可能会对系统文件或目录执行某些操作，比如文件读写、执行系统指令等。
内置包os实现了多种系统操作指令，如主机、用户、进程、环境变量、目录与文件操作和终端执行等。本书将对系统的操作分为3类：调用系统信息、操作目录与文件和执行终端指令，它们常用于系统的运维开发。
#### 查看系统信息
调用系统信息可用于自动化安装软件、设置系统环境变量、开发进程管理系统等场景。如下：
```go
var hostname, _ = os.Hostname()
fmt.Printf("获取主机名：%v\n", hostname)
// 获取用户ID
fmt.Printf("获取用户ID：%v\n", os.Getuid())
// 获取有效用户ID
fmt.Printf("获取有效用户ID：%v\n", os.Geteuid())
// 获取组ID
fmt.Printf("获取组ID：%v\n", os.Getgid())
// 获取有效组ID
fmt.Printf("获取有效组ID：%v\n", os.Getegid())
// 获取进程ID
fmt.Printf("获取进程ID：%v\n", os.Getpid())
// 获取父进程ID
fmt.Printf("获取父进程ID：%v\n", os.Getppid())
// 获取某个环境变量的值
fmt.Printf("获取环境变量的值：%v\n", os.Getenv("GOPATH"))
// 设置某个环境变量的值
os.Setenv("TEST", "test")
// 删除某个环境变量
os.Unsetenv("TEST")
// 获取所有环境变量
for _, e := range os.Environ() {
  fmt.Printf("环境变量：%v\n", e)
}
// 删除所有环境变量
// os.Clearenv()
```
#### 目录和文件处理
操作目录和文件可以批量修改目录和文件，如垃圾文件定时清除、数据文件备份、系统磁盘清理等场景，常用操作包括创建文件、创建目录、修改文件权限、修改文件信息、删除文件、删除目录、文件重命名、文件读写、判断文件是否相同等，实现代码如下：
```go
//获取当前目录
gw, _ := os.Getwd()
fmt.Printf("当前目录：%v\n", gw)
// cd 到某个目录
os.Chdir("./os")
gwn, _ := os.Getwd()
fmt.Printf("cd到目录：%v\n", gwn)

// 创建文件
f1, _ := os.Create("./1.txt")
f1.Close()

// 修改文件权限
// 第二个参数mode在Windows系统下
// mode为0200代表所有者可写
// mode为0400代表只读
// mode为0600代表读写
os.Chmod("./1.txt", 0400)

// 修改文件的访问时间和修改时间
nows := time.Now()
os.Chtimes("./1.txt", nows, nows)

// 查看文件修改时间信息
f1State, _ := os.Stat("./1.txt")
fmt.Println("f1 文件信息：", f1State.ModTime())

// 把字符串中带${var}或Svar的字符串替换成指定指符串
s := "你好,${1}${2}$3\n"
fmt.Printf(os.Expand(s, func(k string) string {
    mapp := map[string]string{
        "1": "我是",
        "2": "go",
        "3": "lang",
    }
    return mapp[k]
}))

// 创建目录
os.Mkdir("./abc", os.ModePerm)
// 创建多级目录
os.MkdirAll("./abc/d/e/f", os.ModePerm)
// 删除文件或目录
os.Remove("./abc/d/e/f")
//删除指定目录下的所有文件
os.RemoveAll("./abc")
// 重命名文件
os.Rename("./1.txt", "1_new.txt")

//是否Stat（)获取文件信息, SameFile(）判断文件是否相同
f2, _ := os.Create("./2.txt")
fs2, _ := f2.Stat()
f3, _ := os.Create("./3.txt")
fs3, _ := f3.Stat()
fmt.Printf("f2和f3是否同一文件：%v\n", os.SameFile(fs2, fs3))
// 返回临时目录
fmt.Printf("返回临时目录；%v\n", os.TempDir())
```
#### 终端指令
执行终端指令是模拟人工在系统终端输入并执行系统指令，特别在无界面的Linux系统中十分常用。
```go
// 查看 ip: exec.Command("ip", "addr") 
var cmd = exec.Command("ls", "-l") // ls是命令, 后面是参数
var output, err = cmd.Output()
if err != nil {
  fmt.Println("err: ", err)
}
fmt.Println(string(output))
```
### 使用 path 获取路径信息
内置包os可以执行目录或文件的创建、删除、修改操作，但无法对目录或文件执行更复杂的操作。例如，获取目录下的所有文件、获取路径匹配规则、获取文件扩展名、判断绝对路径等，如果需要实现上述功能，则可以使用内置包`path`和`path/filepath`实现。
```go
//判断路径是不是绝对路径
fmt.Printf("IsAbs函数：%v\n", path.IsAbs("./os")) // IsAbs函数：false
// path.IsAbs 仅兼容Linux
fmt.Printf("IsAbs函数：%v\n", path.IsAbs("/home/jesse/project/go-study/os")) // IsAbs函数：true
//路径拼接,连接后自动调用Clean函数
fmt.Printf("Join函数：%v\n", path.Join("./os", "b/c", "../d/")) // Join函数：os/b/d
//返回路径的最后一个元素
fmt.Printf("Base函数：%v\n", path.Base("./a/b/c")) // Base函数：c
// 如果路径为空字符串或斜杠,返回实心点或斜杠
fmt.Printf("Base函数：%v\n", path.Base(""))  // Base函数：.
fmt.Printf("Base函数：%v\n", path.Base("/")) // Base函数：/
//返回等价的最短路径
// 1.用一个斜线替换多个斜线
// 2.清除当前路径的实心点
// 3.清除..和它前面的元素
// 4.以/..开头的,变成/
fmt.Printf("Clean函数：%v\n", path.Clean("./a/b/c/../")) // Clean函数：a/b
// 返回路径最后一个元素前面的目录
fmt.Printf("Dir函数：%v\n", path.Dir("./os/a/b/c")) // Dir函数：os/a/b
// 返回路径中的文件扩展名
// 若没有文件扩展名,则返回空
fmt.Printf("Ext函数：%v\n", path.Ext("./os/1.txt")) // Ext函数：.txt
// 匹配路径,若完全匹配,则返回true
// *匹配0个或多个非/的字符
matched1, _ := path.Match("*", "abc")
fmt.Printf("Match函数：%v\n", matched1) // Match函数：true
// ？匹配一个非/的字符,a?b的?是匹配ab之间的字符,但无法匹配斜杠“!”
matched2, _ := path.Match("a?b", "agb")
fmt.Printf("Match函数：%v\n", matched2) // Match函数：true
// 匹配路径是否符合a/*/c格式,如a/abc/c和a/bbb/都能匹配
matched3, _ := path.Match("a/*/c", "a/bb/c")
fmt.Printf("Match函数：%v\n", matched3) // Match函数：true
// 分割路径中的目录与文件
dir, file := path.Split("./a/b/c/d.jpg")
fmt.Printf("Split函数：目录：%v、文件：%v\n", dir, file) // Split函数：目录：./a/b/c/、文件：d.jpg
```
`path/filepath`包含内置包`path`的功能，并且能兼容所有操作系统。
```go
//判断路径是不是绝对路径,filepath兼容所有操作系统
fmt.Printf("IsAbs函数：%v\n", filepath.IsAbs("./a/b/c"))                         // IsAbs函数：false
fmt.Printf("IsAbs函数：%v\n", filepath.IsAbs("/home/jesse/project/go-study/os")) // IsAbs函数：true
// 返回所给路径的绝对路径
path, _ := filepath.Abs("go.mod")
fmt.Printf("Abs函数：%v\n", path) // Abs函数：/home/jesse/project/go-study/go.mod
// 返回路径最后一个元素
fmt.Printf("Base函数：%v\n", filepath.Base("D:/a/c/1.txt")) // Base函数：1.txt
// 如果路径为空字符串,则返回实心点
fmt.Printf("Base函数：%v\n", filepath.Base("")) // Base函数：.
// 如果路径有一个或多个斜杠/,则返回单个斜杠/
fmt.Printf("Base函数：%v\n", filepath.Base("//")) // Base函数：/
// 返回等价的最短路径
// 1.用一个斜线替换多个斜线
// 2、清除当前路径的实心点
// 3.清除.和它前面的元素
// 4.以/..开头的,变成/
fmt.Printf("Clean函数：%v\n", filepath.Clean("D:/a/b/../c"))       // Clean函数：D:/a/c
fmt.Printf("Clean函数：%v\n", filepath.Clean("D:/a/b/../c/1.txt")) // Clean函数：D:/a/c/1.txt
// 返回路径最后一个元素前面的目录
// 若路径为空,则返回实心点
fmt.Printf("Dir函数：%v\n", filepath.Dir("./a/b/c"))  // Dir函数：a/b
fmt.Printf("Dir函数：%v\n", filepath.Dir("D:/a/b/c")) // Dir函数：D:/a/b
// 返回软链接的实际路径
path2, _ := filepath.EvalSymlinks("go.mod")
fmt.Printf("EvalSymlinks函数：%v\n", path2) // EvalSymlinks函数：go.mod
//返回文件路径的扩展名
// 如果不是文件路径,则返回空字符串
fmt.Printf("Ext函数：%v\n", filepath.Ext("./a/b/c/d.jpg")) // Ext函数：.jpg
// 将路径中的/替换为路径分隔符
fmt.Printf("FromSlash函数：%v\n", filepath.FromSlash("./a/b/c")) // FromSlash函数：./a/b/c
// 返回路径中所有匹配的文件
match, _ := filepath.Glob("./*.go")
fmt.Printf("Glob函数：%v\n", match) // Glob函数：[main.go]
// 路径拼接,连接后自动调用Clean函数
fmt.Printf("Join函数：%v\n", filepath.Join("C:/a", "/b", "/c")) // Join函数：C:/a/b/c
// *匹配0个或多个非/的字符
matched1, _ := filepath.Match("*", "abc")
fmt.Printf("Match函数：%v\n", matched1) // Match函数：true
// ?匹配一个非/的字符,a?b的？是指a和b之间只要不是斜杠“/”,并且a和b之间只有一个字符着
matched2, _ := filepath.Match("a?b", "agb")
fmt.Printf("Match函数：%v\n", matched2) // Match函数：true
// 匹配路径是否符合a/*/c格式,如a/abc/c和a/bbb/都能匹配
matched3, _ := filepath.Match("a/*/c", "a/bb/c")
fmt.Printf("Match函数：%v\n", matched3) // Match函数：true

//返回以参数basepath为基准的相对路径
path3, _ := filepath.Rel("C:/a/b", "C:/a/b/../e")
fmt.Printf("Rel函数：%v\n", path3) // Rel函数：../e
// 将路径使用路径列表分隔符分开,见os.PathListSeparator
// Linux默认为冒号,Windows默认为分号
sl := filepath.SplitList("C:/windows;C:/windows/system")
fmt.Printf("SplitList函数：%v,长度：%v\n", sl, len(sl)) // SplitList函数：[C /windows;C /windows/system],长度：3
// 分割路径中的目录与文件
dir, file := filepath.Split("C:/a/d.jpg")
fmt.Printf("Split函数：目录：%v,文件：%v\n", dir, file) // Split函数：目录：C:/a/,文件：d.jpg
// 将路径分隔符使用/替换
fmt.Printf("ToSlash函数：%v\n", filepath.ToSlash(":\\a\\b")) // ToSlash函数：C：\a\b
// 返回分区名，windows 返回盘符，linux返回上一级目录
vn := filepath.VolumeName("C:/a/b/c")
fmt.Printf("VolumeName函数：%v\n", vn) // VolumeName函数:
// 遍历指定目录下的所有文件
filepath.Walk("./", func(path string, info os.FileInfo, err error) error {
  fmt.Printf("Walk函数：%v\n", path)
  return nil
})
```
### 使用 os 读写文件
内置包os实现了系统很多操作指令，其中不得不说文件读写功能。文件读写包括文件创建、写入内容、追加内容、读取内容等功能。
```go
var val = "This is values\n"
var valByte = []byte(val)
fmt.Printf("valByte 的数据长度：%v\n", len(valByte))

// 创建或打开文件
var f, _ = os.OpenFile("output.txt", os.O_RDWR|os.O_SYNC|os.O_CREATE, 0666)

// Write() 写入文本内容(字节类型切片)
var n1, _ = f.Write(valByte)
fmt.Printf("Write() 写入数据的长度：%v\n", n1)
// WriteString() 写入文本内容(字符串类型)
var n2, _ = f.WriteString(val)
fmt.Printf("WriteString() 写入数据的长度：%v\n", n2)

// WriteAt()相当于Write()+Seek()的功能
// Seek()是文本内容的偏移量，将写入数据在已有数据的某个位置开始写入
// WriteAt()不支持O APPEND模式
n3, _ := f.WriteAt(valByte, 30)
fmt.Printf("WriteAt()写入数据的长度：%v\n", n3)
// 读取文件，必须为切片定义长度
var valueByte []byte = make([]byte, 14)
// 读取方式一：全内容读取
// vb,_ := f.Read(valu byte)
// 读取方式二：部分内容读取
vb, _ := f.ReadAt(valueByte, 15)
vbs := string(valueByte)
fmt.Printf("ReadAt()读取的是数据长度：%v\n", vb)
fmt.Printf("ReadAt()读取的是数据：%v\n", vbs)
// 关闭文件
f.Close()
```
### 使用 io/ioutil 读写文件
除了内置包os读写文件之外，Go语言还提供了内置包bufio实现文件读写，对比os，bufio的性能有明显优势。
```go
//使用os创建或打开文件对象
f, _ := os.OpenFile("output.txt", os.O_RDWR|os.O_SYNC, 0) // 实例化结构体Reader
reader := bufio.NewReader(f)
// 通过死循环方式读取每行数据
for {
  // ReadString(）按行读取数据
  buf, err := reader.ReadString('\n')
  // 输出当前读到的数据的长度
  fmt.Printf("当前数据长度：%v\n", len(buf))
  // 数据转换字符串格式,并去掉换行符
  value := strings.Trim(string(buf), "\r\n")
  // 如果数据不为空,则说明已读到数据
  if value != "" {
    fmt.Printf("当前数据：%v\n", value)
  } else {
    // 若数据为空,则可能是空行数据,但出现err说明已读取完成
    if err != nil {
      break
    } else {
      fmt.Printf("当前数据是空行数据\n")
    }
  }
}
```
bufio包的NewWriterO)和NewWriterSizeO是返回己实例化的结构体Writer，然后调用结构体方法就能实现文件写入功能。
结构体Writer一共定义了4个方法写入文件：WriteO)、WriteByteO)、WriteRuneO和WriteStringO。其中WriteByteO和WriteRuneO将单个字节写入文件，使用频率较低；WriteO和WriteString0分别将字节切片和字符串写入文件。接下来将演示WriteO和WriteStringO的使用，示例如下:
```go
//使用os创建或打开文件对象
f, _ := os.OpenFile("output.txt", os.O_RDWR|os.O_SYNC|os.O_CREATE, 0666)
// 实例化结构体Writer
reader := bufio.NewWriter(f) // 调用结构体方法Write()写入数据nl,
n1, _ := reader.Write([]byte("6666\n"))
fmt.Printf("Write()已写入数据：%v\n", n1)
// 调用结构体方法WriteString()写入数据
n2, _ := reader.WriteString("7777\n")
fmt.Printf("WriteString()已写入数据：%v\n", n2)
// 调用结构体方法Flush（）将数据保存到文件中
reader.Flush()
```
### 使用 `encoding/csv`读写 CSV 文件
CSV (Comma-Separated Values，逗号分隔值）文件以纯文本形式存储表格数据（数字和文本），每行数据的各个字段使用逗号或制表符分隔，支持Excel和记事本打开，如图14-20所示。
内置包encoding/csv提供4种方式读写CSV文件：按行读取、全部读取、按行写入和全部写入，分别由ReadO、ReadAl1O、Write0和WriteAll0实现。CSV文件数据写入示例如下：
```go
// OpenFile(）创建或打开文件，设置读写模式
// 如果设置O_APPEND模式，则实现文件续写功能
// 如果设置OTRUNC模式，则新数据覆盖文件原有数据
var nfs, _ = os.OpenFile("input.csv", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

csvWriter := csv.NewWriter(nfs)

// 设置分隔符，默认为逗号
// csvWriter.Comma = ','
// 设置换行符
// csvWriter.UseCRLF = true

var row = []string{"1", "2", "3", "4"}
var err = csvWriter.Write(row)
if err != nil {
    fmt.Println("无法写入，错误信息：", err)
}

// 一次性写入多行数据
var newContent [][]string
newContent = append(newContent, []string{"11", "12", "13", "14"})
newContent = append(newContent, []string{"21", "22", "23", "24"})
csvWriter.WriteAll(newContent)

// 将数据写入文件
csvWriter.Flush()
nfs.Close()
```
CSV文件读取分为按行读取和全部读取。按行读取适用于大文件，如果一次性读取大文件数据，可能占用较大的内存资源，按行读取无须考虑内存资源问题；全部读取适用于小文件，方便数据加工处理，并且不会占用太多的内存资源。两者的应用示例如下：
```go
// OpenFile(）创建或打开文件，设置读写模式
// O_RDWR 支持读写模式
// os.O_CREATE 文件不存在时创建
var fs, _ = os.OpenFile("input.csv", os.O_RDWR|os.O_CREATE, 0666)
var csvReader = csv.NewReader(fs)

// 一行一行地读取文件，常用于大文件
for {
  row, err := csvReader.Read()
  if err == io.EOF || err != nil {
    break
  }
  fmt.Printf("逐行读取csv内容：%v，数据类型：%T\n", row, row)
}
fs.Close()

// 一次性读取文件所有内容，常用于小文件
var fs1, _ = os.OpenFile("input.csv", os.O_RDWR|os.O_CREATE, 0666)
var csvReader1 = csv.NewReader(fs1)
// 读取文件所有内容
content, err := csvReader1.ReadAll()
if err != nil {
  fmt.Println("读取失败：", err)
}
for _, v := range content {
  fmt.Printf("读取csv内容：%v，数据类型：%T\n", v, v)
}
fs1.Close()
```
### 使用`encoding/json`读写 JSON 文件
写入：
```go
// 使用OpenFile()打开文件,设置O_TRUNC模式,每次写入将覆盖原有数据
// 如果不想为OpenFile()设置参数,则可以用Create()代替,实现效果一样
f, _ := os.OpenFile("output.json", os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0666)
// 创建PersonInfo类型的切片
p := []personinfo{{"David", 30}, {"Lee", 27}}
// 实例化结构体Encoder,实现数据写入
encoder := json.NewEncoder(f)
// 将变量p的数据写入JSON文件
// 数据写入必须使用文件内容覆盖,即设置os.0_TRUNC模式,否则导致内容错乱
err := encoder.Encode(p)
// 如果err不为空值nil,则说明写入错误
if err != nil {
    fmt.Printf("JSON写入失败；%v\n", err.Error())
} else {
    fmt.Printf("JSON写入成功\n")
}
```
读取：
```go
//使用OpenFile()打开文件,设置O_CREATE模式,若文件不存在则创建
//如果不想为OpenFile()设置参数,则可以用Open(）代替,实现效果一样
f, _ := os.OpenFile("output.json", os.O_RDWR|os.O_CREATE, 0755)
// 定义结构体类型的切片
var person []personinfo
// 实例化结构体Decoder,实现数据读取
data := json.NewDecoder(f)
// 将已读取的数据加载到切片person
err := data.Decode(&person)
// 如果err不为空值nil,则说明读取错误
if err != nil {
    fmt.Printf("JSON读取失败：%v\n", err.Error())
} else {
    fmt.Printf("JSON读取成功：%v\n", person)
    // 关闭文件
    f.Close()
}
```
## Fmt
### Print
fmt包实现了类似C语言printf和scanf的格式化I/O。主要分为向外输出内容和获取输入内容两大部分。
```go
func Print(a ...interface{}) (n int, err error)
func Printf(format string, a ...interface{}) (n int, err error)
func Println(a ...interface{}) (n int, err error)
```
Print系列函数会将内容输出到系统的标准输出，区别在于：

- `Print`函数直接输出内容
- `Printf`函数支持格式化输出字符串
- `Println`函数会在输出内容的结尾添加一个换行符
### Sprint
Sprint系列函数会把传入的数据生成并返回一个字符串。
```go
func Sprint(a ...interface{}) string
func Sprintf(format string, a ...interface{}) string
func Sprintln(a ...interface{}) string
```
**example:**
```go
s1 := fmt.Sprint("枯藤")
name := "枯藤"
age := 18
s2 := fmt.Sprintf("name:%s,age:%d", name, age)
s3 := fmt.Sprintln("枯藤")
fmt.Println(s1, s2, s3) // 枯藤 name:枯藤,age:18 枯藤
```
### Fprint
Fprint系列函数会将内容输出到一个io.Writer接口类型的变量w中，我们通常用这个函数往文件中写入内容。
```go
func Fprint(w io.Writer, a ...interface{}) (n int, err error)
func Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error)
func Fprintln(w io.Writer, a ...interface{}) (n int, err error)
```
**example:**
```go
fmt.Fprintln(os.Stdout, "写入内容")
fileObj, err := os.OpenFile("./test.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
if err != nil {
  fmt.Println("打开文件出错，err：", err)
  return
}
var name = "hhhhh"
fmt.Fprintf(fileObj, "往文件中写入信息：%s", name) // test.txt: 往文件中写入信息：hhhhh
```
### Errorf
Errorf函数根据format参数生成格式化字符串并返回一个包含该字符串的错误。
```go
func Errorf(format string, a ...interface{}) error
```
通常使用这种方式来自定义错误类型，例如：
```go
err := fmt.Errorf("这是一个错误")
```
### Scan
Go语言fmt包下有fmt.Scan、fmt.Scanf、fmt.Scanln三个函数，可以在程序运行过程中从标准输入获取用户的输入。函数返回成功扫描的数据个数和遇到的任何错误。如果读取的数据个数比提供的参数少，会返回一个错误报告原因。
```go
func Scan(a ...interface{}) (n int, err error)
func Scanf(format string, a ...interface{}) (n int, err error)
func Scanln(a ...interface{}) (n int, err error)
```

- Scan从标准输入扫描文本，读取由空白符分隔的值保存到传递给本函数的参数中，换行符视为空白符。
- Scanf从标准输入扫描文本，根据format参数指定的格式去读取由空白符分隔的值保存到传递给本函数的参数中。
- Scanln类似Scan，它在遇到换行时才停止扫描。最后一个数据后面必须有换行或者到达结束位置。

**scanf example:**
```go
var (
name    string
age     int
married bool
)
fmt.Scan(&name, &age, &married)
fmt.Printf("扫描结果 name:%s age:%d married:%t \n", name, age, married)
```
在终端依次输入：`Jesse 18 false`，会返回`扫描结果 name:枯藤 age:18 married:false`
**scanf example:**
```go
var (
  name    string
  age     int
  married bool
)
fmt.Scanf("1:%s 2:%d 3:%t", &name, &age, &married)
fmt.Printf("扫描结果 name:%s age:%d married:%t \n", name, age, married)
```
在终端执行后：
```bash
go run main.go
1:Jesse 2:18 3:false
扫描结果 name:Jesse age:18 married:false
```
fmt.Scanf不同于fmt.Scan简单的以空格作为输入数据的分隔符，fmt.Scanf为输入数据指定了具体的输入内容格式，只有按照格式输入数据才会被扫描并存入对应变量。
### 格式化占位符
`*printf`系列函数都支持format格式化参数，在这里我们按照占位符将被替换的变量类型划分，方便查询和记忆。
#### 通用占位符
| **占位符** | **说明** |
| --- | --- |
| %v | 值的默认格式表示 |
| %+v | 类似%v，但输出结构体时会添加字段名 |
| %#v | 值的Go语法表示 |
| %T | 打印值的类型 |
| %% | 百分号 |

**example:**
```go
fmt.Printf("%v\n", 100)   // 100
fmt.Printf("%v\n", false) // false
o := struct{ name string }{"枯藤"}
fmt.Printf("%v\n", o)  // {枯藤}
fmt.Printf("%#v\n", o) // struct { name string }{name:"枯藤"}
fmt.Printf("%T\n", o)  // struct { name string }
fmt.Printf("100%%\n")  // 100%
```
#### bool 占位符
| **占位符** | **说明** |
| --- | --- |
| %t | true或false |

#### 整型
| **占位符** | **说明** |
| --- | --- |
| %b | 表示为二进制 |
| %c | 该值对应的unicode码值 |
| %d | 表示为十进制 |
| %o | 表示为八进制 |
| %x | 表示为十六进制，使用a-f |
| %X | 表示为十六进制，使用A-F |
| %U | 表示为Unicode格式：U+1234，等价于”U+%04X” |
| %q | 该值对应的单引号括起来的go语法字符字面值，必要时会采用安全的转义表示 |

#### 浮点数与复数
| **占位符** | **说明** |
| --- | --- |
| %b | 无小数部分、二进制指数的科学计数法，如-123456p-78 |
| %e | 科学计数法，如-1234.456e+78 |
| %E | 科学计数法，如-1234.456E+78 |
| %f | 有小数部分但无指数部分，如123.456 |
| %F | 等价于%f |
| %g | 根据实际情况采用%e或%f格式（以获得更简洁、准确的输出） |
| %G | 根据实际情况采用%E或%F格式（以获得更简洁、准确的输出） |

#### 字符串和[]byte
| %s | 直接输出字符串或者[]byte |
| --- | --- |
| %q | 该值对应的双引号括起来的go语法字符串字面值，必要时会采用安全的转义表示 |
| %x | 每个字节用两字符十六进制数表示（使用a-f) |
| %X | 每个字节用两字符十六进制数表示（使用A-F） |

#### 指针
| **占位符** | **说明** |
| --- | --- |
| %p | 表示为十六进制，并加上前导的0x，**也就是内存地址** |

#### 宽度标识符
宽度通过一个紧跟在百分号后面的十进制数指定，如果未指定宽度，则表示值时除必需之外不作填充。精度通过（可选的）宽度后跟点号后跟的十进制数指定。如果未指定精度，会使用默认精度；如果点号后没有跟数字，表示精度为0。举例如下

| **占位符** | **说明** |
| --- | --- |
| %f | 默认宽度，默认精度 |
| %9f | 宽度9，默认精度 |
| %.2f | 默认宽度，精度2 |
| %9.2f | 宽度9，精度2 |
| %9.f | 宽度9，精度0 |

#### 其他
| **占位符** | **说明** |
| --- | --- |
| ’+’ | 总是输出数值的正负号；对%q（%+q）会生成全部是ASCII字符的输出（通过转义）； |
| ’ ‘ | 对数值，正数前加空格而负数前加负号；对字符串采用%x或%X时（% x或% X）会给各打印的字节之间加空格 |
| ’-’ | 在输出右边填充空白而不是默认的左边（即从默认的右对齐切换为左对齐）； |
| ’#’ | 八进制数前加0（%#o），十六进制数前加0x（%#x）或0X（%#X），指针去掉前面的0x（%#p）对%q（%#q），对%U（%#U）会输出空格和单引号括起来的go字面值； |
| ‘0’ | 使用0而不是空格填充，对于数值类型会把填充的0放在正负号后面； |

## Log
Go语言内置的log包实现了简单的日志服务。
### 使用Logger
og包定义了Logger类型，该类型提供了一些格式化输出的方法。本包也提供了一个预定义的“标准”logger，可以通过调用函数**Print系列(Print|Printf|Println）**、**Fatal系列（Fatal|Fatalf|Fatalln）**、和**Panic系列（Panic|Panicf|Panicln）**来使用，比自行创建一个logger对象更容易使用。
```go
package main

import (
  "log"
)

func main() {
  log.Println("这是一条很普通的日志。")
  v := "很普通的"
  log.Printf("这是一条%s日志。\n", v)
  log.Fatalln("这是一条会触发fatal的日志。")
  log.Panicln("这是一条会触发panic的日志。")
}

/*
   2019/10/11 14:04:17 这是一条很普通的日志。
   2019/10/11 14:04:17 这是一条很普通的日志。
   2019/10/11 14:04:17 这是一条会触发fatal的日志。
*/
```
logger会打印每条日志信息的日期、时间，默认输出到系统的标准错误。Fatal系列函数会在写入日志信息后调用os.Exit(1)。Panic系列函数会在写入日志信息后panic。
### 配置Logger
log标准库提供了如下的flag选项，它们是一系列定义好的常量。
```go
const (
  // 控制输出日志信息的细节，不能控制输出的顺序和格式。
  // 输出的日志在每一项后会有一个冒号分隔：例如2009/01/23 01:23:23.123123 /a/b/c/d.go:23: message
  Ldate         = 1 << iota     // 日期：2009/01/23
  Ltime                         // 时间：01:23:23
  Lmicroseconds                 // 微秒级别的时间：01:23:23.123123（用于增强Ltime位）
  Llongfile                     // 文件全路径名+行号： /a/b/c/d.go:23
  Lshortfile                    // 文件名+行号：d.go:23（会覆盖掉Llongfile）
  LUTC                          // 使用UTC时间
  LstdFlags     = Ldate | Ltime // 标准logger的初始值
)
```
下面我们在记录日志之前先设置一下标准logger的输出选项如下：
```go
log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
log.Println("这是一条很普通的日志。") // 2023/11/06 16:31:53.009269 /Users/jianqing/Documents/Study/go-example/main.go:9: 这是一条很普通的日志。
```
### 配置日志前缀
```go
log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
log.Println("这是一条很普通的日志。")
log.SetPrefix("Warning: ")
log.Println("这是一条很普通的日志。")
// output:
// 2023/11/06 16:33:50.446726 /Users/jianqing/Documents/Study/go-example/main.go:9: 这是一条很普通的日志。
// Warning: 2023/11/06 16:33:50.446940 /Users/jianqing/Documents/Study/go-example/main.go:11: 这是一条很普通的日志。
```
### 配置日志输出位置
```go
logFile, err := os.OpenFile("./xx.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
if err != nil {
  fmt.Println("open log file failed, err:", err)
  return
}
log.SetOutput(logFile)
log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
log.Println("这是一条很普通的日志。")
log.SetPrefix("[小王子]")
log.Println("这是一条很普通的日志。")
```
SetOutput函数用来设置标准logger的输出目的地，可以输出日志文件。
如果你要使用标准的logger，我们通常会把上面的配置操作写到init函数中。
```go
func init() {
  logFile, err := os.OpenFile("./xx.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
  if err != nil {
    fmt.Println("open log file failed, err:", err)
    return
  }
  log.SetOutput(logFile)
  log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
}
```
### 创建Logger
log标准库中还提供了一个创建新logger对象的构造函数–New，支持我们创建自己的logger示例。
```go
func New(out io.Writer, prefix string, flag int) *Logger
```
```go
func main() {
  logger := log.New(os.Stdout, "<New>", log.Lshortfile|log.Ldate|log.Ltime)
  logger.Println("这是自定义的logger记录的日志。")
}
```
总结 : Go内置的log库功能有限，例如无法满足记录不同级别日志的情况，我们在实际的项目中根据自己的需要选择使用第三方的日志库，如logrus、zap等。
```go
s1 := "100"
i1, err := strconv.Atoi(s1)
if err != nil {
  fmt.Println("can't convert to int")
}
fmt.Printf("type:%T value:%#v\n", i1, i1) //type:int value:100
```
## JSON

- json使用go语言内置的encoding/json 标准库
- 编码json使用json.Marshal()函数可以对一组数据进行JSON格式的编码
### 通过 struct生成 json
```go
type Person struct {
	Name      string `json:"name"`
	Hobby bool   `json:"Hobby"`
}

var p = Person{
  Name:  "Jesse",
  Hobby: "girl",
}
person, err := json.Marshal(p)
if err != nil {
  fmt.Println("json err ", err)
}
fmt.Println(string(person))

// 格式化输出
person, err = json.MarshalIndent(p, "", "  ")
// {"Name":"Jesse","Hobby":"girl"}
if err != nil {
  fmt.Println("json err ", err)
}
fmt.Println(string(person))
/*
    {
        "Name": "Jesse",
        "Hobby": "girl"
    }
*/
```
**Struct tag：**
```go
type Person struct {
  //"-"是忽略的意思
  Name  string `json:"-"`
  Hobby string `json:"hobby" `
}
```
通过 `struct tag`可以给转化的`json`更改`key`，或者排除`key`
### 通过 map 生成 json
```go
var student = make(map[string]interface{})
student["name"] = "Jesse"
student["age"] = 18
student["sex"] = "man"
student["parent"] = map[string]interface{}{
  "name": "father",
  "age":  40,
}
b, err := json.Marshal(student)
if err != nil {
  fmt.Println(err)
}
fmt.Println(string(b))
// {"age":18,"name":"Jesse","parent":{"age":40,"name":"father"},"sex":"man"}
```
### JSON 解码为 struct
```go
type Person struct {
	Age       int    `json:"age,string"`
	Name      string `json:"name"`
	Niubility bool   `json:"niubility"`
}

func main() {
	b := []byte(`{"age":"18","name":"Jesse","marry":false}`)
	var p Person
	err := json.Unmarshal(b, &p)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(p)
	// {18 Jesse false}
}
```
### JSON 解码为 map
```go
type Person struct {
  Age       int    `json:"age,string"`
  Name      string `json:"name"`
  Niubility bool   `json:"niubility"`
}

func main() {
  // int和float64都当float64
  b := []byte(`{"age":1.3,"name":"Jesse","marry":false}`)

  var i interface{}
  err := json.Unmarshal(b, &i)
  if err != nil {
    fmt.Println(err)
  }
  // 自动转到map
  fmt.Println(i)
  // map[age:1.3 marry:false name:Jesse]

  // 判断成员类型
  m := i.(map[string]interface{})
  for k, v := range m {
    switch vv := v.(type) {
      case float64:
      fmt.Println(k, "是float64类型", vv)
      case string:
      fmt.Println(k, "是string类型", vv)
      default:
      fmt.Println("其他")
    }
  }
}
```
## 网络编程应用
### TCP和UDP
服务端根据不同的网络协议分为不同类型的应用服务，常见类型为TCP和UDP：

- TCP是目前所有网站系统采用的网络协议，，服务端和客户端必须经过三次握手才能简历连接，它们只能进行点对点的数据传输，不支持多播和广播传输方式，应用场景有文件传输、接收邮件、远程登录等。
- UDP不需要建立连接，服务端和客户端不止支持一对一的传输方式，同样支持一对多、多对多、多对一的方式，也就是说UDP提供了单播、多播、广播功能，应用场景有在线聊天、在线视频、网络语音电话等。

用通俗的说法解释TCP和UDP，将服务端和客户端看成一对情侣，当女方（客户端）向男方（服务端）说话（即发送HTTP请求）时，TCP要求男方必须对女方做出回应，而UDP则不管女方发出多少次请求，男方可以不做任何回应，即TCP就是有求必应，UDP则是爱理不理。
在编程语言中，无论是TCP还是UDP，它们的底层原理都是基于 Socket 实现的。Go 语言的 Socket 都封装在内置包 net 中。
### 创建TCP应用
我们知道TCP服务必须对客户端和服务端简历连接才能发送和接收数据，建立连接的过程中需要经过三次握手。

1. 第一次握手：客户端发送TCP数据包给服务端，请求建立连接。
2. 第二次握手：服务端将验证结果告诉客户端，如果验证成功，则说明它们可以进行第三次握手。
3. 第三次握手：客户端向服务端发送数据，使得服务端和客户端进入连接状态。

**服务端：**
```go
func tcpPipe(conn *net.TCPConn) {
  // TCP连接的地址
  var ipStr = conn.RemoteAddr().String()
  // 关闭连接
  defer func() {
    fmt.Printf("%v 失去连接\n", ipStr)
    conn.Close()
  }()

  // 获取TCP连接对象的数据流
  var reader = bufio.NewReader(conn)
  // 接收并返回消息
  for {
    // 获取接收数据
    message, err := reader.ReadString('\n')
    // 连接异常
    if err != nil || err == io.EOF {
      break
    }
    fmt.Println("服务端接收数据：", message)
    time.Sleep(3 * time.Second)

    // 发送数据
    msg := conn.RemoteAddr().String() + "--服务端发送数据\n"
    b := []byte(msg)
    conn.Write(b)
  }
}

// TCP 对象
var tcpAddr, _ = net.ResolveTCPAddr("tcp", "127.0.0.1:9999")
// 创建 TCP 监听对象
tcpListener, _ := net.ListenTCP("tcp", tcpAddr)
defer tcpListener.Close()

for {
  // 通过 TCP 监听对象获取与客户端的TCP连接对象
  tcpConn, err := tcpListener.AcceptTCP()
  if err != nil {
    fmt.Println(err)
    continue
  }
  // 连接成功后创建协程去处理
  go tcpPipe(tcpConn)
}
```
TCP服务端的实现步骤：

1. 创建TCP服务
2. 监听TCP服务
3. 从监听对象获取TCP连接对象
4. 从连接对象发送和接收客户端数据

**客户端：**
```go
func onMessageReceived(conn *net.TCPConn) {
  // 创建TCP连接对象的IO
  var reader = bufio.NewReader(conn)
  // 发送数据
  var b = []byte(conn.LocalAddr().String() + "客户端在发送数据。\n")
  conn.Write(b)

  for {
    // 获取 TCP连接对象的数据流
    var msg, err = reader.ReadString('\n')
    fmt.Println("客户端收到服务端数据：", msg)
    if err != nil || err == io.EOF {
      break
    }
    time.Sleep(2 * time.Second)
    // 通过TCP连接对象发送数据给服务端
    _, err = conn.Write(b)
    if err != nil {
      break
    }
  }
}

var tcpAddr, _ = net.ResolveTCPAddr("tcp", "127.0.0.1:9999")
conn, err := net.DialTCP("tcp", nil, tcpAddr)
if err != nil {
  fmt.Println("客户端连接错误：", err.Error())
  return
}
defer conn.Close()
fmt.Println("客户端连接成功：", conn.LocalAddr().String())
onMessageReceived(conn)
```
TCP客户端的实现步骤：

1. 创建TCP服务
2. 连接TCP服务
3. 从连接对象发送和接收客户端数据
### 创建 UDP 应用
我们知道UDP是无须建立连接就可以互相发送数据的网络传输协议，这是不可靠的、没有时序的通信协议，但是它的实时性比较好，通常用于视频直播相关领域。
**UDP服务端：**
```go
var udpAddr, _ = net.ResolveUDPAddr("udp", "127.0.0.1:9999")
conn, _ := net.ListenUDP("udp", udpAddr)
defer conn.Close()

for {
  // 接收数据
  var message = make([]byte, 4096)
  // n：数据长度; addr：客户端 IP 地址
  var n, addr, err = conn.ReadFromUDP(message)
  if err != nil || err == io.EOF {
    break
  }

  fmt.Println("服务端接收数据：", string(message[:n]))
  time.Sleep(3 * time.Second)

  // 发送数据
  msg := conn.LocalAddr().String() + "--服务端发送数据"
  b := []byte(msg)
  conn.WriteToUDP(b, addr)
}
```
步骤：

1. 创建UDP服务
2. 创建UDP连接对象
3. 从连接对象向客户端接收和发送数据

**UDP客户端：**
```go
var udpAddr, _ = net.ResolveUDPAddr("udp", "127.0.0.1:9999")
// 创建 udp 连接对象
conn, err := net.DialUDP("udp", nil, udpAddr)
if err != nil {
  fmt.Println("客户端连接错误：", err.Error())
  return
}
fmt.Println("客户端连接成功：", conn.LocalAddr().String())

for {
  var b = []byte(conn.LocalAddr().String() + "--客户端发送数据")
  // 发送数据
  conn.Write(b)
  time.Sleep(2 * time.Second)

  message := make([]byte, 4096)
  n, _, err := conn.ReadFromUDP(message)
  fmt.Println("客户端收到数据：", string(message[:n]))
  if err != nil || err == io.EOF {
    break
  }

}
```
步骤：

1. 创建UDP服务
2. 创建UDP连接对象
3. 从连接对象向服务端接收和发送数据
### 创建HTTP服务
Go语言内置包net不仅能实现TCP Socket和UDP Socket的功能开发，还能直接开发Web应用。Web应用是在Socket的基础上实现的应用功能，开发者只需实现应用功能的业务逻辑，无须实现Socket底层功能，以提高开发效率。
大部分编程语言的Web应用都是在Web框架上进行开发的，那么**内置包net**也可以看成一个简单的Web框架。不同的Web框架有不同的内置功能，常见功能如下：

1. 路由功能：用于设置一个网站或系统的路由地址，路由地址就是我们常说的网站网址。
2. 模板引擎：将编程语言转化为HTML代码的功能，通过模板语法动态变换网页数据。
3. 请求与响应：获取浏览器的HTTP请求信息，并且对该请求做出响应。
4. Cookie与Session管理：用于记录当前用户，识别HTTP请求来自哪一个用户。
5. 数据存储：提供数据库存储功能。
```go
func body(w http.ResponseWriter, r *http.Request) {
  // 获取请求头信息
  var header = r.Header.Get("Accept-Encoding")
  fmt.Println("请求头 Accept-Encoding：", header)

  if r.Method == "GET" {
    r.ParseForm()
    fmt.Println("获取参数的方法1：", r.Form.Get("name"))
    fmt.Println("获取参数的方法2：", r.URL.Query())
    fmt.Println("获取参数的方法3：", r.FormValue("name"))
    fmt.Fprintln(w, "This is GET")
  } else {
    // 使用 form 和 postform 方法之前必须调用 parseForm 方法
    r.ParseForm()
    fmt.Println("Postform() 获取参数：", r.Form.Get("name"))
    // 与 get 一样的方法
    fmt.Println("FormValue() 获取参数：", r.FormValue("name"))
    // PostFormValue 将 postform 功能优化
    var pfv = r.PostFormValue("name")
    fmt.Println("PostFormValue() 获取参数：", pfv)

    // 获取 post 的文件数据
    r.ParseMultipartForm(1024)
    fmt.Println("MultipartForm() 获取文件数据：", r.MultipartForm)

    // FormFile() 获取上传的文件
    file, handle, _ := r.FormFile("file")
    fmt.Println("FormFile() 获取文件数据：", file, handle)

    // 接收 post 的json 数据
    con, _ := io.ReadAll(r.Body)
    fmt.Println("json 数据：", file, string(con))
    // 响应内容
    fmt.Fprintln(w, "This is POST")
  }
}

http.HandleFunc("/", body)
server := http.Server{
  Addr: "127.0.0.1:8080",
}
server.ListenAndServe()

```
#### 响应处理方式
当网站收到用户发送的HTTP请求之后，它将用户的请求地址与网站的路由地址进行匹配，匹配成功后将HTTP请求交由对应函数处理，函数处理后将做出响应返回给用户并呈现在浏览器中。
网站可以根据用户请求给出不同的响应内容，响应内容包括HTTP响应状态码、响应头和响应数据，三者说明如下：

1. 不同的HTTP状态码代表不同的意思，主要描述当前请求是否正常，如200代表请求成功，404代表找不到网页，500代表服务器异常，301和302代表网页重定向，等等。
2. 响应头和请求头是同一概念，只是发起HTTP请求的主体不同，请求头是客户端发送给服务端，响应头是服务端返回给客户端。
3. 响应数据是网站给用户呈现的数据，通常以JSON或HTML的数据格式表示。
```go
// HTML 响应内容
func indexExample(w http.ResponseWriter, r *http.Request) {
  str := `<html><head><title>My Go</title></head><body><h1>Hello World</h1></body></html>`
  w.Write([]byte(str))
}

// WriteHeader设置响应状态码
func errorExample(w http.ResponseWriter, r *http.Request) {
  w.WriteHeader(501)
  str :=
  `<html>
	<head><title>My Go</title></head><body><h1>Hello World</h1></body></html>`
  w.Write([]byte(str))
}

// 在Header中设置参数Location
// 并使用WriteHeader设置302状态码，即可实现URL重定向
// 重定向的URL为参数Location的参数值
func redirectExamp(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Location", "https://www.baidu.com/")
  w.WriteHeader(302)
}

// 定义结构体Post，用于生成JSON数据
type Post struct {
  User    string
  Threads []string
}

// 在Header中设置参数Content-Type
// 参数值为application/json，将响应内容以JSON表示
// 使用结构体Post生成JSON数据
// 由Write方法将JSON数据作为响应内容输出
func jsonExample(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  post := &Post{
    User:    "Go",
    Threads: []string{"first", "second", "third"},
  }
  json, _ := json.Marshal(post)
  w.Write(json)
}

func cookieExample(w http.ResponseWriter, r *http.Request) {
  // 获取HTTP请求的Cookie
  c, _ := r.Cookie("csrftoken") //获取Cookie某个属性值
  fmt.Printf("获取HTTP请求的Cookie：%v\n", c)
  // 设置响应内容的Cookie
  cookie := &http.Cookie{
    Name:   "sessionid",
    Value:  "lkjsdfklsjfklsfdsfdjslf",
    MaxAge: 3600,
    Domain: "localhost",
    Path:   "/"}
  http.SetCookie(w, cookie)
  w.Write([]byte("This is Cookie"))
}

func ExecHTTP() {
  server := http.Server{
    Addr: "127.0.0.1:8080"}
  http.HandleFunc("/", indexExample)
  http.HandleFunc("/error", errorExample)
  http.HandleFunc("/redirect", redirectExamp)
  http.HandleFunc("/json", jsonExample)
  http.HandleFunc("/cookie", cookieExample)
  server.ListenAndServe()
}
```
