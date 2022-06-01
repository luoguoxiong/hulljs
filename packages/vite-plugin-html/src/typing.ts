import type { Options as MinifyOptions } from 'html-minifier-terser';

export type Entry = string | Record<string, string>

export type InjectOptions = Record<string, string>

export interface UserOptions {
  /**
   * @description Minimize options
   */
  minify?: MinifyOptions | boolean;

  /**
   * page entry
   */
  entry: string;

  /**
   * template path
   */
  template: string;

  /**
   * @description inject options
   */
  inject?: InjectOptions;

  /**
   * output warning log
   * @default false
   */
  verbose?: boolean;
}
