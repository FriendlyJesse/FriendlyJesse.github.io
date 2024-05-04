# Golang
## Basics
### Variable
Go语言中的变量需要声明后才能使用，同一作用域内不支持重复声明。并且Go语言的变量声明后必须使用。
语法：
```go
// 单变量声明
var 变量 变量类型
// 多变量声明
var 变量1,变量2, ... 变量类型
// 多变量声明二
var (
  a string
  b int
  c bool
  d float32
)

// 变量初始化
// 变量初始化时会自动推导类型
var 变量 = "value"
var 变量, 变量2 = "value1", "value2"
var (
  a = 100
  b = "value"
  c = true
  d = .22
)
// 短变量，就是省略 `var` 换成 `:=`
变量 := "value"
```
**注意：**
在函数中，简洁赋值语句 := 可在类型明确的地方代替 var 声明。
函数外的每个语句都必须以关键字开始（var, func 等等），因此 := 结构不能在函数外使用。
### Const
相对于变量，常量是恒定不变的值，多用于定义程序运行期间不会改变的那些值。 常量的声明和变量声明非常类似，只是把var换成了const，常量在定义的时候必须赋值。
```go
const Pi = 3.14
const (
  a = iota // iota = 0
  b // iota + 1
  c = 10 // iota + 1
  d // iota + 1
  e = iota // iota = 4
)
fmt.Println(a, e) // 0 4
```
关键词 iota 是一个特殊常量只能出现在 const 中，它是一个可以被编译器修改的常量。iota 会为每个常量进行记数累加。
### 类型推导
在声明一个变量而不指定其类型时（即使用不带类型的 := 语法或 var = 表达式语法），变量的类型由右值推导得出。
当右值声明了类型时，新变量的类型与其相同：
```go
var i int
j := i // j 也是一个 int
```
不过当右边包含未指明类型的数值常量时，新变量的类型就可能是 int, float64 或 complex128 了，这取决于常量的精度：
```go
i := 42           // int
f := 3.142        // float64
g := 0.867 + 0.5i // complex128
```
### 零值(Zero value)
没有明确初始值的变量声明会被赋予它们的 **零值**。
零值是：

- 数值类型为 0，
- 布尔类型为 false，
- 字符串为 ""（空字符串）。
```go
package main

import "fmt"

func main() {
  var i int
  var f float64
  var b bool
  var s string

  fmt.Printf("%v %v %v %q\n", i, f, b, s)
}

/*
0 0 false ""
*/
```
### 空白标识符
```go
import (
    // 场合一
    // 只执行包的 init 函数
    // 仅仅是执行这个包的init函数，把mysql的驱动注册到sql包里，然后程序里就可以使用sql包来访问mysql数据库了。
    import _ "github.com/go-sql-driver/mysql"
)

// 场合二
// 只获取第二个返回值
_, err := getData()
var arr = []struct{a int}{{a: 1}}
for _, item := range arr {}

// 场合三
// 类型断言，判断某个类型是否实现了接口，否则编译出错
type Foo interface { // 如果没有这个接口就会报错
	Say()
}
type Dog struct {
	name string
}
func (d Dog) Say() {
	fmt.Println(d.name + " say hi")
}
var _ Foo = Dog{"black dog"}
```
### 导出标识符
导出标识符是程序导入某个包，并允许调用包中已定义的变量、函数方法、struct等内容。导出标识符首字母必须为大写格式。
```go
package main

import (
	"fmt"
	"math"
)

func main() {
    // 导出的内容
	fmt.Println(math.Pi)
    // 未导出：undefined: math.pi
    fmt.Println(math.pi)
}
```
## Type
### 基本类型
Go 的基本类型有：

| 类型名 | 类型 | 描述 |
| --- | --- | --- |
| 字符串 | string | 字符串 |
| 布尔类型 | bool | true、false |
| 整形 | int, int8, int16, int32, int64
uint, uint8, uint16, uint32, uint64, uintptr | 在日常开发中，我们通常使用`int(整型，大小和操作系统位数有关)`、`uint(无符号整型，大小和操作系统位数有关)` |
| 浮点型 | float32, float64 | 浮点型 |
| 复数类型 | complex64, comples128 | 复数 |
| 比特类型 | byte | uint8的别名 |
| 字符类型 | rune | int32的别名，表示一个 Unicode 码点 |

int, uint 和 uintptr 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。 当你需要一个整数值时应使用 int 类型，除非你有特殊的理由使用固定大小或无符号的整数类型。
### 浮点类型与精度丢失
浮点数类型用于存储带小数点的数字，Go 提供了`float32`、`float64`类型，开发过程中尽量使用的`float64`，因为在运算中`float64`比`float32`误差较低。
```go
var money = 100
var f64 float64 = 30 // 整型可以赋值给浮点型

var total = float64(money) + f64
```
如果要将整型、浮点类型进行运算，必须将它们转换成为同一种数据类型才能进行运算。
整型转换为浮点型可以使用内置函数方法：`float64()`、`float32()`。
**精度丢失：**
```go
var money float64 = 0.1
var money2 float64 = 0.2
fmt.Println(money + money2) // 0.30000000000000004
```
如上所示，出现这种误差是因为精度丢失导致的。任何编程语言在计算浮点数的时候都会出现精度丢失问题，因为计算机存储数据是以二进制表示的，浮点数在转换二进制数的时候，小数点后的数据会出现部分丢失。
若要获取最精准的计算结果，可以引入第三方包`decimal`解决：
```go
import (
	"github.com/shopspring/decimal"
)

var money decimal.Decimal = decimal.NewFromFloat(0.1)
var money2 decimal.Decimal = decimal.NewFromFloat(0.2)
fmt.Println(money.Add(money2)) // 0.3
```
### 字符类型
字符串的每一个元素称为字符，字符可以从字符串操作中获取或者自行定义。Go 中的字符有以下两种：

- unit8：也成为 byte型，代表ASCII码的一个字符。
- rune：代表一个UTF-8字符，当处理中文、日文或其他符合字符时使用，它等价于 int32 类型。

ASCII码是美国信息交换标准编码，后来被国际化标准组织定位国际标准，ASCII码可以表示英文字符，但是世界上还有许多字符。于是 unicode 应运而生，它为每种语言的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台的文本转换处理要求。
Unicode 只是一个字符集，规定了每个字符的二进制编码，但是字符需要使用多少字节存储没有规定，它相当于一个行业标准，所以出现了UTF-8、UTF-16、UTF-32不同的存储形式。
### 字符串
字符串是由多个字符组合而成的，字符串赋值必须使用双引号或反引号表示。字符串在存储上类似于字符数组，所以每一位的单个元素都可以提取。
#### 转义符
双引号：支持转义，但不支持多行表示。
反引号：不支持转义，可由多行字符串组成。
```go
var a = "hello world\nGo"
var b = `hello
\n
world
`
fmt.Printf("双引号的字符串: %v\n", a)
fmt.Printf("反引号的字符串: %v\n", b)

/*

双引号的字符串: hello world
Go
反引号的字符串: hello
\n
world

*/
```
转义字符：

| 转义符 | 说明 |
| --- | --- |
| \\t | 制表符 |
| \\n | 换行符 |
| \\r | 回车符 |
| \\\\ | `\\`符 |
| \\" | `"`符 |

#### 字符串拼接
字符串拼接有五种方式实现：`+`、`fmt.Sprintf()`、`strings.Join()`、`strings.Builder`、`bytes.Buffer`。
```go
var n = "hello"
var m = "world"

fmt.Println(n + " " + m)
fmt.Println(fmt.Sprintf("%s %s", n, m))
fmt.Println(strings.Join([]string{n, m}, " "))

var builder strings.Builder
builder.WriteString(n)
builder.WriteString(" ")
builder.WriteString(m)
fmt.Println(builder.String())

var buffer bytes.Buffer
buffer.WriteString(n)
buffer.WriteString(" ")
buffer.WriteString(n)
fmt.Println(buffer.String()) // hello hello
```
#### 获取字符串长度
```go
var n = "hello world"
var m = "你好 世界"
fmt.Println("字符串n的长度：", len(n)) // 字符串n的长度： 11
fmt.Println("字符串m的长度：", len(m)) // 字符串m的长度： 13
```
字符串含有中文内容，实际长度应等于7，但是获取的长度为15。造成这一误差是因为`len()`只计算字节数长度，因为 go 的默认编码是 UTF-8，使得字符串的每个字母、空格或符号占1字节，每个中文占3字节，所以字符串m的字节数为13。
如果字符串中含有多字节的字符，我们可以使用`uft8.RuneCountInString()`或`[]rune()`获取字符串的实际长度。
```go
var n = "hello world"
var m = "你好 世界"
fmt.Println("utf8获取n的长度：", utf8.RuneCountInString(n)) // utf8获取n的长度： 11
fmt.Println("utf8获取m的长度：", utf8.RuneCountInString(m)) // utf8获取m的长度： 5

fmt.Println("[]rune()获取n的长度：", len([]rune(n))) // []rune()获取n的长度： 11
fmt.Println("[]rune()获取m的长度：", len([]rune(m))) // []rune()获取m的长度： 5
```
#### 遍历字符串
```go
var m = "你好 世界"

for i := 0; i < len(m); i++ {
    fmt.Printf("%c", m[i]) // 乱码...
}
```
上述方式是无法输出中文字符的，它与内置函数方法`len()`无法获取中文字符长度的原因一致。我们只需要将变量转换为`[]rune()`即可，如下：
```go
var m = "你好 世界"
var runeM = []rune(m)
for i := 0; i < len(runeM); i++ {
    fmt.Printf("%c", runeM[i]) // 你好 世界
}
```
当然我们有更简单的方法，也就是`range`：
```go
var m = "你好 世界"
for _, item := range m {
    fmt.Printf("%c", item) // 你好 世界
}
```
#### 字符位置与截取
在字符串中查找某个字符的索引位置，可以使用内置包`strings.Index()`或`strings.LastIndex()`实现
```go
var n = "hello-world-world-你好呀"
var m = strings.Index(n, "world")
fmt.Println("获取子字符串world的最开始位置：", m) // 获取子字符串world的最开始位置： 6

//  LastIndex返回字符串中子字符串最后出现的索引
var l = strings.LastIndex(n, "world")
fmt.Println("获取world在最末端的位置：", l) // 获取world在最末端的位置： 12

k := n[m:]
fmt.Println("截取m往后的字符串：", k) // 截取m往后的字符串： world-world-你好呀

p := n[m : m + 3]
fmt.Println("截取m位置往后的3为字符串：", p) // 截取m位置往后的3为字符串： wor
```
#### 字符串分割
```go
var n = "hello world"
var m = strings.Split(n, " ")
fmt.Printf("分割后的数据类型：%T, 值：%v\n", m, m)
// 分割后的数据类型：[]string, 值：[hello world]
```
分割后以字符串类型的切片表示
#### 字符串替换
```go
var n = "hello world world"
// -1代表全部替换
var m = strings.Replace(n, " ", "-", -1)
fmt.Println(m) // hello-world-world
// 替换一次
var k = strings.Replace(n, " ", "-", 1)
fmt.Println(k) // hello-world world
```
### 转换数据类型
转换函数`T(v)`，如：`int()`、`float64()`、`float32()`、`string()`等。如果整型和浮点型之间设计运算，建议将整型转换为浮点型再执行运算，不建议转为整型。
**整型与字符串：**
整型与字符串的相互转换由内置包`strconv`的`Itoa()`和`Atoi()`实现，如下：
```go
// 整型转换为字符串
var n = strconv.Itoa(100)
fmt.Printf("整型转换为字符串：%T\n", n) // 整型转换为字符串：string
// 字符串转换为整型
var m, _ = strconv.Atoi("100")
fmt.Printf("字符串转换为整型：%T\n", m) // 字符串转换为整型：int
```
**浮点型与字符串：**
```go
// 浮点型转换字符串
var f = 100.1234
var n = strconv.FormatFloat(f, 'f', 2, 64)
fmt.Println(n) // 100.12

// 字符串转换浮点型
var s = "100.1234"
var m, _ = strconv.ParseFloat(s, 64)
fmt.Println(m) // 100.1234
```
内置包 `strconv`还提供了许多类型转换的函数方法，具体查看标准库。
### 泛型
基本语法是在函数名后用方括号指定泛型参数，即`func 函数名[泛型参数](函数参数){}`。例如我们可以实现一个泛型版的max函数。
```go
func max[T int | float64](a, b T) T {
  if a > b {
    return a
  }
  return b
}
```
## Flow Control
### If
Go 的 if 语句与 for 循环类似，表达式外无需小括号 ( ) ，而大括号 { } 则是必须的。
```go
package main

import (
	"fmt"
)

func main() {
	sum := 2
	flag := false
	if sum > 0 {
		flag = true
	} else if sum < 0  {
		flag = false
	} else {
		flag = false
	}
	fmt.Println(flag)
}
```
**If 的简短语句：**
 if 语句可以在条件表达式前执行一个简单的语句，该语句声明的变量作用域仅在 if 之内，当然条件不是必须的。
```go
if v, err := someFn(); err != nil {
  log.Println(v)
} else {
  log.Println("err: ", err)
}
```
### Switch
```go
package main

import (
  "fmt"
  "runtime"
)

func main() {
  fmt.Print("Go run on ")

  switch os := runtime.GOOS; os {
  case "darwin":
    fmt.Println("OS X.")
  case "linux":
    fmt.Println("Linux.")
  default:
    fmt.Printf("%s.\n", os)
  }
}

// Go run on Linux.
```
Go 自动提供了在这些语言中每个 case 后面所需的 break 语句。Go 的另一点重要的不同在于 switch 的 case 无需为常量，且取值不必为整数。
switch 的 case 语句从上到下顺次执行，直到匹配成功时停止。
```go
package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println("When's Saturday?")
  today := time.Now().Weekday()

  fmt.Println(today, time.Saturday)
  switch time.Saturday {
  case today + 0:
    fmt.Println("Today.")
  case today + 1:
    fmt.Println("Tomorrow.")
  case today + 2:
    fmt.Println("In two days.")
  default:
    fmt.Println("Too far away.")
  }
}
```
#### fallthrough
`fallthrough`关键词，可以在匹配成功后继续下面的执行：
```go
var finger = 1
// 五指拳心剑
switch finger {
  case 1:
  fmt.Println("大拇指")
  fallthrough
  case 2:
  fmt.Println("食指")
  fallthrough
  case 3:
  fmt.Println("中指")
  case 4:
  fmt.Println("无名指")
  case 5:
  fmt.Println("小拇指")
  default:
  fmt.Println("没了...")
}
/*
    大拇指
    食指
    中指
*/
```
#### 没有条件的 Switch
```go
package main

import (
  "fmt"
  "time"
)

