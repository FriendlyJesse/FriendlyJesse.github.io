---
title: CSS-黑科技
categories: CSS
tag: 
- 前端
- CSS
---

# 圆形
```css
.round
{
    border-radius: 50%;
}
```

# 三角形
```css
.a
{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 100px solid red;
}
```
三角形对着哪边把哪边的相反位置弄成红色就 ok

# 负 margin
```css
.row
{
    padding: 0 15px;
}
.row .full
{
    margin: 0 -15px;
}
```
`bootstrap` 便运用了此经典的负 `margin` 方法，以下还有使用负 `margin` 垂直、水平居中的实例

# 各种姿势居中

## margin 居中
```css
div
{
    width: 50%;
    margin: 0 auto;
}
```
`auto` 能够水平居中是因为宽度是能被系统计算出宽度，然后限制自身元素宽度就能够诡异的居中了，而垂直居中则不能计算出，但是我们能够使用一些黑科技使得高能够被计算机计算出来：

```css
div
{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    margin: auto;
    background: red;
}
```
{% note info %}
注：此处四边皆为 `0` 运用了流体的自适应的黑科技，可使用宽高 `100%` 替代，但是运用在此处彰显了 `CSS` 黑科技之名不是吗？
{% endnote %}

```css
div
{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
}
```
如此也能居中，但是只能居中固定数值，下面的方法能够居中百分比

## transform 居中
```css
div
{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
}
```
能够居中百分比是因为 `transform` 是相对自身进行变换的

## flex 居中
```css
div
{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

# 滚动条
```css
::-webkit-scrollbar 
{
    width: 0px;
    height: 1px;
}
::-webkit-scrollbar-thumb 
{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
} 
```
隐藏滚动条，照常滚动

# 文本溢出省略

## 单行省略
```css
.text
{
    overflow: hidden;  /*溢出省略*/
    text-overflow: ellipsis;  /*溢出隐藏*/
    white-space: nowrap;  /*溢出不换行*/
}
```

## 多行省略
```css
.text
{
    display: -webkit-box;  /*box*/
    -webkit-box-orient: vertical; /*盒子排列方式*/
    -webkit-line-clamp: 3;  /*限制行数*/
    overflow: hidden;  /*溢出隐藏*/
}
```
{% note info %}
注：需要将 `height` 设置为 `line-height` 的整数倍，防止超出的文字露出
{% endnote %}

# 线中间的标题
<img src='/images/CSS-黑科技/title.png' />

```html
<h5>
    <span>title</span>
</h5>
```
```css
h5
{
    height: 14px;
    position: relative;
}
h5::after
{
     content: '';
     display: block;
     width: 100%;
     height: 1px;
     position: absolute;
     top: 7px;
     background: #efefef;
}
h5 span
{
    display: block;
    width: 150px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    background: #fff;
    text-align: center;
}
```

# 1px 边框
```css
.border-1px
{
    position: relative;
}
.border-1px::after
{
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid #c0c0c0;
}
@media (min-device-pixel-ratio: 1.5), (-webkit-min-device-pixel-ratio: 1.5)
{
    .border-1px::after
    {
      transform: scaleY(.7);
    }
}
@media (min-device-pixel-ratio: 2), (-webkit-min-device-pixel-ratio: 2)
{
    .border-1px::after
    {
      transform: scaleY(.5);
    }
}
```
由于 `dpr` 的因素 `0.5px` 会被渲染为 `1px`，所以在缩放 `50%` 以避免 `1px` 的问题