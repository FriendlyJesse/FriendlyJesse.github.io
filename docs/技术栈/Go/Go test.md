---
order: 9
---

# Go test
Go语言中的测试依赖go test命令。编写测试代码和编写普通的Go代码过程是类似的，并不需要学习新的语法、规则或工具。
go test命令是一个按照一定约定和组织的测试代码的驱动程序。在包目录内，所有以_test.go为后缀名的源代码文件都是go test测试的一部分，不会被go build编译到最终的可执行文件中。
在*_test.go文件中有三种类型的函数，单元测试函数、基准测试函数和示例函数。

| **类型** | **格式** | **作用** |
| --- | --- | --- |
| 测试函数 | 函数名前缀为Test | 测试程序的一些逻辑行为是否正确 |
| 基准函数 | 函数名前缀为Benchmark | 测试函数的性能 |
| 示例函数 | 函数名前缀为Example | 为文档提供示例文档 |

go test命令会遍历所有的*_test.go文件中符合上述命名规则的函数，然后生成一个临时的main包用于调用相应的测试函数，然后构建并运行、报告测试结果，最后清理测试中生成的临时文件。
Golang单元测试对文件名和方法名，参数都有很严格的要求。

- 文件名必须以`xx_test.go`命名
- 方法必须是`Test[^a-z]`开头
- 方法参数必须 `t *testing.T`
- 使用 `go test` 执行单元测试