func main() {
  t := time.Now()
  switch {
  case t.Hour() < 12:
    fmt.Println("Good morning!")
  case t.Hour() < 17:
    fmt.Println("Good afternoon.")
  default:
    fmt.Println("Good evening.")
  }
}
```
没有条件的 switch 同 switch true 一样。
### For
Go 只有一种循环结构：for 循环。
```go
for 变量初始值; 判断条件; 变量控制 {
    执行语句
}
for 变量初始值; 判断条件 {
    执行语句
}
for 判断条件 {
    执行语句
}
for {
    执行语句
}
```

- 初始化语句通常为一句短变量声明，该变量声明仅在 for 语句的作用域中可见。
- 条件表达式的布尔值为 false，循环迭代就会终止。
```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```
**注意**：和 C、Java、JavaScript 之类的语言不同，Go 的 for 语句后面的三个构成部分外没有小括号， 大括号 { } 则是必须的。
#### for 是 Go 中的 `while`
```go
sum := 1
for sum < 1000 {
  sum += sum
}
fmt.Println(sum)
```
#### 无限循环
```go
for {
  break
}
```
如果省略循环条件，该循环就不会结束，除非使用 break。
#### for range
`trialBalanceItem`是`trialBalance`的拷贝，所以我们不能直接影响原切片。
```go
for _, trialBalanceItem := range trialBalance {
  for _, account := range accounts {
    if trialBalanceItem.AccountCode == account.Code {
      trialBalanceItem.AccountName = I18nName(account.Name)
      trialBalanceItem.Category = I18nName(account.Category)
    }
  }
}
```
以上修改是不成功的，我们可以改为以下方式：
```go
for i, _ := range trialBalance {
  // 如果直接使用 `trialBalance[i]` 则无法影响原始切片中的元素
  var trialBalanceItem = &trialBalance[i]
  for _, account := range accounts {
    if trialBalanceItem.AccountCode == account.Code {
      trialBalanceItem.AccountName = I18nName(account.Name)
      trialBalanceItem.Category = I18nName(account.Category)
    }
  }
}
```
需要注意的是切片元素是指针类型时才能影响切片
#### break 越级终止循环
当程序执行 for、switch、select 语句的时候，如果在特定条件下需要终止当前操作可以使用关键词 break 实现。
在 switch、select 语句程序能够中止是因为 case 语句默认设置了关键词 break。
break 在 for 语句中最为常用，而且使用非常简单，只要在 for 语句中写入关键词 break 即可。在实际开发中语句嵌套非常常见：for 嵌套、for-switch 嵌套等等。出现这种情况我们需要能够越级终止循环，如下：
```go
for1:
for i := 0; i < 3; i++ {
  for2:
  for j := 1; j < 10; j++ {
    if j >= 5 {
      fmt.Printf("i:%v j:%v\n", i, j) // i:0 j:5
      break for2
    }
    // 直接终止外层 for1 的循环
    if i >= 1 {
      fmt.Printf("i:%v j:%v\n", i, j) // i:1 j:1
      break for1
    }
  }
}
```

- `for1`是自定义标签名，如果 break 不指定标签名则终止当前的循环。
#### continue
关键词 continue 只适用于 for 循环，它是跳过本次循环直接进入下一个循环，在关键词 continue 后面的代码不再执行
```go
for1:
for i := 0; i < 3; i++ {
  for j := 1; j < 10; j++ {
    if j >= 5 {
      fmt.Printf("i:%v j:%v\n", i, j)
      continue for1
    }
  }
}
/*
i:0 j:5
i:1 j:5
i:2 j:5
*/
```
同样，我们也可以使用 continue 跳过指定的标签。

- `for1`是自定义标签名，如果 continue 不指定标签名则跳出当前的循环。
### goto 跳到指定代码
关键词 goto 通过标签进行代码之间的无条件跳转，它不仅能快速跳出循环，还能简化重复性的代码。定义的标签名以及代码必须在 goto 关键词后面，否则程序会陷入无限循环。
```go
for i := 1; i < 5; i++ {
    if i == 2 {
        goto gofunc
    }
    fmt.Printf("本次循环次数为：%v\n", i)
}
gofunc:
fmt.Printf("使用 goto 跳转\n")

/*
本次循环次数为：1
使用 goto 跳转
*/
```
### Defer
defer 语句会将函数推迟到外层函数返回之后执行。
推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用。
```go
package main

import "fmt"

func main() {
  defer fmt.Println("world")
  fmt.Println("hello")
}

/*
hello
world
*/
```
推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。
```go
package main

import "fmt"

func main() {
  fmt.Println("counting")

  for i := 0; i < 10; i++ {
    defer fmt.Println(i)
  }
  fmt.Println("done")
}

/*
counting
done
9
8
7
6
5
4
3
2
1
0
*/
```
## 指针
指针是一个用来指向内存地址的变量，指针一般出现在机器语言中，如果汇编或C语言。
![4b9bb698b62e3bfe5830d360792348b.jpg](https://cdn.nlark.com/yuque/0/2024/jpeg/21870146/1711704614053-8672a220-f33c-4446-b023-469e42f68982.jpeg#averageHue=%239c988f&clientId=uc5d6faab-2f46-4&from=paste&height=640&id=u095c4d77&originHeight=1280&originWidth=2965&originalType=binary&ratio=2&rotation=0&showTitle=false&size=906221&status=done&style=none&taskId=uab25c2df-55a8-4e52-be19-01bea43d854&title=&width=1482.5)
在定义变量的时候，计算机都会为变量自动分配内存地址，指针用来存储这些变量的内存地址。为什么 Go 定义变量必须声明数据类型？因为不同类型的数据占用不同的存储空间，导致内存地址分配大小各不相同，所以指针只能存放同一类型变量的内存地址，比如整型的指针只能存储整型的变量地址。
Go 的指针变量也会分配内存地址，但它的值用来存放其他变量的内存地址，指针变量分为两种：类型指针和切片指针，如下：

- 类型指针允许对数据进行修改，直接使用指针传递数据，无需复制数据，但类型指针不能进行偏移和运算。
- 切片指针是切片类型的指针，它包含起始元素的原始指针、元素数量和容量。

**指针的概念：**

1. 指针也称指针变量，用来存放内存地址的变量，内存地址的数据格式：`0xcXXXXXXX`。指针是一个变量，也有自己的内存地址，它存放的内存地址是另一个变量的内存地址。
2. 指针类型是用于明确指针存放的内存地址大小。
3. 指针赋值将某个变量的内存地址复制给指针，在某个变量前面使用取地址操作符`&`。
4. 指针取值从指针变量通过某个变量的内存地址获取对应的数值，只需在指针变量前面使用取值操作符`*`。
```go
// 类型 *T 是指向 T 类型值的指针。其零值为 nil。
var p *int // 声明一个 int 类型的指针

i := 42
p = &i // & 获取内存地址并赋值给指针
fmt.Println(*p) // 通过 * 读取指针 p 存储的内存地址（也就是i）
*p = 21         // 通过 * 设置指针 p 存储的内存地址（也就是i）
```
### 切片指针
切片是一种比较特殊的数据结构，这种数据结构更便于使用和管理数据集合。切片是围绕动态数组的概念构建的，可以按需自动增长和缩小。
Go 的切片指针是以切片表示的，切片的每个元素只能存放内存地址，切片指针的语法如下：
```go
var name []*T // 第一种
name := []*T{} // 第二种
```
切片指针可以将多个变量的内存地址存放在切片中，这样方便管理多个变量，当需要修改某个变量时，由于变量的内存地址是不会改变的，直接修改变量或从切片指针修改变量即可，修改后的数据都会同步到变量和切片指针中。
```go
var pslice []*string
fmt.Printf("切片指针的元素：%v, 内存地址: %v\n", pslice, pslice) // 切片指针的元素：[], 内存地址: []

var a = "a"
var b = "b"
fmt.Printf("变量a, b的内存地址：%v, %v\n", &a, &b) // 变量a, b的内存地址：0xc000014290, 0xc0000142a0
pslice = append(pslice, &a, &b)
fmt.Printf("切片指针的元素：%v\n", pslice) // 切片指针的元素：[0xc000014290 0xc0000142a0]

for _, v := range pslice {
  fmt.Printf("切片指针的元素所对应值：%v\n", *v)
  // 切片指针的元素所对应值：a
  // 切片指针的元素所对应值：b
}

*pslice[0] = "hello"
fmt.Printf("修改后的变量值为：%v\n", a) // 修改后的变量值为：hello

*pslice[1] = "world"
fmt.Printf("修改后的变量值为：%v\n", *pslice[1]) // 修改后的变量值为：world
```

- 切片指针定义后，如果没有初始值，默认为空。go 语言不会分配内存地址，因此无法通过 `&`获取切片指针的内存地址。
- 切片指针只能存入内存地址，也就是`&`获取的变量。
- `for-range` 循环输出切片指针，只能输出存放在切片指针的内存地址，如果需要通过内存地址获取对应数值，需要使用取值操作符`*`。
- 修改变量的值不会改变变量的内存地址，所以切片的值会跟随改变。同样，修改切片指针的值也会直接改变a或b变量的值。
### 指针的指针
`指针的指针 -> 指针 -> 变量`，如下：
![af9cd443639741f51f39f86c14d57ae.jpg](https://cdn.nlark.com/yuque/0/2024/jpeg/21870146/1711713779585-4bd4ed86-8ed7-439f-b9e8-548a1f6f7920.jpeg#averageHue=%23d8d8d8&clientId=uc5d6faab-2f46-4&from=paste&height=640&id=u911e6019&originHeight=1280&originWidth=2186&originalType=binary&ratio=2&rotation=0&showTitle=false&size=649573&status=done&style=none&taskId=u4666cb99-4013-4ea1-80a1-4ae04a213ac&title=&width=1093)
```go
var name **T // 定义指针的指针
v := **name // 从指针的指针获取某个变量的值
```
```go
var str = "hello"
var ptr *string
var pptr **string

ptr = &str
pptr = &ptr

// 指针的指针 pptr 取变量 str 的值：hello
fmt.Printf("指针的指针 pptr 取变量 str 的值：%v\n", **pptr)
```
## 内置容器
### 数组
数组是一个由固定长度的特定类型元素组成的序列。由于数组的长度是固定的，一般使用的都是切片。
语法：
```go
var name [number]T
// 定义并初始化
var name = [number]T{v1, v2, v3}
// 根据下标设置初始值
var name = [number]T{0: v1, 2: v3}
// 根据初始化设置数组长度
var name [...]T{v1, v2, v3}
```
**多维数组：**
```go
var name [number1][number2]...[number3]T
```
**数组比较：**
```go
a := [...]int{1, 2, 3}
b := [...]int{1, 2, 3}
a == b // true
```

- 拥有相同长度的数组才可以比较。
- 元素内容完全相同才为 true。
### 切片
切片是一种比较特殊的数据结构，这种数据结构更便于使用和管理数据集合。切片是围绕动态数组的概念构建的，可以按需自动增长和缩小。总的来说，切片可以理解为动态数组，并根据切片中的元素自动调整切片长度。
```go
// 定义切片
var name []T
// 定义切片并赋值
var name = []T{v1, v2}
// 使用 make() 定义切片
var name = make([]T, len)
```
#### 新增切片元素与切片拼接
由于切片是动态数组，即使在定义的时候设置了切片长度，我们还能通过 append 向切片添加新的元素。
```go
var ss = append(slice, elems...)
```
原有切片与 append 返回的切片是两个独立的切片。
**切片拼接：**
```go
var slice1 = []int{1, 2, 3}
var slice2 = []int{4, 5, 6}
var ss = append(slice1, slice2...)
```
#### 截取切片元素与删除切片
```go
var s = slice[startIndex, endIndex]
```
```go
var ss = []int{1, 2, 3, 4, 5, 6, 7}
var s1 = ss[1:4] //  2, 3, 4
var s2 = ss[:] // 1, 2, 3, 4, 5, 6, 7
var s3 = ss[2:] // 3, 4, 5, 6, 7
var s4 = ss[:2] // 1, 2
var s5 = ss[:len(ss) - 2] // 1, 2, 3, 4, 5
```
**删除切片：**
若要删除切片的部分元素，首先使用切片截取，过滤掉不需要的切片元素，保留需要的一切元素。如下：
```go
var ss = []int{1, 2, 3, 4, 5, 6, 7}
ss = append(ss[:2], ss[len(ss)-1:]...)
fmt.Println(ss) // [1 2 7]
```
#### 复制切片
go 的 内置函数 `copy()`可以将一个切片(数组)复制到另一个切片(数组)中。
```go
var s1 = []int{1, 2, 3}
var s2 = []int{4, 5, 6}
copy(s1, s2)
fmt.Println(s1, s2) // [4 5 6] [4 5 6]

// 个数不同 
var s1 = []int{1, 2, 3}
var s2 = []int{4, 5, 6, 7}
copy(s1, s2)
fmt.Println(s1, s2) // [4 5 6] [4 5 6 7]
```

- copy 的 s1 会被 s2 的元素覆盖。
- 如果切片元素个数不同，只会覆盖 s1 存在的个数。
#### 切片的长度和容量
切片拥有 **长度** 和 **容量**。
切片的长度就是它所包含的元素个数。
切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。
切片 s 的长度和容量可通过表达式 len(s) 和 cap(s) 来获取。
```go
package main

import "fmt"

func main() {
  s := []int{2, 3, 5, 7, 11, 13}
  printSlice(s)

  // 截取切片使其长度为 0: len=0 cap=6 []
  s = s[:0]
  printSlice(s)

  // 拓展其长度: len=4 cap=6 [2 3 5 7]
  s = s[:4]
  printSlice(s)

  // 舍弃前两个值: len=2 cap=4 [5 7]
  s = s[2:]
  printSlice(s)

}

