import yParser from 'yargs-parser';
import { ENV } from './types';
import build from './build';
import { log } from './utils';
// builder --p 80 --env development -w ===> { _: [], p: 80, env: development, w: true }
interface Args {
    p?:number;
    env?:ENV;
    w?:boolean;
}
const args = yParser(process.argv.slice(2)) as Args;

try {
  const env = (args.env || '').includes('prod') ? 'production' : 'development';
  build({ cwd: process.cwd(), env, watch: args.w });
} catch (error) {
  log.error(error);
  process.exit(1);
}

