
import Koa from 'koa';
import koaStatic from 'koa-static';
import history from 'koa2-connect-history-api-fallback';
import { log } from './log';

interface InStartStaticServer{
    port:number|string;
    assetsRoot:string;
    maxAge:number;
    isUseGzip:boolean;
}

export const startStaticServer = (opts:InStartStaticServer) => {
  const app = new Koa();
  app.use(
    history({
      disableDotRule: true,
      verbose: true,
      logger: () => null,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    })
  );
  app.use(
    koaStatic(opts.assetsRoot, {
      maxage: opts.maxAge,
      gzip: opts.isUseGzip,
      extensions: ['html'],
    })
  );
  app.listen(opts.port, () => {
    log.success(`server is running at http://localhost:${opts.port}`);
  });
};
