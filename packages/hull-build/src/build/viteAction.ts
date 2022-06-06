import { build, createServer } from 'vite';
import { startStaticServer } from '@hulljs/utils';
import { log, choosePort } from '@hulljs/utils';
import { RequiredBuildOpts, ViteConfig } from '../types';
export const startDevServer = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  const port = await choosePort(buildOpts.devServer.port);
  const server = await createServer(viteConfig);
  await server.listen(port);
  log.success(`you service is running at http${buildOpts.devServer.https ? 's' : ''}://localhost:${port}`);
};


export const startBuildPro = async(viteConfig: ViteConfig) => {
  log.msg('vite building for production...');
  await build(viteConfig);
  log.success('vite build complete.\n');
};


export const startProServer = async(viteConfig: ViteConfig, buildOpts: RequiredBuildOpts) => {
  await startBuildPro(viteConfig);

  const port = await choosePort(buildOpts.devServer.port);
  startStaticServer({
    assetsRoot: buildOpts.outputPath,
    port,
    isUseGzip: true,
    maxAge: 24 * 60 * 60 * 1000 * 360,
  });
};
