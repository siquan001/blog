(function(){
  window.page.tag_inner=function(tagname){
    document.querySelector(".page .tag_inner .postlist").innerHTML='';
    document.querySelector(".page .tag_inner span.tagname").innerHTML=decodeURI(tagname);
    get('./tags/'+tagname+'.json',function(res){
      res=JSON.parse(res);
      var str='';
      res.forEach(function(item,i){
        str+='<li '+((i%2==1)?'class="r"':'')+'><a href="#/post/'+item.id+'"><img src="'+(item.cover||'https://www.loliapi.cn/acg/?_='+Math.random().toString().slice(2)+Date.now())+'"/>\
        <div class="m"><div class="p_title">'+item.title+'</div>\
        <div class="p_desc">'+item.desc+'</div>\
        <div class="p_other"><div class="tags">'+(function(tags){
          return tags.map(function(item){
            return '<div class="item"><a href="#/tag/'+item+'">'+item+'</a></div>'
          }).join('');
        })(item.tags)+'</div><div class="time">'+new Date(item.time).toDateString()+'</div></div>\
        </div></a></li>';
      })
      document.querySelector(".page .tag_inner .postlist").innerHTML=str;
    })
  }
})();