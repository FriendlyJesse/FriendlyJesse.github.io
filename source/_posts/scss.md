---
title: SCSS
date: 2017-07-21 23:07:40
categories: CSS
tag: 
- 前端
- CSS
- SCSS
---

# SCSS 环境

## ruby 安装
<img src='/images/scss/ruby.png' />

安装步骤：
1. 下载 `Ruby` 运行库
2. 安装到 `C` 盘
3. 安装目录时选择 `Add`

{% note warning %}
因为 `sass` 依赖于 `ruby` 环境，所以装 `sass` 之前先确认装了 `ruby`。先导官网下载个 `ruby`在安装的时候，请勾选 `Add Ruby executables to your PATH` 这个选项，添加环境变量，不然以后使用编译软件的时候会提示找不到 `ruby` 环境。
{% endnote %}

## SCSS 安装
安装步骤：
1. 下载 `SCSS`，地址：https://rubygems.org/gems/sass
2. 打开 `Ruby` 命令行

`Ruby` 命令行键入：
```ruby
gem install <这里把Sass安装包拖进来>
```
```ruby
sass -v
```
<img src='/images/scss/install.png' />
出现以上即为成功

其余命令：
更新：gem update sass
卸载：gem uninstall sass

{% note info %}
其实本可以直接在 `ruby` 中直接安装 `scss`，不想多说，墙的胜利。
{% endnote %}

# SCSS 编译

## webstorm
<img src='/images/scss/webstorm.png' />

{% note info %}
注意：`webstorm` 编译 `scss` 不能使用中文目录。
{% endnote %}

## sublime
步骤：
1. 打开 sublime，ctrl+shift+p，并输入install
2. 输入 sass，下载
3. 书写 scss 后 ctrl+b 编译

## HBuilder
<img src='/images/scss/hb.png' />

步骤：
1. 工具 -> 与编译器设置
2. 编辑 scss
3. 智能完成

# SCSS 与 SASS
```sass
body
  background: #eee
  font-size:12px
p
  background: #0982c1
```
文件后缀名为sass的语法

```scss
body 
{
  background: #eee;
  font-size:12px;
}
p
{
  background: #0982c1;
} 
```
文件后缀名为scss的语法 

{% note info %}
`sass` 有两种后缀名文件：一种后缀名为 `sass`，不使用大括号和分号；另一种就是我们这里使用的 `scss` 文件，这种和我们平时写的 `css` 文件格式差不多，使用大括号和分号。而本教程中所说的所有 `sass` 文件都指后缀名为 `scss` 的文件。在此也建议使用后缀名为 `scss` 的文件，以避免 `sass` 后缀名的严格格式要求报错。
{% endnote %}

# 导入
```scss
//a.scss
//-------------------------------
body 
{
  background: #eee;
}
```
被导入 `scss` 文件 `a.scss`

```scss
@import "reset.css";
@import "a";
p
{
  background: #0982c1;
} 
```
需要导入样式的 `scss` 文件 `b.scss`

```scss
@import "reset.css";
body 
{
  background: #eee;
}
p
{
  background: #0982c1;
}
```
编译后的文件

# 注释
```scss
/*
*我是css的标准注释
*设置body内距
*/
body
{
  padding:5px;
} 

//我是双斜杠表示的单行注释
//设置body内距
body
{
  padding:5px; //5px
} 
```
{% note info %}
`scss` 有两种注释方式，一种是标准的 `css`注释方式 `/* */`，另一种则是 `//` 双斜杆形式的单行注释，不过这种单行注释不会被编译出来。
{% endnote %}

# 变量
`scss` 的变量必须是 `$` 开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号 `:` 分隔开（就像CSS属性设置一样），如果值后面加上 `!default` 则表示默认值。

## 普通变量
```scss
//scss style
//-------------------------------
$fontSize: 12px;
body
{
    font-size:$fontSize;
}

//css style
//-------------------------------
body
{
    font-size:12px;
}
```
定义之后可以在全局范围内使用。

## 默认变量
```scss
//scss style
//-------------------------------
$baseLineHeight:        1.5 !default;
body
{
    line-height: $baseLineHeight; 
}

//css style
//-------------------------------
body
{
    line-height:1.5;
}
```
`scss` 的默认变量仅需要在值后面加上 `!default` 即可。

