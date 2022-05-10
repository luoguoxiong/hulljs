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
function default_1(opts) {
    const { target, typescript, runtimeHelpers, filePath, browserFiles, nodeFiles, nodeVersion, lazy, lessInBabelMode } = opts;
    let isBrowser = target === 'browser';
    // rollup 场景下不会传入 filePath
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
        opts: {
            presets: [
                ...(typescript ? [require.resolve('@babel/preset-typescript')] : []),
                [require.resolve('@babel/preset-env'), {
                        targets,
                        modules: 'auto',
                    }],
                ...(isBrowser ? [require.resolve('@babel/preset-react')] : []),
            ],
            plugins: [
                ...((lazy && !isBrowser)
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
                                useESModules: isBrowser,
                                version: require('@babel/runtime/package.json').version,
                            }]]
                    : []),
                ...(process.env.COVERAGE
                    ? [require.resolve('babel-plugin-istanbul')]
                    : []),
            ],
        },
        isBrowser,
    };
}
exports.default = default_1;
//# sourceMappingURL=getBabelConfig.js.map