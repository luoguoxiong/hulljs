const _exec = require('./utils');
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
    latest = await exports.latestTag();
  } catch (_) {
    latest = await firstCommit();
  }

  return latest;
};

exports.commitLogFromRevision = async() => {
  const { stdout } = await _exec('git log --pretty="format:%s %h"');
  return stdout;
};

exports.gitIsAddAll = async() => {
  const { stdout } = await _exec('git status --porcelain');
  return stdout.length === 0;
};
