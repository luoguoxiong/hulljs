import type { ResolvedConfig, PluginOption } from 'vite';
import { render } from 'ejs';
import { normalizePath } from 'vite';
import { parse } from 'node-html-parser';
import fs from 'fs-extra';
import path from 'pathe';
import fg from 'fast-glob';
import consola from 'consola';
import { dim } from 'colorette';
import history from 'connect-history-api-fallback';
import type { InjectOptions, UserOptions } from './typing';

const DEFAULT_TEMPLATE = 'index.html';

const bodyInjectRE = /<\/body>/;

export function createPlugin(userOptions: UserOptions = {}): PluginOption {
  const {
    entry,
    template = DEFAULT_TEMPLATE,
    verbose = false,
  } = userOptions;

  let viteConfig: ResolvedConfig;

  return {
    name: 'vite:vite-plugin-html',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      const relativePathTemplate = path.relative(resolvedConfig.root, template);
      if(relativePathTemplate.startsWith('..')){
        throw (`[vite:vite-plugin-html]:template path "${template}" is out of ${resolvedConfig.root}.`);
      }
      viteConfig = resolvedConfig;
    },

    config() {
      const input = createInput(userOptions);
      if (input) {
        return {
          build: {
            rollupOptions: {
              input,
            },
          },
        };
      }
    },

    configureServer(server) {
      server.middlewares.use(
        history({
          index: `/${path.relative(viteConfig.root, template)}`,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        }) as any
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
          verbose,
        });
        const { tags = [] } = injectOptions;

        return {
          html: _html,
          tags: tags,
        };
      },
    },

    async closeBundle(){
      const cwd = path.resolve(viteConfig.root, viteConfig.build.outDir);
      const htmlFiles = await fg(
        [cwd].map((dir) => `${dir}/**/*.html`),
        { cwd: path.resolve(cwd), absolute: true },
      );
      await Promise.all(
        htmlFiles.map((file) => {
          fs.move(file, path.resolve(cwd, path.basename(file)), {
            overwrite: true,
          });
        }),
      );
    },
  };
}

export function createInput(
  { template = DEFAULT_TEMPLATE }: UserOptions,
) {
  const file = path.basename(template);
  const key = file.replace(/\.html/, '');
  return {
    [key]: template,
  };
}

export async function renderHtml(
  html: string,
  config: {
    injectOptions: InjectOptions;
    viteConfig: ResolvedConfig;
    entry?: string;
    verbose?: boolean;
  },
) {
  const { injectOptions, viteConfig, entry, verbose } = config;
  const { data, ejsOptions } = injectOptions;

  const ejsData: Record<string, any> = {
    ...(viteConfig?.define ?? {}),
    ...data,
  };
  let result = await render(html, ejsData, ejsOptions);

  if (entry) {
    result = removeEntryScript(result, verbose);
    result = result.replace(
      bodyInjectRE,
      `<script type="module" src="${normalizePath(
        `${entry}`,
      )}"></script>\n</body>`,
    );
  }
  return result;
}

export function removeEntryScript(html: string, verbose = false) {
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
  verbose &&
    removedNode.length &&
    consola.warn(`vite-plugin-html: Since you have already configured entry, ${dim(
      removedNode.toString(),
    )} is deleted. You may also delete it from the index.html.
        `);
  return root.toString();
}
