---
title: HTML
categories: HTML
tag: 
- 前端
- HTML
---

# head

## meta
``` html
<meta charset="UTF-8">
```
定义 html 文件为 utf-8 编码。

``` html
<meta name='viewport'  content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
```
定义页面为 H5 窗口，以下是它的属性：

| 属性        | 属性值           | 说明  |
| ------------- | ------------- | ----- |
| name      | viewport | 定义HTML5虚拟窗口 |
| content      | 1. width=device-width<br />2. user-scalable=no<br />3. initial-scale=1.0<br />4. maximum-scale=1.0<br />5. minimum-scale=1.0     |   1. 定义宽度为设备宽度<br />2. 不允许用户手动缩放<br />3. 初始缩放比例<br />4. 允许用户缩放到的最大比例<br />5. 允许用户缩放到的最小比例 |

## link
``` html
<link href='file_name.ico'  rel='icon' /></link>
```
标签页图标。

``` html
<link href='file_name.ico'  rel='icon' /></link>
```
引入外部 css。

## script
``` html
<script src='file_name.js'></script>
```
引入外部 javascript。

``` html
<script src='file_name.js' defer="defer"></script>
```
页面加载后开始执行

``` html
<script src='file_name.js' async="async"></script>
```
异步加载脚本

## 注释语句
``` html
<!--[if IE8]>
<script>
    console.log(1);
</script>
<![endif]-->
```

# 语义标签

## 具象图
<img src="/images/html/lay1.png" />
<img src="/images/html/lay2.png" />

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
``` html
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
``` html
<ol><li>  //有序列表
<ul><li>  //无序列表
<dl><dt><dd>  //定义列表
```

## 表格
``` html
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
``` html
<img src='图片地址' alt='图片描述' title='给用户描述' />  //图片，target的值：_self 默认、_blank 新窗口
<a href='链接地址' target='目标窗口打开方式'>  //超链接，href 之中使用 # 时能够定位到 id
```

## 浮动框架
``` html
<iframe>  //浮动框架
```
属性：src 源文件、width 宽、height高 、scrolling 框架设置
scrolling的值：auto 默认值 | yes 总是显示滚动条 | no 任何时候都不显示滚动条

## 展开列表
``` html
<details>
    <summary>标题</summary>
    隐藏的
</details>
```
展开列表，一般配合使用，details 加上 open 属性默认展开。（不建议用，太丑）

## 进度条
``` html
<progress value="50" max="100"></progress>
```
进度条，max 定义满值，value 定义进度。（不建议用，太丑）