"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const build = (opts) => {
    const { cwd } = opts;
    (0, utils_1.getUserConfig)(cwd);
    console.log(opts);
};
exports.default = build;
//# sourceMappingURL=build.js.map