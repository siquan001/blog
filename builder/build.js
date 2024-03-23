const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const {Marked} = require('marked');
const hljs=require('highlight.js');
const {markedHighlight}=require('marked-highlight');

__dirname=path.join(__dirname,'../');

const marked=new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
)

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
        fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.html'), marked.parse(allpostcontent[id]))
        console.log('[BUILD] updated post '+id+'.html');
      }
    } catch (e) {
      fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.md'), allpostcontent[id])
      console.log('[BUILD] created post '+id+'.md');
      fs.writeFileSync(path.join(__dirname, '/datas/post_'+ id + '.html'), marked.parse(allpostcontent[id]))
      console.log('[BUILD] created post '+id+'.html');
    }
  }
  
  console.log('[BUILD] updating post json ...');
  allpost.forEach(function(item){
    if(config.archives.post.indexOf(item.id)!=-1) return;
    fs.writeFileSync(path.join(__dirname, '/datas/post_'+ item.id  + '.json'), JSON.stringify(item));
    console.log('[BUILD] updated post'+item.id + '.json');
  })

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
      total: post_page_total - 1
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


function chulit(){
  console.log('[BUILD] geting all t and sort...');

  var allt=[];
  var alltcontent={};
  let ts = fs.readdirSync(path.join(__dirname, '/source/ts'));

  ts.forEach(function (item) {
    if (path.extname(item).indexOf('md') != -1) {
      let content = fs.readFileSync(path.join(__dirname, '/source/ts', item));
      content = content.toString();
      let info = (/---(.*?)---/sg).exec(content)[1];
      info = jsyaml.load(info);
      content = content.replace(/---(.*?)---/sg, '');
      info.desc=marked.parse(content.substring(0,200));
      allt.push(info);
      alltcontent[info.id] = content;
    }
  })
  count.t=allt.length;

  allt.sort((a, b) => {
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
  })

  console.log('[BUILD] writing all_t.json...');

  fs.writeFileSync(path.join(__dirname, '/datas/all_t.json'), JSON.stringify(allt));
  console.log('[BUILD] updating ts...');

  for (let id in alltcontent) {
    try {
      var yc = fs.readFileSync(path.join(__dirname, 'ts', id + '.md'));
      yc = yc.toString();
      if (yc != alltcontent[id]) {
        fs.writeFileSync(path.join(__dirname, '/datas/t_'+ id + '.md'), alltcontent[id]);
        console.log('[BUILD] updated t '+id+'.md');
        fs.writeFileSync(path.join(__dirname, '/datas/t_'+ id + '.html'), marked.parse(alltcontent[id]))
        console.log('[BUILD] updated t '+id+'.html');
      }
    } catch (e) {
      fs.writeFileSync(path.join(__dirname, '/datas/t_'+ id + '.md'), alltcontent[id])
      console.log('[BUILD] created t '+id+'.md');
      fs.writeFileSync(path.join(__dirname, '/datas/t_'+ id + '.html'), marked.parse(alltcontent[id]))
      console.log('[BUILD] created t '+id+'.html');
    }
  }
  console.log('[BUILD] updating t json ...');
  allt.forEach(function(item){
    fs.writeFileSync(path.join(__dirname, '/datas/t_'+ item.id + '.json'), JSON.stringify(item));
  })

  console.log('[BUILD] updating t comment ...');
  console.log('[BUILD] unlinking old t comment ...');

  fs.readdirSync(path.join(__dirname, '/datas/')).forEach(function (item) {
    if(item.indexOf('t_comment')==0){
      fs.unlinkSync(path.join(__dirname, '/datas/', item));
    }
  });

  let t_page_total = Math.floor(allt.length / config.tPageshowCount) + 1;
  console.log('[BUILD] creating new t comment ...');
  console.log('[BUILD] t comment total:'+t_page_total);

  for (var i = 0; i < t_page_total; i++) {
    let ob = {
      data: [],
      total: t_page_total - 1
    };
    for (var j = i * config.tPageshowCount; j < Math.min(allt.length, (i + 1) * config.tPageshowCount); j++) {
      ob.data.push(allt[j]);
    }
    fs.writeFileSync(path.join(__dirname, '/datas/t_comment_'+i + '.json'), JSON.stringify(ob));
  }
  console.log('[BUILD] END');
}


function build(_config){
  config=_config;
  chulipost();
  chulit();
  fs.writeFileSync(path.join(__dirname, '/datas/count.json'), JSON.stringify(count));
}

module.exports=build;
