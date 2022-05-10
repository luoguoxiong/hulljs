"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserConfig = void 0;
const constants_1 = require("../constants");
const getExistFile_1 = require("./getExistFile");
const registerBabel_1 = require("./registerBabel");
const getUserConfig = (cwd) => {
    (0, registerBabel_1.registerBabel)({
        cwd,
        only: constants_1.CONFIG_FILES,
    });
    const filePath = (0, getExistFile_1.getExistFile)({ cwd, files: constants_1.CONFIG_FILES, returnRelative: false });
    console.log(require(filePath));
    return { port: 1 };
};
exports.getUserConfig = getUserConfig;
//# sourceMappingURL=getUserConfig.js.map