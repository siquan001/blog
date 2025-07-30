---
title: 使用indexedDB技术实现前端文件系统
time: 2025/07/30 17:05:22
id: 11
desc: 我在很早就注意到了前端的本地存储API——localStorage，也整活自己以此为基础写了一个简易的文件系统。但受限于其只有5M（或10M）的空间以及只能存储字符串，这个文件系统显得捉襟见肘
tags:
  - JS
  - 整活
---

我在很早就注意到了前端的本地存储API——localStorage，也整活自己以此为基础写了一个简易的文件系统。但受限于其只有5M（或10M）的空间以及只能存储字符串，这个文件系统显得捉襟见肘。

而indexedDB以近乎无限的空间（取决于设备的存储空间）以及可以存储任意格式的内容让我重新动了实现文件系统的想法。

indexedDB文档：<https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API>

最开始使用localStorage写文件系统的时候是在localStorage里存一个json，然后用这样的格式来同时存储文件头（如创建时间等）和文件本身内容。

格式如示例：
```json
{
    "type":"folder",
    "name":"文件夹名",
    "files":{
        "fd1":{
            "type":"folder",
            "name":"fd1",
            "files":{/***/},
            "details":{
                "createTime":"1630611200000",
            }
        },
        "a.txt":{
            "type":"file",
            "name":"a.txt",
            "content":"文件内容",
            "details":{
                "createTime":"1630611200000",
            }
        }
        /***/
    },
    "details":{
        "createTime":"1630611200000",
    }
    
}
```

缺点也明显，每一次进行任意文件操作都要读取全部内容，还好localStorage的容量有限，若文件大了，那就不好搞了。

现在使用indexedDB来实现文件系统，为了方便，我使用了localforage.js这个第三方库用来操作数据，因为indexedDB本身是很复杂的，而localforage提供了类似localStorage的API，可以让我们更方便地操作数据。

localforage文档：<https://localforage.docschina.org/>

显然，我们不能像之前那样把一堆东西放在一个项里，并且因为indexedDB是异步的，在大量的文件操作中这样不仅影响性能，而且还可能造成数据不一致。所以，我们要把不同文件分开存储，再通过索引把它们链接起来。

## 结构设计

文件系统最基本的是由文件和文件夹组成，我们为每一个文件或文件夹标记一个唯一的id，存储在不同的项中。

又考虑到在一般文件浏览器中读取文件夹内的文件时还需要显示文件的一些基本信息，因为在indexedDB中我们很难去只读取数据的一部分，如果文件内容和文件基本信息存在一个项中的话，那么每次读取文件基本信息时都要获取一遍全部内容，这样如果文件很大的话就不好搞了。

所以，对于文件，我们把文件头和文件内容存在不同的项中，文件头则包含文件的基本信息以及一个指向文件内容的指针。

对于文件夹，因为本身只是存储文件和文件夹指针的内容，并不大，所以我们把文件夹头和文件夹内容存在一个项中。

所以就是这样：
```json
// 文件头
"[id]":{
    "type":"file",
    "details":{
        "name":"文件名",
        "ct":"创建时间",
        "mt":"修改时间",
        "id":"文件id",
    },
    "hash":"文件内容对应id",
}

// 文件内容
"[id]":"文件内容"

// 文件夹
"[id]":{
    "type":"folder",
    "details":{
        "name":"文件夹名",
        "ct":"创建时间",
        "mt":"修改时间",
        "id":"文件夹id",
    },
    "files":{
        "name":"id",
        "name":"id",
        "name":"id"
    }
}

```

最后，我们只需要在定义一个id为root的根文件夹作为读取入口即可。

## 实现

首先，做好初始化设置，创建root文件夹。
```javascript
function getRandomId(){
    return /*随机且唯一的id*/;
}

async function init(){
    var idbsupport = localforage._getSupportedDrivers([localforage.INDEXEDDB])[0] == localforage.INDEXEDDB;
    if(!idbsupport){
        throw ('IndexedDB is not supported in this browser.')
        return;
    }

    localforage.config({
        driver:localforage.INDEXEDDB,
        name:'webfs',
        storeName:'files',
        description:'webfs file system'
    })

    if(localStorage._webfs_init){
        return;
    }
    // type 0代替folder 1代替file
    await localforage.setItem('root',{type:0,files:{},details:{
        id:'root',
        root:true,
    }});
    localStorage._webfs_init=true;
}

await init();
```