func printSlice(s []int) {
  fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```
当切片长度大于容量的时候，Go 将原有容量扩大至两倍。
#### 修改切片会改变底层数组
切片并不存储任何数据，它只是描述了底层数组中的一段。
更改切片的元素会修改其底层数组中对应的元素。
与它共享底层数组的切片都会观测到这些修改。
```go
var names = [4]string{
  "John",
  "Paul",
  "George",
  "Ringo",
}
fmt.Println(names) // [John Paul George Ringo]
var a = names[0:2]
var b = names[1:3]
fmt.Println(a, b) // [John Paul] [Paul George]

b[0] = "XXX"
fmt.Println(names) // [John XXX George Ringo]
fmt.Println(a, b)  // [John XXX] [XXX George]
```
### Map
Map 是一种无需的键值对的集合，它通过 `key`来快速检索值。
```go
// 定义 map
var m map[T]T
var m = map[T]T{}
// 定义并赋值
var m = map[T]T{key: value}
// 使用 make 函数定义
var m = make(map[T]T)
```
#### 修改 map
在映射 m 中插入或修改元素：
```go
m[key] = elem
```
获取元素：
```go
elem = m[key]
// 检测键是否存在
elem, ok = m[key]
```

- 若 key 在 m 中，ok 为 true ；否则，ok 为 false。
- 若 key 不在映射中，那么 elem 是该映射元素类型的零值

删除元素：
```go
delete(m, key)
```
#### map 与 JSON 转换
json 与 map 十分类似，但是 go 是静态强类型语言，因此会存在差异无法描述 json 中的 `key`/`value`。
**json 转换为 map：**
```go
var j = `{"infos":[{"name":"Tom","age":15},{"name":"Lily","age":20}]}`
var m map[string]interface{} // interface{} 与 any 没有区别
err := json.Unmarshal([]byte(j), &m)
fmt.Println(m) // map[infos:[map[age:15 name:Tom] map[age:20 name:Lily]]]
if err != nil {
    log.Println("parse error: ", err)
}

for k, v := range m {
    fmt.Printf("m 的 key：%v\n", k)
    fmt.Printf("m 的 value：%v\n", v)
    // 解析json里面的数组
    vv := v.([]interface{})
    for i := 0; i < len(vv); i++ {
        fmt.Printf("数组vv的值为：%v\n", vv[i])
        // 解析数组里面的集合
        vvv := vv[i].(map[string]interface{})
        name := vvv["name"]
        age := vvv["age"]
        fmt.Printf("key 为 name 的数据为：%v\n", name)
        fmt.Printf("key 为 age 的数据为：%v\n", age)
    }
}
```
**map 转换为 json：**
```go
var m = map[string]any{
  "infos": []map[string]any{
    {
      "name": "Tom",
      "age":  14,
    },
    {
      "name": "Lily",
      "age":  20,
    },
  },
}
data, _ := json.Marshal(&m)
fmt.Printf("JSON的数据为：%v\n", string(data))
// JSON的数据为：{"infos":[{"age":14,"name":"Tom"},{"age":20,"name":"Lily"}]}
```
### 列表
![c261b8e90767ebe4f123601aa6521c0.jpg](https://cdn.nlark.com/yuque/0/2024/jpeg/21870146/1711727838672-069efd65-2ffe-453a-84b7-9f5acbbe6e3a.jpeg#averageHue=%23eeeeee&clientId=u73b04f77-ab77-4&from=paste&height=640&id=ud53f8f8e&originHeight=1280&originWidth=2043&originalType=binary&ratio=2&rotation=0&showTitle=false&size=513055&status=done&style=none&taskId=ude6d7f15-9d86-45b8-9274-d58bcbe7af7&title=&width=1021.5)
在 go 中列表使用内置包`container/list`实现，内部原理是双链表结构，能够搞笑地进行任意位置元素的插入和删除操作。
```go
var name list.List // 方式一
var name = list.New() // 方式二
```
#### 列表元素操作
列表操作只有新增、插入和删除元素，内置包提供了 6 个函数方法实现新增元素，如下：
```go
var li list.List

fmt.Printf("列表li：%v\n", li)

li.PushBack("a")
li.PushFront(66)

var li2 = list.New()
fmt.Printf("列表li2：%v\n", li)
var e1 = li2.PushBack("abc")
li2.InsertAfter("def", e1)  // 在元素后插入
li2.InsertBefore("ghi", e1) // 在元素前插入

li2.PushBackList(&li)  // 将 li 加入到 li2 后面
li2.PushFrontList(&li) // 将 li 加入到 li2 前面
```
**删除元素：**
```go
var li list.List
element := li.PushBack("abc")
li.Remove(element)
```
#### 遍历列表元素
列表是双链表结构，需要使用 front 函数获取首个元素，下一次便利再调用 next 获取下一个元素，为空后终止。
```go
var li list.List
li.PushBack("Tom")
li.PushBack("Lily")
li.PushBack("Mary")

for i := li.Front(); i != nil; i = i.Next() {
    fmt.Printf("列表 li 的元素是：%v\n", i.Value)
}
/*
列表 li 的元素是：Tom
列表 li 的元素是：Lily
列表 li 的元素是：Mary
*/
```
循环 for 循环与 remove 结合，删除整个列表的元素，如下：
```go
var li list.List
fmt.Println(li)
li.PushBack("Tom")
li.PushBack("Lily")
li.PushBack("Mary")

var next *list.Element
for i := li.Front(); i != nil; i = next {
    next = i.Next()
    li.Remove(i)
}
fmt.Println(li.Len()) // 0
```
**函数列表：**

| 函数 | 说明 |
| --- | --- |
| Front() | 获取首个元素 |
| Back() | 获取最后一个元素 |
| Next() | 获取下一个元素 |
| Prev() | 获取上一个元素 |
| MoveToBack() | 将元素移动到最后 |
| MoveToFront() | 将元素移动到最前 |

## 函数
函数的目的是将一个需要多行代码的复杂问题分解为简单任务来解决，而且同一个函数可以被多次调用，有助于重用。Go 是编译型语言，因此函数编写顺序不影响程序运行，但威龙提高代码的可读性，最好把自定义函数写在主函数 `main()` 前面。
语法：
```go
// 写法一
func add(x int, y int) int {
  return x + y
}
// 写法二，同类型省略
func add(x, y int) int {
  return x + y
}
// 写法三，多值返回
func swap(x, y string) (string, string) {
  return y, x
}
// 写法四，命名返回值
func swap() (result string, err error) {
  result = "hello, world!" // 返回值中已经声明，可以直接使用
  return result, err
}
// 写法四，根据命名变量自动返回
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}
```
### 不定参数
Golang 可变参数本质上就是 slice。只能有一个，且必须是最后一个。在参数赋值时可以不用用一个一个的赋值，可以直接传递一个数组或者切片，特别注意的是在参数后加上`…`即可。
```go
func myfunc(args ...int) {    //0个或多个参数
}

func add(a int, args…int) int {    //1个或多个参数
}

func myfunc(args ...interface{}) { // 任意类型的不定参数
}
```
注意：其中args是一个slice，我们可以通过`arg[index]`依次访问所有参数,通过`len(arg)`来判断传递参数的个数。
同样，我们也可以将`slice`作为参数传递给函数
```go
func test(s string, n ...int) string {
  var x int
  for _, i := range n { // 循环不定参数
    x += i
  }
  return fmt.Sprintf(s, x)
}
res := test("sum: %d", s...)    // slice... 展开slice
```
### 匿名函数与函数变量
```go
var myFunc = func() {

}
var m func()
m = myFunc
m()
```
一个函数可以理解为一个变量，函数定义等于设置变量值，关键词 func 作为变量的数据类型。
### 函数值
函数也是值。它们可以像其它值一样传递。
函数值可以用作函数的参数或返回值。
```go
package main

import (
  "fmt"
  "math"
)

func compute(fn func(float64, float64) float64) float64 {
  return fn(3, 4)
}

func main() {
  hypot := func(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
  }
  fmt.Println(hypot(5, 12))
  fmt.Println(compute(hypot))
  fmt.Println(compute(math.Pow))
}
```
### 闭包
引用外部变量的函数称为闭包，即使已经离开了引用环境也不会被释放或删除，在闭包中可以继续使用这个变量。
```go
func adder() func(int) int {
  var x = 10
  return func(y int) int {
    x += y
    return x
  }
}

var f = adder()
fmt.Println(f(10)) // 20
fmt.Println(f(20)) // 40

var f1 = adder()
fmt.Println(f1(1000)) // 1010
fmt.Println(f1(2000)) // 3010
```

1. 封装数据：闭包可以将变量和函数封装在一个作用域内，避免全局变量的污染，同时也可以隐藏一些细节，提供更加清晰的接口。
2. 保持状态：闭包可以在函数执行完毕后，仍然保持外部函数的状态。这意味着闭包可以记住函数执行时的上下文环境，包括变量的值和状态，使得函数可以在之后的调用中继续使用这些状态。
3. 实现私有变量：闭包可以在函数内部创建局部变量，并将其保留在内存中，即使函数执行完毕。这使得这些变量对外部是不可见的，实现了一种类似于私有变量的效果。
4. 高阶函数的参数和返回值：闭包可以作为高阶函数的参数或返回值，使得函数可以更加灵活地组合和使用。
### 递归
函数在一个函数中调用自身，就成了递归函数。递归函数是通过不断调用自身代码，当达到特定条件时才终止调用规程。
```go
func fibonacci(n int) int {
  if n < 2 {
    return n
  }
  return fibonacci(n-2) + fibonacci(n-1)
}
for i := 1; i <= 10; i++ {
  fmt.Print(fibonacci(i), " ") // 1 1 2 3 5 8 13 21 34 55
}
```
## 结构体
### 面向对象
面向对象是一种设计思想。它是一种对现实世界理解和抽象的方法，是计算机编程发展到一定阶段后的产物。相对于面向过程，面向对象把相关的数据和方法组织为一个整体看待，从更高的层次来进行系统建模，更贴近事物的自然运行模式。
大部分的编程语言都使用 class 定义对象，表示类的特征，但是 Go 不是一个纯面对对象的编程语言，它采用更灵活的结构体代替了类。它没有沿袭传统面向对象编程的概念，比如继承、类方法和构造方法等，虽然 Go 没有继承和多态，但是可以通过匿名字段实现继承，通过接口实现多态。
### 结构体的定义与实例化
结构体使用关键词 type 定义，是一种复合的基本类型，它里面的成员可以是任意数据类型。
```go
type name struct {
  field1 T
  field2 T
}
```
例子：
```go
type person struct {
	name string
	age  int
}

// 实例化方法一
var p = person{
    name: "Jesse",
    age:  18,
}
// 实例化方法二
var p1 person
p1.name = "Jesse"
p1.age = 18
// 实例化方法三，使用 new() 实例化
var p2 = new(person)
p2.name = "Jesse"
p2.age = 18
// 实例化方法四，取结构体实例化的内存地址
var p3 = &person{}
p3.name = "Jesse"
p3.age = 18
```
### 指针方式的实例化
在实例化结构体的时候，可以使用内置函数方法`new()`和`&`实现，这两种实例化方法都是由指针方式完成的，在访问成员的时候也是使用`.`，但编译器自动将其转换为`(*instance).xxx`形式访问。
**指针方式的真正用法：**
```go
type person struct {
	name string
	age  int
}

var p3 *person = new(person)
(*p3).name = "jesse"
(*p3).age = 18

var p4 *person = &person{}
(*p4).name = "jesse"
(*p4).age = 18
```
### 结构体标签
在定义结构体的时候，我们还可以为每个成员添加`tag`，它是一个附属于成员的字符串，代表文档或其他中药的标记。比如：解析JSON、ORM框架等。
```go
type name struct {
  field1 T `key1:"value1" key2:"value2"`
  field2 T `key1:"value1" key2:"value2"`
}
```
例子：
```go
type Student struct {
  Name  string `json:"name"`
  Age   int    `json:"age"`
  Score int    `json:"score"`
}

var student = Student{
  Name:  "张三",
  Age:   22,
  Score: 88,
}

data, _ := json.Marshal(student)
fmt.Println(string(data)) // {"name":"张三","age":22,"score":88}
```
如果需要转换为 JSON 需要注意：

- 如果结构体的每个成员不是导出标识符（首字母大写），`encoding/json`无法成功获取每个成员的数据。
- 但是首字母改为大写格式，我们需要它是小写或其他的 key，我们可以使用 tag 来转换它。

转换结构体的本质：通过反射机制从结构体成员获取标签，将标签内容作为 JSON 的 key，成员值作为 JSON 的值。
### 匿名结构体与匿名成员
**匿名结构体：**
```go
// 定义匿名结构体
var p struct {
  name string
  age int
}
p.name = "Jesse"
p.age = 18

// 定义匿名结构体并赋值
var p1 = struct {
  name string
  age int
} {
  name: "Jesse",
  age: 18,
}
```
**匿名成员：**
```go
type person struct {
  string
  int
  float64
  bool
}

// 实例化结构体
var p = person{
  "Tim",
  20,
  180.8,
  true,
}

// 访问匿名成员并输出
fmt.Printf("结构体匿名成员 string 的值：%v\n", p.string)
fmt.Printf("结构体匿名成员 int 的值：%v\n", p.int)
fmt.Printf("结构体匿名成员 float64 的值：%v\n", p.float64)
fmt.Printf("结构体匿名成员 bool 的值：%v\n", p.bool)
```
### 结构体嵌套
由于结构体的成员可以设置自定义的数据类型，如果成员的数据类型为另一个结构体，就可以实现结构体的嵌套。
```go
type cars struct {
    name  string
    price int
}
type person struct {
    name string
    age  int
    cars cars
}

var c = cars{
    name:  "XIAOMI SU7",
    price: 280000,
}
var p = person{
    name: "Jesse",
    age:  18,
    cars: c,
}
fmt.Printf("%+v", p) // {name:Jesse age:18 cars:{name:XIAOMI SU7 price:280000}}
```
结构体 cars 嵌套在 person 的成员中，使得 person 具备 cars 的所有成员。如果从面向对象角度分析，子类 person 继承了父类 cars。
**匿名结构体嵌套：**
```go
type person struct {
  name string
  age  int
  cars struct {
    name  string
    price int
  }
}

var p = person{
  name: "Jesse",
  age:  18,
  cars: struct {
    name  string
    price int
  }{
    name:  "BWM",
    price: 500000,
  },
}
fmt.Printf("%+v", p) // {name:Jesse age:18 cars:{name:BWM price:500000}}
```
我们在 person 中定义了匿名结构体，它能直观的看出结构体的数据结构，但是无法再其他代码中使用，某种程度上不符合复用的设计思想。
### 自定义构造函数
构造函数又称为工厂函数，它是以函数方式实例化结构体，在实例化过程中按照规则对各个结构体成员进行赋值操作，并且能减少函数或主函数的代码冗余。
构造函数的参数可以选择性作为结构体的成员值，如果没有参数，结构体的成员值在函数内生成或使用默认值；函数返回值是结构体的实例化变量，并且你指针形式表示。
```go
// 定义构造函数
func getCat() *cat {
  var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))
  var n = rnd.Intn(10)

  var name, ambient, style string
  var weight int

  if n <= 5 {
    name = "tiger"
    weight = 500
    ambient = "山林"
    style = "独居"
  } else {
    name = "lion"
    weight = 300
    ambient = "草原"
    style = "群居"
  }

  // 实例化结构体
  var c = cat{
    name:   name,
    weight: weight,
    habit: struct {
      ambient string
      style   string
    }{
      ambient: ambient,
      style:   style,
    },
  }
  return &c
}

// 调用构造函数，获取实例化的指针（也可以说这是一次实例化）。
var c = getCat()
fmt.Printf("%+v", c) // &{name:tiger weight:500 habit:{ambient:山林 style:独居}}
```
### 结构体方法
结构体方法的定义过程与传统的类方法有所不同，类方法定义在类中，结构体方法定义在结构体之外，Go 将结构体和结构体方法进行解耦操作，使代码设计更加灵活。
在 Go 中，函数与方法代表不同的概念，函数是独立的，方法是指结构体方法，它依赖于结构体。
```go
type person struct {
  name string
  age  int
}

// 指针接收者
func (p *person) getName(name string) string {
  return name
}
// 值接收者
func (p person) getName(name string) string {
  return name
}

var p = person{name: "Jesse", age: 18}
p.getName("Jesse")
```

- 值接收者通过数据拷贝方式传递给方法，如果结构体数据较多，需要考虑资源占用情况。
- 指针接收者可以修改结构体成员的数据，而值接收者不可以。
## Interface
Go 提供了一种称为接口的数据类型，它代表一组方法的集合。接口的组合、嵌套和鸭子类型等实现了代码复用、解耦和模块化等特性，而接口是方法动态分派、反射的基础功能。
接口设计是非侵入式的，接口设计者无需知道接口被那些类型实现。而接口使用者只需知道实现增员的接口，无需知名实现哪一个接口。编译器在编译时就会知道哪个类型实现哪个接口，或者接口应该由谁来实现。
接口是双方约定的一种合作协议，它是一种类型，也是一种抽象结构，不会暴露所含数据格式、类型及结构。
```go
type interfaceName interface {
  method (parameter) [T]
}
```
例子：
```go
type actions interface {
  walk()
  runs() (int, int)
  speak(content string, speed int)
  reset(sleepTime int) int
}
type cat struct {
  name string
}

