(function(){
  window.page.friends=function(){
    get('https://siquan001.github.io/friendlink.json',function(res){
      var data=JSON.parse(res);
      var str='';
      data.forEach(function(item){
        str+='<li><a href="'+item.url+'" target="_blank"><img src="'+item.icon+'"/><div class="m"><div class="title">'+item.title+'</div><div class="desc">'+item.desc+'</div></div></a></li>';
      });
      document.querySelector('.friendlist').innerHTML=str;
    })
    
  }
})()