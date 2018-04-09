---
title: Markdown
categories: Markdown
tag: 
- 前端
- Markdown
---

# 非标准
这是 `hexo` & `next` 中使用的 `Markdown`，而非原标准。

# 换行
两个空格+回车

# 标题
```markdown
# 这是 H1

## 这是 H2

###### 这是 H6
```

# 引用
其中，`class_name` 可以是以下列表中的一个值：

* default
* primary
* success
* info
* warning
* danger

```markdown
{% note class_name %}
Content (md partial supported) 
{% endnote %}
```
<img src="/images/markdown/bootstrap-callout.png" />


## 文本居中的引用

```markdown
{% cq %} 
blah blah blah 
{% endcq %}
```
<img src="/images/markdown/blockquote-center.png" />

# 列表

## 无序列表
```markdown
*   Red
*   Green
*   Blue
```

## 有序列表
```markdown
1.  Bird
2.  McHale
3.  Parish
```

# 代码块

## 单行代码块
```markdown
`hello`
```

## 多行代码块
三个反引号

# 分割线
```markdown
**************
```

# 强调
```markdown
*hello*
```

# 图片 & 链接
我一般直接使用 img、a 标签，感觉更加直观。

# 表格
```markdown
| 水果        | 价格    |  数量  |
| --------   | -----:   | :----: |
| 香蕉        | $1      |   5    |
| 苹果        | $1      |   6    |
| 草莓        | $1      |   7    |
```