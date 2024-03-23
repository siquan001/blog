---
title: js-URL()的使用注意事项
time: 2023/10/28 11:08:30
id: 3
desc: js-URL()的使用注意事项
tags:
  - JS
  - 开发笔记
---
  
`URL`是js用于处理url的一个原生API，提供了很多实用的方法。

但是有一点需要注意，当我们在使用`URL`操作url的`searchParams`时，比如下面的代码

```javascript
var url=new URL('https://example.com/s');
url.searchParams.append('keyword','hello world');
console.log(url.href);
```

注意！此时输出的不是`https://example.com/s?keyword=hello world`，而是`https://example.com/s?keyword=hello+world`

`URL`会把`searchParams`里的空格替换成`+`

虽然这可能无关紧要，但不注意有时候还是会产生莫名其妙的BUG的。比如之前我做一个搜索功能，不知道怎么回事，搜索结果总是会有缺少和偏差，但代码一点问题都没有，排查了好久，最后才发现是`URL`把`searchParams`里的空格替换成`+`引发的问题

好的，希望对你有帮助！