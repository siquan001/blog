(function(){
  window.page.archive=function(){
    get('./all_post.json',function(res){
      res=JSON.parse(res);
      var html='';
      res.forEach(function(item){
        html+='<li><div class="title"><a href="#/post/'+item.id+'">'+item.title+'</a></div><div class="time">'+new Date(item.time).toDateString()+'</div></li>'
      });
      document.querySelector(".page>.archive .archivelist").innerHTML=html;
    })
  }
})()