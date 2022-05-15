import fs from 'fs';
import yParser from 'yargs-parser';
import { ENV } from './types';
import build from './build';
import { log } from './utils';
export { SelfWebpackConfig } from './types';

// builder --p 80 --env development -w ===> { _: [], p: 80, env: development, w: true }
interface Args {
    p?:number;
    env?:ENV;
    w?:boolean;
}
const args = yParser(process.argv.slice(2)) as Args;

try {
  const appDirectory = fs.realpathSync(process.cwd());
  build({ appDirectory, env: args.env });
} catch (error) {
  log.error(error);
  process.exit(1);
}

