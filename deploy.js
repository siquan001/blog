// nodejs执行git add
const shell = require('shelljs');
shell.exec('git add .');
console.log('[DEPLOY] git added');
// git commit
shell.exec('git commit -m "update"');
console.log('[DEPLOY] git commit');
// git push
shell.exec('git push -m "update"');
console.log('[DEPLOY] git push');
