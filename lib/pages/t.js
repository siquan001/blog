(function(){
  var i=-1;
  var total=0;
  
  function getter(i){
    if(i<=total){
      get('./t_comment/'+i+'.json',function(res){
        res=JSON.parse(res);
        total=res.total
        var str='';
        res.data.forEach(function(item){
          str+='<li><a href="#/t/'+item.id+'">\
          <div class="desc">'+item.desc+'</div>\
          <div class="time">'+new Date(item.time).toDateString()+'</div>\
          </a></li>';
        });
        document.querySelector(".page .t .t_list").innerHTML+=str;
      })
      if(i==total){
        document.querySelector(".page .t .seemore").innerHTML='没有更多了';
      }
    }
  }

  document.querySelector(".page .t .seemore").onclick=function(){
    if(i<total){
      i++;
      getter(i);
    }
  };

  window.page.t=function(){
    if(i==-1){
      i++;
      getter(i);
    }
  }
})()
