---
title: 小程序
categories: 小程序
tag: 
- 前端
- 小程序
---

# 前言

{% cq %}
小程序相对而言其实是非常简单的，其中提供了充足的内置组件以供开发需要。此文主要讲述基本内容以及开发中的技巧。
{% endcq %}

# 目录结构

<img src='/images/applets/Applet.png' />

{% note info %}
小程序的开发工具在创建项目时会自动生成以上结构，创建时必须是目录不存在才行。
{% endnote %}

## wxml
`wxml` 被小程序魔改，其中常使用的标签有：
```html
<view></view>
<text></text>
<image></image>
<template></template>
<block></block>
<button></button>
<input />
```

## wxss
`wxss` 倒是与 `css` 没有多大差别。小程序在 `wxss` 中主要做的是：
1. 建立 `rpx` 适配单位（默认 iPhone6）
2. 大量的采用 `flex` 布局，对其强有力的支持
3. 文件作用域（每个页面都有自身相对的作用域，app.wxss 作为全局作用域）

{% note info %}
我在做项目时采用的是 scss 生成 app.wxss 文件，并没有使用它的文件作用域。
文件作用域的局限：
小程序对组件化并没有很好的支持，是一种不成熟的方案，每次引入子组件时需要同时引入子组件的 wxss。而 scss 能够弥补这一缺陷。
{% endnote %}

## js
如上，小程序并没有真正的实现组件化。但是他们提供了 `AMD` 以及 `es6` 转 `es5`，所以我在项目的实现中使用了 `es6` 的模块化方式。

### app.js
小程序中的 app.js 是全局存在的。也就是说，在开启小程序的那一刻它就会一直存在直到关闭小程序。
`getApp()` 是全局调用 app.js 的方法，我们能够在其中放置全局参数与方法。

# 配置

## app.json
```json
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "navigationBarTitleText": "Demo"
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}
```
`app.json` 文件来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。

常用的配置项：
1. `pages` 设置页面路径
2. `window` 设置默认页面的窗口表现
3. `tabBar` 设置底部 tab 的表现
{% note info %}
值得一提的是，`tabBar` 中的页面跳转切换必须使用 `wx.switchTab` 才行。
{% endnote %}

## page.json
```json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```
{% note info %}
值得一提的是，`app.json` 中 `window` 的配置可被页面的 `page.json` 配置所覆盖。
注意：它们是不需要 `window` 这个 `key` 的，直接在配置中写即可。
{% endnote %}

# 模板引入
```html
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
```
```html
<!-- 引入 item.wxml 模板 -->
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>
```
如上例，可以使用 `data` 属性向组件传递参数。

# 页面跳转

## api 跳转
```js
wx.navigateTo({
  url: 'test?id=1'
})
```
保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。

## 组件跳转
```html
<navigator url="test?id=1"></navigator>
```
小程序提供了很方便的跳转组件

{% note info %}
小程序中跳转页面的参数传递利用的是类似 `get` 方式的传参。
{% endnote %}

## 参数接收
```js
//test.js
Page
({
  onLoad: function(option)
  {
    console.log(option.query)
  }
})
```
页面跳转之后的参数会在名为 `onLoad` 的生命周期函数之中的参数获得到。

{% cq %}
看完以上技巧后，如果对其中提到的：<a src='https://github.com/FriendlyJesse/ReaderAndMovie'>小项目</a>感兴趣的话。请下载下来跑一遍，研究其中的源码，相对来说还是很简单的。
此<a src='https://github.com/FriendlyJesse/ReaderAndMovie'>项目</a>是根据教程制作，其中运用技术：小程序内置框架 + es6 + scss
{% endcq %}