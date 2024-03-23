

## 起因

最近在用Z-library，下载了一些epub电子书，用Neat Reader看，Neat Reader好是好，但是一些自定义样式要VIP。

但我可是有着从未在网络上用一分钱购买任何虚拟产品的纪录的，于是我就想，我可不可以自己做一个epub解析器

## 思路

我从Z-library下载的epub电子书是application/epub+zip格式，首先我需要把它解压，目录大概是这样：

```
images/
- 00001.jpeg
- 00002.jpeg
- ...
META-INF/
- container.xml
text/
- part0001.html
- part0002.html
- ...
content.opf
cover.jpeg
mimetype
page_styles.css
stylesheet.css
titlepage.xhtml
toc.ncx
```

epub的所有资源的索引就在content.opf(xml)里，同时也包括这本电子书的名字、作者、出版社、封面等信息

toc.ncx(xml)放的是目录

文字内容是html的形式，正好方便了解析查看。

所以我们只需解压epub然后读取content.opf建立文件索引，然后读取toc.ncx目录，之后再渲染到网页上就可以了。
  
## 实现

### 解压

解压我用的是zip.js

```javascript
var epubblob=inputfile.files[0];
var reader=new zip.ZipReader(new zip.BlobReader(epubblob));
var entries = await reader.getEntries()
/*
[
  {
    filename:"dir/file",
    getData:Function
  }
]
 */
```

### 解析 content.opf

```javascript
  function getFile(entries,path){
      return entries.find(function(entry){
            return entry.filename==path
        })
  }

  var xml=await getFile(entries,'content.opf').getData(new zip.TextWriter());
  var domparser=new DOMParser();
  var doc=domparser.parseFromString(xml,'text/html');
  doc=doc.documentElement;

  // 标题
  var title=doc.querySelector('dc\\:title').textContent;

  // 作者
  var writer=doc.querySelector('dc\\:creator').textContent;

  // 发行日期
  var date=doc.querySelector('dc\\:date').textContent;

  // 出版社
  var publisher=doc.querySelector('dc\\:publisher').textContent;

  // 语言
  var lang=doc.querySelector('dc\\:language').textContent;

  // 文件索引
  var items=doc.querySelectorAll('manifest item');
  var itemObj={};
  var cover,titlepage;
  for(var i=0;i<items.length;i++){
      var item=items[i];
      if(!item.getAttribute('href')){
          return ;
      }
      if(item.getAttribute('id')=='cover'){
          cover=item.getAttribute('href');
      }
      if(item.getAttribute('id')=='titlepage'){
          titlepage=item.getAttribute('href');
      }
      // 判断图片
      if(item.getAttribute('href').endsWith('.jpg')||item.getAttribute('href').endsWith('.png')||item.getAttribute('href').endsWith('.gif')||item.getAttribute('href').endsWith('.jpeg')){
          itemObj[item.getAttribute('href')]=URL.createObjectURL(await epubjs.getFile(entries,item.getAttribute('href')).getData(new zip.BlobWriter()));
      }else{
          itemObj[item.getAttribute('href')]=await epubjs.getFile(entries,item.getAttribute('href')).getData(new zip.TextWriter());
      }
  }
  
  let epubData={
      title:title,
      writer:writer,
      date:date,
      publisher:publisher,
      lang:lang,
      itemObj:itemObj,
      cover:itemObj[cover],
      titlepage:titlepage
  };
```

### 解析toc.ncx

```javascript
var xml=await entries.find(function(entry){
    return entry.filename=='toc.ncx';
}).getData(new zip.TextWriter());

var doc=new DOMParser().parseFromString(xml,'text/html');// 用text/html更方便
var navmap=doc.querySelector('navmap');

// 遍历目录
function g(items){
    var toc=[];
    items.forEach(function(item){
        if(item.nodeType==1){
            var a={};
            var childNodes=item.childNodes;
            childNodes.forEach(function(item){
                if(item.nodeType==1){
                    if(item.tagName=='NAVLABEL'){
                      //标题
                        a.label=item.textContent.trim();
                    }else if(item.tagName=='CONTENT'){
                        var href=item.getAttribute('src').split('#');
                        //索引
                        a.href=href[0];

                        href.shift();
                        // 定位
                        a.hash=href.join('#');
                        if(item.querySelector('NAVPOINT')){
                            a.list=g(item.childNodes);//遍历子目录
                        }
                    }
                } 
            });
            toc.push(a);
        }                
      })
      return toc;
}

epubData.toc=g(navmap.childNodes);
```

### 渲染

做一个container

```javascript
var epubContainer=document.createElement('div');
epubContainer.className='epub-container';
epubContainer.innerHTML='<div class="epub-toc"><div class="epub-toc-list"></div></div><div class="epub-content"></div>';
document.body.appendChild(epubContainer);
```

渲染目录

