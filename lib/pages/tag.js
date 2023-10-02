(function(){
  window.page.tag=function(){
    get('./tags.json',function(res){
      res=JSON.parse(res);
      document.querySelector(".page>.tag ul").innerHTML=res.map(function(item){
        return '<li><a href="#/tag/'+item+'">'+item+'</a></li>'
      }).join('');
    })
  }
})();