const fs=require('fs');
const path=require('path');

__dirname=path.join(__dirname,'../');
var d=new Date();
function post(name){
  fs.writeFileSync(path.join(__dirname,'/source/posts',name+'.md'),`---
title: ${name}
time: ${
  d.getFullYear()+'/'+q0(d.getMonth()+1)+'/'+q0(d.getDate())+' '+q0(d.getHours())+':'+q0(d.getMinutes())+':'+q0(d.getSeconds())
}
id: ${fs.readdirSync(path.join(__dirname,'/source/posts')).length}
desc: ${name}
tags:
  - 
---
  `);
}
function q0(a){
  if(a<10){
    a='0'+a
  }
  return a;
}

function t(){
  fs.writeFileSync(path.join(__dirname,'/source/ts', (d.getFullYear()+'/'+q0(d.getMonth()+1)+'/'+q0(d.getDate())+' '+q0(d.getHours())+':'+q0(d.getMinutes())+':'+q0(d.getSeconds())).replaceAll('/','').replaceAll(':','').replaceAll(' ','')+'.md'),`---
time: ${
  d.getFullYear()+'/'+q0(d.getMonth()+1)+'/'+q0(d.getDate())+' '+q0(d.getHours())+':'+q0(d.getMinutes())+':'+q0(d.getSeconds())
}
id: ${fs.readdirSync(path.join(__dirname,'/source/ts')).length}
---
`);
}

module.exports={
  post,t
}