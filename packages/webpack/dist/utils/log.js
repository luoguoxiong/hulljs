"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const curryLog = (chalkInstans, logType) => (msg) => (logType ? console.log(`${logType}:`, chalkInstans(msg)) : console.log(chalkInstans(msg)));
const colors = [
    'blue',
    'magenta',
    'gray',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
];
let index = 0;
const getChalkInstance = () => {
    index = index % (colors.length - 1);
    const color = colors[index];
    index++;
    return chalk_1.default[color];
};
exports.log = {
    error: curryLog(chalk_1.default.red, 'error'),
    warn: curryLog(chalk_1.default.yellow, 'warn'),
    success: curryLog(chalk_1.default.green, 'success'),
    msg: curryLog(chalk_1.default.cyan),
    free: (msg) => curryLog(getChalkInstance())(msg),
};
//# sourceMappingURL=log.js.map