// 定义接口方法的功能逻辑
func (c *cat) walk() {
  fmt.Printf("%v在散步\n", c.name)
}
func (c *cat) runs() (int, int) {
  fmt.Printf("%v在跑步\n", c.name)
  var speed = 10
  var time = 1
  return speed, time
}
func (c *cat) speak(content string, speed int) {
  fmt.Printf("%v在说话：%v, 语速：%v\n", c.name, content, speed)
}
func (c *cat) reset(sleepTime int) int {
  fmt.Printf("%v在休息，入睡时间：%v小时\n", c.name, sleepTime)
  return sleepTime
}

// 定义接口变量
var a actions
// 结构体实例化
var c = cat{name: "kitty"}
// 结构体绑定接口，结构体实例化变量的指针赋值给接口变量
a = &c

// 调用接口中的方法
a.walk()
var speed, time = a.runs()
fmt.Printf("跑步速度：%v, 跑步时间：%v\n", speed, time)
a.speak("喵喵喵", 2)
var sleepTime = a.reset(10)
fmt.Printf("入睡时间：%v小时\n", sleepTime)
```

- 将结构体绑定接口，结构体必须为接口中的每个方法定义相应的结构体方法，否则程序提示`as some methods are mission`异常。
- 接口变量 a 只能调用 actions 中定义的方法，如果结构体 cat 还定义了接口 actions 之外的方法，接口变量 a 是无法调用的，并且也无法访问结构体成员。
### 鸭子类型
很多编程语言都支持鸭子类型，通常鸭子类型是动态编程语言用来实现多态的一种方式。
比方说，深圳的大黄鸭。从入门认知的角度分析，它并不是真正的鸭子，因为它没有生命。但是从鸭子类型角度来看，它就是一只鸭子。鸭子类型原意是：只要走起来像鸭子，或者游泳姿势像鸭子，或者叫声像鸭子，那么它就是一只鸭子。用官方解释：鸭子类型只关心事物的外部行为而非内部结构。
我们知道接口方法必须与结构体进行绑定，在使用上造成诸多不便。如果将结构与结构体的绑定过程以函数实现，只要传入结构体实例化变量就能自动执行接口方法：
```go
type actions interface {
  speak(content string)
}
type duck struct {
  name string
}
type cat struct {
  name string
}

func (d *duck) speak(content string) {
  fmt.Printf("%v在说话：%v\n", d.name, content)
}
func (c *cat) speak(content string) {
  fmt.Printf("%v在说话：%v\n", c.name, content)
}
// 实现多态
func speaking(a actions, content string) {
  a.speak(content)
}

func autoSpeaking(actions []actions, msg []string) {
  for i, v := range actions {
    speaking(v, msg[i])
  }
}

var d = duck{name: "唐老鸭"}
var c = duck{name: "凯蒂猫"}
var speakList = []actions{&d, &c}
var speakMsg = []string{"嘎嘎嘎", "喵喵喵"}
autoSpeaking(speakList, speakMsg)
```

- 这是一种典型的多态，当我知道接口 actions 有 speak 方法之后，我可以根据这些方法进行复用。再增加新的动物，它也能自动的说话了。
### 多态与工厂函数
多态是指不同数据类型的结构提供统一接口，由于接口与结构体通过赋值方式实现绑定关联，因此一个接口能适用于不同的结构体，但前提条件是必须定义好相应的结构体方法。
多态的作用：

- 代码复用：通过继承和接口实现多态，可以使多个类共享相同的接口定义和部分实现，避免重复编写相似的代码，提高代码的复用性。
- 可替换性：多态允许不同的对象类型在同一行为接口下进行替换。这意味着，我们可以使用基类或接口类型的引用来引用派生类的对象，从而在运行时动态地确定需要调用的方法或属性。
- 扩展性：通过多态，我们可以方便地添加新的子类，实现对程序的扩展，而不需要修改已有的代码。这符合面向对象编程的开放-封闭原则。
- 简化代码逻辑：多态可以使代码逻辑更加清晰简洁，因为我们只需要关注对象的接口和行为，而无需关心具体对象的类型。

多态应用还可以使用工厂函数将多个结构体按照某种规则执行实例化，并完成接口的绑定过程，如下：
```go
type actions interface {
  speak(content string)
}
type duck struct {
  name string
}
type cat struct {
  name string
}

func (d *duck) speak(content string) {
  fmt.Printf("%v在说话：%v\n", d.name, content)
}
func (c *cat) speak(content string) {
  fmt.Printf("%v在说话：%v\n", c.name, content)
}

// 根据工厂函数的返回值绑定接口
func factory(name string) actions {
  switch name {
    case "duck":
    // 实例化并返回，同时绑定接口
    return &duck{name: "唐老鸭"}
    case "cat":
    return &duck{name: "凯蒂猫"}
    default:
    panic("No such animal")
  }
}

var f1 = factory("duck")
f1.speak("嘎嘎嘎")
var f2 = factory("cat")
f2.speak("喵喵喵")
```
### 接口的自由组合
接口嵌套是在一个接口中嵌套另一个接口，通过接口嵌套能使接口之间形成简单的继承关系，但接口之间不具备重写功能，即多个接口嵌套组成一个新的接口，每个接口的方法都是唯一的。
```go
type leg interface {
  run()
}
type mouth interface {
  speak(content string)
}
type actions interface {
  leg
  mouth
  run()
}
```
接口嵌套运行在不同接口中定义相同的方法名，但是方法的参数和返回值必须一致，否则会报错。
接口嵌套通过多个接口组成一个接口，使代码设计变得更加灵活，为了降低接口之间的方法命名冲突，各个接口的方法名称尽量保持不同，建议使用`接口名称+方法名称`的组合方式命名。如下：
```go
type leg interface {
  legRun()
}
type mouth interface {
  mouthSpeak(content string)
}
type actions interface {
  leg
  mouth
  actionsRun()
}
```
### 空接口
空接口是指定义接口的时候，接口中没有设置任何方法。空接口可以保存任意数据。
```go
type empty interface{}
var e empty
e = "hello world"
e = 100
e = true
fmt.Println(e) // true
```

- `any`与空接口都能保存任意类型的数据。
- 空接口在没有赋值时，数据和类型都是 `nil`，在赋值后进行对应变化。
- 切片、map、结构体使用空接口可以给成员设置任意的数据。
- 空接口也可以作为函数的参数和返回值。
- 虽然空接口可以将我们的代码编写变得灵活，但会耗费计算机的性能和资源。
### 类型断言
**类型断言** 提供了访问接口值底层具体值的方式。
为了 **判断** 一个接口值是否保存了一个特定的类型，类型断言可返回两个值：其底层值以及一个报告断言是否成功的布尔值。
```go
v, ok := x.(T)
```
若 x 存在断言的类型，那么 ok 为 true, v 将会是其底层值 。否则，ok 将为 false 而 v 将为断言类型的零值，程序并不会产生 panic。
```go
func do(i interface{}) {
  switch v := i.(type) {
    case int:
    fmt.Printf("Twice %v is %v\n", v, v*2)
    case string:
    fmt.Printf("%q is %v bytes long\n", v, len(v))
    default:
    fmt.Printf("I don't know about type %T!\n", v)
  }
}
do(21)
do("hello")
do(true)
```
类型断言除了判断空接口的数据类型之外，还可以结合接口和结构体使用，通过判断接口与结构体之间的绑定关系进行不同的业务处理。如下：
```go
type usb interface {
  connect()
}

type phone struct {
  name string
}

type camera struct {
  name string
}

func (p *phone) connect() {
  fmt.Println("连接手机", p.name)
}
func (c *camera) connect() {
  fmt.Println("连接相机", c.name)
}

var u usb
var p = phone{name: "华为"}
var c = camera{name: "索尼"}

u = &p
if _, ok := u.(*phone); ok {
  fmt.Println("执行手机连接")
  u.connect()
}

u = &c
if _, ok := u.(*camera); ok {
  fmt.Println("执行相机连接")
  u.connect()
}
```
## 反射
反射是指计算机程序在运行时`Run Time`可以访问、检测和修改它本身状态或行为的一种能力。
Go 的反射机制可以在运行时更新变量和检查它们的值，或者调用他们的函数方法，但是在编译时并不知道这些变量的数据类型。
编译语言在运行时需要对代码的词义、语法、和语义进行编译过程，将代码转为汇编语言，再通过汇编程序把汇编语言翻译为机器指令，最后由计算机执行机器指令，从而完成整个程序的执行过程。
由于编译过程是不可逆的，如果代码在执行过程中需要访问、检测和修改它本身的状态或行为，这时候需要由反射机制实现。
反射机制的常用场景：

- 在定义函数的时候，函数参数没有设置特定的类型（空接口），如果需要对参数的数据类型或参数值进行判断，可以使用反射实现。
- 在调用函数的时候，根据 if 条件调用对应的函数，可以对函数或参数进行反射，在运行期间能动态的执行函数调用。

在程序中使用反射机制会对程序造成一定的影响：

- 使用反射的代码通常难以阅读，代码可读性反映了编程人员的技术水平，因此在编程中使用反射需要考虑代码的可读性。
- Go 作为静态语言，在编码过程中，编译器能提前发现语法错误，但是对于反射代码无能为力。
- 反射对计算机性能影响较大，比正常代码运行速度慢很多，对于运行效率较高的代码尽量避免使用反射特性。
### 第一定律：接口变量转反射变量
反射机制是由内置包`reflect`实现的，`reflect`包的两种基本类型分为：`Type`和`Value`，他们分别对应两个方法：`reflect.TypeOf()`和`reflect.ValueOf()`，用来读取接口变量的数据类型和数值。
```go
var it = reflect.TypeOf(123)
var iv = reflect.ValueOf(123)
fmt.Printf("整型类型：%v, 反射类型%T\n", it, it) // 整型类型：int, 反射类型*reflect.rtype
fmt.Printf("整型类型的值：%v, 反射类型的值%T\n", iv, iv) // 整型类型的值：123, 反射类型的值reflect.Value

var strt = reflect.TypeOf("abc")
var strv = reflect.ValueOf("abc")
fmt.Printf("字符串类型：%v, 反射类型%T\n", strt, strt) // 字符串类型：string, 反射类型*reflect.rtype
fmt.Printf("字符串类型的值：%v, 反射类型的值%T\n", strv, strv) // 字符串类型的值：abc, 反射类型的值reflect.Value
```
### 第二定律：反射变量转接口变量
肌肉接口变量能转换为反射变量，那么反射变量也能转换为接口变量。反射变量转换为接口变量是由`reflect.ValueOf()`调用`Interface()`方法实现的。
```go
var num = 123
fmt.Printf("转换前的数据：%v, 数据类型：%T\n", num, num) // 转换前的数据：123, 数据类型：int
var iv = reflect.ValueOf(num)
fmt.Printf("接口转换反射：%v, 数据类型：%T\n", iv, iv) // 接口转换反射：123, 数据类型：reflect.Value
var i = iv.Interface()
fmt.Printf("反射转换接口：%v, 数据类型：%T\n", i, i) // 反射转换接口：123, 数据类型：int
```
由于函数`reflect.ValueOf()`的返回值是一个结构体变了，只要由它调用结构体方法`Interface()`就能实现反射变量与接口变量的转换功能。
### 第三定律：修改反射变量的值
接口变量和反射变量能实现相互转换，但是在实际开发中，不仅要实现两者的相互转换，还要修改其数值满足业务功能。
修改反射变量的数值可以使用`CanSet()`和`Set[T]()`等方法实现：
```go
var i = 123
var v = reflect.ValueOf(i)
fmt.Printf("反射变量v能否被修改：%v", v.CanSet()) // 反射变量v能否被修改：false
v.SetInt(456) // 报错，无法找到反射变量 v 的内存地址，从而无法修改变量值
```
反射变量 v 是不允许被修改的。因为从整型变量转换为反射变量的过程中，反射变量只是拷贝整型变量的值。换句话说，反射变量与整型变量的值是相互独立的，所以反射变量使用`SetInt()`方法可以修改反射变量的值，但是反射变量的数值并不会反射任何改变。
由于反射的概念是访问、检测和修改它本身状态或行为的一种能力，如果只改变 反射变量的值而没有改变整型的值，那么这个修改就不符合反射的概念。
如果要实现反射变量的科协状态，在使用`reflect.ValueOf()`时需要传入整型变量的指针变量。因为每个变量的内存地址是唯一的，通过修改内存地址对应的数值才能使反射变量和整型变量的数值达成一致。
```go
var i = 123
// 参数设置为指针
var v = reflect.ValueOf(&i)
fmt.Printf("反射变量v能否被修改：%v\n", v.CanSet()) // 反射变量 v 能否被修改：false
// 通过反射变量 v 的指针获取变量值
var vv = v.Elem()
fmt.Printf("反射变量 vv 的值：%v\n", vv)             // 反射变量 vv 的值：123
fmt.Printf("反射变量 vv 能否被修改：%v\n", vv.CanSet()) // 反射变量 vv 能否被修改：true
vv.SetInt(456)
fmt.Printf("反射变量 vv 修改后的值：%v\n", vv) // 反射变量 vv 修改后的值：456
fmt.Printf("整型变量 i 的值：%v\n", i)      // 整型变量 i 的值：456
```
### 反射的类型与种类
反射机制分为类型和种类，我们在编写大妈的过程中使用最多的是类型，种类是类型的上一级别。比如：猫科动物包括家猫、老虎、狮子和猎豹等。
反射机制的种类以 `Kind()`表示，在 Go 的 `src/reflect/type.go`中能找到种类的定义：
```go
type Kind uint

const (
  Invalid Kind = iota
  Bool
  Int
  Int8
  Int16
  Int32
  Int64
  Uint
  Uint8
  Uint16
  Uint32
  Uint64
  Uintptr
  Float32
  Float64
  Complex64
  Complex128
  Array
  Chan
  Func
  Interface
  Map
  Pointer
  Slice
  String
  Struct
  UnsafePointer
)
```
可以看出，每个种类就是 Go 语言的数据类型。既然反射的种类就是 Go 的数据类型，为什么反射机制还要区分类型和种类？这一切归功于关键词 type。我们可以通过一下例子加以说明：
```go
type myint int

type cat struct {
	name string
}

var n = 55
var rn = reflect.TypeOf(n)
fmt.Printf("反射变量 rn 的类型：%v\n", rn)          // 反射变量 rn 的类型：int
fmt.Printf("反射变量 rn 的类型名：%v\n", rn.Name())  // 反射变量 rn 的类型名：int
fmt.Printf("反射变量 rn 所属的种类：%v\n", rn.Kind()) // 反射变量 rn 所属的种类：int

var myI myint = 66
var rMyI = reflect.TypeOf(myI)
fmt.Printf("反射变量 rMyI 的类型：%v\n", rMyI)          // 反射变量 rMyI 的类型：main.myint
fmt.Printf("反射变量 rMyI 的类型名：%v\n", rMyI.Name())  // 反射变量 rMyI 的类型名：myint
fmt.Printf("反射变量 rMyI 所属的种类：%v\n", rMyI.Kind()) // 反射变量 rMyI 所属的种类：int