`**go test**`**的参数解读：**
go test是go语言自带的测试工具，其中包含的是两类，单元测试和性能测试
通过go help test可以看到go test的使用说明：
格式形如： `go test [-c] [-i] [build flags] [packages] [flags for test binary]`
`-c`: 编译go test成为可执行的二进制文件，但是不运行测试。
`-i`: 安装测试包依赖的package，但是不运行测试。
`build flags`：调用go help build，这些是编译运行过程中需要使用到的参数，一般设置为空
`packages`：调用go help packages，这些是关于包的管理，一般设置为空
`flags for test binary`：调用go help testflag，这些是go test过程中经常使用到的参数
`-test -v`: 是否输出全部的单元测试用例（不管成功或者失败），默认没有加上，所以只输出失败的单元测试用例
`-test.run pattern`: 只跑哪些单元测试用例，`pattern`是一个正则表达式匹配了才会运行
`-test.bench patten`: 只跑那些性能测试用例
`-test.benchmem`: 是否在性能测试的时候输出内存情况
`-test.benchtime t` : 性能测试运行的时间，默认是1s
`-test.cpuprofile cpu.out`: 是否输出cpu性能分析文件
`-test.memprofile mem.out`: 是否输出内存性能分析文件
`-test.blockprofile block.out`: 是否输出内部goroutine阻塞的性能分析文件
`-test.memprofilerate n`: 内存性能分析的时候有一个分配了多少的时候才打点记录的问题。这个参数就是设置打点的内存分配间隔，也就是profile中一个sample代表的内存大小。默认是设置为512 * 1024的。如果你将它设置为1，则每分配一个内存块就会在profile中有个打点，那么生成的profile的sample就会非常多。如果你设置为0，那就是不做打点了。
你可以通过设置memprofilerate=1和GOGC=off来关闭内存回收，并且对每个内存块的分配进行观察。
`-test.blockprofilerate n`: 基本同上，控制的是goroutine阻塞时候打点的纳秒数。默认不设置就相当于-test.blockprofilerate=1，每一纳秒都打点记录一下
`-test.parallel n`: 性能测试的程序并行cpu数，默认等于GOMAXPROCS。
`-test.timeout t`: 如果测试用例运行时间超过t，则抛出panic
`-test.cpu 1,2,4`: 程序运行在哪些CPU上面，使用二进制的1所在位代表，和nginx的nginx_worker_cpu_affinity是一个道理
`-test.short`: 将那些运行时间较长的测试用例运行时间缩短
目录结构：
```
test
  |
   —— calc.go
  |
   —— calc_test.go
```
## 单元测试
每个测试函数必须导入testing包，测试函数的基本格式如下：
```go
func TestName(t *testing.T){
    // ...
}
```
其中参数 `t`用与报告测试失败和附加的日志信息。`testing.T`拥有一下方法：
```go
func (c *T) Error(args ...interface{})
func (c *T) Errorf(format string, args ...interface{})
func (c *T) Fail()
func (c *T) FailNow()
func (c *T) Failed() bool
func (c *T) Fatal(args ...interface{})
func (c *T) Fatalf(format string, args ...interface{})
func (c *T) Log(args ...interface{})
func (c *T) Logf(format string, args ...interface{})
func (c *T) Name() string
func (t *T) Parallel()
func (t *T) Run(name string, f func(t *T)) bool
func (c *T) Skip(args ...interface{})
func (c *T) SkipNow()
func (c *T) Skipf(format string, args ...interface{})
func (c *T) Skipped() bool
```
### 测试函数示例
就像细胞是构成我们身体的基本单位，一个软件程序也是由很多单元组件构成的。单元组件可以是函数、结构体、方法和最终用户可能依赖的任意东西。总之我们需要确保这些组件是能够正常运行的。单元测试是一些利用各种方法测试单元组件的程序，它会将结果与预期输出进行比较。
**example:**
```go
package split

import "strings"

func Split(s, sep string) (result []string) {
	i := strings.Index(s, sep)

	for i > -1 {
		result = append(result, s[:i])
		s = s[i+len(sep):]
		i = strings.Index(s, sep)
	}
	result = append(result, s)
	return
}
```
_split_test.go：_
```go
package split

import (
  "reflect"
  "testing"
)

func TestSplit(t *testing.T) {
  var got = Split("a:b:c", ":")
  var want = []string{"a", "b", "c"}
  if !reflect.DeepEqual(want, got) {
    t.Errorf("excepted:%v, got:%v", want, got)
  }
}

func TestMoreSplit(t *testing.T) {
  var got = Split("abcd", "bc")
  var want = []string{"a", "d"}
  if !reflect.DeepEqual(want, got) {
    t.Errorf("excepted:%v, got:%v", want, got)
  }
}
```
注意，当我们修改了我们的代码之后不要仅仅执行那些失败的测试函数，我们应该完整的运行所有的测试，保证不会因为修改代码而引入了新的问题。
### 测试组
如果我们要测试一下`split`函数的多个样例，可能我们会将它组合起来
```go
func TestSplit(t *testing.T) {
  // 定义一个测试用例类型
  type test struct {
    input string
    sep   string
    want  []string
  }
  // 定义一个存储测试用例的切片
  tests := []test{
    {input: "a:b:c", sep: ":", want: []string{"a", "b", "c"}},
    {input: "a:b:c", sep: ",", want: []string{"a:b:c"}},
    {input: "abcd", sep: "bc", want: []string{"a", "d"}},
    {input: "枯藤老树昏鸦", sep: "老", want: []string{"枯藤", "树昏鸦"}},
  }
  // 遍历切片，逐一执行测试用例
  for _, tc := range tests {
    got := Split(tc.input, tc.sep)
    if !reflect.DeepEqual(got, tc.want) {
      t.Errorf("excepted:%v, got:%v", tc.want, got)
    }
  }
}
```
### 子测试
看起来都挺不错的，但是如果测试用例比较多的时候，我们是没办法一眼看出来具体是哪个测试用例失败了。Go1.7+中新增了子测试，我们可以按照如下方式使用t.Run执行子测试：
```go
func TestGroupSplit(t *testing.T) {
	type test struct {
		input string
		sep   string
		want  []string
	}

	tests := map[string]test{
		"simple":      {input: "a:b:c", sep: ":", want: []string{"a", "b", "c"}},
		"wrong sep":   {input: "a:b:c", sep: ",", want: []string{"a:b:c"}},
		"more sep":    {input: "abcd", sep: "bc", want: []string{"a", "d"}},
		"leading sep": {input: "枯藤老树 昏鸦", sep: "老", want: []string{"枯藤", "树昏鸦"}},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			got := Split(tc.input, tc.sep)
			if !reflect.DeepEqual(got, tc.want) {
				t.Errorf("excepted:%#v, got:%#v", tc.want, got)
			}
		})
	}
}
```
这里我们看到有一个错误：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21870146/1699325790063-df310ff6-9bb5-4c55-bdc5-61eb83c29967.png#averageHue=%2324282f&clientId=ucfaa6374-dd82-4&from=paste&height=683&id=u8fa4623b&originHeight=683&originWidth=1396&originalType=binary&ratio=1&rotation=0&showTitle=false&size=158499&status=done&style=none&taskId=u88b44bae-4b88-4cf1-b9e8-d82986072db&title=&width=1396)
我们都知道可以通过`-run=RegExp`来指定运行的测试用例，还可以通过/来指定要运行的子测试用例，例如：`go test -v -run=Split/simple`只会运行simple对应的子测试用例。
### 测试覆盖率
测试覆盖率是你的代码被测试套件覆盖的百分比。通常我们使用的都是语句的覆盖率，也就是在测试中至少被运行一次的代码占总代码的比例。
Go提供内置功能来检查你的代码覆盖率。我们可以使用`go test -cover`来查看测试覆盖率。例如：
```bash
PASS
coverage: 100.0% of statements
ok      example.com/m/v2/split  0.302s
```
Go还提供了一个额外的-coverprofile参数，用来将覆盖率相关的记录信息输出到一个文件。例如：
```bash
go test -cover -coverprofile=c.out
PASS
coverage: 100.0% of statements
ok      example.com/m/v2/split  0.372s
```
上面的命令会将覆盖率相关的信息输出到当前文件夹下面的c.out文件中，然后我们执行go tool cover -html=c.out，使用cover工具来处理生成的记录信息，该命令会打开本地的浏览器窗口生成一个HTML报告。
## 基准测试
基准测试就是在一定的工作负载之下检测程序性能的一种方法。基准测试的基本格式如下：
```go
func BenchmarkName(b *testing.B){
  // ...
}
```
基准测试以Benchmark为前缀，需要一个*testing.B类型的参数b，基准测试必须要执行b.N次，这样的测试才有对照性，b.N的值是系统根据实际情况去调整的，从而保证测试的稳定性。 testing.B拥有的方法如下：
```go
func (c *B) Error(args ...interface{})
func (c *B) Errorf(format string, args ...interface{})
func (c *B) Fail()
func (c *B) FailNow()
func (c *B) Failed() bool
func (c *B) Fatal(args ...interface{})
func (c *B) Fatalf(format string, args ...interface{})
func (c *B) Log(args ...interface{})
func (c *B) Logf(format string, args ...interface{})
func (c *B) Name() string
func (b *B) ReportAllocs()
func (b *B) ResetTimer()
func (b *B) Run(name string, f func(b *B)) bool
func (b *B) RunParallel(body func(*PB))
func (b *B) SetBytes(n int64)
func (b *B) SetParallelism(p int)
func (c *B) Skip(args ...interface{})
func (c *B) SkipNow()
func (c *B) Skipf(format string, args ...interface{})
func (c *B) Skipped() bool
func (b *B) StartTimer()
func (b *B) StopTimer()
```
### 基准测试示例
我们为split包中的Split函数编写基准测试如下：
```go
func BenchmarkSplit(b *testing.B) {
  for i := 0; i < b.N; i++ {
    Split("枯藤老树昏鸦", "老")
  }
}
```
基准测试并不会默认执行，需要增加-bench参数，所以我们通过执行go test -bench=Split命令执行基准测试，输出结果如下：

