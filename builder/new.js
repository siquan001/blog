const fs=require('fs');
const path=require('path');

__dirname=path.join(__dirname,'../');

function post(name){
  fs.writeFileSync(path.join(__dirname,'/source/posts',name+'.md'),`---
title: ${name}
time: ${
  new Date().toLocaleString()
}
id: ${fs.readdirSync(path.join(__dirname,'/source/posts')).length}
desc: ${name}
tags:
  - 
---
  `);
}

function t(){
  fs.writeFileSync(path.join(__dirname,'/source/ts',new Date().toLocaleString().replaceAll('/','').replaceAll(':','').replaceAll(' ','')+'.md'),`---
time: ${
  new Date().toLocaleString()
}
id: ${fs.readdirSync(path.join(__dirname,'/source/ts')).length}
---
`);
}

module.exports={
  post,t
}