```javascript
function gtoc(n,r){
  r.forEach(function(e){
      var a=document.createElement('div');
      a.classList.add('epub-toc-item');
      a.innerText=e.label;
      a.setAttribute('data-href',e.href);
      a.setAttribute('data-hash',e.hash);
      n.appendChild(a);
      a.addEventListener('click',function(){
          var t=a.getAttribute('data-href');
          var i=a.getAttribute('data-hash');
          epubContainer.querySelectorAll('.epub-toc-item').forEach(function(a){
              a.classList.remove('active');
          })
          a.classList.add('active');
          view(t,i) // 见下方
      });
      if(e.list){
          var b=document.createElement('div');
          b.classList.add('epub-toc-list');
          n.appendChild(b);
          gtoc(b,e.list); // 渲染子目录
      }
  })
}
// 遍历渲染目录
gtoc(epubContainer.querySelector('.epub-toc-list'),epubData.toc);
```

渲染内容

```javascript
window.epubNowShow=null;
function view(t,i){
  if(window.epubNowShow!=t){
      var html=epubData.itemObj[t];
      var d=new DOMParser().parseFromString(html,'text/html');
      // 获取所有图片并根据索引替换成对应已解析数据
      d.querySelectorAll('img').forEach(function(e){
          e.src=epubData.itemObj[e.getAttribute('src').replace('../','')];  
      });
      // 获取所有样式并添加到网页
      d.querySelectorAll('link[rel=stylesheet]').forEach(function(e){
          var s=document.createElement('style');
          s.innerHTML=epubData.itemObj[e.getAttribute('href').replace('../','')];
          document.head.appendChild(s);
      });
      
      //获取标题
      document.title=d.querySelector('title').innerText;

      // 填充内容
      o.innerHTML=d.body.innerHTML;
      o.querySelectorAll('a').forEach(function(e){
          e.onclick=function(ev){
              ev.preventDefault();
              // 渲染锚点链接
              var h=e.getAttribute('href').split('#');
              h.shift();
              var i=h.join('#');
              try {
                  o.querySelector('#'+i).scrollIntoView();
              } catch (error) {
                  
              }
          }
      });
      window.epubNowShow=t;
  }
  try {
      o.querySelector('#'+i).scrollIntoView();
  } catch (error) {
      
  }
}
document.title=epubData.title;
o.innerHTML=`<div class="epub_info_show">
  <img src="${epubData.cover}"/>
  <p class="title">${epubData.title}</p>
  <p class="writer">${epubData.writer}</p>
  <p class="publisher">${epubData.publisher}</p>
</div>`
```

## 封装