然后对于任意文件操作，都一定涉及一个path，都要判断这个path对应的位置是否存在，这一点，我们可以放在前面统一执行，所以可以这样写。

```javascript
async function doit(command,path,details){
    // 将path以/或\分割，去掉空格
    let con_path=path.split(/\\|\//).filter(x=>x.trim()!='');
    let head=await getHead(con_path);
    if(head==null){
        throw ({code:404,message:'Not found.'});
    }
    if(fs[command]){
        return await fs[command](head,details);
    }else{
        throw ({code:405,message:'Method not allowed.'});
    }
}

let fs={/***/}
```

因为我们将文件内容和文件头分开，所以我们在开始的时候最重要的是获取文件头，然后根据不同的命令进行不同的操作。对于获取文件头，我们可以这样写。

```javascript
async function getHead(con_path){
    let rf=await localforage.getItem('root');// 读取root文件夹
    for(let i=0;i<con_path.length;i++){
        let p=con_path[i];
        if(rf.files[p]){ // 查看文件夹内是否有该文件/文件夹
            // 因为文件夹内存储的是文件头对应id，所以我们需要读取文件头
            rf=await localforage.getItem(rf.files[p]);
        }else{
            return null;// 没有，则不存在
        }
    }
    return rf; // 返回头
}
```

好了，接下来就可以写具体的命令了。

### head

获取文件头，
```javascript
fs.head=async function head(head,details){
    return head;
}    
```

### stat

获取path对应的type
```javascript
fs.stat=async function(head){
    return ['folder','file'][head.type]||'unknown';
}
```

### read

获取文件/文件夹内容。
因为文件和文件头分开存储，获取文件头后根据文件头的hash值读取文件内容。

```javascript
fs.read=async function(head,details){
    if(head.type==1){
        let data=await localforage.getItem(head.hash);
        head.data=data;
    }
    return head;
}
```

### create

创建文件/文件夹。
在这里，我们需要确保传入的path指向的是一个文件夹，并且提供了一个name和type。我们要确保提供的name不与原文件夹里的任意子项重名。

然后创建好对应文件/文件夹后，再在原父文件夹的files里添加一个，name:id，来指向新创建的项。

```javascript
fs.create=async function(head,details){
    if(head.type!=0){
        throw ({code:400,message:'Not a directory.'});
    }
    if(!details.name.trim()){ // 这里其实还要做合法字符检验，但我偷懒了awa
        throw ({code:400,message:'Invalid name.'});
    }
    if(head.files[details.name]){ // 确保不重名
        throw ({code:400,message:'File already exists.'});
    }
    let id=getRandomId();
    if(details.type=='folder'||details.type==0){
        await localforage.setItem(id,{type:0,files:{},details:{
            name:details.name,
            id:id,
            parent:head.details.id,
            ct:Date.now(),
        }})
    }else{
        let data=details.data||'';
        let hash=getRandomId(); // 分别创建文件头和文件内容
        await localforage.setItem(hash,data);
        await localforage.setItem(id,{type:1,hash:hash,details:{
            parent:head.details.id, // 为什么要加这个呢？后面再讲
            name:details.name,
            id:id,
            ct:Date.now(),
            et:Date.now()
        }})
    }
    head.files[details.name]=id; // 父文件夹添加对应值指向新创建的项
    await localforage.setItem(head.details.id,head);
    return id;
}
```

### write

写入文件内容。
这里单单写入文件内容，只需要修改文件内容，再修改文件头中的et（修改时间即可）

```javascript
fs.write=async function(head,details){
    if(head.type!=1){ // 确保是文件
        throw ({code:400,message:'Not a file.'});
    }
    if(!details.data){ // 确保有数据
        throw ({code:400,message:'No data provided.'});
    }
    let data=details.data;
    let hash=head.hash;
    await localforage.setItem(hash,data);
    head.details.et=Date.now(); // 修改文件头的修改时间
    await localforage.setItem(head.details.id,head);
    return head;
}
```

### delete

删除文件/文件夹。递归删除即可，这里也保留一个仅删除文件头的选项（可以用来藏文件）

