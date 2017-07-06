---
title: HTML
categories: HTML
tag: 
- 前端
- HTML
---

# head

## meta
```html
<meta charset="UTF-8">
```
定义 `html` 文件为 `utf-8` 编码。

```html
<meta name='viewport'  content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
```
定义页面为 H5 窗口，以下是它的属性：

| 属性        | 属性值           | 说明  |
| ------------- | ------------- | ----- |
| name      | viewport | 定义HTML5虚拟窗口 |
| content      | 1. width=device-width<br />2. user-scalable=no<br />3. initial-scale=1.0<br />4. maximum-scale=1.0<br />5. minimum-scale=1.0     |   1. 定义宽度为设备宽度<br />2. 不允许用户手动缩放<br />3. 初始缩放比例<br />4. 允许用户缩放到的最大比例<br />5. 允许用户缩放到的最小比例 |

## link
```html
<link href='file_name.ico'  rel='icon' /></link>
```
标签页图标。

```html
<link href='file_name.ico'  rel='icon' /></link>
```
引入外部 `css`。

## script
```html
<script src='file_name.js'></script>
```
引入外部 `javascript`。

```html
<script src='file_name.js' defer="defer"></script>
```
页面加载后开始执行

```html
<script src='file_name.js' async="async"></script>
```
异步加载脚本

## 注释语句
```html
<!--[if IE8]>
<script>
    console.log(1);
</script>
<![endif]-->
```

# 语义标签

## 具象图
<img src='/images/html/lay1.png' />
<img src='/images/html/lay2.png' />

## 常用标签
| H5新增标签        | 语义           |
| ------------- | ------------- |
| header      | 定义页面或区段的头部 |
| footer      | 定义页面或区段的尾部 |
| nav      | 定义页面或区段的导航区域 |
| section      | 定义页面的模块 |
| article      | 定义正文或一篇完整的内容 |
| aside      | 定义补充或相关内容 |
| figure      | 定义图片或视频组合 |
| figcaption      | 定义figure内容的描述 |
| time      | 定义时间的行内元素 |
| time      | 定义时间的行内元素 |
| dialog      | 定义对话，chrome需要加上open属性才能显示 |
| address      | 定义作者信息 |
| mark      | 定义标记，默认加上黄色背景 |
| blockquote      | 定义引用 |

# 基本标签

## 段落与文字
```html
<title>  //标题 
<meta>  //元信息
<!--   -->  //注释
<h1>~<h6>  //标题
<p>  //段落
<br/>  //换行
<hr/>  //水平线
<abbr>xx</abbr>  //首字母缩写
```

## 列表
```html
<ol><li>  //有序列表
<ul><li>  //无序列表
<dl><dt><dd>  //定义列表
```

## 表格
```html
<table>  //表格
<caption>  //表格标题
<thead>  //表头
<tbody>  //表身
<tfoot>  //表脚
<tr>  //行
<th>  //表头单元格
<td>  //单元格
<td rowspan='跨度的列数'>  //表格合并行
<td colspan='跨度的行数'>  //表格合并列
```

## 图像 & 超链接
```html
<img src='图片地址' alt='图片描述' title='给用户描述' />  //图片，target的值：_self 默认、_blank 新窗口
<a href='链接地址' target='目标窗口打开方式'>  //超链接，href 之中使用 # 时能够定位到 id
```

## 浮动框架
```html
<iframe>  //浮动框架
```
属性：src 源文件、width 宽、height高 、scrolling 框架设置
`scrolling` 的值：`auto` 默认值、`yes` 总是显示滚动条、`no` 任何时候都不显示滚动条

## 展开列表
```html
<details>
    <summary>标题</summary>
    隐藏的
</details>
```
展开列表，一般配合使用，`details` 加上 `open` 属性默认展开。（不建议用，太丑）

## 进度条
```html
<progress value="50" max="100"></progress>
```
进度条，`max` 定义满值，`value` 定义进度。（不建议用，太丑）

# 表单

```html
<form></form>
```
表单标签，以下为它的属性：
`name`：表单名称
`action`：表单提交的 `URL`
`method`：表单提交的方式，属性：`get` 为默认值，数据将被传输给 `action` 的 `URL` 中所以安全性较差、`post` 表单数据将包含在表单主体之中较为安全。
`target`：打开页面的方式，属性：`_self` 载入当前窗口、`_blank` 载入新窗口、`_parent` 载入父级窗口、`_top` 载入整个网页
`enctype`：编码方式，属性：`application/x-www-form-urlencoded` 默认编码、`multipart/form-data MINE` 编码，上传文件必须使用

