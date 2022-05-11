import chalk, { ChalkFunction }from 'chalk';

const curryLog = ( chalkInstans:ChalkFunction, logType?:string) => (msg:any) =>
  (logType ? console.log(chalkInstans(`${logType}: msg`)) : console.log(chalkInstans(msg)));

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
  const color = colors[index] as keyof ChalkFunction;
  index++;
  return chalk[color] as ChalkFunction;
};


export const log = {
  error: curryLog( chalk.red, 'error'),
  warn: curryLog( chalk.yellow, 'warn'),
  success: curryLog(chalk.green, 'success'),
  msg: curryLog(chalk.cyan),
  free: (msg:string):void => curryLog(getChalkInstance())(msg),
};