```javascript
fs.delete=async function(head,details){
    if(details.justHead){ // 仅删除文件头
        await localforage.removeItem(head.details.id);
        return true;
    }

    // 递归删除
    async function deleteF(head){
        // 删除文件头
        await localforage.removeItem(head.details.id);
        if(head.type==1){
            // 删除文件内容
            await localforage.removeItem(head.hash);
        }else if(head.type==0){
            for(let k in head.files){
                // 递归删除子项
                let f=await localforage.getItem(head.files[k]);
                await deleteF(f);
            }
        }
    }

    deleteF(head);
    return true;
}
```

### rename

重命名文件/文件夹。
这里不仅要修改文件/文件夹头中的name，还要修改父文件夹的files里的对应项即可。那么也就需要获取父文件夹的head，但在函数内，我们只有当前path的head，不好获取父文件夹的head。

这里有两种方式：
1. 传入的path对应要重命名的项的父文件夹，在传入项的name和新的name
2. 在每次create时，传入父文件夹的head对应的id，这样就不需要再获取了。
3. 最开始获取head的时候同时传入父文件夹的head

1、2两种办法都可以，我个人偏向2，因为1又涉及到传入的name对应head是否存在的问题，这应该是最开头解决的问题，所以我选择了2，修改了create函数，这样也方便，因为create函数本来就传入的是父文件夹的head。对于文件头来说，只是多存了一个id，所以没有很大关系。

```javascript
fs.rename=async function(head,details){
    let parentHead=await localforage.getItem(head.details.parent);
    if(parentHead.files[details.name]){ // 确保不重名
        throw ({code:400,message:'File already exists.'});
    }
    // 修改父文件夹的files里的对应项
    parentHead.files[details.name]=head.details.id;
    delete parentHead.files[head.details.name];
    await localforage.setItem(parentHead.details.id,parentHead);

    // 修改文件/文件夹头中的name
    head.details.name=details.name;
    await localforage.setItem(head.details.id,head);
    return head;
}
```

### move

移动文件/文件夹。
这里只是涉及到文件索引的问题，所以与文件内容本身无关，只需要操作文件头即可。而对于目标文件夹，我们可以通过已经写好的head方法获取。

```javascript
fs.move=async function(head,details){
    let topath=details.topath;
    let tohead=await doit('head',topath); // 通过已经写好的函数获取目标文件夹的head
    if(tohead.type==1){
        throw ({code:400,message:'Not a directory.'});
    }
    if(tohead.files[head.details.name]){ // 确保不重名
        throw ({code:400,message:'File already exists.'});
    }
    
    // 在原父文件夹的files里删除对应项
    let parentHead=await localforage.getItem(head.details.parent);
    delete parentHead.files[head.details.name];
    await localforage.setItem(parentHead.details.id,parentHead);

    // 修改文件/文件夹头中的parent为目标文件夹的id
    head.details.parent=tohead.details.id;
    await localforage.setItem(head.details.id,head);

    // 在目标文件夹的files里添加对应项
    tohead.files[head.details.name]=head.details.id;
    await localforage.setItem(tohead.details.id,tohead);
}
```

