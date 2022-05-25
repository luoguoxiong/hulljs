import detect from 'detect-port-alt';
import { log } from './log';

export const checkPort = async(defaultPort: number) => {
  const port = await detect(defaultPort);
  if(port !== defaultPort){
    log.error(`port: ${defaultPort} is running!`);
    return false;
  }
  return true;
};

export const choosePort = async(defaultPort: number) => {
  const port = await detect(defaultPort);
  if(port !== defaultPort){
    log.warn(`port: ${defaultPort} is running! ${port} instead!`);
  }
  return port;
};