```scss
//scss style
//-------------------------------
$baseLineHeight:        2;
$baseLineHeight:        1.5 !default;
body
{
    line-height: $baseLineHeight; 
}

//css style
//-------------------------------
body
{
    line-height:2;
}
```
`scss` 的默认变量一般是用来设置默认值，然后根据需求来覆盖的，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可

## 特殊变量
```scss
//scss style
//-------------------------------
$borderDirection:       top !default; 
$baseFontSize:          12px !default;
$baseLineHeight:        1.5 !default;

//应用于class和属性
.border-#{$borderDirection}
{
  border-#{$borderDirection}:1px solid #ccc;
}
//应用于复杂的属性值
body
{
    font:#{$baseFontSize}/#{$baseLineHeight};
}

//css style
//-------------------------------
.border-top
{
  border-top:1px solid #ccc;
}
body 
{
  font: 12px/1.5;
}
```
一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等则必须要以 `#{$variables}` 形式使用。

## 多值变量

### list
定义：
```scss
//一维数据
$px: 5px 10px 20px 30px;

//二维数据，相当于js中的二维数组
$px: 5px 10px, 20px 30px;
$px: (5px 10px) (20px 30px);
```
使用：
```scss
//sass style
//-------------------------------
$linkColor:         #08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
a
{
  color:nth($linkColor,1);

  &:hover
  {
    color:nth($linkColor,2);
  }
}

//css style
//-------------------------------
a
{
  color:#08c;
}
a:hover
{
  color:#333;
}
```
`list` 数据可通过空格，逗号或小括号分隔多个值，可用 `nth($var,$index)` 取值。关于list数据操作还有很多其他函数如 `length($list)，join($list1,$list2,[$separator])，append($list,$value,[$separator])` 等，具体可参考 <a href='http://sass-lang.com/documentation/Sass/Script/Functions.html'>sass Functions</a>（搜索List Functions即可）

### map
定义：
```scss
$heading: (h1: 2em, h2: 1.5em, h3: 1.2em);
```
使用：
```scss
//sass style
//-------------------------------
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings 
{
  #{$header} 
  {
    font-size: $size;
  }
}

//css style
//-------------------------------
h1 
{
  font-size: 2em; 
}
h2 
{
  font-size: 1.5em; 
}
h3 
{
  font-size: 1.2em; 
}
```
`map` 数据以 `key` 和 `value` 成对出现，其中 `value` 又可以是 `list`。格式为：`$map: (key1: value1, key2: value2, key3: value3);`。可通过 `map-get($map,$key)` 取值。关于 `map` 数据还有很多其他函数如 `map-merge($map1,$map2)，map-keys($map)，map-values($map)` 等，具体可参考<a href='http://sass-lang.com/documentation/Sass/Script/Functions.html'>sass Functions</a>（搜索Map Functions即可）

# 嵌套
`scss` 的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。我们一般说起或用到的都是选择器的嵌套。

## 选择器嵌套
```scss
//scss style
//-------------------------------
#top_nav
{
  line-height: 40px;
  text-transform: capitalize;
  background-color:#333;
  li
  {
    float:left;
  }
  a
  {
    display: block;
    padding: 0 10px;
    color: #fff;

    &:hover
    {
      color:#ddd;
    }
  }
}

//css style
//-------------------------------
#top_nav
{
  line-height: 40px;
  text-transform: capitalize;
  background-color:#333;
}  
#top_nav li
{
  float:left;
}
#top_nav a
{
  display: block;
  padding: 0 10px;
  color: #fff;
}
#top_nav a:hover
{
  color:#ddd;
}
```
所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了 `sass` 文件的结构性和可读性。在选择器嵌套中，可以使用 `&` 表示父元素选择器。

## 属性嵌套
```scss
//sass style
//-------------------------------
.fakeshadow 
{
  border: 
  {
    style: solid;
    left: 
    {
      width: 4px;
      color: #888;
    }
    right: 
    {
      width: 2px;
      color: #ccc;
    }
  }
}

//css style
//-------------------------------
.fakeshadow 
{
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #888;
  border-right-width: 2px;
  border-right-color: #ccc; 
}
```
所谓属性嵌套指的是有些属性拥有同一个开始单词，如border-width，border-color都是以border开头。

