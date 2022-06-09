const { htmlEscape } = require('escape-goat');
const getRepoInfo = require('git-repo-info');
const chalk = require('chalk');
const git = require('./git');
const _exec = require('./utils');


const logErrorAndExit = (message) => {
  console.error(chalk.red(message));
  process.exit(1);
};

function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}

const getChangelog = async() => {
  const repoUrl = 'https://github.com/luoguoxiong/hulljs';
  const latest = await git.latestTagOrFirstCommit();
  const log = await git.commitLogFromRevision(latest);

  if (!log) {
    throw new Error('get changelog failed, no new commits was found.');
  }

  const commits = log.split('\n').map((commit) => {
    const splitIndex = commit.lastIndexOf(' ');
    return {
      message: commit.slice(0, splitIndex),
      id: commit.slice(splitIndex + 1),
    };
  });

  return (nextTag) =>
    `${commits
      .map((commit) => `- ${htmlEscape(commit.message)}  ${commit.id}`)
      .join('\n') }\n\n${repoUrl}/compare/${latest}...${nextTag}`;
};

const release = async() => {
//   const { branch } = getRepoInfo();
//   branch !== 'main' && logErrorAndExit('your must release in main branch!');
  const isAddAll = await git.gitIsAddAll();
  !isAddAll && logErrorAndExit('git status is not clean. exit...');
  logStep('git status is checked');
  logStep('build');
  await _exec('npm run build');
  const logs = await getChangelog();
  console.log(logs(''));
};

release();
