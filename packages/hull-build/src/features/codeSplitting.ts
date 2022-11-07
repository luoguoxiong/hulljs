const createGranlarChunks = (library: Record<string, Array<string>>) => {
  const cacheGroups: Record<string, any> = {};
  for(const libraryName in library){
    const packages = library[libraryName];
    cacheGroups[libraryName] = {
      name: libraryName,
      chunks: 'all',
      test: new RegExp(
        `[\\\\/]node_modules[\\\\/](${packages.join(
          '|',
        )})[\\\\/]`,
      ),
      priority: 40,
      enforce: true,
    };
  }
  return {
    default: false,
    defaultVendors: false,
    ...cacheGroups,
  };
};

export { createGranlarChunks };
