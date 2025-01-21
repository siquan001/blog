const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const marked = require('./marked.js');
const hljs=require('../node_modules/highlight.js');

__dirname=path.join(__dirname,'../');

const renderer = {
  code(code, infostring, escaped){
      if(infostring){
          return `<pre><code class="hljs hljs-${infostring}">${hljs.highlight(code,{
              language:infostring
          }).value}</code></pre>`
      }else{
          return `<pre><code class="hljs">${code}</code></pre>`
      }
  }
}
marked.use({
  renderer
})
let config={};

let count={
  post:0,
  t:0,
  tag:0
}

function chulipost() {
  console.log('[BUILD] geting all post and sort...');
  // 获取所有post
  let allpost = [];
  let allpostd={};
  let allpostcontent = {};

  let posts = fs.readdirSync(path.join(__dirname, '/source/posts'));

  posts.forEach(function (item) {
    if (path.extname(item).indexOf('md') != -1) {
      let content = fs.readFileSync(path.join(__dirname, '/source/posts', item));
      content = content.toString();
      let info = (/---(.*?)---/sg).exec(content)[1];
      info = jsyaml.load(info);
      content = content.replace(/---(.*?)---/sg, '');
      allpost.push(info);
      allpostd[info.id]=info;
      allpostcontent[info.id] = content;
    }
  })
  count.post=allpost.length;

  allpost.sort((a, b) => {
    var ad = new Date(a.time).getTime();
    var bd = new Date(b.time).getTime();
    var aq = !!a.top, bq = !!b.top;
    if (aq && !bq) {
      return 1;
    } else if (!aq && bq) {
      return -1;
    } else {
      return bd - ad;
    }
  });

  console.log('[BUILD] writing all_post.json...');
  fs.writeFileSync(path.join(__dirname, '/datas/all_posts.json'), JSON.stringify(allpost));

  console.log('[BUILD] updating posts...');
  for (let id in allpostcontent) {
    if(config.archives.post.indexOf(id)!=-1) continue;
    try {
      var yc = fs.readFileSync(path.join(__dirname, 'post_'+id + '.md'));
      yc = yc.toString();
      if (yc != allpostcontent[id]) {
        fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.md'), allpostcontent[id])
        console.log('[BUILD] updated post '+id+'.md');
        fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.json'), JSON.stringify({
          html:marked.parse(allpostcontent[id]),
          detail:allpostd[id],
        }));
        console.log('[BUILD] updated post '+id+'.json');
      }
    } catch (e) {
      fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.md'), allpostcontent[id])
      console.log('[BUILD] created post '+id+'.md');
      fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.json'), JSON.stringify({
        html:marked.parse(allpostcontent[id]),
        detail:allpostd[id],
      }))
      console.log('[BUILD] created post '+id+'.json');
    }
  }

  console.log('[BUILD] updating post comment ...');

  console.log('[BUILD] unlinking old post comment ...');
  fs.readdirSync(path.join(__dirname, '/datas/')).forEach(function (item) {
    if(item.indexOf('post_comment')==0){
      fs.unlinkSync(path.join(__dirname, '/datas/', item));
    }
  });
  
  console.log('[BUILD] creating new post comment ...');
  let post_page_total = Math.floor(allpost.length / config.postPageshowCount) + 1;
  console.log('[BUILD] post comment total:'+post_page_total);

  for (var i = 0; i < post_page_total; i++) {
    let ob = {
      data: [],
      total: post_page_total
    };
    for (var j = i * config.postPageshowCount; j < Math.min(allpost.length, (i + 1) * config.postPageshowCount); j++) {
      ob.data.push(allpost[j]);
    }
    fs.writeFileSync(path.join(__dirname, '/datas/post_comment_'+ i + '.json'), JSON.stringify(ob));
  }

  console.log('[BUILD] updating post tags ...');
  var tags={};
  allpost.forEach(function(item){
    if(item.tags){
      item.tags.forEach((tag)=>{
        if(tags[tag]){
          tags[tag].push(item);
        }else{
          tags[tag]=[item];
        }
      })
    }
  })

  for(let k in tags){
    fs.writeFileSync(path.join(__dirname, '/datas/tag_'+ k + '.json'), JSON.stringify(tags[k]));
  }
  fs.writeFileSync(path.join(__dirname, '/datas/tags.json'), JSON.stringify(Object.keys(tags)));
  count.tag=Object.keys(tags).length;
  console.log('[BUILD] END');
}



function build(_config){
  config=_config;
  chulipost();
  fs.writeFileSync(path.join(__dirname, '/datas/count.json'), JSON.stringify(count));
}

module.exports=build;
