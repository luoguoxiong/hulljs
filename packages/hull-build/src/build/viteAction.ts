import { build, createServer } from 'vite';
import { choosePort, log, startStaticServer } from '@hulljs/utils';
import { RunBuildOpts, ViteConfig } from '../types';
export const startDevServer = async(viteConfig: ViteConfig, buildOpts: RunBuildOpts) => {
  const server = await createServer(viteConfig);
  await server.listen();
};


export const startBuildPro = async(viteConfig: ViteConfig, buildOpts: RunBuildOpts) => {
  await build(viteConfig);
};


export const startProServer = async(viteConfig: ViteConfig, buildOpts: RunBuildOpts) => {
  await startBuildPro(viteConfig, buildOpts);

  startStaticServer({
    assetsRoot: buildOpts.outputPath,
    port: buildOpts.port,
    isUseGzip: true,
    maxAge: 24 * 60 * 60 * 1000 * 360,
  });
};
