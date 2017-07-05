---
title: Emmet
date: 2017-07-06 00:02:29
categories: HTML
tag: 
- 前端
- HTML
- Emmet
---

# 标签

## 后代：`>`
```html
<nav>
    <ul>
        <li></li>
    </ul>
</nav>
```
缩写：`nav>ul>li`

## 兄弟：`+`
```html
<div></div>
<p></p>
<blockquote></blockquote>
```
缩写：`div+p+bq`

## 上级：`^`
```html
<div></div>
<div>
    <p></p>
    <blockquote></blockquote>
</div>
```
缩写：`div+div>p^bq`

```html
<div></div>
<div>
    <p></p>
</div>
<blockquote></blockquote>
```
缩写：`div+div>p^^bq`

## 分组：`()`
```html
<header>
    <nav>
        <ul>
            <li><a href=""></a></li>
        </ul>
    </nav>
</header>
<footer>
    <p></p>
</footer>
```
缩写：`(header>nav>ul>li>a)+footer>p`

```html
<table>
    <thead>
    <tr>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    </thead>
</table>
```
缩写：`table>thead>((tr>th*3)*3)`

## 乘法：`*`
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```
缩写：`ul>li*5`

# 属性

## class：`.`
```html
<div class="title"></div>
```
缩写：`.title`

```html
<p class="class1 class2 class3"></p>
```
缩写：`p.class1.class2.class3`

## id：`#`
```html
<div id="header"></div>
```
缩写：`#header`

```html
<form id="search" class="wide"></form>
```
缩写：`form#search.wide`

## 自定义属性：`[]`
```html
<p title="Hello world"></p>
```
缩写：`p[title="Hello world"]`

```html
<td rowspan="2" colspan="3" title=""></td>
```
缩写：`td[rowspan=2 colspan=3 title]`

# 文本
```html
<a href="">Click me</a>
```
缩写：`a{Click me}`

# 隐式标签
```html
<div class="class"></div>
```
缩写：`.class`

```html
<em><span class="class"></span></em>
```
缩写：`em>.class`

```html
<ul>
    <li class="class"></li>
</ul>
```
缩写：`ul>.class`

```html
<table>
    <tr class="row">
        <td class="col"></td>
    </tr>
</table>
```
缩写：`table>.row>.col`

# 缩写

## html文档
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
```
缩写：!

## 链接
```html
<a href=""></a>
```
缩写：a

```html
<a href="http://"></a>
```
缩写：a:link

## link
```html
<link rel="stylesheet" href="" />
```
缩写：link

```html
<link rel="stylesheet" href="style.css" />
```
缩写：link:css

```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
```
缩写：link:favicon

## form
```html
<form action=""></form>
```
缩写：form

```html
<form action="" method="get"></form>
```
缩写：form:get

```html
<form action="" method="post"></form>
```
缩写：form:post

## input
```html
<input type="text" />
```
缩写：input

```html
<input type="text" name="" id="">
```
缩写：input:typeName

## button
```html
<button></button>
```
缩写：btn

```html
<button type="button"></button>
```
缩写：btn:b

```html
<button type="submit"></button>
```
缩写：btn:s