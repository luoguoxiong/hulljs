import type { PluginOption } from 'vite';
import consola from 'consola';
import type { UserOptions } from './typing';
import { createPlugin } from './htmlPlugin';
import { createMinifyHtmlPlugin } from './minifyHtml';

consola.wrapConsole();

export function createHtmlPlugin(
  userOptions: UserOptions,
): PluginOption[] {
  return [createPlugin(userOptions), createMinifyHtmlPlugin(userOptions)];
}
