import {} from 'path'

function resolveTsOrJsConfigPathsToAlias({
//   tsconfigPath = './tsconfig.json',
//   webpackConfigBasePath = __dirname,
// } = {}) {
//   const { paths } = require(tsconfigPath).compilerOptions;

//   const aliases = {};

//   Object.keys(paths).forEach((item) => {
//     const key = item.replace('/*', '');
//     const value = resolve(webpackConfigBasePath, paths[item][0].replace('/*', '').replace('*', ''));

//     aliases[key] = value;
//   });

//   return aliases;
// }

module.exports = resolveTsconfigPathsToAlias;
