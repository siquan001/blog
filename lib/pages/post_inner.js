(function(){
  var h1=document.querySelector(".post_inner .mb h1");
  var time=document.querySelector(".post_inner .mb .time");
  var tags=document.querySelector(".post_inner .mb .tags");
  var contentF=document.querySelector(".post_inner .mdcontent");
  var cover=document.querySelector(".post_inner .mb .cover");
  function reset(){
    h1.innerHTML='--';
    time.innerHTML='--/--/-- --:--:--';
    tags.innerHTML='';
    contentF.innerHTML='';
    cover.src='';
  }
  
  window.page.post_inner=function(id){
    reset();
    get('./posts/'+id+'.json',function(res){
      res=JSON.parse(res);
      h1.innerHTML=res.title;
      time.innerHTML=new Date(res.time).toString();
      tags.innerHTML=res.tags.map(function(tag){
        return '<a href="#/tag/'+tag+'">'+tag+'</a>';
      }).join(' ');
      cover.src=res.cover||('https://www.loliapi.cn/acg/?_='+Math.random().toString().slice(2)+Date.now());
    },function(){
      h1.innerHTML='获取文章数据失败！';
      time.innerHTML=new Date().toString();
    })
    get('./posts/'+id+'.html',function(res){
      contentF.innerHTML=res;
    },function(){
      contentF.innerHTML='获取文章内容失败！请刷新重试或检查链接';
    })
  }
})();

