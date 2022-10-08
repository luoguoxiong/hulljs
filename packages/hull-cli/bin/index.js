#!/usr/bin/env node
const semver = require('semver');
const { chalk } = require('@hulljs/utils');
checkNodeVersion();

function checkNodeVersion() {

  const packageJson = require('../package.json');

  if (!packageJson.engines || !packageJson.engines.node) {
    return;
  }

  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    console.error(
      chalk.red(
        'You are running Node %s.\n' +
              'hulljs requires Node %s or higher.\n' +
              'Please update your version of Node.',
      ),
      process.version,
      packageJson.engines.node,
    );
    process.exit(1);
  }
}

require('../dist');
