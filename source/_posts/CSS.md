---
title: CSS
categories: CSS
tag: 
- 前端
- CSS
---

# 选择器

## 元素选择器
```css
div
{
    ...
}
```

## class 选择器
```css
.box
{
    ...
}
```

## id 选择器
```css
#box
{
    ...
}
```

## 后代选择器
```css
.wrap .box
{
    ...
}
```

## 子代选择器
```css
.wrap > .box
{
    ...
}
```

## 兄弟选择器
```css
div + p
{
    ...
}
```
```html
<div></div>
<p></p>  /*此元素被光荣选中*/
<p></p>
```
选择下面相邻的兄弟元素

```css
div ~ p
{
    ...
}
```
```html
<div></div>
<p></p>  /*此元素被光荣选中*/
<p></p>  /*此元素被光荣选中*/
```
选择下面所有的兄弟元素

{% note info %} 
以上两个选择器用兄弟选择器为名其实并不贴切。注意，由于历史原因他们只能选择下面的元素。 
{% endnote %}

## 群组选择器
```css
div, .wrap, #box
{
    ...
}
```
选择多个规则

## 全局选择器
```css
*
{
    ...
}
```
选择除伪类外所有元素。如果需要选择，那么可以配合伪类一起使用：
```css
*, *::before, *::after 
{
  ...
}
```