var c = cat{name: "kitty"}
var rc = reflect.TypeOf(c)
fmt.Printf("反射变量 rc 的类型：%v\n", rc)          // 反射变量 rc 的类型：main.cat
fmt.Printf("反射变量 rc 的类型名：%v\n", rc.Name())  // 反射变量 rc 的类型名：cat
fmt.Printf("反射变量 rc 所属的种类：%v\n", rc.Kind()) // 反射变量 rc 所属的种类：struct
```
如果变量的数据类型是基本类型：整型、字符串、浮点数等，那么`reflect.TypeOf()`直接返回对应的数据类型；如果变量的数据类型经过关键词`type`定义，那么`reflect.TypeOf()`返回该变量的定义位置，如：`main.myint`和`main.cat`。
变量的数据类型只要经过关键词`type`定义，它的反射变量调用方法`Name()`就能获取变量的类型，调用`Kind()`就能获取变量的种类。如：`反射变量 rMyI 的类型名：myint`、`反射变量 rMyI 所属的种类：int`。
### 切片与反射
对于基本类型使用`Elem()`和`Set[T]()`就能实现数据修改，如果变量是切片、map等复杂一点的数据类型，则需要使用特定方法实现数据读取和修改。
```go
var s = []int{1, 2, 3, 4}
var sr = reflect.ValueOf(s)
var sl = sr.Len()
fmt.Printf("获取切片长度：%v，数据类型：%T\n", sl, sl) // 获取切片长度：4，数据类型：int

// 获取切片元素
var si = sr.Index(0)
fmt.Printf("读取某个元素：%v，数据类型%T\n", si, si) // 读取某个元素：1，数据类型reflect.Value
// 修改切片元素
si.Set(reflect.ValueOf(666))
fmt.Printf("修改某个元素：%v，数据类型%T\n", sr, sr) // 修改某个元素：[666 2 3 4]，数据类型reflect.Value

// 截取元素
// 参数一：起始索引，参数二：终止索引
var ss = sr.Slice(0, 4)
fmt.Printf("截取元素：%v，数据类型%T\n", ss, s) // 截取元素：[666 2 3 4]，数据类型[]int
// 参数一：切片元素的起始索引，参数二：提取的元素个数，参数三：切片元素的终止索引
var s3 = sr.Slice3(0, 3, 4)
fmt.Printf("截取元素：%v，数据类型%T\n", s3, s3) // 截取元素：[666 2 3]，数据类型reflect.Value

// 为反射变量添加新的元素
sr = reflect.Append(sr, reflect.ValueOf(666))
fmt.Printf("添加切片元素：%v，数据类型%T\n", sr, sr) // 添加切片元素：[666 2 3 4 666]，数据类型reflect.Value

// 两个反射切片变量合并一个新的反射切片变量
sr = reflect.AppendSlice(sr, reflect.ValueOf([]int{777}))
fmt.Printf("添加切片合并：%v，数据类型%T\n", sr, sr) // 添加切片合并：[666 2 3 4 666 777]，数据类型reflect.Value

// 反射切片变量转换为接口变量，再由接口变量转换为切片变量
var ssr = sr.Interface().([]int)
fmt.Printf("反射转换切片，%v\n", ssr) // 反射转换切片，[666 2 3 4 666 777]

// 获取切片内存
var srp = sr.Pointer()
fmt.Printf("获取切片内存：%v，数据类型%T\n", srp, srp) // 获取切片内存：824633844000，数据类型uintptr

/*
	根据反射切片 sss 创建新的切片
	参数一：反射切片变量；参数二：切片长度；参数3：切片容量
*/
// 获取切片的数据类型
var sss = reflect.TypeOf(s)
var nss = reflect.MakeSlice(sss, 0, 0) // 创建新切片，[]，数据类型：reflect.Value
fmt.Printf("创建新切片，%v，数据类型：%T\n", nss, nss)
// 为新切片添加元素
nss = reflect.Append(nss, reflect.ValueOf(1000))
fmt.Printf("给新切片添加元素，%v，数据类型：%T\n", nss, nss) // 给新切片添加元素，[1000]，数据类型：reflect.Value
```

- 切片使用`reflect.ValueOf()`转换为反射切片值，可以由该值调用相关方法实现反射切片变量的读取操作。
- `reflect.Append()`、`reflect.AppendSlice()`实现两个反射切片变量的合并操作。
- `reflect.TypeOf()`转换为反射切片类型，并将该类型作为`reflect.MakeSlice()`的参数创建新的反射切片变量。
### map和反射
当 map 转换为反射时，可以通过`reflect`包提供的方法读写集合的键值对。
```go
var m = map[string]string{
  "name": "Tom",
  "age":  "100",
}
// 转换反射 map 变量
var mr = reflect.ValueOf(m)

// 获取 map 数量
fmt.Printf("获取键值对数量：%v\n", mr.Len()) // 获取键值对数量：2

// 获取 map 所有的 key
var mk = mr.MapKeys()
fmt.Printf("获取 map 所有键：%v，数据类型%T\n", mk, mk) // 获取 map 所有键：[name age]，数据类型[]reflect.Value
// 通过 map 的 key 获取对应的键值对
var mi = mr.MapIndex(mk[0])
fmt.Printf("获取 map 键值对：%v，数据类型%T\n", mi, mi) // 获取 map 键值对：Tom，数据类型reflect.Value
// 获取 map 的所有键值对
var iter = mr.MapRange()
for iter.Next() {
  var k = iter.Key()
  var v = iter.Value()
  fmt.Printf("map 的键：%v，map的值：%v\n", k, v)
}
// 添加新的键值对
var newKey = reflect.ValueOf("address")
var newVal = reflect.ValueOf("SHENZHEN")
mr.SetMapIndex(newKey, newVal)
fmt.Printf("添加键值对：%v\n", mr) // 添加键值对：map[address:SHENZHEN age:100 name:Tom]

// 获取 map 内存地址
var mrp = mr.Pointer()
fmt.Printf("获取 map 内存地址：%v，数据类型：%T\n", mrp, mrp) // 获取 map 内存地址：824634196112，数据类型：uintptr
// 将反射 map 变量转换为接口变量，再由接口变量转换为 map 变量
var mm = mr.Interface().(map[string]string)
fmt.Printf("反射转换集合：%v\n", mm["name"]) // 反射转换集合：Tom

// 获取 map 的数据类型
var mT = reflect.TypeOf(m)
// 根据 反射类型创建新的 map
var newM = reflect.MakeMap(mT)
newM.SetMapIndex(newKey, newVal)
fmt.Printf("创建新的集合：%v\n", newM) // 创建新的集合：map[address:SHENZHEN]
```

- 集合使用`reflect.ValueOf()`转换反射 map 值，可以由该值调用相关方法实现反射 map 的读写操作。
- 集合使用`reflect.TypeOf()`转换为反射 map 类型，并将该类型作为 `reflect.MakeMap()`的参数创建新的反射集合变量。
### 结构体与反射
结构体由结构体成员和结构体方法组成，结构体成员又分为成员名称、数值和标签。结构体转换为反射结构体变量，可以使用`reflect`包提供的函数方法实现结构体成员和结构体方法的读写操作。
**结构体成员读写操作：**
```go
type cat struct {
	Name string
	Age  int `json:"age" id:"101"`
}

func GetFieldByIndex(a string) bool {
	return strings.ToLower(a) == "name"
}

var c = cat{Name: "Jesse", Age: 18}
var cV = reflect.ValueOf(c)

// 计算成员数量
var cVNumber = cV.NumField()
fmt.Printf("计算成员数量：%v，数据类型：%T\n", cVNumber, cVNumber) // 计算成员数量：2，数据类型：int

// 以成员名称访问成员值
var cVName = cV.FieldByName("Name")
fmt.Printf("访问某个成员：%v，数据类型：%T\n", cVName, cVName) // 访问某个成员：Jesse，数据类型：reflect.Value
// 以成员索引访问成员值
var cVNameField = cV.Field(0)
fmt.Printf("访问某个成员：%v，数据类型：%T\n", cVNameField, cVNameField) // 访问某个成员：Jesse，数据类型：reflect.Value
// 以成员切片索引访问成员值
var cVNameIndex = cV.FieldByIndex([]int{0})
fmt.Printf("访问某个成员：%v，数据类型：%T\n", cVNameIndex, cVNameIndex) // 访问某个成员：Jesse，数据类型：reflect.Value
// 以函数方式判断并访问某个成员
var cVNameFunc = cV.FieldByNameFunc(GetFieldByIndex)
fmt.Printf("访问某个成员：%v，数据类型：%T\n", cVNameFunc, cVNameFunc) // 访问某个成员：Jesse，数据类型：reflect.Value

// 判断反射结构体变量能否修改数据
fmt.Printf("反射结构体变量能否修改数据：%v\n", cV.CanSet()) // 反射结构体变量能否修改数据：false

/**************************** 修改数据 **********************************/

// 创建反射结构体指针变量
var cVPoint = reflect.ValueOf(&c)
var cVPElement = cVPoint.Elem()
fmt.Printf("获取所有数据的值：%v，数据类型：%T\n", cVPElement, cVPElement) // 获取所有数据的值：{Jesse 18}，数据类型：reflect.Value
fmt.Printf("反射结构体变量能否修改数据：%v\n", cVPElement.CanSet())       // 反射结构体变量能否修改数据：true

cVPElement.FieldByName("Name").SetString("Tom")
cVPElement.FieldByName("Name").Set(reflect.ValueOf("Tim"))
cVPElement.FieldByName("Age").SetInt(20)
fmt.Printf("设置成员后的值：%v，数据类型：%T\n", cVPElement, cVPElement) // 设置成员后的值：{Tim 20}，数据类型：reflect.Value

// 创建反射结构体类型
var vT = reflect.TypeOf(c)
// 便利结构体所有成员数量
for i := 0; i < vT.NumField(); i++ {
    var vInfo = vT.Field(i)
    fmt.Printf("结构成员：%v，其标签为：%v\n", vInfo.Name, vInfo.Tag)
}
// 通过成员名找到成员类型信息
if cn, ok := vT.FieldByName("Age"); ok {
    fmt.Printf("标签 json 的内容：%v\n", cn.Tag.Get("json")) // 标签 json 的内容：age
    fmt.Printf("标签 id 的内容：%v\n", cn.Tag.Get("id"))     // 标签 id 的内容：101
}
// 通过成员索引找到成员类型信息，索引以切片形式表示
var vField = vT.FieldByIndex([]int{1})
fmt.Printf("标签 json 的内容：%v\n", vField.Tag.Get("json")) // 标签 json 的内容：age
fmt.Printf("标签 id 的内容：%v\n", vField.Tag.Get("id"))     // 标签 id 的内容：101
```

- `reflect.ValueOf(struct)`转换为反射结构体值，只能获取结构体成员的数值，但不能对其进行修改
- `reflect.ValueOf(&struct)`转换为反射结构体值的指针，必须调用`Elem()`方法才能访问结构体成员，并且能修改成员值。
- `reflect.TypeOf(struct)`转换为反射结构体类型，只能访问结构体成员名称和标签。
- 上述转换都能调用`NumField()`、`FieldByName()`等方法。
- 结构体首字符必须大写，否则反射结构体无法访问成员。

**结构体方法调用操作：**
```go
type cat struct {
  Name string
  Age  int `json:"age" id:"101"`
}

func (c *cat) Speak() {
  fmt.Println("喵喵喵...")
}
func (c cat) Talk() {
  fmt.Println("喵喵喵...")
}
func (c *cat) Sleep() string {
  fmt.Println("zzz...")
  return "Sleep"
}
func (c cat) Run(a string) {
  fmt.Printf("run...%v\n", a)
}
func (c cat) Eat(a string) string {
  fmt.Printf("eat...%v\n", a)
  return "Eat"
}

var c = cat{
  Name: "Jesse",
  Age:  18,
}

// 创建反射结构体指针值
var cT = reflect.ValueOf(&c)
fmt.Printf("获取结构体方法数量：%v\n", cT.NumMethod()) // 获取结构体方法数量：5

// 获取 Speack() 方法并使用 Call() 调用
var cSpeack = cT.MethodByName("Speak")
cSpeack.Call([]reflect.Value{})

var cTalk = cT.MethodByName("Talk")
cTalk.Call([]reflect.Value{})

var cSleep = cT.MethodByName("Sleep")
var res = cSleep.Call([]reflect.Value{})
fmt.Printf("Sleep 返回值：%v\n", res) // Sleep 返回值：[Sleep]

var cRun = cT.MethodByName("Run")
cRun.Call([]reflect.Value{reflect.ValueOf("GOGOGO")})

var cEat = cT.MethodByName("Eat")
res = cEat.Call([]reflect.Value{reflect.ValueOf("mouse")})
fmt.Printf("Eat 返回值：%v\n", res) // Eat 返回值：[Eat]
```

- 如果结构体方法没有参数，也必须传入`make([]reflect.Value, 0)`。
- 如果结构体方法有参数，传入`[]reflect.Value{s1, s2...}`。
- 如果有返回值也是`[]reflect.Value`。

**获取结构体的基本信息：**
```go
var c = cat{
  Name: "Jesse",
  Age:  18,
}

var cT = reflect.TypeOf(c)
fmt.Printf("获取结构体方法数量：%v\n", cT.NumMethod()) // 获取结构体方法数量：3

var cTMethod, _ = cT.MethodByName("Talk")
fmt.Printf("获取方法的内存地址：%v\n", cTMethod) // 获取方法的内存地址：{Talk  func(main.cat) <func(main.cat) Value> 2}
// 遍历输出每个方法的信息
for i := 0; i < cT.NumMethod(); i++ {
  var cTM = cT.Method(i)
  fmt.Printf("获取方法名：%v\n", cTM.Name)
  fmt.Printf("获取方法的包名：%v\n", cTM.PkgPath)
  fmt.Printf("获取方法的内存地址：%v\n", cTM.Func)
  fmt.Printf("获取方法的类型：%v\n", cTM.Type)
  fmt.Printf("获取方法的索引：%v\n", cTM.Index)
}

// 获取结构体方法
var cV = reflect.ValueOf(c)

var cVName = cV.MethodByName("Eat")
fmt.Printf("获取方法的内存地址：%v\n", cVName) // 获取方法的内存地址：0x4b45a0
var cVM = cV.Method(0)
fmt.Printf("获取方法的内存地址：%v\n", cVM)      // 获取方法的内存地址：0x4b45a0
fmt.Printf("获取方法的类型：%v\n", cVM.Type()) // 获取方法的类型：func(string) string
```

- `reflect.ValueOf()`能转换反射结构体值能够获取、修改结构体的成员值和调用结构体方法。
- `reflect.TypeOf()`能获取成员名称、标签内容、方法名等属性信息。
### 指针与反射
指针是一种数据类型，它用于记录变量的内存地址，无论变量是什么类型的数据，指针都能保存它对应的内存地址。在 Go 中，数据类型分为基本类型和复合类型，划分标准为：

- 基础类型：整型、布尔型、字符串、字符、浮点型、复数、指针。
- 复合类型：数组、切片、集合、列表、函数、结构体、接口、通道。

虽然指针是基本类型，但它能保存任何数据类型的内存地址，这一点较为特别，所以反射机制定义了相应的方法执行指针操作。
```go
type cat struct {
  Name string
  Age  int `json:"age" id:"110"`
}

// 字符串指针
var s = "golang"
var sV = reflect.ValueOf(&s)
var sVElem = sV.Elem()
fmt.Printf("反射字符串指针的内存：%v，数值：%v\n", sV, sVElem) // 反射字符串指针的内存：0xc00018a240，数值：golang
sVElem.SetString("hello")
fmt.Printf("反射字符串指针的内存：%v，数值：%v\n", sV, sVElem) // 反射字符串指针的内存：0xc00018a240，数值：hello

