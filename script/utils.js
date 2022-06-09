const { exec } = require('child_process');
const _exec = (command) => new Promise((res) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    res({ stdout, stderr });
    console.log(`stdout: ${stdout}`);
  });
});
module.exports = _exec;