终于，到这里，我们的所有函数都已经写完了！整理如下：
```javascript
(()=>{
    function getRandomId(){
        return /*自己实现*/;
    }

    async function init(){
        var idbsupport = localforage._getSupportedDrivers([localforage.INDEXEDDB])[0] == localforage.INDEXEDDB;
        if(!idbsupport){
            webfs.do=function(){
                throw ('IndexedDB is not supported in this browser.')
            }
            return;
        }

        localforage.config({
            driver:localforage.INDEXEDDB,
            name:'webfs',
            storeName:'files',
            description:'webfs file system'
        })

        if(localStorage._webfs_init){
            webfs.do=doit;
            return;
        }
        localStorage._webfs_init=true;
        
        await localforage.setItem('root',{type:0,files:{},details:{
            id:'root',
            root:true,
        }});
        webfs.do=doit;
    }

    async function doit(command,path,details){
        let con_path=path.split(/\\|\//).filter(x=>x.trim()!='');
        let head=await getHead(con_path);
        if(head==null){
            throw ({code:404,message:'Not found.'});
        }
        if(fs[command]){
            return await fs[command](head,details);
        }else{
            throw ({code:405,message:'Method not allowed.'});
        }
    }

    let fs={
        head:async function(head){
            return head;
        },
        stat:async function(head){
            return ['folder','file','bind'][head.type]||'unknown';
        },
        read:async function(head,details){
            if(head.type==1){
                let data=await localforage.getItem(head.hash);
                head.data=data;
            }
            return head;
        },
        create:async function(head,details){
            if(head.type!=0){
                throw ({code:400,message:'Not a directory.'});
            }
            if(!details.name.trim()){
                throw ({code:400,message:'Invalid name.'});
            }
            if(head.files[details.name]){
                throw ({code:400,message:'File already exists.'});
            }
            let id=getRandomId();
            if(details.type=='folder'||details.type==0){
                await localforage.setItem(id,{type:0,files:{},details:{
                    name:details.name,
                    id:id,
                    parent:head.details.id,
                    ct:Date.now(),
                }})
            }else{
                let data=details.data||'';
                let hash=getRandomId();
                await localforage.setItem(hash,data);
                await localforage.setItem(id,{type:1,hash:hash,details:{
                    parent:head.details.id,
                    name:details.name,
                    id:id,
                    ct:Date.now(),
                    et:Date.now()
                }})
            }
            head.files[details.name]=id;
            await localforage.setItem(head.details.id,head);
            return id;
        },
        write:async function(head,details){
            if(head.type!=1){
                throw ({code:400,message:'Not a file.'});
            }
            if(!details.data){
                throw ({code:400,message:'No data provided.'});
            }
            let data=details.data;
            let hash=head.hash;
            await localforage.setItem(hash,data);
            head.details.et=Date.now();
            await localforage.setItem(head.details.id,head);
            return head;
        },
        delete:async function(head,details){
            if(details.justHead){
                await localforage.removeItem(head.details.id);
                return true;
            }

            async function deleteF(head){
                await localforage.removeItem(head.details.id);
                if(head.type==1){
                    await localforage.removeItem(head.hash);
                }else if(head.type==0){
                    for(let k in head.files){
                        let f=await localforage.getItem(head.files[k]);
                        await deleteF(f);
                    }
                }
            }

            deleteF(head);
            return true;
        },
        rename:async function(head,details){
            let parentHead=await localforage.getItem(head.details.parent);
            if(parentHead.files[details.name]){
                throw ({code:400,message:'File already exists.'});
            }
            parentHead.files[details.name]=head.details.id;
            delete parentHead.files[head.details.name];
            await localforage.setItem(parentHead.details.id,parentHead);
            head.details.name=details.name;
            await localforage.setItem(head.details.id,head);
            return head;
        },
        move:async function(head,details){
            let topath=details.topath;
            let tohead=await doit('head',topath);
            if(tohead.type==1){
                throw ({code:400,message:'Not a directory.'});
            }
            if(tohead.files[head.details.name]){
                throw ({code:400,message:'File already exists.'});
            }
            let parentHead=await localforage.getItem(head.details.parent);
            delete parentHead.files[head.details.name];
            await localforage.setItem(parentHead.details.id,parentHead);
            head.details.parent=tohead.details.id;
            await localforage.setItem(head.details.id,head);
            tohead.files[head.details.name]=head.details.id;
            await localforage.setItem(tohead.details.id,tohead);
        }
    }

    async function getHead(con_path,command){
        let rf=await localforage.getItem('root');
        for(let i=0;i<con_path.length;i++){
            let p=con_path[i];
            if(rf.files[p]){
                rf=await localforage.getItem(rf.files[p]);
            }else{
                return null;
            }
        }

        return rf;
    }



    let webfs={
        init:init,
        do:function(){
            throw ('Please wait for webfs.init() first.')
        }
    }

    for(let k in fs){ //这样就不用调用webfs.do('read',path)而是webfs.read(path)了
        Object.defineProperty(webfs,k,{
            get:function(){
                return async function(){
                    return await webfs.do(k,...arguments);
                }
            }
        })
    }
    

    window.webfs=webfs;
})();
```

好了，到这里，webfs的核心功能就完成了。

那么，还有如何监听指定文件或文件夹的改动，以及如何实现针对某目录对服务器文件系统的映射（比如让/sys/ 文件夹下的所有内容映射为 http://a.com/src/ 下的内容，如读取/sys/a.txt，实际上读取的是http://a.com/src/a.txt），以及getRandomId的实现。

这些留作课下作业，读者自写不难（
  