// 切片指针
var slice = []any{1, 2, "Go"}
var sliceV = reflect.ValueOf(&slice)
var sliceVElem = sliceV.Elem()
fmt.Printf("反射切片指针的内存：%v，数值：%v\n", slice, sliceVElem) // 反射切片指针的内存：[1 2 Go]，数值：[1 2 Go]
sliceVElem.Index(0).Set(reflect.ValueOf("golang"))
fmt.Printf("反射切片指针的内存：%v，数值：%v\n", slice, sliceVElem) // 反射切片指针的内存：[golang 2 Go]，数值：[golang 2 Go]

// map 指针
var m = map[string]any{
  "name": "Tim",
}
var mV = reflect.ValueOf(&m)
var mVElem = mV.Elem()
fmt.Printf("反射 map 指针的内存：%v，数值：%v\n", mV, mVElem) // 反射 map 指针的内存：&map[name:Tim]，数值：map[name:Tim]
var rk = reflect.ValueOf("name")
var rv = reflect.ValueOf("golang")
mVElem.SetMapIndex(rk, rv)
fmt.Printf("反射 map 指针的内存：%v，数值：%v\n", mV, mVElem) // 反射 map 指针的内存：&map[name:golang]，数值：map[name:golang]

// 结构体指针
var c = cat{Name: "Jesse", Age: 18}
var cV = reflect.ValueOf(&c)
var cVElem = cV.Elem()
fmt.Printf("反射结构体指针的内存：%v，数值：%v\n", cV, cVElem) // 反射结构体指针的内存：&{Jesse 18}，数值：{Jesse 18}
cVElem.FieldByName("Name").Set(reflect.ValueOf("Tom"))
fmt.Printf("反射结构体指针的内存：%v，数值：%v\n", cV, cVElem) // 反射结构体指针的内存：&{Tom 18}，数值：{Tom 18}

// 指针
var prt *string
var name = "point"
prt = &name
// 指针的反射
var pV = reflect.ValueOf(prt)
var pVElem = pV.Elem()
fmt.Printf("反射指针的内存：%v，数值：%v\n", pV, pVElem) // 反射指针的内存：0xc000014390，数值：point
// 指针的指针的反射
var prtV = reflect.ValueOf(&prt)
var prtVElem = prtV.Elem()
fmt.Printf("反射指针的指针的内存：%v，数值：%v\n", prtV, prtVElem) // 反射指针的指针的内存：0xc00004e030，数值：0xc000014390

// 使用反射创建新指针
var newPrt = reflect.New(reflect.TypeOf(*prt))
var newPrtElem = newPrt.Elem()
fmt.Printf("新反射指针的内存：%v，数值：%v\n", newPrt, newPrtElem) // 新反射指针的内存：0xc0000143b0，数值：
newPrtElem.Set(reflect.ValueOf(name))
fmt.Printf("新反射指针的内存：%v，数值：%v\n", newPrt, newPrtElem) // 新反射指针的内存：0xc0000143b0，数值：point

// 使用反射创建新指针的指针
var newPrtt = reflect.New(reflect.TypeOf(prt))
var newPrttElem = newPrtt.Elem()
fmt.Printf("新反射指针的指针内存：%v，数值：%v\n", newPrtt, newPrttElem) // 新反射指针的指针内存：0xc00004e050，数值：<nil>
newPrttElem.Set(reflect.ValueOf(&name))
fmt.Printf("新反射指针的指针内存：%v，数值：%v\n", newPrtt, newPrttElem) // 新反射指针的指针内存：0xc00004e050，数值：0xc000014390
```

1. 指针转换为反射指针值需要传入指针本身的内存地址，而非指针记录的内存地址。指针也是一个变量，也有自己的内存地址，它记录的内存地址是另一个变量的内存地址，这一概念必须数量清楚。比如：`reflect.ValueOf(&prt)`能得到指针本身的内存地址，调用`Elem()`方法能得到指针记录的内存地址（某个变量的内存地址）。
2. 指针转换为反射变量只要传入指针的值名称即可，`reflect.ValueOf(prt)`，它能得到指针记录的内存地址，调用`Elem()`方法能得到该内存地址所存放的变量值。
3. 当指针转换为反射指针类型的时候，可以使用`reflect.New()`创建新的反射指针值，如：`reflect.New(reflect.TypeOf(*prt))`，从而生成新的反射指针值。
4. `reflect.New(reflect.Typeof(prt))`可以创建发射指针的指针值，若要为该变量赋值，则必须使用`&`操作符。
### 函数与反射
函数是所有编程语言都具备的数据类型之一。在 Go 中函数和方法代表不同的数据类型，函数是可以独立存在的，而方法必须衣服结构体。反射机制可以将函数转换为反射函数变量，再调用反射函数变量完成函数调用过程。
```go
func myFunc() {
  fmt.Println("This is myFunc")
}
func myFunc1(name string) {
  fmt.Println("This is myFunc1 param is: ", name)
}
func myFunc2() string {
  fmt.Println("This is myFunc2")
  return "666"
}
func myFunc3(name string) string {
  fmt.Println("This is myFunc3")
  return "666"
}

var mf = reflect.ValueOf(myFunc)
fmt.Println("rf is reflect.Func?", mf.Kind() == reflect.Func) // rf is reflect.Func? true
mf.Call(nil)                                                  // 无参数可设置为 nil

// 带参数，无返回值
var mf1 = reflect.ValueOf(myFunc1)
mf1.Call([]reflect.Value{reflect.ValueOf("Tom")})

// 无参数，带返回值
var mf2 = reflect.ValueOf(myFunc2)
var res = mf2.Call(nil)
fmt.Printf("return is %v, %T\n", res, res) // return is [666], []reflect.Value

// 无参数，带返回值
var mf3 = reflect.ValueOf(myFunc3)
res = mf3.Call([]reflect.Value{reflect.ValueOf("Tom")})
fmt.Printf("return is %v, %T\n", res, res) // return is [666], []reflect.Value
```
可以说跟结构体的方法调用差不多。
## 并发编程
**相关术语：**

1. 并行：并行是指不同的代码同时执行，它以多核 CPU 为基础，每个 CPU 核心独立执行一个程序，各个 CPU 之间的数据相互独立，互不干扰。
2. 并发：并发是指不同的代码块交替执行，它以一个 CPU 为基础，使用多线程等方式提供 CPU 的利用率，线程之间会相互切换，轮流被程序解释器执行。
3. 进程：进程是一个实体，每个进程都有自己的地址空间（CPU分配），简单来说，进程是一个“正在执行的程序”，打开任务管理器就能看到当前运行的进程。
4. 线程：线程是进程中的一个实体，被系统独立调度和分派的基本单位。线程自己不拥有系统资源，只拥有运行中必不可少的资源。同一个进程中的多个线程并发执行，这些线程共享进程所拥有的资源。
5. 协程：协程是一种比线程更加轻量的存在，重要的是，协程不被操作系统内核管理，协程完全是由程序控制的，它的运行效率极高。协程的切片完全有程序控制，不想线程切换需要花费操作系统的开销，线程数量越多，协程的优势就越明显。协程不受 GIL(全局解释器锁) 的限制，因为只有一个线程，不存在变量冲突。

在实际开发中，并行和并发代表程序的不同执行方式，而进程、线程和协程可以使用相应的函数方法实现，进程、线程、协程三者的关系如下：
![0115c98db621f617441ff8eb7baa32e.jpg](https://cdn.nlark.com/yuque/0/2024/jpeg/21870146/1711896619061-ce559a7d-7b34-4adc-aad0-aa0f153fd68c.jpeg#averageHue=%239d9a8f&clientId=ud8f40301-ec28-4&from=paste&height=640&id=u2dd79c70&originHeight=1280&originWidth=1934&originalType=binary&ratio=2&rotation=0&showTitle=false&size=493919&status=done&style=none&taskId=u196cbe4f-09b2-43a4-af8e-60bba2b6c3b&title=&width=967)
Goroutine 是 Go 语言的一大特色，也可以说是最大的特色，它是 Go 语言设计的调度器。在go中每一个协程是一个独立的执行单元，相较于每个线程固定分配 2M 内存的模式，协程的栈采取了动态扩容方式， 初始时仅为2KB，随着任务执行按需增长，最大可达 1GB（64 位机器最大是 1G，32 位机器最大是 256M），且完全由 go自己的调度器来调度。此外，go的gc还会周期性地将不再使用的内存回收，收缩栈空间，因此，go程序可以同时并发成千上万个 协程是得益于它强劲的调度器和高效的内存模型。
### 创建 Goroutine
Go 是从 `main()`函数开始执行，程序启动默认为它创建一个 Goroutine，只要函数中使用关键词 `go`即可创建新的 Goroutine 执行并发。
```go
go func(parameter)
```

- 在并发操作用，有返回值的函数会被忽略返回值，如果需要从并发中返回数据，只能使用通道实现。

例子：
```go
func running() {
  for i := 0; i < 5; i++ {
    fmt.Println("tick", i)
    time.Sleep(1 * time.Second)
  }
}

go running()
for i := 0; i < 5; i++ {
  time.Sleep(1 * time.Second)
  fmt.Println("Waiting for you.")
}
/*
		tick 0
		Waiting for you.
		tick 1
		tick 2
		Waiting for you.
		Waiting for you.
		tick 3
		Waiting for you.
		tick 4
		Waiting for you.
	*/
```
主函数与 Gourotine 并发执行，随机打印。
**匿名执行 Goroutine：**
```go
go func(parameter) {
  // code...
}(param)
```
### 通道
Go 为了解决数据资源的同步问题，引入了通信机制——通道，它是 go 的一种特殊的数据类型，为多个 groutine 之间提供数据资源共享。
在并发过程中，多个 goroutine 为了争抢资源比如造成阻塞，为了保证执行效率，同一时刻只有一个 goroutine 访问通道进行写入和读取数据。通道遵循先入先出的原则，保证收发数据的顺序。
```go
var name chan T
name = make(chan T, num)
```
```go
func goroutine1(ch chan string) {
  // 写入数据
  ch <- "Hello"
}
func goroutine2(ch chan string) {
  // 读取数据
  fmt.Println(<-ch)
}

var ch = make(chan string)
go goroutine1(ch)
go goroutine2(ch)

// 延迟使 goroutine 有时间读取数据
time.Sleep(5 * time.Second)
```
关键词 make 创建通道默认为双向通道，可以写入和读取。此外我们可以定义单向通道：
```go
var ch = make(chan int)
var onlyWirte chan<- int = ch
var onlyRead <-chan int = ch
// 对只能写入的单向通道写入数据
onlyWirte <- 10
// 对只能写入不能获取的单向通道获取数据
<-onlyRead
```
#### 无缓冲通道
通道是通过 make 函数创建的，在创建过程中，如果没有设置参数 num，则视为无缓冲通道。无缓冲通道是指在获取数据之前没有能力保存数据的通道，这种通道要求两个 goroutine 同时处于执行状态才能完成写入和获取操作。
如果两个 goroutine 没有同时准备，某一个 goroutine 执行写入或获取操作将会处于阻塞等待状态，另一个 goroutine 无法写入或获取操作，程序将会提示异常，这种类型的通道执行写入和获取的交互行为是同步，任意一个操作都无法离开另一个操作单独存在。
当我们使用无缓冲通道的时候，必须注意通道变量的操作，确保程序中有两个或两个以上的 goroutine 同时执行通道的读写操作，读写操作必须是一写一读，不能只读不写或只写不读。如下：
如果只在 main 函数中使用通道读写数据也会导致异常：
```go
var ch = make(chan string)
ch <- "Tom"
fmt.Println(<-ch)
```
例子：
```go
func goroutine1(ch chan string) {
  fmt.Println("start goroutine")
  // 写入数据，由 goroutine2 读取
  ch <- "Hello"
  fmt.Println("goroutine send channel: goroutine2")
  // 读取 goroutine2 写入的数据
  var data = <-ch
  fmt.Printf("goroutine get channel:%v\n", data)
  // 数据写入通道，由主函数读取
  ch <- "Main goroutine"
}
func goroutine2(ch chan string) {
  fmt.Println("start goroutine2")
  // 读取 goroutine1 写入的数据
  var data = <-ch
  fmt.Println("goroutine2 get channel: ", data)
  // 数据写入通道，由 goroutine2 读取
  ch <- "goroutine1"
  fmt.Println("goroutine2 send channel: goroutine1")
}

func main() {
  // 建立通道
  var ch = make(chan string)
  // 执行并发
  go goroutine1(ch)
  go goroutine2(ch)

  // 延迟使 goroutine 有时间读取数据
  time.Sleep(5 * time.Second)

  // 读取 goroutine1 写入的数据
  var data = <-ch
  fmt.Println("main goroutine get channel: ", data)
}

/*
start goroutine2
start goroutine
goroutine1 send channel: goroutine2
goroutine2 get channel:  Hello
goroutine2 send channel: goroutine1
goroutine1 get channel:goroutine1
main goroutine get channel:  Main goroutine
*/
```
综上所述，在并发编程中，使用无缓存通道必须考虑各个 goroutine 之间的数据读取和写入操作，必须遵从先写入后读取，在写入在读取的原则。
#### 缓冲通道
缓冲通道是在被获取前能存储一个或多个数据的通道，这种类型的通道并不强制要求 goroutine 之间必须同时完成写入和获取。当通道中没有数据的时候，获取动作才会阻塞；当通道没有可用缓冲区存储数据的时候，写入动作才会阻塞。
```go
var ch = make(chan int, 3)
// 查看通道大小
fmt.Println(len(ch)) // 0

// 发送3个整型元素到通道
for i := 0; i < 3; i++ {
    ch <- i
}
fmt.Println(len(ch)) // 3

for i := 0; i < 3; i++ {
    fmt.Println(<-ch) // 0 1 2
}

fmt.Println(len(ch), cap(ch)) // 0 3
```
缓冲通道在很多特性上和无缓冲通道类似，无缓冲通道可以看做长度为 0 的缓冲通道。根据这个特性，带缓冲通道在下列情况下会发送阻塞：

1. 缓冲通道的存储数据达到上限时，再次写入数据将发生阻塞而导致异常。
2. 缓冲通道没有存储数据时，获取数据将发生阻塞而导致异常。

Go 为什么要对通道限制长度？因为多个 goroutine 之间使用通道比如存在写入和获取操作，这种模式类型的典型例子为生产者消费者模式。如果不限制通道长度，当写入数据速度大于获取数据，内存将不断膨胀直到应用崩溃。因此限制通道的长度有利于约束数据生成速度。
#### 关闭通道读取数据
在获取通道数据的时候，为了确保通道数据不出现阻塞，可以关闭通道再获取数据。
```go
var ch = make(chan int, 2)

