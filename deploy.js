// nodejs执行git add
const shell = require('shelljs');
const alwaysBuild=true;

if(alwaysBuild){
  shell.exec('node build.js');
}

shell.exec('git add .');
console.log('[DEPLOY] git added');
// git commit
shell.exec('git commit -m "update"');
console.log('[DEPLOY] git commit');
// git push
shell.exec('git push');
console.log('[DEPLOY] git push');