# 跳出嵌套
```scss
//scss style
//-------------------------------
//没有跳出
.parent-1 
{
  color:#f00;
  .child 
  {
    width:100px;
  }
}

//单个选择器跳出
.parent-2 
{
  color:#f00;
  @at-root .child 
  {
    width:200px;
  }
}

//多个选择器跳出
.parent-3 
{
  background:#f00;
  @at-root 
  {
    .child1 
    {
      width:300px;
    }
    .child2 
    {
      width:400px;
    }
  }
}

//css style
//-------------------------------
.parent-1 
{
  color: #f00;
}
.parent-1 .child 
{
  width: 100px;
}

.parent-2 
{
  color: #f00;
}
.child 
{
  width: 200px;
}

.parent-3 
{
  background: #f00;
}
.child1 
{
  width: 300px;
}
.child2 
{
  width: 400px;
}
```
sass3.3.0中新增的功能，用来跳出选择器嵌套的。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。

```scss
//scss style
//-------------------------------
//跳出父级元素嵌套
@media print 
{
    .parent1
    {
      color:#f00;
      @at-root .child1 
      {
        width:200px;
      }
    }
}

//跳出media嵌套，父级有效
@media print 
{
  .parent2
  {
    color:#f00;

    @at-root (without: media) 
    {
      .child2 
      {
        width:200px;
      } 
    }
  }
}

//跳出media和父级
@media print 
{
  .parent3
  {
    color:#f00;

    @at-root (without: all) 
    {
      .child3 
      {
        width:200px;
      } 
    }
  }
}

//scss style
//-------------------------------
@media print 
{
  .parent1 
  {
    color: #f00;
  }
  .child1 
  {
    width: 200px;
  }
}

@media print 
{
  .parent2 
  {
    color: #f00;
  }
}
.parent2 .child2 
{
  width: 200px;
}

@media print 
{
  .parent3 
  {
    color: #f00;
  }
}
.child3 
{
  width: 200px;
}
```
`@at-root (without: ...)` 和 `@at-root (with: ...)` 默认 `@at-root` 只会跳出选择器嵌套，而不能跳出 `@media` 或@ `support`，如果要跳出这两种，则需使用 `@at-root (without: media)`，`@at-root (without: support)`。这个语法的关键词有四个：all（表示所有），rule（表示常规css），media（表示media），support（表示support，因为@support目前还无法广泛使用，所以在此不表）。我们默认的 `@at-root` 其实就是 `@at-root (without:rule)`。

## @at-root 与 & 配合使用
```scss
//scss style
//-------------------------------
.child
{
    @at-root .parent &
    {
        color:#f00;
    }
}

//css style
//-------------------------------
.parent .child 
{
  color: #f00;
}
```

## 应用于 @keyframe
```scss
//scss style
//-------------------------------
.demo 
{
    ...
    animation: motion 3s infinite;

    @at-root 
    {
        @keyframes motion 
        {
          ...
        }
    }
}

//css style
//-------------------------------   
.demo 
{
    ...   
    animation: motion 3s infinite;
}
@keyframes motion 
{
    ...
}
```

# 混合(mixin)
`scss` 中使用 `@mixin` 声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的 `@mixin` 通过 `@include` 来调用。

## 无参数
```scss
//scss style
//-------------------------------
@mixin center-block 
{
    margin-left:auto;
    margin-right:auto;
}
.demo
{
    @include center-block;
}

//css style
//-------------------------------
.demo
{
    margin-left:auto;
    margin-right:auto;
}
```

## 有参数
```scss
//scss style
//-------------------------------   
@mixin opacity($opacity:50) 
{
  opacity: $opacity / 100;
  filter: alpha(opacity=$opacity);
}

//css style
//-------------------------------
.opacity
{
  @include opacity; //参数使用默认值
}
.opacity-80
{
  @include opacity(80); //传递参数
}
```

