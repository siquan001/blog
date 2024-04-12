var blog={
  _get:function(url,cb,err){
    var xhr=new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        cb(xhr.responseText);
      }
      if(xhr.status>400){
        err(xhr.status);
      }
    }
    xhr.send();
  },
  getPostListByPage:function(page,cb){
    var url='./datas/post_comment_'+page+'.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    })
  },
  getPostListByTag:function(tag,cb){
    var url='./datas/tag_'+tag+'.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    })
  },
  getAllPostList:function(cb){
    var url='./datas/all_posts.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    })
  },
  getTListByPage:function(page,cb){
    var url='./datas/t_comment_'+page+'.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    })
  },
  getAllTList:function(cb){
    var url='./datas/all_t.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    })
  },
  getTagList:function(cb){
    var url='./datas/tags.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    })
  },
  getPostDetails:function(id,cb,err){
    var url='./datas/post_'+id+'.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    },err)
  },
  getPostContent:function(id,cb){
    var url='./datas/post_'+id+'.html';
    this._get(url,function(res){
      cb(res);
    })
  },
  getTDetails:function(id,cb,err){
    var url='./datas/t_'+id+'.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    },err)
  },
  getTContent:function(id,cb){
    var url='./datas/t_'+id+'.html';
    this._get(url,function(res){
      cb(res);
    })
  },
  getCount:function(cb){
    var url='./datas/count.json';
    this._get(url,function(res){
      cb(JSON.parse(res));
    });
  }
}

var sTate={};

