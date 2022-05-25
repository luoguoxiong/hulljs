
export const createConfig = <T>() => {
  let config: T;
  return {
    getConfig: (): T => {
      if(config) return config;
      throw Error('please setConfig first!');
    },
    setConfig: (_config: T) => {
      config = _config;
    },
  };
};
