"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const build_1 = __importDefault(require("./build"));
const utils_1 = require("./utils");
const args = (0, yargs_parser_1.default)(process.argv.slice(2));
try {
    const env = (args.env || '').includes('prod') ? 'production' : 'development';
    (0, build_1.default)({ cwd: process.cwd(), env, watch: args.w });
}
catch (error) {
    utils_1.log.error(error);
    process.exit(1);
}
//# sourceMappingURL=index.js.map