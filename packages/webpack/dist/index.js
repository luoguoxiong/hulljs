import path from 'path';
import webpack from 'webpack';
import ora from 'ora';
import { getPath } from './utils';
const spinner = ora('building for production...');
spinner.start();
const { dirname } = getPath(import.meta.url);
const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.join(dirname, './test/index.js'),
    output: {
        path: path.join(dirname, './test/output'),
        filename: '[name].js',
        publicPath: '',
    },
};
webpack(config, (err, stats) => {
    spinner.stop();
    if (err)
        throw err;
    process.stdout.write(`${stats ? stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: false,
        chunkModules: false,
    }) : ''}\n\n`);
});
//# sourceMappingURL=index.js.map