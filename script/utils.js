const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const _exec = promisify(require('child_process').exec);
// const _exec = (command) => new Promise((res) => {
// //   exec(command, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error(`exec error: ${error}`);
// //       return;
// //     }
// //     res({ stdout });
// //     console.log(`stdout: ${stdout}`);
// //   });


// });
module.exports = _exec;
