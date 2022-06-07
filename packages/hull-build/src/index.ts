import build from './build';
import { IBuildOptions, BuildConfig } from './types';

export { BuildConfig, IBuildOptions };

export { build };

export type CliIn = {vite: boolean} & IBuildOptions