## 属性选择器
| 选择器         | 说明           |
| ------------- | ------------- |
| el[attr]        | 选取元素中定义了这个属性名的元素 |
| el[attr='value']        | 选取元素中定义了这个属性名与属性值的元素 |
| el[attr~='value']        | 选取元素中定义了这个属性名，并且属性名中拥有定义的属性值的元素 |
| el[attr^='value']        | 选取元素中定义了这个属性名，并且属性名中拥有定义的字符串开头的属性值的元素 |
| el[attr$='value']        | 选取元素中定义了这个属性名，并且属性名中拥有定义的字符串结尾的属性值的元素 |
| el[attr&#124;='value']        | 选取元素中定义了这个属性名，并且属性名中拥有以字符串-开头或者等于字符串的属性值的元素 |

## 结构伪类选择器
| 选择器         | 说明           |
| ------------- | ------------- |
| el:nth-child(number/odd/even/n)  | 选取 el 的父元素中的子元素 |
| el:nth-last-child(number/odd/even/n)  | 与nth-child相反，它是从下往上指定 |
| el:first-child  | 选取 el 的父元素中的第一个子元素 |
| el:last-child  | 选取 el 的父元素中的最后一个子元素 |
| el:nth-of-type(number/odd/even/n)  | 选取元素的父元素中的 el |
| el:nth-last-of-type(number/odd/even/数字n)  | 与nth-of-type相反，它是从下往上指定 |
| el:first-of-type  | 选取父元素中的第一个 el |
| el:last-of-type  | 选取父元素中的最后一个 el |
| :root  | 选取文档的根元素，在html中根元素都是hrml |
| :not(el)  | 选取除 el 之外的所有元素 |
| :empty  | 选取一个空标签 |
| :target  | 选取当前描点 |

### `nth-child` & `nth-of-type` 参数
* number：数值
* odd：奇数
* event：偶数
* n：表示可以进行运算 如， 2n-1

### `:nth-child` & `:nth-of-type` 之间的差别
```css
h1:nth-child(1)
{

}
```
```html
<div class="wrap">
    <p>1</p>
    <h1>2</h1>  /*没有被选中*/
</div>
```
`:nth-child(1)` 选中的是 `h1` 的父级 `.wrap` 中的第一个元素也就是 `p` ，但是由于它不是 `h1` 所以没有被选取。

```css
h1:nth-of-type(1)
{

}
```
```html
<div class="wrap">
    <p>1</p>
    <h1>2</h1>  /*被选中了*/
</div>
```
`:nth-of-type(1)` 选中的是 `h1` 的父级 `.wrap` 中的第一个 `h1` 元素，所以 `h1` 被选取了。

### `:not(el)` 用法
```css
.wrap :not(p)
{

}
```
```html
<div class="wrap">
    <div></div> /*被选中了*/
    <p></p>
</div>
```
选取 `.wrap` 下除 `p` 外的所有元素

```css
.wrap + :not(div)
{
    background: red;
}
```
```html
<div class="wrap">
    <p>1</p>  /*没有被选中*/
</div>
<p>2</p>  /*被选中了*/
```
选取 `.wrap` 相邻的除 `div` 外的元素

```css
p:not(.red)
{

}
```
```html
<div class="wrap">
    <p class="red">1</p>
    <p>2</p>  /*被选中了*/
</div>
```
选取 `p` 标签没有被 `.red` 选择的元素

## 元素状态选择器
| 选择器         | 说明           |
| ------------- | ------------- |
| el:focus  | 选取获得焦点时调用的样式，主要用在text和textarea上 |
| el:checked  | 选取选中时 |
| ::selection  | 选取选中时的样式 |
| :read-write  | 选取可读写 |
| el::before  | 选取前伪元素 |
| el::after  | 选取后伪元素 |

```css
::selection
{
    background: red;
}
```
常用的是选取时样式。此例选中文字时，文本元素背景会变成红色

{% note info %} 
el 是指被选择器选择的元素
{% endnote %}

## 伪类
```css
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
a:focus {color: red}        /* 聚焦 */
```
{% note info %} 
值得一提的是，`hover` 与 `active` 伪类不仅仅是在 `a` 标签中起效，利用它们能做出很多效果。
{% endnote %}

## 伪元素
```css
div::before
{
    content: '';
}
```
在元素前插入一个伪元素

```css
div::after
{
    content: url("img.png");
}
```
在元素后插入一个伪元素

### 伪元素内容
```css
content: ""  /*插入文字*/
content: url("")  /*插入图片*/
```
{% note info %} 
伪元素如果没有 `content` 那么它会消失，伪元素在 CSS3 中由一个点变成两个点用于区分伪元素与伪类的区别。伪元素是一个超级强大的黑科技，利用好它可以做到很多事情，例如：完美清除浮动、文字特效等。
{% endnote %}

# 字体样式
```css
p
{
    font-size: 10px;
}
```
字体大小，单位：`px` | `em` | `rem` | `%`

```css
p
{
    font-weight: bold;
}
```
字体粗细，属性：`100~900` | `lighter` 较细 | `bold` 粗 | `bolder` 很粗

```css
p
{
    color: red;
}
```
字体颜色，属性：`颜色单词` | `rgb` | `rgba` | `十六进制`

```css
p
{
    font-variant: small-caps;
}
```
字体转为小型大写字母，属性：`normal` 默认 | `small-caps` 小型大写字母

```css
p
{
    font-style: normal;
}
```
字体倾斜，属性：`normal` 默认 | `italic` 斜体 | `oblique` 倾斜 

## 字体类型
```css
*
{
    font-family: Microsoft Yahei, Arial, 宋体;
}
```
定义字体类型。如果计算机没有这项字体，那么从左至右选择计算机拥有的字体。这样一来就存在着局限性，为此 CSS3 引入了自定义字体：

```css
@font-face
{
	font-family: "自定义名";
	src: url("路径") format("字体格式");
	font-weight: normal;
	font-style: normal;
}
```
引入需要的字体，可以定义字体名、font-weight、font-style。

### 自定义字体支持情况
**一、TureTpe(.ttf)格式：**
.ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，因此他不为网站优化,支持这种字体的浏览器有【IE9+,Firefox3.5+,Chrome4+,Safari3+,Opera10+,iOS Mobile Safari4.2+】

**二、OpenType(.otf)格式：**
.otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，所以也提供了更多的功能,支持这种字体的浏览器有【Firefox3.5+,Chrome4.0+,Safari3.1+,Opera10.0+,iOS Mobile Safari4.2+】；

**三、Web Open Font Format(.woff)格式：**
.woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离,支持这种字体的浏览器有【IE9+,Firefox3.5+,Chrome6+,Safari3.6+,Opera11.1+】；

**四、Embedded Open Type(.eot)格式：**
.eot字体是IE专用字体，可以从TrueType创建此格式字体,支持这种字体的浏览器有【IE4+】；

**五、SVG(.svg)格式：**
.svg字体是基于SVG字体渲染的一种格式,支持这种字体的浏览器有【Chrome4+,Safari3.1+,Opera10.0+,iOS Mobile Safari3.2+】。

```css
@font-face 
{
	font-family: 'YourWebFontName';
	src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
         url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
}
```
多浏览器支持

## 简写
font: style variant weight size/height family

## rem
```css
:root
{
    font-size: 62.5%;
}
h1
{
    font-size: 3rem;
}
```
{% note info %} 
css 的单位很多，但是大体可分为：具体单位、相对单位，其中 `px`、`em` 与 `%` 是用得比较多的属性了，但是都有着各式的局限。css3 推出了字体相对单位 `rem`
与 `em` 不同点在于：`em` 相对的是父级而 `rem` 相对的是根元素。如今对 `rem` 的利用不单单是字体响应，还有着许多的开发者利用其响应的特点开发的 `rem` 布局。（不过我不喜欢使用，还是 flex 好用，希望没人怼我。<(￣3￣)>）
{% endnote %}

# 文本样式

## 首行缩进
```css
p
{
    text-indent: 10px;
}
```
属性：`%` 百分比 | `length` 固定

## 字间距
```css
p
{
    leet-spacing: 10px;
}
```
属性：`normal` 默认 | `length` 固定

## 词间距
```css
p
{
    word-spacing: 10px;
}
```
属性：`normal` 默认 | `length` 固定

## 行高
```css
p
{
    line-height: 1;
}
```
属性：`number` 数字 | `length` 固定 | `%` 百分比

{% note info %} 
行高主要是指两条基线之间的距离
{% endnote %}

## 垂直对齐
```css
img
{
    vertical-align: middle;
}
```
属性：`length` 数值 | `%` 使用 `line-height` 属性的百分比值来排列此元素，允许使用负值 | `baseline` 放置于父元素的基线上 | `sub` 对齐文本的下标 | `super` 对齐文本的上标 | `top` 把元素的顶端与行中最高元素的顶端对齐 | `text-top` 把元素的顶端与父元素字体的顶端对齐 | `middle` 把此元素放置在父元素的中部 | `bottom` 把元素的顶端与行中最低的元素的顶端对齐 | `text-bottom	` 	把元素的底端与父元素字体的底端对齐

{% note info %} 
定义行内元素的基线相对于该元素所在行的基线的垂直对齐。本属性与 `line-height` 的有着密切的联系。
{% endnote %}

## 文本修饰
```css
a
{
    text-decoration: none;
}
```
属性：`none` 默认 | `underline` 下划线 | `overline` 顶划线 | `line-through` 删除线

## 文本大小写
```css
p
{
    text-transform: uppercase;
}
```
属性：`uppercase` 转换大写 | `lowercase` 转换小写 | `capitalize` 首字母转换大写

## 文本对齐方式
```css
p
{
    text-align: left;
}
```
属性： `left` 左对齐 | `center` 居中对齐 | `right` 右对齐
{% note info %} 
`text-align` 可作用于图像。`text-align` 其实还拥有两个属性：`start`、`end` 这两个属性默认与 `left`、`right` 并无不同，他们更加语义化，在 flex 中便是使用它们。
{% endnote %}

## 文本阴影
```css
p
{
    text-shadow: 2px 2px 5px red;
}
```
属性：x轴 y轴 模糊距离 阴影颜色

```css
p
{
    text-shadow: 2px 2px 5px red, 2px 2px 5px blue;
}
```
文本阴影是可以叠加的

## 文本排列
```css
p
{
    direction: rtl;
}
```
属性：`ltr` 默认 | `rtl` 右向左
虽说 w3c 的定义是改变文本排列方向，其实 `direction` 改变的并非文本而是行内元素的左右顺序并且会改变 `text-align` 的 `left` 为 `right`。

```html
<p>
    <span>取消</span>
    <span>确认</span>
</p>
```
确认排到取消前面去了，这在满足某些 UI 需求时很有用。但是如果仅仅如此我就不会将它列在这里了：

```css
p
{
    direction: rtl;
    unicode-bidi: bidi-override;
    text-align: left;
}
```
配合 `unicode-bidi` 改变文字排列顺序。我们说过 `direction` 会改变 `text-aglign` 的属性，这里我将它恢复原样，具体使用看项目场景。

## 文本描边
```css
p
{
    -webkit-text-stroke: 1px red;
}
```
属性：`width` 宽度 | `color` 颜色
文本描边只有 `-webkit-` 浏览器支持，配合 `colo: transparent` 能够做出缕空字体：

```css
p
{
    -webkit-text-stroke: 1px red;
    color: transparent;
}
```

## 换行
```css
p
{
    word-wrap: break-word;
}
```
属性：`normal` 默认 | `break-word` 长单词或 URL 换行
{% note info %} 
长单词换行，在 css3 中它换了个好听的名字 `overflow: wrap;`，但是也就只有 `-webkit-` 浏览器支持。
{% endnote %}

```css
p
{
    word-break: break-all;
}
```
属性：`normal` 默认 | `break-all` 允许在单词内换行 | `keep-all` 只能在半角空格或连字符处换行

### `word-wrap` 与 `word-break` 之间的区别
<img src='/images/CSS/word.png' />
`word-break:break-all` 所有都会换行了，而 `word-wrap:break-word` 则只有长单词换行。

# 列表

## 列表符号
```css
ul
{
    list-style-type: none;
}
```
属性：`decimal` 默认 | `lower-alpha` 小写英文字母 | `upper-alpha` 大写英文字母 | `none` 去除列表符号

## 自定义列表符号
```css
ul
{
    list-style-image: url("img.png");
}
```

# 表格

## 边框合并
```css
table
{
    border-collapse: collapse;
}
```
属性：`separate` 默认 | `collapse` 边框合并

## 表格间距
```css
table
{
    border-spacing: 10px 5px;
}
```
属性：水平间距 垂直间距

{% note info %} 
默认情况下每个单元格之间都存在一定的间距，`border-collapse` 与 `border-spacing` 都是对其进行的操作。
{% endnote %}

## 表格标题位置
```css
caption
{
    caption-side: bottom;
}
```
属性：`top` 默认 | `bottom` 标题在底部

# 背景

## 背景图片
```css
.img
{
    background-image: url("img.png");
}
```

## 背景图位置
```css
.img
{
    background-position: 10px 5px;
}
```
属性：`length` x 轴 | `length` y 轴
关键词：`left` | `top` | `right` | `bottom`

## 背景重复
```css
.img
{
    background-repeat: no-repeat;
}
```
属性：`repeat` 默认 | `no-repeat` 不平铺 | `repeat-x` x 轴平铺 | `repeat-y` y 轴平铺

## 背景固定
```css
.img
{
    background-attachment: fixed;
}
```
属性：`scroll` 默认 | `fixed` 固定

## 背景大小
```css
.img
{
    background-size: 100% 100%;
}
```
属性：`length` 水平 | `length` 垂直
关键词：`cover` 铺满 | `contain` 缩放至紧贴一边的容器

## 背景相对位置
```css
.img
{
    background-origin: border-box;
}
```
属性：`padding-box` 相对于内边距（默认）| `border-box` 相对于边框 | `content-box` 相对于内容区域

## 背景绘制区域
```css
.img
{
    background-clip: border-box;
}
```
属性：`padding-box` 裁剪到内边距 | `border-box` 裁剪到边框 | `content-box` 裁剪到内容区域 | `text` 裁剪到文字(webkit 浏览器下实现)

## 多重背景
```css
.img
{
    background:url("img1.png") no-repeat, url("img2.png") no-repeat 
}
```

## 背景颜色
```css
.img
{
    background-color: red;
}
```

## 背景渐变

### 线性渐变
```css
.img
{
    background: linear-gradient(to right, red, blue);
}
```
属性：`linear-gradient(deg, start_color [ width], end_color [ width] [, start_color [ width], end_color [ width]])`
`deg`：`deg` 角度，如：`30deg` | `to position` 关键词，如：`top top left`
`start_color`：开始颜色
`end_color`：结束颜色
`width`: 宽度

```css
.img
{
    background: linear-gradient(to right, red, blue), linear-gradient(to right, red, blue);
}
```
线性渐变可叠加

```css
.img
{
    background: linear-gradient(to right, red 0, blue 10%, blue 100%);
}
```
线性渐变可指定范围

### 平铺线性渐变
```css
.img
{
    background: repeating-linear-gradient(to right, red 0, blue 10%, blue 20%);
}
```

### 径向渐变
```css
.img
{
    background: radial-gradient(red, green, blue);
}
```
属性：`radial-gradient([position [, shape size],] start_color, stop_color)`
`position`：关键词，只有 webkit 浏览器支持
`shape`：`circle` 圆型 | `ellipse` 椭圆
`size`：`length` 大小 | `closest-side` 圆心到最近的边 | `closest-corner` 圆心到最近的角 | `farthest-side` 圆心到最远的边 | `farthest-corner` 圆心到最远的角 | `contain` 包含 | `cover` 缩放至紧贴一边的容器

### 平铺径向渐变
```css
.img
{
    background: repeating-radial-gradient(red, yellow 10%, green 15%);
}
```

## 简写
backgruond: color image repeat attachment position / size

# 盒模型
<img src="/images/CSS/box.png" />

## 宽 & 高
```css
div
{
    width: 100px;  /*宽度*/
    max-width: 100px;  /*最大宽度*/
    min-width: 100px;  /*最小宽度*/
    height: 100px;  /*高度*/
    max-height: 100px;  /*最大高度*/
    min-height: 100px;  /*最小高度*/
}
```
{% note info %} 
需要注意的是行内元素是没有宽高的，但是有一些特例除外：`img` `input` 等。
{% endnote %}

### vh & vm
```css
.box
{
    width: 100vw;
    height: 100vh;
}
```
{% note info %} 
css3 中利用视窗的宽高对其进行划分：
100vw = 100%
100vh = 100%
利用好它们很有用，比如整屏切换。
{% endnote %}

## 溢出处理
```css
div
{
    overflow: hidden;
}
```
属性：`visible` 默认 | `hidden` 溢出隐藏 | `scroll` 显示滚动条 | `auto` 自适应是否出现滚动条

{% note info %} 
使用 `overflow` 清除浮动触发了 `block formatting context` ，所以他的边框不会和浮动的 `box` 重叠，缺点在于会隐藏或者有滚动条。
{% endnote %}

## 内边距
```css
p
{
    padding-top: 10px;  /*上边距*/
    padding-right: 10px;  /*右边距*/
    padding-bottom: 10px; /*下边距*/
    padding-left: 10px; /*左边距*/
}
简写：
p
{
    padding: 10px;  /*四边皆为 10px*/
    padding: 10px 9px 7px;  /*上、左 & 右、下*/
    padding: 10px 9px;  /*上 & 下、左 & 右*/
    padding: 10px 9px 8px 7px;  /*上、右、下、左*/
}
```

## 外边距
```css
p
{
    margin-top: 10px;  /*上边距*/
    margin-right: 10px;  /*右边距*/
    margin-bottom: 10px; /*下边距*/
    margin-left: 10px; /*左边距*/
}
简写：
p
{
    margin: 10px;  /*四边皆为 10px*/
    margin: 10px 9px 7px;  /*上、左 & 右、下*/
    margin: 10px 9px;  /*上 & 下、左 & 右*/
    margin: 10px 9px 8px 7px;  /*上、右、下、左*/
}
```
{% note info %} 
`margin: 0 auto` 能够使带有宽度的块元素水平居中
{% endnote %}

## 边框
```css
p
{
    border-top: 1px solid red;  /*上边框*/
    border-bottom: 1px solid red;  /*下边框*/
    border-left: 1px solid red;  /*左边框*/
    border-right: 1px solid red;  /*右边框*/
    border-width: 1px;  /*边框宽度*/
    border-color: red;  /*边框颜色*/
    border-style: solid;  /*边框样式*/
}
简写：
p
{
    border: 1px solid red;
}
```
属性：`width` `style` `color`
`style`：`solid` 实线 | `dashed` 虚线 | `dotted` 点线 | `double` 双线

### 边框圆角
```css
p
{
    border-radius: 10px;  /*四边皆为 10px*/
    border-radius: 10px 9px;  /*左上 & 右下 、 右上 & 左下*/
    border-radius: 10px 9px 8px;  /*左上、右上 & 左下、右下*/
    border-radius: 10px 9px 8px 7px;  /*左上、右上、右下、左下*/
    border-radius: 10px / 9px;  /*x 轴 / y 轴*/
}
```

### 边框背景
```css
p
{
    border-image: url("img.png") 10 repeat; /*四边皆为 10*/
    border-image: url("img.png") 10 9 repeat; /*上 & 下、 左 & 右*/
    border-image: url("img.png") 10 9 8 repeat; /*上、左 & 右、下&*/
    border-image: url("img.png") 10 9 8 7 repeat; /*上、右、下、左*/
}
```
属性：`url` `position` `repeat`
`url`：`url("")`
`position`：`top` `right` `bottom` `left`
`repeat`：`repeat` 重复 | `round` 平铺 | `stretch` 拉伸

## 阴影
```css
p
{
    box-shadow: 10px 10px 5px 1px red;
    box-shadow: 10px 10px 5px 1px red, 10px 10px 5px 1px yellow; /*阴影叠加*/
}
```
属性：`[inset] x y [blur] [spread] [color] [, [inset] x y [blur] [spread] [color] ...]`
`inset`：`inset` 内阴影
`x`：x 轴
`y`：y 轴
`blur`：模糊半径
`spread`：阴影范围
`color`：阴影颜色

## 盒模型转换
```css
.box
{
    display: none;
}
```
属性：`none` 移除文档流 | `inline` 行内 | `block` 块 | `inline-block` 行内块
{% note info %}
基础的模型就是以上几个，当然还有更多的更加强大的盒子模型请看后续章节。
{% endnote %}

## 自定义盒子
```css
.box
{
    width: 100px;
    height: 100px;
    background: red;
    resize: both;
    overflow: auto;
}
```
使用户自由拉升宽高、类似 `textarea` 标签的效果。
{% note info %} 
此属性必须配合 `overflow: auto` 使用否则不会产生效果。
{% endnote %}

## 怪异盒模型
```css
.box
{
    box-sizing: border-box;
}
```
属性：`content-box` 默认 | `border-box` 怪异模式
此方法开启怪异模式，怪异模式中元素的宽度包含内边距和边框
{% note info %} 
怪异盒模型是 ie 采用自身的盒模型机制产生的。由于历史原因，ie 标准曾与 w3c 标准背道而驰产生了两套标准，即：标准模式与怪异模式。事实证明 ie 的这套模式比标准模式清晰好用而加入了 css3 中。
{% endnote %}

# 定位
```css
.box
{
    position: absolute;
}
```
属性：`static` 默认 | `relative` 相对定位 | `absolute` 绝对定位 | `fixed` 固定定位

{% note info %} 
定位这个属性比较抽象，总的来说：
`relative`：相对于之前的位置，并且不脱离文档流。
`absolute`：如果父级元素有 `position` 属性，那么相对于父级的位置，否则相对于文档的位置。
`fixed`：相对于文档的位置
需要注意的是，在使用 `position` 属性之后它们的 `z` 轴将会提高一级覆盖在普通元素之上
{% endnote %}

```css
.box
{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
}
```
这些位置属性都是 `position` 的附属属性，用于位置的设定。此例利用它们贴边的特性制作了一个自适应遮罩层。

## 优先级
```css
.box
{
    z-index: 999;
}
```
{% note info %} 
这个属性一般用于被施加了 `position` 的元素，设置 `z` 轴的优先级。
{% endnote %}

## 裁剪
```css
img
{
    position:absolute;
    clip: rect(0, 60px, 200px, 0);
}
```
属性：`auto` 默认 | `rect` 裁剪矩形
`rect`：`rect(top, right, bottom, left)`
{% note info %} 
裁剪超出父元素的地方（这个属性我还没用到过一次，一般没谁会把超出的地方裁剪让人看不完全的，此外 `overflow` 完全能够替代它）
{% endnote %}

## 浮动
```css
.box
{
    float: left;
}
```
属性：`left` | `right` | `none`

{% note info %} 
浮动这个属性本意是为了使图片产生文字环绕效果的，但是经历开发者前辈们的开发将其大量运用于布局，w3c 也就顺水推舟将其放入定位之中了。
值得注意的是，浮动也会脱离文档流，同样会遮盖住普通元素。
{% endnote %}

### 清除浮动
```css
.box
{
    clear: both;
}
```
属性：`left` | `right` | `both`

除了这个清除浮动的方法之外，`overflow` 同样能够清除浮动。但是他们都有着自己的局限，使用下面的方法完美的清除浮动：

```css
.cf:before, .cf:after 
{
    content:"";
    display:table;
}
.cf:after 
{
    clear:both;
}
.cf 
{
    zoom:1;
}
```

# 透明度
```css
.box
{
    opacity: .2;
}
```
0 ~ 1 定义元素的透明度

```css
.box
{
    background: rgba(255, 255, 255, .2);
    color: rgba(255, 255, 255, .2);
}
```
在 css3 中添加了 `rgba` 的颜色属性同样能够定义透明度

# 鼠标样式
```css
img
{
    cursor: pointer;
}
```
属性：`default` 默认 | `pointer` 手型

## 自定义鼠标样式
```css
img
{
    cursor: url("img.png"), pointer;
}
```
属性：`url` | `type` 类型

{% note info %} 
鼠标类型有很多，常用的也就手型，也就不一一列出了。一般要特殊形状都是采用自定义手势。
{% endnote %}

# 元素可见性
```css
.box
{
    visibility: hidden;
}
```
属性：`visible` 默认 | `hidden` 不可见 | `collapse` 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。
{% note info %}
此元素与 `display: none` 的区别在于：
* 它是将元素的透明度变为0，而 `display: none` 则是直接将元素移除文档流。
* 此属性在设置 `transition` 后任何变化都有过渡，而 `display: none` 则没有任何效果。（这是一个小技巧，从中最大的体现了与 `display: none` 的区别）
{% endnote %}

# 计算属性
```css
.box
{
    width: calc(100% - 10px);
}
```
{% note info %} 
从此例应该就能看出 `calc` 的强大之处了，但是其在安卓中的兼容不佳，目前不建议在移动端之中使用。
{% endnote %}

# 变换

## 2D 变换
```css
.center
{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
此例利用 `translate` 的特性实现水平垂直居中

| 方法         | 属性           | 说明           |
| ----------- | ------------- | ------------- |
| 位移 | 1. translateX(x)<br />2. translateY(y)<br />3. translate(x, y) | 1. x 轴移动<br />2. y 轴移动<br />3. x 轴与 y 轴移动 |
| 缩放 | 1. scaleX(x)<br />2. scaleY(y)<br />3. scale(x, y) | 1. x 轴缩放<br />2. y 轴缩放<br />3. x 轴与 y 轴缩放 |
| 旋转 | rotate(deg) | 根据角度进行旋转 |
| 倾斜 | 1. skewX(x)<br />2. skewY(y)<br />3. skew(x, y) | 1. x 轴倾斜<br />2. y 轴倾斜<br />3. x 轴与 y 轴倾斜 |


{% note info %} 
需要注意的是：
* 位移的百分比相对的是自身的宽高
* 缩放是没有单位的
* 倾斜使用时文字会同时倾斜，可采用相反的角度再次倾斜解决。
{% endnote %}

### 矩阵
```text
transform: matrix(a, b, c, d, e, f)  //标准下，默认属性是(1 , 0, 0, 1, 0, 0)

filter: progid:DXImageTransform.Microsoft.Matrix(M11 = a, M12 = c, M21 = b, M22 = d, SizingMethod='auto expand')  //ie下，默认属性是( 1 , 0 , 0 , 1 )

模拟transklate：
x = e, y = f
transform: matrix( 1 , 0 , 0 , 1 , x , y )  //x轴与y轴位移

模拟scale：
x = a, y = d
transform: matrix( x , 0 , 0 , 1 , 0 , 0 )  //x轴缩放

transform: matrix( 1 , 0 , 0 , y , 0 , 0 )  //y轴缩放

ie：
x = a, y = d
filter: progid:DXImageTransform.Microsoft.Matrix( M11 = x , M12 = 0 , M21 = 0 , M22 = 1 , SizingMethod='auto expand' )  //x轴缩放

filter: progid:DXImageTransform.Microsoft.Matrix( M11 = 1 , M12 = 0 , M21 = 0 , M22 = y , SizingMethod='auto expand' )  //y轴缩放

模拟skew：
x = c, y = b

公式：
Math.tan(deg/180*Math.PI)  //角度求正切，正切是对边的比值，x与y都是求出的正切值

transform:matrix( 1, 0, x, 1, 0, 0 )  //x轴斜切

transform:matrix( 1, y, 0, 1, 0, 0 )  //y轴斜切

ie:
x = b, y = c
progid:DXImageTransform.Microsoft.Matrix( M11 = 1, M12 = x, M21 = 0, M22 = 1, SizingMethod='auto expand' )  //x轴斜切

progid:DXImageTransform.Microsoft.Matrix( M11 = 1, M12 = 0, M21 = y, M22 = 1, SizingMethod='auto expand' )  //y轴斜切

注：如果与缩放一起进行时，乘以缩放的x与y斜切角度才不会变，transform所有的变换效果都是通过矩阵来实现的，一些ie下的滤镜计算可以使用http://www.useragentman.com/IETransformsTranslator/ 下的工具辅助

模拟rotate：
公式：
a = Math.cos(deg/180*Math.PI)
b = Math.sin(deg/180*Math.PI)
c = -Math.sin(deg/180*Math.PI)
d = Math.cos(deg/180*Math.PI)

transform:matrix( a , b , c , d , 0 , 0 )  

ie：
filter:progid:DXImageTransform.Microsoft.Matrix( M11 = a, M12 = c, M21 = b, M22 = d, SizingMethod='auto expand' )  //ie下的原点不是在中心，所以需要改变left值与top值来实现旋转
```
{% note info %} 
其实以上表格中的位移、缩放、旋转、倾斜不过是 `matrix` 的语法糖而已，在此例中我使用 `matrix` 展现了各个属性。
{% endnote %}

### 基点
```css
.box
{
    tranform-origin: center center;
}
```

| 关键词         | `%`           | 说明           |
| ----------- | ------------- | ------------- |
| top left | 0 0 | 左上 |
| top center | 50% 0 | 靠上居中 |
| top right | 100% 0 | 右上 |
| left center | 0 50% | 靠左居中 |
| center center | 50% 50% | 正中 |
| right center | 100% 50% | 靠右居中 |
| bottom left | 0 100% | 左下 |
| bottom right | 100% 100% | 右下 |

{% note info %} 
变换的基点默认是中心点，使用 `tranform-origin` 能够改变基点。设置属性不但能够使用以上属性还能使用 `px` 等单位。当然属性还不止这些，后面会在 3D 中提到。
{% endnote %}

## 3D 变换

### 建立 3D 空间
```css
.box
{
    transform-style: preserve-3d;
}
```

### 景深
```css
.box
{
    perspective: 100px;
}
```
只有建立了 3D 空间的元素才拥有景深

### 景深基点
```css
div
{
    perspective-origin: center center;
}
```
| 关键词         | `%`           | 说明           |
| ----------- | ------------- | ------------- |
| top left | 0 0 | 左上 |
| top center | 50% 0 | 靠上居中 |
| top right | 100% 0 | 右上 |
| left center | 0 50% | 靠左居中 |
| center center | 50% 50% | 正中 |
| right center | 100% 50% | 靠右居中 |
| bottom left | 0 100% | 左下 |
| bottom right | 100% 100% | 右下 |

{% note info %}
景深这个词一般用于摄像领域不太好理解，我个人理解为视角。
{% endnote %}

### 3D 变换的方法
| 方法         | 属性           | 说明           |
| ----------- | ------------- | ------------- |
| 3D 旋转 | 1. rotateX(x)<br />2. rotateY(y)<br />3. rotate3d(x, y, z, a) | 1. x 轴的 3D 旋转<br />2. y 轴的 3D 旋转<br />3. x 轴与y 轴的 3D 旋转，a 表示旋转角度。正的角度值表示顺时针旋转，负值表示逆时针旋转。 |
| 3D 位移 | 1. translateZ(z)<br />2. translate3d(x, y, z) | 1. z 轴的位移<br />2. 带上 z 轴的 3D 位移 |
| 3D 缩放 | 1. scaleZ(z)<br />2. scale3d(x, y, z) | 1. z 轴的缩放<br />2. 带上 z 轴的 3D 缩放 |

### 隐藏不面向视口的元素
```css
div
{
    backface-visibility: hidden;
}
```
属性：`visible` 默认 | `hidden` 隐藏

### 3D 基点
```css
div
{
    transform-origin: left center 10px;
}
```
与 2D 相比增加了一个 z 轴（这里一般可以理解为厚度）

# 过渡

## 过渡的属性
```css
.box
{
    transition-property: transform;
}
```
能同时指定多个样式依次执行中间用 `,` 隔开，不指定属性名时该元素所以属性都有过度效果，`all` 则为所有属性可省略不写也是所有属性。

## 过渡的时间
```css
.box
{
    transition-duration: 1s;
}
```
指定过渡的时间，需要注意的是在 `:hover` 中使用没有移出效果，而要在元素选择时使用。

## 过渡的方式
```css
.box
{
    transition-timing-function: ease;
}
```
规定过渡效果的速度曲率

<img src='/images/CSS/timing.png' />

除上图规定的曲率还能自定义曲率：

```css
.box
{
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.46, 0.22);
}
```
贝塞尔曲线，自定义曲率

## 过渡的延迟
```css
.box
{
    transition-delay: 1s;
}
```
延迟过渡的执行时间

## 过渡的事件
```css
.img
{
    width: 10px;
    height: 10px;
    background: red;
    margin: 300px auto;
    transition: 1s;
}
.img:hover
{
    width: 100px;
}
```
```html
<div class="img"></div>
```
```javascript
var img = document.getElementsByClassName('img')[0];
img.addEventListener('transitionend', function()
{
    console.log(1);
})
```
transition结束事件，每改变一条样式会触发一次，由于会重复触发，需要解绑事件来解决

## 简写
transition: property duration delay timing-function

# 动画

## 动画的定义
```css
@keyframes am
{
    from
    {
            transform: translateX(0);
    }
    to
    {
        transform: translateX(10px);
    }
}
```
{% note info %}
技巧：
* 使用 `@keyframes` 规则时，如果仅仅只有 0% 和 100% 这两个百分比的话，这时 0% 和 100% 还可以使用关键词 `from` 和 `to` 来代表，其中 0% 对应的是 `from`，100%对应的是 `to`
* 设置 0% 与 100% 为空，50% 设置属性可以形成无迟滞的效果。
{% endnote %}

## 动画的调用
```css
.box
{
    animation-name: am;
}
```
动画能在多个元素中调用，也就就是说 `@keyframes` 类似一个方法可以复用。

## 动画的持续时间
```css
.box
{
    animation-duration: 1s;
}
```
规定动画的持续时间

## 动画的方式
```css
.box
{
    animation-timing-function: 1s;
}
```
规定过渡效果的速度曲率

<img src='/images/CSS/timing.png' />

与过渡一样，除上图规定的曲率还能自定义曲率：

```css
.box
{
    animation-timing-function: cubic-bezier(0.25, 0.1, 0.46, 0.22);
}
```
贝塞尔曲线，自定义曲率。

## 动画的延迟
```css
.box
{
    animation-delay: 1s;
}
```
延迟动画的执行时间

## 动画的播放次数
```css
.box
{
    animation-iteration-count: infinite;
}
```
属性：`number` 次数 | `infinite` 无限

## 播放方向
```css
.box
{
    animation-direction: alternate;
}
```
属性：`normal` 默认 | `reverse` 反 | `alternate` 正反轮流播放
{% note info %}
如果 `animation-direction` 值是 `alternate`，则动画会在奇数次数正常播放，而在偶数次数向后播放。（利用好它能够制作出无缝动画）
{% endnote %}

## 播放状态
```css
.box
{
    animation-play-state: paused;
}
```
属性：`running` 播放 | `paused` 暂停
{% note info %}
这个属性一般是 js 来进行操控的，很少直接用到。
{% endnote %}

## 动画完成
```css
.box
{
    animation-fill-mode: backwards;
}
```
属性：`none` 默认 | `forwards` 动画结束之后继续应用最后的关键帧位置 | `backwards` 会在向元素应用动画样式时迅速应用动画的初始帧 | `both` 元素动画同时具有forwards和backwards效果
{% note info %}
这个属性很强大，比如用于制作无缝轮播。
{% endnote %}

## 简写
animation: duration delay name timing-function iteration-count direction fill-mode

# 媒体查询

## 内部使用
```css
@media (width: 375px) and (orientation : portrait)
{
    .box
    {
        background: green;
    }
}
```
此例中，iPhone6/7 在竖屏的状态下上了原谅色。

```css
@import url("style.css") (width: 375px);
```
引入的 css 同样能够使用响应式，需要注意的是必须放在首行，否则无法生效。

## 外部引入
```html
<link rel="stylesheet" href="style.css" media="(width: 375px) and (orientation : portrait)">
```

## 常见的属性
| 属性 | 说明 |
| --- | --- |
| devicle-width, device-height | 屏幕宽高 |
| width, height | 渲染窗口宽高 |
| min-width, min-height | 渲染窗口最小宽高 |
| max-width, max-height | 渲染窗口最大宽高 |
| orientation | 设备方向(landscape 横屏、portrait 竖屏) |
| resolution | 设备分辨率 |