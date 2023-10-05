const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const {Marked} = require('marked');
const hljs=require('highlight.js');
const {markedHighlight}=require('marked-highlight');

const marked=new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
)

const config = {
  post: {
    pageshowcount: 10,
    toppershowcount: 3,
  },
  t: {
    pageshowcount: 10,
    toppershowcount: 3,
  },
  archives:{
    post:[23],
    t:[1],
  }
}
console.log(`
[BUILD] [CONFIG]
${JSON.stringify(config, null, 2)}
`);

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
  fs.writeFileSync(path.join(__dirname, 'all_post.json'), JSON.stringify(allpost));

  console.log('[BUILD] updating posts...');
  for (let id in allpostcontent) {
    if(config.archives.post.indexOf(id)!=-1) continue;
    try {
      var yc = fs.readFileSync(path.join(__dirname, 'posts', id + '.md'));
      yc = yc.toString();
      if (yc != allpostcontent[id]) {
        fs.writeFileSync(path.join(__dirname, 'posts', id + '.md'), allpostcontent[id])
        console.log('[BUILD] updated post '+id+'.md');
        fs.writeFileSync(path.join(__dirname, 'posts', id + '.html'), marked.parse(allpostcontent[id]))
        console.log('[BUILD] updated post '+id+'.html');
      }
    } catch (e) {
      fs.writeFileSync(path.join(__dirname, 'posts', id + '.md'), allpostcontent[id])
      console.log('[BUILD] created post '+id+'.md');
      fs.writeFileSync(path.join(__dirname, 'posts', id + '.html'), marked.parse(allpostcontent[id]))
      console.log('[BUILD] created post '+id+'.html');
    }
  }
  
  console.log('[BUILD] updating post json ...');
  allpost.forEach(function(item){
    if(config.archives.post.indexOf(item.id)!=-1) return;
    fs.writeFileSync(path.join(__dirname, 'posts', item.id + '.json'), JSON.stringify(item));
    console.log('[BUILD] updated post'+item.id + '.json');
  })

  console.log('[BUILD] updating post comment ...');

  console.log('[BUILD] unlinking old post comment ...');
  fs.readdirSync(path.join(__dirname, 'post_comment')).forEach(function (item) {
    fs.unlinkSync(path.join(__dirname, 'post_comment', item));
  });
  
  console.log('[BUILD] creating new post comment ...');
  console.log('[BUILD] post comment total:'+post_page_total);
  let post_page_total = Math.floor(allpost.length / config.post.pageshowcount) + 1;

  for (var i = 0; i < post_page_total; i++) {
    let ob = {
      data: [],
      total: post_page_total - 1
    };
    for (var j = i * config.post.pageshowcount; j < Math.min(allpost.length, (i + 1) * config.post.pageshowcount); j++) {
      ob.data.push(allpost[j]);
    }
    fs.writeFileSync(path.join(__dirname, 'post_comment', i + '.json'), JSON.stringify(ob));
  }

  console.log('[BUILD] updated topper post comment ...');
  let topperob = [];
  for (var i = 0; i < Math.min(allpost.length, config.post.toppershowcount); i++) {
    topperob.push(allpost[i]);
  }
  fs.writeFileSync(path.join(__dirname, 'topper_post.json'), JSON.stringify(topperob));

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
    fs.writeFileSync(path.join(__dirname, 'tags', k + '.json'), JSON.stringify(tags[k]));
  }
  fs.writeFileSync(path.join(__dirname, './tags.json'), JSON.stringify(Object.keys(tags)));
  console.log('[BUILD] END');
}

chulipost();

function chulit(){
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
      info.desc=content.substring(0,50);
      allt.push(info);
      alltcontent[info.id] = content;
    }
  })

  allt.sort((a, b) => {
    var ad = new Date(a.time).getTime();
    var bd = new Date(a.time).getTime();
    var aq = !!a.top, bq = !!b.top;
    if (aq && !bq) {
      return 1;
    } else if (!aq && bq) {
      return -1;
    } else {
      return ad - bd;
    }
  })

  fs.writeFileSync(path.join(__dirname, 'all_t.json'), JSON.stringify(allt));

  for (let id in alltcontent) {
    try {
      var yc = fs.readFileSync(path.join(__dirname, 'ts', id + '.md'));
      yc = yc.toString();
      if (yc != alltcontent[id]) {
        fs.writeFileSync(path.join(__dirname, 'ts', id + '.md'), alltcontent[id])
        fs.writeFileSync(path.join(__dirname, 'ts', id + '.html'), marked.parse(alltcontent[id]))
      }
    } catch (e) {
      fs.writeFileSync(path.join(__dirname, 'ts', id + '.md'), alltcontent[id])
      fs.writeFileSync(path.join(__dirname, 'ts', id + '.html'), marked.parse(alltcontent[id]))
    }
  }

  allt.forEach(function(item){
    fs.writeFileSync(path.join(__dirname, 'ts', item.id + '.json'), JSON.stringify(item));
  })


  fs.readdirSync(path.join(__dirname, 't_comment')).forEach(function (item) {
    fs.unlinkSync(path.join(__dirname, 't_comment', item));
  });

  let t_page_total = Math.floor(allt.length / config.t.pageshowcount) + 1;

  for (var i = 0; i < t_page_total; i++) {
    let ob = {
      data: [],
      total: t_page_total - 1
    };
    for (var j = i * config.t.pageshowcount; j < Math.min(allt.length, (i + 1) * config.t.pageshowcount); j++) {
      ob.data.push(allt[j]);
    }
    fs.writeFileSync(path.join(__dirname, 't_comment', i + '.json'), JSON.stringify(ob));
  }

  let topperob = [];
  for (var i = 0; i < Math.min(allt.length, config.t.toppershowcount); i++) {
    topperob.push(allt[i]);
  }
  fs.writeFileSync(path.join(__dirname, 'topper_t.json'), JSON.stringify(topperob));
}

chulit();