## 多个参数
```scss
//scss style
//-------------------------------   
@mixin horizontal-line($border:1px dashed #ccc, $padding:10px)
{
    border-bottom:$border;
    padding-top:$padding;
    padding-bottom:$padding;  
}
.imgtext-h li
{
    @include horizontal-line(1px solid #ccc);
}
.imgtext-h--product li
{
    @include horizontal-line($padding:15px);
}

//css style
//-------------------------------
.imgtext-h li 
{
    border-bottom: 1px solid #cccccc;
    padding-top: 10px;
    padding-bottom: 10px;
}
.imgtext-h--product li 
{
    border-bottom: 1px dashed #cccccc;
    padding-top: 15px;
    padding-bottom: 15px;
}
```
调用时可直接传入值，如 `@include` 传入参数的个数小于 `@mixin` 定义参数的个数，则按照顺序表示，后面不足的使用默认值，如不足的没有默认值则报错。除此之外还可以选择性的传入参数，使用参数名与值同时传入。

## 多组参数
```scss
//scss style
//-------------------------------   
//box-shadow可以有多组值，所以在变量参数后面添加...
@mixin box-shadow($shadow...) 
{
  -webkit-box-shadow:$shadow;
  box-shadow:$shadow;
}
.box
{
  border:1px solid #ccc;
  @include box-shadow(0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3));
}

//css style
//-------------------------------
.box
{
  border:1px solid #ccc;
  -webkit-box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
  box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
}
```

## @content
```scss
//scss style
//-------------------------------                     
@mixin max-screen($res)
{
  @media only screen and ( max-width: $res )
  {
    @content;
  }
}

@include max-screen(480px) 
{
  body { color: red }
}

//css style
//-------------------------------
@media only screen and (max-width: 480px) 
{
  body { color: red }
}        
```
`@content` 在 `sass3.2.0` 中引入，可以用来解决 `css3` 的 `@media` 等带来的问题。它可以使 `@mixin` 接受一整块样式，接受的样式从 `@content` 开始。

# 继承
```scss
//scss style
//-------------------------------
h1
{
  border: 4px solid #ff9aa9;
}
.speaker
{
  @extend h1;
  border-width: 2px;
}

//css style
//-------------------------------
h1,.speaker
{
  border: 4px solid #ff9aa9;
}
.speaker
{
  border-width: 2px;
}
```
`scss` 中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。使用选择器的继承，要使用关键词 `@extend`，后面紧跟需要继承的选择器。

## 占位选择器%
从 `sass 3.2.0` 以后就可以定义占位选择器 `%`。这种选择器的优势在于：如果不调用则不会有任何多余的 `css` 文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了 `@extend` 去继承相应的样式，都会解析出来所有的样式。占位选择器以 `%` 标识定义，通过 `@extend` 调用。
```scss
//scss style
//-------------------------------
%ir
{
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
%clearfix
{
  @if $lte7 
  {
    *zoom: 1;
  }
  &:before,
  &:after 
  {
    content: "";
    display: table;
    font: 0/0 a;
  }
  &:after 
  {
    clear: both;
  }
}
#header
{
  h1
  {
    @extend %ir;
    width:300px;
  }
}
.ir
{
  @extend %ir;
}

//css style
//-------------------------------
#header h1,
.ir
{
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
#header h1
{
  width:300px;
}
```

如上代码，定义了两个占位选择器 `%ir` 和 `%clearfix`，其中 `%clearfix` 这个没有调用，所以解析出来的 `css` 样式也就没有 `clearfix` 部分。占位选择器的出现，使 `css` 文件更加简练可控，没有多余。所以可以用其定义一些基础的样式文件，然后根据需要调用产生相应的 `css`。
ps：在 `@media` 中暂时不能 `@extend @media` 外的代码片段，以后将会可以。

# 函数
`sass` 定义了很多函数可供使用，当然你也可以自己定义函数，以 `@fuction` 开始。`sass`的官方函数链接为：`sass fuction`，实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以 `lighten` 减淡和 `darken` 加深为最，其调用方法为 `lighten($color,$amount)` 和 `darken($color,$amount)`，它们的第一个参数都是颜色值，第二个参数都是百分比。
```scss
//sass style
//-------------------------------                     
$baseFontSize:      10px !default;
$gray:              #ccc !defualt;        

// pixels to rems 
@function pxToRem($px) 
{
  @return $px / $baseFontSize * 1rem;
}

body
{
  font-size:$baseFontSize;
  color:lighten($gray,10%);
}
.test
{
  font-size:pxToRem(16px);
  color:darken($gray,10%);
}

//css style
//-------------------------------
body
{
  font-size:10px;
  color:#E6E6E6;
}
.test
{
  font-size:1.6rem;
  color:#B3B3B3;
}
```

