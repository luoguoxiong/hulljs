"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPath = void 0;
const url_1 = require("url");
const path_1 = require("path");
const getPath = (pathStr) => {
    const filename = (0, url_1.fileURLToPath)(pathStr);
    return {
        filename,
        dirname: (0, path_1.dirname)(filename),
    };
};
exports.getPath = getPath;
//# sourceMappingURL=path.js.map