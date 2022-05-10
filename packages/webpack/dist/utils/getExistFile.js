"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExistFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function getExistFile({ cwd, files = [], returnRelative = false }) {
    for (const file of files) {
        const absFilePath = (0, path_1.join)(cwd, file);
        if ((0, fs_1.existsSync)(absFilePath)) {
            return returnRelative ? file : absFilePath;
        }
    }
    return '';
}
exports.getExistFile = getExistFile;
//# sourceMappingURL=getExistFile.js.map