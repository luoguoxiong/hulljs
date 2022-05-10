import chalk from 'chalk';
const log = (chalkInstans) => (msg) => console.log(chalkInstans(msg));
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
    return chalk[color];
};
export default {
    error: log(chalk.red),
    warn: log(chalk.yellow),
    success: log(chalk.green),
    msg: log(chalk.cyan),
    free: (msg) => log(getChalkInstance())(msg),
};
//# sourceMappingURL=log.js.map