ch <- 666
close(ch)
fmt.Printf("通道长度：%v，容量：%v\n", len(ch), cap(ch)) // 通道长度：1，容量：2
// 关闭通道后再次写入数据
// ch <- 777 // panic: send on closed channel
fmt.Println(<-ch) // 666
fmt.Println(<-ch) // 0，int 的零值
```
在关闭通道后如果再往里面写入数据会报错，但是已关闭的通道支持数据获取操作。

- 当关闭通道后，多次读取通道都不会提示异常。如上述代码的通道值存储一条数据，但执行两次数据读取操作。
- 在第二次读取的时候通道已没有数据，所以读取结果为空值。
#### Select 处理多通道
通道存储达到上限时再往通道写入数据会提示异常；通道没有存储数据的时候，从通道读取数据也会提示异常。在程序运行过程中我们无法准确预估通道是否有数据或数据存储已达到上限，为了解决程序执行异常的问题，可以使用关键词 select 实现。
语法：
```go
select {
  case ch:
    code...
  case ch:
    code...
  default:
    code...
}
```
default 是可选语句：

1. 如果有 default，当所有 case 语句无法操作时，则执行 default 语句的代码块；
2. 如果 select 没有 default 并且所有 case 语句的通道无法操作，则 select 将阻塞，直到某个 case 的通道可以执行。

例子：
```go
func sentData(ch, ch1 chan int) {
  for i := 0; i < 5; i++ {
    select {
      case ch <- i:
      fmt.Println("ch 写入数据: ", i)
      case ch1 <- i:
      fmt.Println("ch1 写入数据: ", i)
    }
  }
}
func getData(ch, ch1 chan int) {
  for i := 0; i < 5; i++ {
    select {
      case i := <-ch:
      fmt.Println("ch 接收数据: ", i)
      case i := <-ch1:
      fmt.Println("ch1 接收数据: ", i)
    }
  }
}

func main() {
  var ch = make(chan int)
  var ch1 = make(chan int)

  go sentData(ch, ch1)
  go getData(ch, ch1)

  time.Sleep(5 * time.Second)
}
```
`sentData`和`getData`没有设置`default`语句，因为通道变量`ch`和`ch1`分别由不同函数操作，必然存在阻塞情况，如果设置`default`语句，程序会因为通道阻塞而无法实现数据的写入和读取。
### sync 同步等待
主函数`main()`执行并发之后就会往下执行，当主函数的代码执行完成后就会终止整个程序运行，它不会等待并发程序的执行结果。
若要主程序能够等待并发程序完成执行，可以使用内置包 sync 的 `WaitGroup`实现。`WaitGroup`称为同步等待组，它是通过计数器方式实现等待的，计数器的数值代表程序中有多少个并发程序。
```go
// 创建同步等待组
var wg sync.WaitGroup

func fun1() {
  for i := 0; i <= 3; i++ {
    fmt.Println("fun1...", i)
  }
  // 代表完成并发，同步等待组的等待对象减 1
  wg.Done()
}
func fun2() {
  for i := 0; i <= 3; i++ {
    fmt.Println("fun2...", i)
  }
  // 代表完成并发，同步等待组的等待对象减 1
  wg.Done()
}

func main() {
  // 设置同步等待组最大的等待数量
  wg.Add(2)

  // 执行并发
  go fun1()
  go fun2()

  fmt.Println("main 进入阻塞状态...等待并发程序结束....")
  wg.Wait()
  fmt.Println("main 解除阻塞!")
}

```

- wg的并发等待数量必须与并发程序的数量一致。如果大于则会提示异常；如果小于只会随机等待其中一个并发程序。
### sync 加锁机制
Go 的锁机制是为了使多个并发之间能按照一定的秩序执行，加锁后的程序会一直占用数据和资源，直到解锁为止。锁类型分为：`sync.Mutex`和`sync.RWMutex`。如下：

- `sync.Mutex`是互斥锁，仅支持一个 goroutine 对数据进行读写操作。当一个 goroutine 获取`Mutex`锁之后，其他并发程序只能等待该goroutine释放锁，否则将一直处于阻塞等待状态。
- `sync.RWMutex`是读写互斥锁，它仅允许一个 goroutine 对数据执行写入操作，但支持多个程序进行同时读取数据，数据读取和写入分别由不同方法实现。从底层分析：`sync.RWMutex`是由`sync.Mutex`的基础上进行功能扩展，使其支持数据多读模式。
#### 互斥锁
实际应用中只需定义结构体 `Mutex`分别调用结构体方法`Lock()`和`Unlock()`即可实现加锁处理：
```go
var wg sync.WaitGroup

// 定义互斥锁
var myMutex sync.Mutex

func getData(name string) {
  myMutex.Lock()
  fmt.Println("这是：", name)
  myMutex.Unlock()
  wg.Done()
}

func main() {
  // 设置同步等待组最大的等待数量
  wg.Add(1)

  go getData("get data")
  myMutex.Lock()
  fmt.Println("这是：main")
  for i := 0; i < 3; i++ {
    time.Sleep(1 * time.Second)
    fmt.Printf("等待时间：%v\n", i+1)
  }
  myMutex.Unlock()

  // main 等待并发程序结束....
  wg.Wait()
  fmt.Println("main 解除阻塞!")
}

/*
这是：main
等待时间：1
等待时间：2
等待时间：3
这是： get data
main 解除阻塞!
*/
```

1. 首先`main`主函数执行并发处理并加锁，当执行完代码后解锁将资源释放
2. 然后由并发程序 `getData`执行并发

如果程序同时执行多个并发操作，由于每个并发的执行时间各不相同，`sync.Mutex`只能保证当前只有一个并发占用资源，但不能改变并发的执行顺序。如下：
```go
func main() {
  // 设置同步等待组最大的等待数量
  wg.Add(2)

  go getData("111")
  go getData("222")

  // main 等待并发程序结束....
  wg.Wait()
  fmt.Println("main 解除阻塞!")
}
/*
这是： 222
这是： 111
main 解除阻塞!
*/
```
我们可以看到输出的顺序各不相同，这也说明锁并不能保证并发程序的执行顺序
#### 读写互斥锁
`sync.RWMutex`提供了4个常用的方法：

- `RLock()`和`RUnlock()`支持数据多读模式
- `Lock()`和`Unlock()`支持数据单写模式
```go
// 同步等待组
var wg sync.WaitGroup

// 全局变量
var count int

// 读写锁
var rLock sync.RWMutex

// 随机种子
var rnd *rand.Rand

func read(i int) {
  rLock.Lock()
  var t = time.Duration(i*2) * time.Second
  time.Sleep(t)
  fmt.Printf("读操作，等待时间：%vs count=%d\n", t.Seconds(), count)
  rLock.Unlock()
  wg.Done()
}

func write(i int) {
  rLock.Lock()
  count = rnd.Intn(1000)
  var t = time.Duration(i*2) * time.Second
  time.Sleep(t)
  fmt.Printf("写操作，等待时间：%vs count=%d\n", t.Seconds(), count)
  rLock.Unlock()
  wg.Done()
}

func main() {
  // 设置同步等待组最大的等待数量
  wg.Add(6)

  rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

  // 执行六次并发
  for i := 1; i < 4; i++ {
    go write(i)
  }
  for i := 1; i < 4; i++ {
    go read(i)
  }

  // main 等待并发程序结束....
  wg.Wait()
  fmt.Println("main 解除阻塞!")
}
/*
写操作，等待时间：6s count=707
读操作，等待时间：2s count=707
读操作，等待时间：4s count=707
读操作，等待时间：6s count=707
写操作，等待时间：2s count=963
写操作，等待时间：4s count=121
main 解除阻塞!
*/
```
从运行结果看到，`sync.RWMutex`的读写操作不是同步执行的，并且每个操作的延时各不相同：

1. 当程序执行读操作的时候，所有写操作处于阻塞状态。
2. 当程序执行读操作的时候，其他读操作可以同时执行。
3. 当程序执行写操作的时候，所有操作都处于阻塞状态。

如果将上述代码的函数`write()`改为使用`RLock()`和`RUnlock()`，执行结果会出现误差。比如：每个并发的数据都会被最后一个并发的数据覆盖。因此我们将`RLock()`和`RUnlock()`作为读，`Lock()`和`Unlock()`作为写。
### sync.Map
在 Go 1.6 之前，map 在并发程序中支持数据读取，但写入过程中会存在异常。在 1.6 版本之后，通过并发读写 map 都会提示异常，因此在 1.9 版本之前都是通过加锁处理或者封装成一个新的结构体。
```go
// 同步等待组
var wg sync.WaitGroup

// 互斥锁
var mutex sync.Mutex

func setMap(m map[string]int, b int) {
  for i := 0; i < 5; i++ {
    mutex.Lock()
    m["age"] = i + b
    fmt.Println("map 的数据：", m["age"])
    mutex.Unlock()
  }
  wg.Done()
}

func main() {
  // 记录程序开始时间
  var start = time.Now()
  // 设置同步等待组最大的等待数量
  wg.Add(2)
  var m = map[string]int{"age": 10}
  go setMap(m, 1)
  go setMap(m, 10)
  // main 等待并发程序结束....
  wg.Wait()
  fmt.Println("main 解除阻塞!")
  var end = time.Now()
  var consume = end.Sub(start).Seconds()
  fmt.Println("程序执行耗时：", consume)
}
```
在 1.9 之后提供了一种效率较高且支持并发的数据类型——`sync.Map`。它是以结构体方式定义的，有 4 个成员和 8 个方法：
**成员：**

1. mu：是互斥锁，涉及成员 dirty 的数据操作都要使用该锁进行锁定处理。
2. read：提供数据只读功能。
3. dirty：当前集合 map 的数据，执行数据操作会使用结构体成员 mu 进行加锁处理，集合 map 的值为 `*entity`，它是结构体`entry`。
4. misses：计数器。

**方法：**
```go
var m sync.Map

// Store() 写入数据
m.Store("name", "Tom")
m.Store("age", 10)
m.Store("address", "beijing")
m.Store("vocation", "student")

// Load() 读取数据
var name, _ = m.Load("name")
var age, _ = m.Load("age")
fmt.Printf("sync.Map的 name 数据：%v\n", name)
fmt.Printf("sync.Map的 name 数据：%v\n", age)

// Delete() 删除数据
m.Delete("address")
fmt.Printf("sync.Map的数据：%v\n", m)

// LoadAndDelete() 读取并删除数据
vocation, ok := m.LoadAndDelete("vocation")
if ok {
    fmt.Printf("sync.Map的 vocation 数据：%v\n", vocation)
    fmt.Printf("sync.Map的数据：%v\n", m)
}

// LoadOrStore() 读取或新增数据
var live, _ = m.LoadOrStore("live", "BJ")
fmt.Printf("sync.Map的 live 数据：%v\n", live)
fmt.Printf("sync.Map的数据：%v\n", m)

// 遍历输出数据
m.Range(func(key, value any) bool {
    fmt.Printf("sync.Map的key：%v", key)
    fmt.Printf("sync.Map的value：%v", value)
    return true
})
```
并发中使用：
```go
var wg sync.WaitGroup

func setAmap(m *sync.Map, b int) {
  for i := 1; i < 5; i++ {
    m.Store("age", i+b)
    v, _ := m.Load("age")
    fmt.Printf("sync.Map的数据：%v\n", v)
  }
  wg.Done()
}

func main() {
  wg.Add(2)

  var m sync.Map
  go setAmap(&m, 0)
  go setAmap(&m, 10)

  wg.Wait()
}
```
### 消息队列
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1711968944926-631b0d41-bb9e-42d0-9232-c4366455be6e.png#averageHue=%23d2d3cf&clientId=u379fbbc8-bba2-4&from=paste&height=488&id=u6ec23faa&originHeight=976&originWidth=1592&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1344476&status=done&style=none&taskId=uec190b58-cc8e-4ce6-aece-249956d34fd&title=&width=796)
## 语法特性
### panic / recover
Go 没有异常机制，但是提供了宕机功能，它与其他编程语言的自定义异常是同一概念。
```go
panic("报错了！")
```
使用 panic 抛出异常，程序会停止执行，如果让程序在异常情况下能继续执行可以结合 defer 和 recover 实现异常捕捉和恢复，它与其他语言的 `try/catch`是同一概念。
```go
defer func() {
  if err := recover(); err != nil {
    fmt.Printf("捕捉异常：%v\n", err)
  } else {
    fmt.Println("程序没有异常")
  }
}()

fmt.Println("正常运行的程序...")
panic("报错了！")
```

- recover 捕捉异常，必须与 defer 搭配使用，否则程序无法捕捉异常。 
### 值类型、引用类型与深浅拷贝
Go 为不同的数据类型设置了对应的拷贝方式，不同的数据类型分为值类型变量和引用类型变量：

- 基本类型：整型、字符串、浮点数、布尔型、数组和结构体等
- 引用类型：指针、切片、map、通道和接口等

值类型变量是变量直接存储数据，内存通常在栈内分配；值类型变量的数据赋值到另一个变量都是深拷贝。
引用类型变量是存储一个内存地址，这个内存地址再存储数据，内存通常在堆上分配，通过 GC 回收；引用类型变量的数据赋值到另一个变量都是浅拷贝。
变量拷贝分为深拷贝和浅拷贝，它们之间的区别在于变量之间是否共用一个内存地址。两者的说明如下：
**值类型变量：**
```go
var a = "hello"
var b = a
fmt.Printf("a 内存地址：%p，值：%v\n", a, a) // a 内存地址：0xc000096020，值：hello
fmt.Printf("b 内存地址：%p，值：%v\n", b, b) // b 内存地址：0xc000096030，值：hello
```
它们两者存在不同的内存地址，仅仅是存储了相同的数据。
**引用类型变量：**
```go
var m = map[string]any{"name": "Tom"}
fmt.Printf("m 内存地址：%p，值：%v\n", m, m)      // m 内存地址：0xc00011c090，值：map[name:Tom]
fmt.Printf("m的指针 内存地址：%p，值：%v\n", &m, &m) // m的指针 内存地址：0xc00011e018，值：&map[name:Tom]
var mm = m
fmt.Printf("mm 内存地址：%p，值：%v\n", mm, mm)      // mm 内存地址：0xc00011c090，值：map[name:Tom]
fmt.Printf("mm的指针 内存地址：%p，值：%v\n", &mm, &mm) // mm的指针 内存地址：0xc0000a2000，值：&map[name:Tom]

mm["name"] = "Tim"

// 修改 mm 之后，m 也随之改变
fmt.Printf("m 内存地址：%p，值：%v\n", m, m)         // m 内存地址：0xc00011c090，值：map[name:Tim]
fmt.Printf("m的指针 内存地址：%p，值：%v\n", &m, &m)    // m的指针 内存地址：0xc00011e018，值：&map[name:Tim]
fmt.Printf("mm 内存地址：%p，值：%v\n", mm, mm)      // mm 内存地址：0xc00011c090，值：map[name:Tim]
fmt.Printf("mm的指针 内存地址：%p，值：%v\n", &mm, &mm) // mm的指针 内存地址：0xc0000a2000，值：&map[name:Tim]
```
### 类型别名和自定义
类型的别名与类型定义是由关键词 type 实现的，两者代表不同的功能，如下：
```go
type name = T // 类型别名
type name T // 自定义类型
```
例子：
```go
// 类型别名
type meString = string
// 自定义类型
type myString string

var s1 meString
var s2 myString
fmt.Printf("s1的数据类型为：%T\n", s1) // s1的数据类型为：string
fmt.Printf("s2的数据类型为：%T\n", s2) // s2的数据类型为：main.myString
```
在实际开发中，通常使用类型定义一些数据结构进行封装处理：
```go
type mystruct struct {
    name string
}
type mystyle mystruct

