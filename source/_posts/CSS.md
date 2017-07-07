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
<p></p>  //此元素被光荣选中
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
<p></p>  //此元素被光荣选中
<p></p>  //此元素被光荣选中
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
    <h1>2</h1>  //没有被选中
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
    <h1>2</h1>  //被选中了
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
    <div></div> //被选中了
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
    <p>1</p>  //没有被选中
</div>
<p>2</p>  //被选中了
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
    <p>2</p>  //被选中了
</div>
```
选取 `p` 标签没有被 `.red` 选择的元素

## 元素状态选择器
| 选择器         | 说明           |
| ------------- | ------------- |
| 元素:focus  | 选取获得焦点时调用的样式，主要用在text和textarea上 |
| 元素:checked  | 选取选中时 |
| 元素:selection  | 选取选中时的样式 |
| 元素:read-write  | 选取可读写 |
| 元素::before  | 选取前伪元素 |
| 元素::after  | 选取后伪元素 |

{% note info %} 
el 是指被选择器选择的元素 
{% endnote %}

# 字体类型
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

## 自定义字体支持情况
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

## 字体样式简写
```css
font: style variant weight size/height family
```

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

# 超链接伪类
```css
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
```
{% note info %} 
值得一提的是，`hover` 与 `active` 伪类不仅仅是在 `a` 标签中起效，利用它们能做出很多效果。
{% endnote %}