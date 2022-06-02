#!/usr/bin/env node
import fs from 'fs';
import cac from 'cac';
import build from './build';
import { IBuildOptions, BuildConfig } from './types';
export { BuildConfig, IBuildOptions };

const cli = cac();

cli.version(require('../package.json').version);

cli
  .command('dev', 'Start dev server!')
  .option('--port <port>', 'dev server port')
  .option('--buildTool <buildTool>', 'is use webpack or vite to build?')
  .option('--analyzer', 'is use BundleAnalyzer?')
  .action((options: IBuildOptions) => {
    try {
      const option = {
        appDirectory: fs.realpathSync(process.cwd()),
        port: options.port || 5000,
        env: 'development',
        buildTool: options.buildTool,
        analyzer: options.analyzer,
      };
      build(option, 'dev');
    } catch (error: any) {
      throw Error(error);
    }
  });

cli
  .command('build', 'Build web app resource！')
  .option('--buildTool <buildTool>', 'is use webpack or vite to build?')
  .option('--analyzer', 'is use BundleAnalyzer?')
  .action((options: IBuildOptions) => {
    try {
      const option = {
        appDirectory: fs.realpathSync(process.cwd()),
        env: 'production',
        buildTool: options.buildTool,
        analyzer: options.analyzer,
      };
      build(option, 'build');
    } catch (error: any) {
      throw Error(error);
    }
  });

cli
  .command('server', 'Start static server for production app!')
  .option('--buildTool <buildTool>', 'is use webpack or vite to build?')
  .option('--port <port>', 'static server port')
  .action((options: IBuildOptions) => {
    try {
      const option = {
        appDirectory: fs.realpathSync(process.cwd()),
        env: 'production',
        buildTool: options.buildTool,
        port: options.port || 5000,
      };
      build(option, 'server');
    } catch (error: any) {
      throw Error(error);
    }
  });

cli.help();

cli.parse();

