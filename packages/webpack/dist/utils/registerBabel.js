"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBabel = void 0;
const path_1 = require("path");
const getBabelConfig_1 = __importDefault(require("./getBabelConfig"));
const slash = (input) => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(input);
    if (isExtendedLengthPath) {
        return input;
    }
    return input.replace(/\\/g, '/');
};
const registerBabel = function (opts) {
    const { cwd, only } = opts;
    const { opts: babelConfig } = (0, getBabelConfig_1.default)({
        target: 'node',
        typescript: true,
    });
    require('@babel/register')({
        ...babelConfig,
        extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
        only: only.map((file) => slash((0, path_1.join)(cwd, file))),
        babelrc: false,
        cache: false,
    });
};
exports.registerBabel = registerBabel;
//# sourceMappingURL=registerBabel.js.map