var hashTokenize=[
  {
    reg:/^(#\/|#\/index|#\/index\/)$/,
    page:"home",
    cb:function(){
      if(!sTate.home){
        sTate.home={
          ipage:0,
          state:'loading'
        };
        load(0);
      }
      document.querySelector(".page.home .stated .more span").onclick=function(){
        sTate.home.ipage++;
        sTate.home.state='loading';
        load(sTate.home.ipage);
      }
      function load(i){
        document.querySelector('.page.home .stated').className='stated loading';
        blog.getPostListByPage(i,function(pl){
          var htmlstr='';
          pl.data.forEach(function(l){
            htmlstr+='<li>\
            <h1><a href="#/post/'+l.id+'">'+l.title+'</a></h1>\
            <p class="desc">'+l.desc+'...<a href="#/post/'+l.id+'">阅读全文</a></p>\
            <div class="message"><div class="tags">'+(function(tags){
              var tstr='';
              tags.forEach(function(tag){
                tstr+='<a href="#/tag/'+tag+'">'+tag+'</a>';
              });
              return tstr;
            })(l.tags)+'</div><div class="date">'+new Date(l.time.substring(0,l.time.length-2)+'+0800').toLocaleString()+'</div></div>\
            </li>';
          })
          document.querySelector(".page.home ul.postlist").innerHTML+=htmlstr;
          sTate.home.state='loaded';
          if((i+1)*10>=pl.total){
            document.querySelector('.page.home .stated').className='stated nomore';
          }else{
            document.querySelector('.page.home .stated').className='stated more';
          }
        })
      }
    }
  },
  {
    reg:/^#\/post(\/|)$/,
    page:"home",
    cb:function(){
      window.location.hash='#/'
    }
  },
  {
    reg:/^#\/t(\/|)$/,
    page:"t",
    cb:function(){
        if(!sTate.t){
          sTate.t={
            ipage:0,
            state:'loading'
          };
          load(0);
        }
        document.querySelector(".page.t .stated .more span").onclick=function(){
          sTate.t.ipage++;
          sTate.t.state='loading';
          load(sTate.t.ipage);
        }
        function load(i){
          blog.getTListByPage(i,function(pl){
            var htmlstr='';
            pl.data.forEach(function(l){
              htmlstr+='<li>\
              <div class="ttc markdown-body">'+l.desc+'......<a href="#/t/'+l.id+'">阅读全文</a></div>\
              <div class="date">'+new Date(l.time.substring(0,l.time.length-2)+'+0800').toLocaleString()+'</div></div>\
              </li>';
            })
            document.querySelector(".page.t ul.tlist").innerHTML+=htmlstr;
            sTate.t.state='loaded';
          if((i+1)*10>=pl.total){
            document.querySelector('.page.t .stated').className='stated nomore';
          }else{
            document.querySelector('.page.t .stated').className='stated more';
          }
          })
        }

    }
  },
  {
    reg:/^#\/t\/.+/,
    page:"tc",
    cb:function(){
      var id=window.location.hash.substring(4);
      id=id.split('');
      id=id.map(function(v){
        return v=='/'?'':v;
      });
      id=id.join('');
      if(!sTate.tc){
        sTate.tc={
          id:id,
          state:[0,0]
        }
        ref();
        load(id);
      }else{
        if(id!=sTate.tc.id){
          sTate.tc.id=id;
          ref();
          load(id);
        }
      }

      function ref(){
        document.querySelector(".page.tc>.date .date_con").innerHTML='';
        document.querySelector(".page.tc>.t-content").innerHTML='<div class="loading"><span></span><span></span><span></span></div>';
      }

      function load(id){
        blog.getTContent(id,function(res){
          if(sTate.tc.id==id){
            document.querySelector(".page.tc>.t-content").innerHTML=res;
          }
        });
        blog.getTDetails(id,function(res){
          if(sTate.tc.id==id){
            document.querySelector(".page.tc>.date .date_con").innerHTML=new Date(res.time.substring(0,res.time.length-2)+'+0800').toLocaleString();
          }
        },function(){
          document.querySelectorAll(".page").forEach(function(a){
            a.style.display='';
          })
          document.querySelector(".page.a404").style.display='block';

        })
      }
    }
  }, 
  {
    reg:/^#\/tag(\/|)$/,
    page:"tag",
    cb:function(){
      if(!sTate.tag){
        sTate.tag=true;
        var tagul=document.querySelector(".page.tag ul.taglist");
        tagul.innerHTML='<div class="loading"><span></span><span></span><span></span></div>'
        blog.getTagList(function(tags){
          var str='';
          tags.forEach(function(tag){
            str+='<li><a href="#/tag/'+tag+'">'+tag+'</a></li>';
          })
          tagul.innerHTML=str;
        })
      }
    }
  },
  {
    reg:/^#\/post\/.+/,
    page:"post",
    cb:function(){
      var id=window.location.hash.substring(7);
      id=id.split('');
      id=id.map(function(v){
        return v=='/'?'':v;
      });
      id=id.join('');
      if(!sTate.post){
        sTate.post={
          id:id,
          state:[0,0]
        }
        ref();
        load(id);
      }else{
        if(id!=sTate.post.id){
          sTate.post.id=id;
          ref();
          load(id);
        }
      }

      function ref(){
        document.querySelector(".page.post>h1").innerHTML='<div class="loading"><span></span><span></span><span></span></div>';
        document.querySelector(".page.post>.tags .tag_con").innerHTML='';
        document.querySelector(".page.post>.date .date_con").innerHTML='';
        document.querySelector(".page.post>.post-content").innerHTML='<div class="loading"><span></span><span></span><span></span></div>';
      }

      function load(id){
        blog.getPostContent(id,function(res){
          if(sTate.post.id==id){
            document.querySelector(".page.post>.post-content").innerHTML=res;
          }
        });
        blog.getPostDetails(id,function(res){
          if(sTate.post.id==id){
            document.querySelector(".page.post>h1").innerHTML=res.title;
            document.querySelector(".page.post>.tags .tag_con").innerHTML=(function(tags){
              var tstr='';
              tags.forEach(function(tag){
                tstr+='<a href="#/tag/'+tag+'">'+tag+'</a>';
              });
              return tstr;
            })(res.tags);
            document.querySelector(".page.post>.date .date_con").innerHTML=new Date(res.time.substring(0,res.time.length-2)+'+0800').toLocaleString();
          }
        },function(d){
          sTate.post=null;
          document.querySelectorAll(".page").forEach(function(a){
            a.style.display='';
          })
          document.querySelector(".page.a404").style.display='block';
        })
      }
    }
  }, 
  {
    reg:/^#\/friends(\/|)$/,
    page:"friends",
    cb:function(){
      if(!sTate.friends){
        sTate.friends=true;
        blog._get('https://siquan001.github.io/friendlink.json',function(res){
          var data=JSON.parse(res);
          var str='';
          data.forEach(function(item){
            str+='<li><a href="'+item.url+'" target="_blank"><img src="'+item.icon+'"/><div class="m"><div class="title">'+item.title+'</div><div class="desc">'+item.desc+'</div></div></a></li>';
          });
          document.querySelector('.friendlinks').innerHTML=str;
        })
      }
    }
  }, 
  {
    reg:/^#\/archive(\/|)$/,
    page:"archive",
    cb:function(){
      if(!sTate.archive){
        sTate.archive=true;
        blog.getAllPostList(function(res){
          var ul=document.querySelector(".page.archive ul");
          var str='';
          res.forEach(function(l){
            str+='<li><div class="title"><a href="#/post/'+l.id+'">'+l.title+'</a></div><div class="date">'+new Date(l.time.substring(0,l.time.length-2)+'+0800').toLocaleString()+'</div></li>';
          });
          ul.innerHTML=str;
        })
      }
    }
  },
  {
    reg:/^#\/tag\/.+/,
    page:"tagc",
    cb:function(){
      var tag=window.location.hash.substring(6);
      if(!sTate.tagc){
        sTate.tagc={
          tag:tag,
          state:'loading'
        };
        load(tag);
      }else{
        if(sTate.tagc.tag!=tag){
          var ul=document.querySelector(".page.tagc ul");
          ul.innerHTML='';
          load(tag);
        }
      }
      function load(tag){
        document.querySelector(".page.tagc h1 .tagname").innerHTML=decodeURI(tag);
        blog.getPostListByTag(tag,function(res){
          var ul=document.querySelector(".page.tagc ul");
          var str='';
          res.forEach(function(l){
            str+='<li>\
            <h1><a href="#/post/'+l.id+'">'+l.title+'</a></h1>\
            <p class="desc">'+l.desc+'...<a href="#/post/'+l.id+'">阅读全文</a></p>\
            <div class="message"><div class="tags">'+(function(tags){
              var tstr='';
              tags.forEach(function(tag){
                tstr+='<a href="#/tag/'+tag+'">'+tag+'</a>';
              });
              return tstr;
            })(l.tags)+'</div><div class="date">'+new Date(l.time.substring(0,l.time.length-2)+'+0800').toLocaleString()+'</div></div>\
            </li>';
          });
          ul.innerHTML=str;
        })
      }
    }
  }
];

function clhash(){
  window.scrollTo(0,0);
  if(window.location.hash==''){
    location.hash='#/';
    return;
  }
  var ab=false;
  for(var i=0;i<hashTokenize.length;i++){
    var token=hashTokenize[i];
    if(token.reg.test(window.location.hash)){
      var page=token.page;
      document.querySelectorAll(".page").forEach(function(a){
        a.style.display='';
      })
      document.querySelector(".page."+page).style.display='block';
      document.querySelectorAll(".nav .menu li").forEach(function(li){
        if(li.dataset.p==page){
          li.classList.add("active");
        }else{
          li.classList.remove("active");
        }
      })
      document.querySelectorAll(".mobmenu li").forEach(function(li){
        if(li.dataset.p==page){
          li.classList.add("active");
        }else{
          li.classList.remove("active");
        }
      })
      var cb=token.cb;
      cb();
      ab=true;
      break;
    }
  }
  if(!ab){
    document.querySelector(".page.a404").style.display='block';
  }
}

window.onhashchange=clhash;
clhash();

document.querySelector(".menubtn").onclick=function(){
  document.querySelector(".mobmenu").classList.add('show');
}
document.querySelector(".mobmenu").onclick=function(){
  this.classList.remove('show');
}

blog.getCount(function(res){
  document.querySelector(".postcount").innerHTML=res.post;
  document.querySelector(".tcount").innerHTML=res.t;
  document.querySelector(".tagcount").innerHTML=res.tag;
})
