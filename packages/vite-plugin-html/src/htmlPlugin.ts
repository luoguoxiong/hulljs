import type { ResolvedConfig, PluginOption } from 'vite';
import { render } from 'ejs';
import { normalizePath } from 'vite';
import { parse } from 'node-html-parser';
import fs from 'fs-extra';
import path from 'pathe';
import history from 'connect-history-api-fallback';
import type { InjectOptions, UserOptions } from './typing';


const bodyInjectRE = /<\/body>/;

export function createPlugin(userOptions: UserOptions): PluginOption {
  const {
    entry,
    template,
  } = userOptions;

  let viteConfig: ResolvedConfig;

  let isInRoot = false;

  try {
    return {
      name: 'vite:vite-plugin-html',
      enforce: 'pre',
      configResolved(resolvedConfig) {
        viteConfig = resolvedConfig;
        isInRoot = fs.existsSync(path.join(resolvedConfig.root, 'index.html'));
        if(!isInRoot && viteConfig.command === 'build' ){
          fs.copyFile(template, path.join(resolvedConfig.root, 'index.html'));
        }
      },

      configureServer(server) {
        server.middlewares.use(
          history({
            index: `/${path.relative(viteConfig.root, template)}`,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          }) as any,
        );
      },

      transformIndexHtml: {
        enforce: 'pre',
        async transform(html) {
          const injectOptions = userOptions.inject || {};
          const _html = await renderHtml(html, {
            injectOptions,
            viteConfig,
            entry,
          });

          return {
            html: _html,
            tags: [],
          };
        },
      },

      async closeBundle(){
        if(!isInRoot){
          fs.removeSync(path.join(viteConfig.root, 'index.html'));
        }
      },
    };
  } catch (error: any) {
    throw Error(error);
  }
}

export async function renderHtml(
  html: string,
  config: {
    injectOptions: InjectOptions;
    viteConfig: ResolvedConfig;
    entry?: string;
  },
) {
  const { injectOptions, entry } = config;

  const ejsData: Record<string, any> = {
    htmlWebpackPlugin: {
      options: {
        ...injectOptions,
      },
    },
  };
  let result = await render(html, ejsData);

  if (entry) {
    result = removeEntryScript(result );
    result = result.replace(
      bodyInjectRE,
      `<script type="module" src="${normalizePath(
        `${entry}`,
      )}"></script>\n</body>`,
    );
  }
  return result;
}

export function removeEntryScript(html: string) {
  if (!html) {
    return html;
  }

  const root = parse(html);
  const scriptNodes = root.querySelectorAll('script[type=module]') || [];
  const removedNode: string[] = [];
  scriptNodes.forEach((item) => {
    removedNode.push(item.toString());
    item.parentNode.removeChild(item);
  });
  return root.toString();
}