# 运算
`sass` 具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。请注意运算符前后请留一个空格，不然会出错。
```scss
$baseFontSize:          14px !default;
$baseLineHeight:        1.5 !default;
$baseGap:               $baseFontSize * $baseLineHeight !default;
$halfBaseGap:           $baseGap / 2  !default;
$samllFontSize:         $baseFontSize - 2px  !default;

//grid 
$_columns:                     12 !default;      // Total number of columns
$_column-width:                60px !default;   // Width of a single column
$_gutter:                      20px !default;     // Width of the gutter
$_gridsystem-width:            $_columns * ($_column-width + $_gutter); //grid system width
```

# 条件判断及循环

## @if
`@if` 可一个条件单独使用，也可以和 `@else` 结合多条件使用
```scss
//scss style
//-------------------------------
$lte7: true;
$type: monster;
.ib
{
    display:inline-block;
    @if $lte7 
    {
        *display:inline;
        *zoom:1;
    }
}
p 
{
  @if $type == ocean 
  {
    color: blue;
  } @else if $type == matador 
  {
    color: red;
  } @else if $type == monster 
  {
    color: green;
  } @else 
  {
    color: black;
  }
}

//css style
//-------------------------------
.ib
{
    display:inline-block;
    *display:inline;
    *zoom:1;
}
p 
{
  color: green; 
}
```

## 三目判断
```scss
if(true, 1px, 2px) => 1px
if(false, 1px, 2px) => 2px
```
语法为：`if($condition, $if_true, $if_false)` 。三个参数分别表示：条件，条件为真的值，条件为假的值。

## for 循环
```scss
//scss style
//-------------------------------
@for $i from 1 through 3 
{
  .item-#{$i} { width: 2em * $i; }
}

//css style
//-------------------------------
.item-1 
{
  width: 2em; 
}
.item-2 
{
  width: 4em; 
}
.item-3 
{
  width: 6em; 
}
```
`for` 循环有两种形式，分别为：`@for $var from <start> through <end>` 和 `@for $var from <start> to <end>`。`$i` 表示变量，`start` 表示起始值，`end` 表示结束值，这两个的区别是关键字 `through` 表示包括 `end` 这个数，而 `to` 则不包括 `end` 这个数。

## @each 循环
语法为：`@each $var in <list or map>`。其中 `$var` 表示变量，而 `list` 和 `map` 表示 `list` 类型数据和 `map` 类型数据。`sass 3.3.0` 新加入了多字段循环和 `map` 数据循环。

## 单个字段 list 数据循环
```scss
//scss style
//-------------------------------
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $animal-list 
{
  .#{$animal}-icon 
  {
    background-image: url('/images/#{$animal}.png');
  }
}

//css style
//-------------------------------
.puma-icon 
{
  background-image: url('/images/puma.png'); 
}
.sea-slug-icon 
{
  background-image: url('/images/sea-slug.png'); 
}
.egret-icon 
{
  background-image: url('/images/egret.png'); 
}
.salamander-icon 
{
  background-image: url('/images/salamander.png'); 
}
```

## 多个字段list数据循环
```scss
//scss style
//-------------------------------
$animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $animal, $color, $cursor in $animal-data 
{
  .#{$animal}-icon 
  {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

//css style
//-------------------------------
.puma-icon 
{
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; 
}
.sea-slug-icon 
{
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; 
}
.egret-icon 
{
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; 
}
```

## 多个字段 map 数据循环
```scss
//scss style
//-------------------------------
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings 
{
  #{$header} 
  {
    font-size: $size;
  }
}

//css style
//-------------------------------
h1 
{
  font-size: 2em; 
}
h2 
{
  font-size: 1.5em; 
}
h3 
{
  font-size: 1.2em; 
}
```

{% note success %}
本文并非原创，摘录自<a href='http://www.w3cplus.com'>w3cplus scss 教程</a>，并在文中写入了自身的领悟。
{% endnote %}