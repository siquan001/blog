(function(){
  var h1=document.querySelector(".post_inner .d h1");
  var time=document.querySelector(".post_inner .d .time");
  var tags=document.querySelector(".post_inner .d .tags");
  var contentF=document.querySelector(".post_inner .mdcontent");
  var d=document.querySelector(".post_inner .d");
  function reset(){
    h1.innerHTML='--';
    time.innerHTML='--/--/-- --:--:--';
    tags.innerHTML='';
    contentF.innerHTML='';
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

