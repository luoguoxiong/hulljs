#!/usr/bin/env node
import fs from 'fs';
import cac from 'cac';
import build from './build';
import { log } from './utils';
import { IBuildOptions, SelfWebpackConfig } from './types';
export { SelfWebpackConfig, IBuildOptions };
const cli = cac();

cli.version(require('../package.json').version);

cli
  .command('dev', 'Start dev server!')
  .option('--port <port>', 'dev server port')
  .option('--analyzer', 'is use BundleAnalyzer?')
  .action((options:IBuildOptions) => {
    try {
      const option = {
        appDirectory: fs.realpathSync(process.cwd()),
        port: options.port || 5000,
        env: 'development',
        analyzer: options.analyzer,
      };
      build(option, 'dev');
    } catch (error) {
      log.error(error);
      process.exit(1);
    }
  });

cli
  .command('build', 'Build web app resource！')
  .option('--analyzer', 'is use BundleAnalyzer?')
  .action((options:IBuildOptions) => {
    try {
      const option = {
        appDirectory: fs.realpathSync(process.cwd()),
        env: 'production',
        analyzer: options.analyzer,
      };
      build(option, 'build');
    } catch (error) {
      log.error(error);
      process.exit(1);
    }
  });

cli
  .command('server', 'Start static server for production app!')
  .option('--port <port>', 'static server port')
  .action((options:IBuildOptions) => {
    try {
      const option = {
        appDirectory: fs.realpathSync(process.cwd()),
        env: 'production',
        port: options.port || 5000,
      };
      build(option, 'server');
    } catch (error) {
      log.error(error);
      process.exit(1);
    }
  });

cli.help();

cli.parse();

