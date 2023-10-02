function showMenu(){
  document.querySelector(".leftnav").classList.add('show');
}
function hideMenu(){
  document.querySelector(".leftnav").classList.remove('show');
}
function resize(){
  document.body.style.width=document.body.style.height=0+'px';
  document.body.style.width=window.innerWidth+'px';  
  document.body.style.height=window.innerHeight+'px';  
}
window.addEventListener('resize', resize);
resize();

function fetchingfooter(){
  get('./footer.json',function(res){
    var footerObj = JSON.parse(res);
    document.querySelector(".footer .about p").innerHTML=footerObj.about;
    var str='';
    for(var k in footerObj.from){
      str+='<li>'+k+':<a href="'+footerObj.from[k]+'" target="_blank">'+footerObj.from[k]+'</a></li>'
    }
    document.querySelector(".footer .from ul").innerHTML=str;
  })
  get('https://siquan001.github.io/friendlink.json',function(res){
    var frinedslink = JSON.parse(res);
    var str='';
    for(var i=0;i<frinedslink.length;i++){
      str+='<li><a href="'+frinedslink[i].url+'" target="_blank" title="'+frinedslink[i].desc+'">'+frinedslink[i].title+'</a></li>';
    }
    document.querySelector(".footer .friendlink ul").innerHTML=str;
  });
}
fetchingfooter();

function get(url,callback,errcall){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function(){
    if(xhr.status === 200){
      callback(xhr.responseText);
    }else if(xhr.status>400){
      errcall(xhr.status);
    }
  };
  xhr.onerror=errcall;
  xhr.send();
}
document.querySelector(".backtop").onclick=function(){
  var y=document.querySelector(".rightcontent").scrollTop;
  var q=y;
  var t=10;
  var timer=setInterval(function(){
    q-=y/t;
    document.querySelector(".rightcontent").scrollTop=q;
    if(q<=0){
      clearInterval(timer);
    }
  },10);
}
document.querySelector(".rightcontent").addEventListener('scroll',function(){
  if(this.scrollTop>1){
    if(document.querySelector(".backtop").style.transform!='translateY(0)')
    document.querySelector(".backtop").style.transform='translateY(0)';
  }else{
    document.querySelector(".backtop").style.transform='';
  }
});
function chulihash(hash){
  hideMenu();
  hash=hash.slice(1);
  var s=hash.split('?');
  hash=s[0];
  document.querySelectorAll(".page>div").forEach(function(div){
    div.style.display='';
  });
  document.querySelectorAll(".leftnav .menu li").forEach(function(li){
    li.classList.remove('act');
  });
  if(hash==''||hash=='/'){
    location.hash='#/index'
  }else if(hash=='/index'||hash=='/index/'){
    document.querySelector(".leftnav .menu li.index").classList.add('act');
    document.querySelector(".page>.index").style.display='block';
    if(window.page.index){
      window.page.index();
    }else{
      get('./lib/pages/index.html',function(res){
        document.querySelector(".page>.index").innerHTML=res;
        insertScript('./lib/pages/index.js',function(){
          window.page.index();
        })
      })
    }
  }else if(hash=='/post'||hash=='/post/'){
    document.querySelector(".leftnav .menu li.post").classList.add('act');
    document.querySelector(".page>.post").style.display='block';
    if(window.page.post){
      window.page.post();
    }else{
      get('./lib/pages/post.html',function(res){
        document.querySelector(".page>.post").innerHTML=res;
        insertScript('./lib/pages/post.js',function(){
          window.page.post();
        })
      })
    }
  }else if(hash.indexOf('/post/')==0){
    var id=hash.slice(6).trim();
    document.querySelector(".page>.post_inner").style.display='block';
    if(window.page.post_inner){
      window.page.post_inner(id);
    }else{
      get('./lib/pages/post_inner.html',function(res){
        document.querySelector(".page>.post_inner").innerHTML=res;
        insertScript('./lib/pages/post_inner.js',function(){
          window.page.post_inner(id);
        })
      })
    }
  }else if(hash=='/tag'||hash=='/tag/'){
    document.querySelector(".leftnav .menu li.tag").classList.add('act');
    document.querySelector(".page>.tag").style.display='block';
    if(window.page.tag){
      window.page.tag();
    }else{
      get('./lib/pages/tag.html',function(res){
        document.querySelector(".page>.tag").innerHTML=res;
        insertScript('./lib/pages/tag.js',function(){
          window.page.tag();
        })
      })
    }
  }else if(hash.indexOf('/tag/')==0){
    var id=hash.slice(5).trim();
    document.querySelector(".page>.tag_inner").style.display='block';
    if(window.page.tag_inner){
      window.page.tag_inner(id);
    }else{
      get('./lib/pages/tag_inner.html',function(res){
        document.querySelector(".page>.tag_inner").innerHTML=res;
        insertScript('./lib/pages/tag_inner.js',function(){
          window.page.tag_inner(id);
        })
      })
    }
  }else if(hash=='/archive'||hash=='/archive/'){
    document.querySelector(".leftnav .menu li.archive").classList.add('act');
    document.querySelector(".page>.archive").style.display='block';
    if(window.page.archive){
      window.page.archive();
    }else{
      get('./lib/pages/archive.html',function(res){
        document.querySelector(".page>.archive").innerHTML=res;
        insertScript('./lib/pages/archive.js',function(){
          window.page.archive();
        })
      })
    }
  }else if(hash=='/friends'||hash=='/friends/'){
    document.querySelector(".leftnav .menu li.friends").classList.add('act');
    document.querySelector(".page>.friends").style.display='block';
    if(window.page.friends){
      window.page.friends();
    }else{
      get('./lib/pages/friends.html',function(res){
        document.querySelector(".page>.friends").innerHTML=res;
        insertScript('./lib/pages/friends.js',function(){
          window.page.friends();
        })
      })
    }
  }else if(hash=='/t'||hash=='/t/'){
    document.querySelector(".leftnav .menu li.t").classList.add('act');
    document.querySelector(".page>.t").style.display='block';
    if(window.page.t){
      window.page.t();
    }else{
      get('./lib/pages/t.html',function(res){
        document.querySelector(".page>.t").innerHTML=res;
        insertScript('./lib/pages/t.js',function(){
          window.page.t();
        })
      })
    }
  }else if(hash.indexOf('/t/')==0){
    var id=hash.slice(3).trim();
    document.querySelector(".page>.t_inner").style.display='block';
    if(window.page.t_inner){
      window.page.t_inner(id);
    }else{
      get('./lib/pages/t_inner.html',function(res){
        document.querySelector(".page>.t_inner").innerHTML=res;
        insertScript('./lib/pages/t_inner.js',function(){
          window.page.t_inner(id);
        })
      })
    }
  }else if(hash=='/callme'||hash=='/callme/'){
    document.querySelector(".leftnav .menu li.callme").classList.add('act');
    document.querySelector(".page>.callme").style.display='block';
    if(window.page.callme){
      window.page.callme();
    }else{
      get('./lib/pages/callme.html',function(res){
        document.querySelector(".page>.callme").innerHTML=res;
        insertScript('./lib/pages/callme.js',function(){
          window.page.callme();
        })
      })
    }
  }else{
    document.querySelector(".page>.err").style.display='block';
    get('./lib/pages/404.html',function(res){
      document.querySelector(".page>.err").innerHTML=res;
    })
  }
}

function insertScript(url,cb){
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  script.onload=function(){
    script.remove();
    cb();
  }
}
window.page={};

chulihash(location.hash);
window.addEventListener('hashchange',function(){
  chulihash(location.hash);
});