import detect from 'detect-port-alt';
import { log } from './log';

export const choosePort = async(defaultPort:number) => {
  const port = await detect(defaultPort);
  if(port !== defaultPort){
    log.warn(`port: ${defaultPort} is running! ${port} instead!`);
  }
  return port;
};
