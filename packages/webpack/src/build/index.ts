
import webpack from 'webpack';
import { IBuildOptions, SelfWebpackConfig } from '../types';
import { getUserConfig } from '../utils';
import { getWebpackConfig } from './getWebpackConfig';

const build = async(opts:IBuildOptions) => {
  const { appDirectory } = opts;
  const config = await getUserConfig(appDirectory);
  console.log('opts', config);

  if(typeof config === 'function'){
    const resConf = config(true, {}) as SelfWebpackConfig;
    opts.buildArgs = resConf;
  }

  const webpackConf = getWebpackConfig(opts);

  webpack(webpackConf, (err, stats) => {
    if (err) {
      console.log(err);
    };
    // process.stdout.write(
    //   `${stats ? stats.toString({
    //     colors: true,
    //     modules: false,
    //     children: true,
    //     chunks: false,
    //     chunkModules: false,
    //   }) : '' }\n\n`
    // );
  });
};

export default build;
