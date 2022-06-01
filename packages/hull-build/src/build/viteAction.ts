import { build, createServer } from 'vite';
import { startStaticServer } from '@hulljs/utils';
import { RequiredBuildOpts, ViteConfig } from '../types';
export const startDevServer = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  const server = await createServer(viteConfig);
  await server.listen();
};


export const startBuildPro = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  await build(viteConfig);
};


export const startProServer = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  await startBuildPro(viteConfig, buildOpts);

  startStaticServer({
    assetsRoot: buildOpts.outputPath,
    port: buildOpts.port,
    isUseGzip: true,
    maxAge: 24 * 60 * 60 * 1000 * 360,
  });
};
