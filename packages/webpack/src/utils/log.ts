import chalk, { ChalkInstance } from 'chalk';

const log = (chalkInstans:ChalkInstance) => (msg:string,) => console.log(chalkInstans(msg));

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

const getChalkInstance = ():ChalkInstance => {
  index = index % (colors.length - 1);
  const color = colors[index] as keyof ChalkInstance;
  index++;
  return chalk[color] as ChalkInstance;
};

export default {
  error: log(chalk.red),
  warn: log(chalk.yellow),
  success: log(chalk.green),
  msg: log(chalk.cyan),
  free: (msg:string):void => log(getChalkInstance())(msg),
};

