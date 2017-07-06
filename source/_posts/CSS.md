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