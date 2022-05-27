import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackPluginInstance, RuleSetRule } from 'webpack';
import { UserConfig, BuildOptions } from 'vite';

type ViteExtraBuildOptions = Omit<BuildOptions, 'outDir' | 'assetsInlineLimit' | 'sourcemap' | 'assetsDir'>;

export type ENV = 'development' | 'production' | string

export type ProjectType = 'react' | 'vue3' | 'node';

export type RunBuildOpts = IBuildOptions & BuildConfig

export interface DevServer{
  port: number;
  https: boolean;
}

/** 构建参数配置 */
export interface IBuildOptions{
  /** 工作目录 */
  appDirectory: string;
  /** 环境变量 */
  env: ENV;
  /** port 服务端口号 */
  port?: number | string | any;
  /** 是否使用BundleAnalyzer打包分析器 */
  analyzer?: boolean;
}

/** 自定义Webpack配置 */
export interface BuildConfig {
  /** 构建工具 */
  buildTool?: 'webpack'|'vite';
  /** vite其他构建参数 */
  viteExtraBuildOptions?: ViteExtraBuildOptions;
  /** 项目类型 react、vue3 */
  projectType: ProjectType;
  /** entry */
  entry: string;
  /** output.path */
  outputPath: string;
  /** output.publicPath */
  outputPublicPath: string;
  /** resolve.alias */
  resolveAlias?: Record<string, string>;
  /** 是否使用SourceMap */
  shouldUseSourceMap?: boolean;
  /** 额外的babel pugin */
  extraBabelPlugins?: any[];
  /** 额外的babel Presets */
  extraBabelPresets?: any[];
  /** fileSizeLimit 静态资源压缩为base64的大小限制 */
  fileSizeLimit?: number;
  /** htmlPluginConfig HtmlWebpackPlugin配置参数 */
  htmlPluginConfig?: HtmlWebpackPlugin.Options;
  /** webpackDefinePluginOptions */
  definePluginOptions?: Record<string, any>;
  /** 是否使用BundleAnalyzer打包分析器 */
  isUseBundleAnalyzer?: boolean;
  /** WebpackDevServer 配置 */
  devServer?: DevServer;
  /** extraWebpackPlugins */
  extraWebpackPlugins?: WebpackPluginInstance[];
  /** extraModuleRules */
  extraModuleRules?: RuleSetRule[];
  /** splitChunks */
  splitChunks?: any;
  sassLoaderOptions?: any;
  lessLoaderOptions?: any;
  proxy?: Record<string, any>;
}

export type IngetUserConfigRe = Promise<(env: ENV) => BuildConfig | BuildConfig>

export type ViteConfig = UserConfig

