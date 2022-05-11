"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBabel = void 0;
const path_1 = require("path");
const slash = (input) => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(input);
    if (isExtendedLengthPath) {
        return input;
    }
    return input.replace(/\\/g, '/');
};
const registerBabel = function (opts) {
    const { cwd, only } = opts;
    require('@babel/register')({
        presets: [
            [require.resolve('babel-preset-common'), {
                    target: 'node',
                    typescript: true,
                }],
        ],
        extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
        only: only.map((file) => slash((0, path_1.join)(cwd, file))),
        babelrc: false,
        cache: false,
    });
};
exports.registerBabel = registerBabel;
//# sourceMappingURL=registerBabel.js.map