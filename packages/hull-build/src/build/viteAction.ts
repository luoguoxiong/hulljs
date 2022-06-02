import { build, createServer } from 'vite';
import { startStaticServer } from '@hulljs/utils';
import { log } from '@hulljs/utils';
import { RequiredBuildOpts, ViteConfig } from '../types';
export const startDevServer = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  const server = await createServer(viteConfig);
  await server.listen();
  log.success(`you service is running at http://localhost:${buildOpts.devServer.port}`);
};


export const startBuildPro = async(viteConfig: ViteConfig) => {
  log.msg('vite building for production...');
  await build(viteConfig);
  log.success('vite build complete.\n');
};


export const startProServer = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  await startBuildPro(viteConfig);

  startStaticServer({
    assetsRoot: buildOpts.outputPath,
    port: buildOpts.port,
    isUseGzip: true,
    maxAge: 24 * 60 * 60 * 1000 * 360,
  });
};