把所有代码封装到一起：
```javascript
var epubjs = {
    view:function(res){
        window.epubNowShow=null;
        var epubContainer=document.createElement('div');
        epubContainer.className='epub-container';
        epubContainer.innerHTML='<div class="epub-toc"><div class="epub-toc-list"></div></div><div class="epub-content"></div>';
        document.body.appendChild(epubContainer);
        var o=document.querySelector('.epub-content');
        function gtoc(n,r){
            r.forEach(function(e){
                var a=document.createElement('div');
                a.classList.add('epub-toc-item');
                a.innerText=e.label;
                a.setAttribute('data-href',e.href);
                a.setAttribute('data-hash',e.hash);
                n.appendChild(a);
                a.addEventListener('click',function(){
                    var t=a.getAttribute('data-href');
                    var i=a.getAttribute('data-hash');
                    epubContainer.querySelectorAll('.epub-toc-item').forEach(function(a){
                        a.classList.remove('active');
                    })
                    a.classList.add('active');
                    view(t,i)
                });
                if(e.list){
                    var b=document.createElement('div');
                    b.classList.add('epub-toc-list');
                    n.appendChild(b);
                    gtoc(b,e.list);
                }
            })
        }
        gtoc(epubContainer.querySelector('.epub-toc-list'),res.toc);
        function view(t,i){
            if(window.epubNowShow!=t){
                var html=res.itemObj[t];
                var d=new DOMParser().parseFromString(html,'text/html');
                d.querySelectorAll('img').forEach(function(e){
                    e.src=res.itemObj[e.getAttribute('src').replace('../','')];  
                });
                d.querySelectorAll('link[rel=stylesheet]').forEach(function(e){
                    var s=document.createElement('style');
                    s.innerHTML=res.itemObj[e.getAttribute('href').replace('../','')];
                    document.head.appendChild(s);
                });
                
                document.title=d.querySelector('title').innerText;
                o.innerHTML=d.body.innerHTML;
                o.querySelectorAll('a').forEach(function(e){
                    e.onclick=function(ev){
                        ev.preventDefault();
                        var h=e.getAttribute('href').split('#');
                        h.shift();
                        var i=h.join('#');
                        try {
                            o.querySelector('#'+i).scrollIntoView();
                        } catch (error) {
                            
                        }
                    }
                });
                window.epubNowShow=t;
            }
            try {
                o.querySelector('#'+i).scrollIntoView();
            } catch (error) {
                
            }
        }
        document.title=res.title;
        o.innerHTML=`<div class="epub_info_show">
            <img src="${res.cover}"/>
            <p class="title">${res.title}</p>
            <p class="writer">${res.writer}</p>
            <p class="publisher">${res.publisher}</p>
        </div>`
    },
    parse:async function (path) {
        var readerm;
        if(typeof path=='string'){
            readerm = new zip.HttpReader(path);
        }else if(path instanceof Blob){
            readerm = new zip.BlobReader(path);
        }
        var reader = new zip.ZipReader(readerm);
        var entries = await reader.getEntries()
        var contentOpf=await epubjs.getContentOpf(entries);
        var toc=await epubjs.getToc(entries);
        contentOpf.toc=toc;
        return contentOpf
    },
    getContentOpf:async function(entries){
        var xml=await epubjs.getFile(entries,'content.opf').getData(new zip.TextWriter());
        var domparser=new DOMParser();
        var doc=domparser.parseFromString(xml,'text/html');
        doc=doc.documentElement;
        var title=doc.querySelector('dc\\:title').textContent;
        var writer=doc.querySelector('dc\\:creator').textContent;
        var date=doc.querySelector('dc\\:date').textContent;
        var publisher=doc.querySelector('dc\\:publisher').textContent;
        var lang=doc.querySelector('dc\\:language').textContent;
        var items=doc.querySelectorAll('manifest item');
        var itemObj={};
        var cover,titlepage;
        for(var i=0;i<items.length;i++){
            var item=items[i];
            if(!item.getAttribute('href')){
                return ;
            }
            if(item.getAttribute('id')=='cover'){
                cover=item.getAttribute('href');
            }
            if(item.getAttribute('id')=='titlepage'){
                titlepage=item.getAttribute('href');
            }
            // 判断图片
            if(item.getAttribute('href').endsWith('.jpg')||item.getAttribute('href').endsWith('.png')||item.getAttribute('href').endsWith('.gif')||item.getAttribute('href').endsWith('.jpeg')){
                itemObj[item.getAttribute('href')]=URL.createObjectURL(await epubjs.getFile(entries,item.getAttribute('href')).getData(new zip.BlobWriter()));
            }else{
                itemObj[item.getAttribute('href')]=await epubjs.getFile(entries,item.getAttribute('href')).getData(new zip.TextWriter());
            }
        }
        return {
            title:title,
            writer:writer,
            date:date,
            publisher:publisher,
            lang:lang,
            itemObj:itemObj,
            cover:itemObj[cover],
            titlepage:titlepage
        };
    },
    getToc:async function(entries){
        var xml=await entries.find(function(entry){
            return entry.filename=='toc.ncx';
        }).getData(new zip.TextWriter());
        var doc=new DOMParser().parseFromString(xml,'text/html');
        var navmap=doc.querySelector('navmap');
        var toc=g(navmap.childNodes);
        function g(items){
            var toc=[];
            items.forEach(function(item){
                if(item.nodeType==1){
                    var a={};
                    var childNodes=item.childNodes;
                    childNodes.forEach(function(item){
                        if(item.nodeType==1){
                            if(item.tagName=='NAVLABEL'){
                                a.label=item.textContent.trim();
                            }else if(item.tagName=='CONTENT'){
                                var href=item.getAttribute('src').split('#');
                                a.href=href[0];
                                href.shift();
                                a.hash=href.join('#');
                                if(item.querySelector('NAVPOINT')){
                                    a.list=g(item.childNodes);
                                }
                            }
                        } 
                    });
                    toc.push(a);
                }                
             })
             return toc;
        }
        return toc;
    },
    getFile:function(entries,path){
        return entries.find(function(entry){
            return entry.filename==path
        })
    },
    show:function(path){
        epubjs.parse(path).then(function(res){
            epubjs.view(res);
        })
    }
}
```

再写一下CSS:
```css
body{
    margin: 0;
    padding: 0;
}
.epub-container{
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.epub-container .epub-toc{
    width: 300px;
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    overflow:auto;
    float: left;
}
.epub-container .epub-toc .epub-toc-list{
    margin-left: 1em;
}
.epub-container .epub-toc>.epub-toc-list{
    margin-left: 0;
}
.epub-container .epub-toc .epub-toc-item{
    padding: 5px 3px;
    margin: 2px 0;
    cursor: pointer;
    border-radius: 5px;
}
.epub-container .epub-toc .epub-toc-item:hover{
    background-color: #f5f5f5;
}
.epub-container .epub-toc .epub-toc-item.active{
    font-weight: bold;
}
.epub-container .epub-content{
    width: calc(100% - 300px);
    height: 100%;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    float: left;
    line-height: 1.5em;
}
.epub-container .epub-content .epub_info_show img{
    width:260px;
    display: block;
    margin: 10px auto;
}
.epub-container .epub-content .epub_info_show p{
    text-align: center;
}
.epub-container .epub-content .epub_info_show p.title{
    font-size: 20px;
}
.epub-container .epub-content .epub_info_show p.writer{
    font-size: 16px;
}
.epub-container .epub-content .epub_info_show p.publisher{
    font-size: 14px;
    color: #aaa;
}
```

大功告成！

![pFhfPAS.png](https://s21.ax1x.com/2024/03/23/pFhfPAS.png)
![pFhfFhQ.png](https://s21.ax1x.com/2024/03/23/pFhfFhQ.png)

## 总结

也没有想象中那么难，至少基本的是做出来了，后面就慢慢优化样式吧。