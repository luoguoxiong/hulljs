"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function transformImportLess2Css() {
    return {
        name: 'transform-import-less-to-css',
        visitor: {
            ImportDeclaration(path) {
                const re = /\.less$/;
                if (re.test(path.node.source.value)) {
                    path.node.source.value = path.node.source.value.replace(re, '.css');
                }
            },
        },
    };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.default = (_context, options) => {
    const { target, isTypeScript, type, runtimeHelpers, filePath, browserFiles, nodeFiles, nodeVersion, lazy, lessInBabelMode } = options;
    let isBrowser = target === 'browser';
    if (filePath) {
        if ((0, path_1.extname)(filePath) === '.tsx' || (0, path_1.extname)(filePath) === '.jsx') {
            isBrowser = true;
        }
        else {
            if (isBrowser) {
                if (nodeFiles && nodeFiles.includes(filePath))
                    isBrowser = false;
            }
            else {
                if (browserFiles && browserFiles.includes(filePath))
                    isBrowser = true;
            }
        }
    }
    const targets = isBrowser ? { browsers: ['last 2 versions', 'IE 10'] } : { node: nodeVersion || 6 };
    return {
        presets: [
            ...(isTypeScript ? [require.resolve('@babel/preset-typescript')] : []),
            [require.resolve('@babel/preset-env'), {
                    targets,
                    modules: type,
                }],
            ...(isBrowser ? [require.resolve('@babel/preset-react')] : []),
        ],
        plugins: [
            ...((type === 'cjs' && lazy && !isBrowser)
                ? [[require.resolve('@babel/plugin-transform-modules-commonjs'), {
                            lazy: true,
                        }]]
                : []),
            ...(lessInBabelMode ? [transformImportLess2Css] : []),
            require.resolve('babel-plugin-react-require'),
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-proposal-export-default-from'),
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            require.resolve('@babel/plugin-proposal-do-expressions'),
            require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
            require.resolve('@babel/plugin-proposal-optional-chaining'),
            [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
            [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
            ...(runtimeHelpers
                ? [[require.resolve('@babel/plugin-transform-runtime'), {
                            useESModules: isBrowser && type === false,
                            version: require('@babel/runtime/package.json').version,
                        }]]
                : []),
        ],
    };
};
//# sourceMappingURL=index.js.map