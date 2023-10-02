(function(){
  var time=document.querySelector(".t_inner .time");
  var contentF=document.querySelector(".t_inner .mdcontent");
  function reset(){
    time.innerHTML='--/--/-- --:--:--';
    contentF.innerHTML='';
  }
  
  window.page.t_inner=function(id){
    reset();
    get('./ts/'+id+'.json',function(res){
      res=JSON.parse(res);
      time.innerHTML=new Date(res.time).toString();
    })
    get('./ts/'+id+'.html',function(res){
      contentF.innerHTML=res;
    })
  }
})();