var s mystyle
s.name = "Tom"
fmt.Printf("s 的数据：%v，数据类型：%T\n", s, s) // s 的数据：{Tom}，数据类型：main.mystyle
```
### new 和 make 的区别
内置函数`new()`和`make()`用于内存分配：`new()`只分配内存；`make()`为切片、map 以及通道的数据类型分配内存和初始化。

- 内置函数`new()`适用于所有数据类型
- 使用 `new()` 创建变量，其变量值以指针方式表示，并且指针存储的数据为零，如：int -> 0、string -> 空字符串、bool -> false、切片 -> 空切片、mao -> 空map等。

`new()`创建的变量以指针表示，那么它与指针之间又存在怎样的关系呢？
```go
// 为变量myInt创建Int类型的内存地址
myInt := new(int)
// 给变量myInt赋值
*myInt = 666
fmt.Printf("myInt类型：%T,数值：%v,地址：%v\n", *myInt, *myInt, myInt)
// 定义指针变量myPro
var myPro *int
// 输出指针变量的信息
fmt.Printf("myPro类型：%T,数值：%v,地址：%v\n", myPro, myPro, myPro)
// 定义变量num并赋值
num := 777
// 将变量num的内存地址赋予指针myPro
myPro = &num
// 输出指针变量的信息
fmt.Printf("myPro类型：%T,数值；器%v,地址：%v\n", *myPro, *myPro, *myPro)
/*
myInt类型：int,数值：666,地址：0xc0000120b8
myPro类型：*int,数值：<nil>,地址：<nil>
myPro类型：int,数值：777,地址：0xc0000120f0
*/
```

- 内置函数`new()`创建的变量是指针变量，并且已分配了对应的内存地址，可以直接对变量执行赋值操作。
- 使用 var 定义的指针变量，它的数据和内存地址皆为空值，操作指针变量必须设置具体的内存地址，因此还需要绑定某个变量的内存地址。
- 内置函数实现了指针的定义与赋值过程，指针赋值是指指针变量设置具体的内存地址，而不是在内存地址中存放数值。

**make 与 var 的区别：**
```go
mySli := make([]int, 10)
// 对切片第一个元素赋值
mySli[0] = 666
// 输出切片信息
fmt.Printf("mySli数值：%v，长度：%v，容量：%v\n", mySli, len(mySli), cap(mySli))
// 创建集合类型的变量myMap
myMap := make(map[string]string)
// 设置集合的成员值
myMap["name"] = "Tom"
// 输出集合信息
fmt.Printf("myMap数值：%v，成员数量：%v\n", myMap, len(myMap))
// 创建通道类型的变量myChan，容量为10
myCh := make(chan string, 10)
// 往通道写入数据
myCh <- "hello"
// 输出通道信息
fmt.Printf("myCh数值: %v，已用缓存: %v，容量：%v\n", myCh, len(myCh), cap(myCh))
/*
mySli数值：[666 0 0 0 0 0 0 0 0 0]，长度：10，容量：10
myMap数值：map[name:Tom]，成员数量：1
myCh数值: 0xc00009a120，已用缓存: 1，容量：10
*/
```

- 内置函数makeO能直接创建切片、集合以及通道的变量。
- 变量的值为零，如切片为空切片，每个切片元素为0或空字符串；集合为空集合，没有任何成员；通道为空通道，不寄存任何数据。
### 泛型
泛型全程为泛型设计，它是程序设计语言的一种风格或范式。泛型运行在强类型编程语言中实例化某个对象的时候才知名参数的数据类型。
```go
func name[P, R](parameter P) R {
  return returnType
}
```
简单来说，在函数中使用泛型，只要在函数名和参数中间使用中括号，分别对参数和返回值设置一个或多个数据类型即可。
```go
func sum[K string, V int | float64](m map[K]V) V {
  var total V
  for _, val := range m {
    total += val
  }
  return total
}

//定义变量
myints := map[string]int{
  "first":  34,
  "second": 12}
// 定义变量
myfloats := map[string]float64{
  "first":  35.98,
  "second": 26.99}
// 输出计算结果
fmt.Printf("泛型函数的int；%v\n", sum(myints))
fmt.Printf("泛型函数的float64：%v\n", sum(myfloats))
```
泛型是对函数参数或返回值设置多个数据类型，比普通函数更灵活的设置参数类型和返回值类型，但比不上 any 自由。
既然开放性比不上空接口，为什么还要引入泛型？因为空接口参数不受数据类型的限制，如果调用过程中，函数传入参数是无法处理的数据类型，则容易引起异常。使用泛型可以保证参数（返回值）类型的多样性，也能保证调用过程中不会传入非法参数。正如我们常听的一句话：所有的自由都是在有限制的前提下才叫自由。
### Stringer
[fmt](https://go-zh.org/pkg/fmt/) 包中定义的 [Stringer](https://go-zh.org/pkg/fmt/#Stringer) 是最普遍的接口之一。
```go
type Stringer interface {
    String() string
}
```
Stringer 是一个可以用字符串描述自己的类型。fmt 包（还有很多包）都通过此接口来打印值。
```go
type IPAddr [4]byte

func (p IPAddr) String() string {
  return fmt.Sprintf("%v.%v.%v.%v", p[0], p[1], p[2], p[3])
}

hosts := map[string]IPAddr{
"loopback": {127, 0, 0, 1},
"googleDNS": {8, 8, 8, 8},
}

for name, ip := range hosts {
fmt.Printf("%v %v\n", name, ip)
}
/*
loopback 127.0.0.1
googleDNS 8.8.8.8
*/
```
### Error
Go 程序使用 error 值来表示错误状态。
与 fmt.Stringer 类似，error 类型是一个内建接口：
```go
type error interface {
    Error() string
}
```
（与 fmt.Stringer 类似，fmt 包在打印值时也会满足 error。）
通常函数会返回一个 error 值，调用的它的代码应当判断这个错误是否等于 nil 来进行错误处理。
```go
i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
}
fmt.Println("Converted integer:", i)
```
error 为 nil 时表示成功；非 nil 的 error 表示失败。
```go
package main

import (
	"fmt"
	"math"
)

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	fmt.Printf("%T\n", e) // 它是 main.ErrNegativeSqrt，所以需要进行一次转换
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e))
}

func Sqrt(x float64) (float64, error) {
	if x < 0 {
		return x, ErrNegativeSqrt(x)
	}
	z := 1.0
	i := 1
	for math.Abs(z*z-x) > 1e-11 {
		z -= (z*z - x) / (2 * z)
		i++
	}
	return z, nil
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
```
## Go modules
### 包的重命名
```go
import (
  // 导入math/rand包
  "math/rand"
  // 导入crypto/rand，将包改名为crand
  crand "crypto/rand"
)

// 调用math/rand包的函数Int()
rand.Int()
// 调用crypto/rand包的函数Read()
crand.Read([]byte{'a', 'b'})
```
### 无包名调用
```go
// 导入crypto/rand，将包改名为crand
. "crypto/rand"

// 调用crypto/rand包的函数Read()
Read([]byte{'a', 'b'})
```
### 初始化函数与空导入
Go语言有一个特殊函数`init()`，它的执行优先级比主函数`main()`还高，主要实现包的初始化操作。函数`init()`为初始化函数，在其他编程语言中也有初始化函数`init()`。
初始化函数`init()`具备以下特征：
1）每个包可以设置任意数量的初始化函数`init()`，它们都会在程序执行开始的时候被调用。
2）所有初始化函数`init()`都会安排在主函数`main()`之前执行，主要用于设置包、初始化变量或进行其他程序运行前优先完成的引导工作等。
3）初始化函数`init()`不能声明和创建变量，只能对变量执行赋值操作。
4）初始化函数`init()`不能设置函数参数和返回值。
5）多个初始化函数`init()`在执行的时候是无序执行的。
### 自定义 module
_mod.go_
```go
module example.com/m/v2
```
`example.com/m/v2`是自定义的 module 名，可以任意设置。如：`mygo`
_main.go_
```go
import "example.com/m/v2/example"

func main() {
  example.ExecRescue() // 营救村民
}
```
这样一来就能调用当前项目的包
### go mod 命令
| 命令 | 作用 |
| --- | --- |
| go mod init | 生成 go.mod 文件 |
| go mod download | 下载 go.mod 文件中指明的所有依赖 |
| go mod tidy | 整理现有的依赖 |
| go mod graph | 查看现有的依赖结构 |
| go mod edit | 编辑 go.mod 文件 |
| go mod vendor | 导出项目所有的依赖到vendor目录 |
| go mod verify | 校验一个模块是否被篡改过 |
| go mod why | 查看为什么需要依赖某模块 |

**修改依赖版本号：**
```bash
go mod edit -replace=旧版本=新版本
```
指定版本号，mod文件就会被修改。
### GOPROXY
这个环境变量主要是用于设置 Go 模块代理（Go module proxy）,其作用是用于使 Go 在后续拉取模块版本时直接通过镜像站点来快速拉取。
GOPROXY 的默认值是：`https://proxy.golang.org,direct`，而`proxy.golang.org`国内访问不了,需要设置国内的代理。
`direct`标识用于指示 Go 回源到模块版本的源地址去抓取
```bash
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/
go env -w GOPROXY=https://goproxy.cn,direct
```
## 实用技巧
### 排序
排序算法是编程世界最常见的算法之一。但在Go语言中，内置包sort已实现4种基本排序算法：插入排序(insertionSort）、归并排序（symMerge)、堆排序（heapSort）和快速排序（quickSort），并且根据数据自动选择最优排序算法。
```go
	// []int 排序
	var nums = []int{2, 31, 5, 6, 3}
	sort.Ints(nums)
	fmt.Println("[]int顺序排序：", nums) // []int顺序排序： [2 3 5 6 31]
	sort.Sort(sort.Reverse(sort.IntSlice(nums)))
	fmt.Println("[]int倒序排序：", nums) // []int倒序排序： [31 6 5 3 2]

	// []float64 排序
	var floats = []float64{2.2, 6.6, -5.3, 6.66, 3.12}
	sort.Float64s(floats)
	fmt.Println("[]float64顺序排序：", floats) // []float64顺序排序： [-5.3 2.2 3.12 6.6 6.66]
	sort.Sort(sort.Reverse(sort.Float64Slice(floats)))
	fmt.Println("[]float64倒序排序：", floats) // []float64倒序排序： [6.66 6.6 3.12 2.2 -5.3]

	// []string 排序
	var strings = []string{"abc", "123", "kk", "Jordan", "Ko", "DD"}
	sort.Strings(strings)
	fmt.Println("[]string顺序排序：", strings) // []string顺序排序： [123 DD Jordan Ko abc kk]
	sort.Sort(sort.Reverse(sort.StringSlice(strings)))
	fmt.Println("[]string倒序排序：", strings) // []string倒序排序： [kk abc Ko Jordan DD 123]
```
**结构体排序：**
如果切片元素为结构体，则需要对`sort.Interface`的接口方法进行自定义。
```go
type sortPerson struct {
  name string
  age  int
}

type personOnList []sortPerson

// 自定义 sort.Interface 的 Len()
func (list personOnList) Len() int {
  return len(list)
}

// 排序规则：首先按年龄排序（从小到大）
// 年龄相同时按姓名进行排序（按字符的自然排序）
// 自定义 sort.Interface 的 Less()
func (list personOnList) Less(i, j int) bool {
  if list[i].age < list[j].age {
    return true
  } else if list[i].age > list[j].age {
    return false
  } else {
    return list[i].name < list[j].name
  }
}

// 自定义 sort.Interface 的 Swap()
func (list personOnList) Swap(i, j int) {
  var temp sortPerson = list[i]
  list[i] = list[j]
  list[j] = temp
}


// 自定义排序
var p1 = sortPerson{name: "Tom", age: 19}
var p2 = sortPerson{name: "Hanks", age: 19}
var p3 = sortPerson{name: "Amy", age: 19}
var p4 = sortPerson{name: "Tom", age: 20}
var p5 = sortPerson{name: "Jogn", age: 21}
var p6 = sortPerson{name: "Mike", age: 23}
var pList = personOnList([]sortPerson{p1, p2, p3, p4, p5, p6})
sort.Sort(pList)
fmt.Println("自定义排序：", pList) // 自定义排序： [{Amy 19} {Hanks 19} {Tom 19} {Tom 20} {Jogn 21} {Mike 23}]
// Stable() 比 Sort() 稳定
sort.Stable(pList)
fmt.Println("自定义排序：", pList) // 自定义排序： [{Amy 19} {Hanks 19} {Tom 19} {Tom 20} {Jogn 21} {Mike 23}]
```

1. `Len()`返回切片长度；`Less()`设置排序算法规则；`Swap()`对切片元素进行位置交换。
2. 调用`sort.Sort()`和`sort.Stable()`进行实例化对象进行排序。由于 pList 的元素是结构体，在排序过程中会增加排序算法的时间复杂度和空间复杂度，使用`Sort()`可能出现排序不稳定的情况，而`sort.Stable()`能提升排序稳定性。

**二分查找算法：**
内置包sort除了定义排序算法之外，还定义了二分法查找算法，它在一个已排序好的切片中查找某个值所对应的索引位置。二分法查找算法一共定义了4个函数，每个函数说明如下：

- `sort.SearchFloat64s(a []float64,x float64)`仅支持float64类型的切片查找。参数a代表需要查找的切片、参数x代表查找数据、返回值为查找数据在切片的索引位置。
- `sort.SearchInts(a[Jint,xint)`仅支持int类型的切片查找。它的参数和返回值与`sort.SearchFloat64sO`的相同。
- `sort.SearchStrings(a []string, x string)`仅支持string类型的切片查找。它的参数和返回值与`sort.SearchFloat64s(）`的相同。
- `sort.Search(n int, f func(int)bool)`支持所有类型的切片查找。参数n代表切片长度；参数是匿名函数，匿名函数设置查找条件，匿名函数的参数代表每个切片元素的索引位置。

在结构体排序的基础上，增加以下内容：
```go
// 二分查找法
var index = sort.Search(len(pList), func(i int) bool {
    return pList[i].name == "Tom" && pList[i].age == 20
})
fmt.Printf("查找索引位置：%v，查找结果：%v\n", index, pList[index]) // 查找索引位置：3，查找结果：{Tom 20}
```
### Image（图像）
[image](https://go-zh.org/pkg/image/#Image) 包定义了 Image 接口：
```go
package image

type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}
```
**注意:** Bounds 方法的返回值 Rectangle 实际上是一个 [image.Rectangle](https://go-zh.org/pkg/image/#Rectangle)，它在 image 包中声明。
color.Color 和 color.Model 类型也是接口，但是通常因为直接使用预定义的实现 image.RGBA 和 image.RGBAModel 而被忽视了。这些接口和类型由 [image/color](https://go-zh.org/pkg/image/color/) 包定义。
例子：
```go
package main

import (
	"golang.org/x/tour/pic"
	"image"
    "image/color"
)

type Image struct {
    width  int
    height int
}

func (img Image) Bounds() image.Rectangle {
    return image.Rect(0, 0, img.width, img.height)
}

func (img Image) ColorModel() color.Model {
    return color.RGBAModel
}

func (img Image) At(x, y int) color.Color {
    return color.RGBA{uint8(x), uint8(y), 255, 255}
}

func main() {
	m := Image{100, 100}
	pic.ShowImage(m)
}

```
