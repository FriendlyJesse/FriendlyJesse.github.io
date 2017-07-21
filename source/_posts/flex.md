---
title: flex
date: 2017-07-21 21:57:13
categories: CSS
tag: 
- 前端
- CSS
- layout
---

# flex 布局是什么？
`Flex` 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

```css
.box
{
  display: flex;
}
```
任何一个容器都可以指定为 `Flex` 布局

```css
.box
{
  display: inline-flex;
}
```
行内元素也可以使用 `Flex` 布局

{% note warning %}
注意，设为 `Flex` 布局以后，子元素的 `float`、`clear` 和` vertical-align` 属性将失效。
{% endnote %}

## flex 的历史版本
<img src='/images/flex/flex_compatible.png' />

```css
.box
{
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
}
```
{% note info %}
2009年，W3C提出了一种新的方案----Flex布局，可以简便、完整、响应式地实现各种页面布局，2012年得到进一步完善。
2009年版本的语法已经过时（display: box），使用的时候为了兼容需要加上一些前缀。
2012年将是往后标准的语法（display: flex），大部分浏览器已经实现了无前缀版本。
{% endnote %}
{% note warning %}
注意：在低版本安卓（4.4）下实行的是09年的旧版标准，所以部分机型（如：魅族低版本）需要使用 box 进行相应的兼容。
{% endnote %}

# flex 具象图
<img src='/images/flex/flex.png' />

图解：
* 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。
* 主轴的开始位置（与边框的交叉点）叫做 `main start`，结束位置叫做 `main end`；交叉轴的开始位置叫做 `cross start`，结束位置叫做 `cross end`。
* 项目默认沿主轴排列。单个项目占据的主轴空间叫做 `main size`，占据的交叉轴空间叫做 `cross size`。

# 容器属性

## 盒子排列方向
<img src='/images/flex/direction.png' />

```css
.box 
{
  flex-direction: row | row-reverse | column | column-reverse;
}
```
属性：
* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

## 盒子折行
<img src='/images/flex/wrap.png' />

```css
.box
{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
属性：
* nowrap（默认）：不换行
* wrap：换行，后面的被挤下去
* wrap-reverse：换行，后面的被挤上去

## 简写
flex-flow: direction wrap  //盒子排列方向与折行的简写，默认值为row nowrap。

## 盒子水平对齐
<img src='/images/flex/content.png' />

```css
.box 
{
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
属性：
* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

## 盒子垂直对齐
<img src='/images/flex/align.png' />

```css
.box 
{
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
属性：
* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline: 项目的第一行文字的基线对齐。
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

## 多轴对齐
<img src='/images/flex/align_content.png' />

```css
.box 
{
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
属性：
* flex-start：与交叉轴的起点对齐。
* flex-end：与交叉轴的终点对齐。
* center：与交叉轴的中点对齐。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）：轴线占满整个交叉轴。

# 元素属性

## 排列顺序
<img src='/images/flex/order.png' />

```css
.item 
{
  order: <integer>; /* 按照整数的大小进行排列 */
}
```

## 放大比例
<img src='/images/flex/grow.png' />

```css
.item 
{
  flex-grow: <number>; /* default 0 */
}
```
如果所有项目的 `flex-grow` 属性都为 `1`，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为 `2`，其他项目都为 `1`，则前者占据的剩余空间将比其他项多一倍。

## 缩小比例
<img src='/images/flex/shrink.png' />

```css
.item 
{
  flex-shrink: <number>; /* default 1 */
}
```
如果所有项目的 `flex-shrink` 属性都为 `1`，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 `0`，其他项目都为 `1`，则空间不足时，前者不缩小。

## 剩余空间分配
```css
.item 
{
  flex-basis: <length> | auto; /* default auto */
}
```
`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小。
它可以设为跟 `width` 或` height` 属性一样的值（比如350px），则项目将占据固定空间。

## 简写
```css
.item 
{
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
`flex` 属性是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选。

{% note info %}
该属性有两个快捷值：
* auto (1 1 auto) 
* none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
{% endnote %}

## 特殊属性
<img src='/images/flex/self.png' />

```css
.item 
{
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
 `align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。
 该属性可能取 `6` 个值，除了 `auto`，其他都与 `align-items` 属性完全一致。
 
{% note success %}
本文并非原创，摘录自<a href='http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html'>阮一峰的 flex 教程</a>，并在文中写入了自身的领悟。
{% endnote %}