## 基本控件
```html
<input type='text' size='文本框长度' maxlength='最多输入字符数' />  //文本框
<input type='password' />  //密码框
<input type='radio' name='组名' />  //单选按钮，组名相同为同一组
<input type='checkbox' checked='checked' name='a[]' />  //复选按钮，复选框在传值的时候name需要是数组，可以不需要下标
<input type='button' />  //按钮
<button></button>  //按钮，与其上一样是普通按钮
<input type='submit'>  //提交按钮
<input type='reset' />  //重置按钮
<input type='image' src='图片地址' />  //图片域    
<textarea rows='行数' cols='列数'>  //多行文本框
<input type='hidden' />  //隐藏域
<input type='file'/>  //文件域
```

### 下拉列表
```html
<select>
    <option>选项显示的内容</option>
    ……
    <option>选项显示的内容</option>
</select>
```
`select` 的属性：`multiple` 选择多项、`size` 展开数目
`option` 的属性：`value` 选择值、`selected` 是否选中

### 控件属性
```html
disabled='disabled'  //禁用input元素
readonly='readonly'  //只读，禁止用户写入
name=''  //传值时定义值的 key
value=''  //传值时定义 key 的值
checked  //选中，radio与checkbox才有这个状态
```

## h5 控件
```html
<input type='email' />  //email 验证，在移动端输入时会自动切换到英文键盘
<input type='tel' />  //电话号码，在移动端输入时会自动切换到数字键盘
<input type='url' />  //网址验证
<input type='search' />  //输入字符后时出现小叉叉可以清空字符
<input type='number' />  //只能包含数字的输入框，并能通过点击进行增减
<input type='color' />  //颜色选择器
<input type='range' step='' min='' max='' value='' /> //数值选择器，step：跳多少格，min：最小值，max：最大值，value：默认值

以下控件，欧朋完美支持，大部分浏览器不支持：
<input type='datetime' />  //显示完整时间，可调出日历
<input type='datetime-local' />  //显示完整日期，可调出日历，不含时区，chrome 支持
<input type='time' />  //显示时分
<input type='date' />  //显示年月日
<input type='week' />  //显示年周
<input type='month' />  //显示月
```

### 选项列表

<img src='/images/html/list.png' />

```html
<input type="text" list="valList">
<datalist id="valList">
    <option value="1">javascript</option>
    <option value="2">html</option>
    <option value="3">css</option>
</datalist>
```
配合 `input` 标签使用，`list` 的属性对应 `datalist` 标签的 `id` 属性即可。

### 控件属性
```html
<input type='text' placeholder='' />  //默认提示信息，点击后自动消除
<input type='text' autocomplete='off' />  //是否提示用户输入值，off 为关闭，on 为开启
<input type='text' autofocus />  //默认聚焦
<input type='text' required />  //不能为空
<input type='text' maxlength='数值' /> //输入不能超过限定数值
<input type='text' pattern='' />  //正则验证，注意：行间验证并不安全，可直接通过在浏览器更改html破解
<input type='submit' formaction='' />  //提交到另外的地址
<from novalidate>  //关闭验证，required 不可关闭，ie9 及之前版本不支持
```

### 验证反馈
```html
<form>
    <input name="text" type="text" required />
    <input type="submit">
</form>
```
```javascript
var oForm = document.forms[0],
    oText = oForm.text;

oText.oninvalid = function ()
{
    console.log(this.validity.valid);
}
```
此例中给 `input` 绑定验证失败事件，验证信息储存在 `validity` 对象中，`valid` 返回 `false` 则表示验证失败。

#### validity 返回值
| 可用的属性      | 说明           |
| ------------- | ------------- |
| valueMissing  | 当输入值为空 |
| typeMismatch  | 当输入值和要求的类型不一致时，如：email |
| patternMismatch  | 当用户输入的内容与正则要求不匹配时 |
| tooLong  | 超过 maxLength 最大限制 |
| rangeUnderflow  | 验证 range 最小值 |
| rangeOverflow  | 验证 range 最大值 |
| steMismatch  | 验证 range 的当前值是否符合 min、max、step 的规则 |
| customError  | 不符合自定义规则 |

#### 自定义规则
<img src='/images/html/mingan.png' />

```html
<form>
    <input name="text" type="text" />
    <input type="submit">
</form>
```
```javascript
var oForm = document.forms[0],
    oText = oForm.text;

oText.oninput = function ()
{
    this.setCustomValidity(this.value == '敏感词' ? '请不要输入敏感词' : '');
}
```
此例定义的当前验证的规则，主要是用到 `setCustomValidity` 函数设置弹出的文字，如果不为空则验证失败。
