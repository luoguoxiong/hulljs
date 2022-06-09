const { promisify } = require('util');
const _exec = promisify(require('node:child_process').exec);

exports.latestTag = async() => {
  const { stdout } = await _exec('git describe --abbrev=0 --tags');
  return stdout;
};

const firstCommit = async() => {
  const { stdout } = await _exec('git rev-list --max-parents=0 HEAD') ;
  return stdout;
};

exports.latestTagOrFirstCommit = async() => {
  let latest;
  try {
    // In case a previous tag exists, we use it to compare the current repo status to.
    latest = await exports.latestTag();
  } catch (_) {
    // Otherwise, we fallback to using the first commit for comparison.
    latest = await firstCommit();
  }

  return latest;
};

exports.commitLogFromRevision = async() => {
  const { stdout } = await _exec('git log --pretty="format:%s %h"');
  return stdout;
};

exports.gitStatusIsEmpty = async() => {
  const { stdout } = await _exec('git status --porcelain');
  console.log(stdout);
  return stdout.length === 0;
};
