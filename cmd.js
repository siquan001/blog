const config=require('./_config.js');
const build=require('./builder/build.js');
const deploy=require('./builder/deploy.js');
const newm=require('./builder/new.js');
const ht=`\tbuild   打包
\tdeploy  部署
\tnew     新建
\t\tnew post [标题]    新建文章
\t\tnew [标题]         新建文章
\t\tnew t              新建动态
\tall    打包部署`
var args=process.argv;
args.shift();
args.shift();
console.log(args);
if(args[0]){
  if(args[0]=='build'){
    build(config);
  }else if(args[0]=='deploy'){
    deploy(config);
  }else if(args[0]=='new'){
    if(args[1]){
      if(args[1]=='t'){
        newm.t();
      }else if(args[1]=='post'){
        newm.post(args[2]);
      }else{
        newm.post(args[1]);
      }
    }else{
      newm.post('')
    }
  }else if(args[0]=='all'){
    build(config);
    deploy(config);
  }else if(args[0]=='help'||args[0]=='h'){
    console.log(ht);
  }else{
    cr();
  }
}else{
  cr();
}

function cr(){
  console.log(`请传入正确参数:\n${ht}`);
}

