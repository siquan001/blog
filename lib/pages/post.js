(function(){
  var i=-1;
  var total=0;
  
  function getter(i){
    if(i<=total){
      get('./post_comment/'+i+'.json',function(res){
        res=JSON.parse(res);
        total=res.total
        var str='';
        res.data.forEach(function(item,i){
          str+='<li '+((i%2==1)?'class="r"':'')+'><a href="#/post/'+item.id+'"><img src="'+(item.cover||'https://www.loliapi.cn/acg/?_='+Math.random().toString().slice(2)+Date.now())+'"/>\
          <div class="m"><div class="p_title">'+item.title+'</div>\
          <div class="p_desc">'+item.desc+'</div>\
          <div class="p_other"><div class="tags">'+(function(tags){
            return tags.map(function(item){
              return '<div class="item"><a href="#/tag/'+item+'">'+item+'</a></div>'
            }).join('');
          })(item.tags)+'</div><div class="time">'+new Date(item.time).toDateString()+'</div></div>\
          </div></a></li>';
        });
        document.querySelector(".page .post .postlist").innerHTML+=str;
      });
      if(i==total){
        document.querySelector(".page .post .seemore").innerHTML='没有更多了';
      }
    }
  }

  document.querySelector(".page .post .seemore").onclick=function(){
    if(i<total){
      i++;
      getter(i);
    }
  }
  
  window.page.post=function(){
    if(i==-1){
      i++;
      getter(i);
    }
  }
})()
