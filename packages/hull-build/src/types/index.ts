import { WebpackPluginInstance, RuleSetRule } from 'webpack';
import { UserConfig, BuildOptions, PluginOption } from 'vite';

type ViteExtraBuildOptions = Omit<BuildOptions, 'outDir' | 'assetsInlineLimit' | 'sourcemap' | 'assetsDir'>;

export type ENV = 'development' | 'production' | string

export type ProjectType = 'react' | 'vue3';

export type RunBuildOpts = IBuildOptions & BuildConfig

export type RequiredBuildOpts = Required<RunBuildOpts>

export interface DevServer{
  port: number;
  https?: boolean;
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
  /** 是否是生产环境 */
  isProd?: boolean;
  /** 构建工具 */
  buildTool?: 'webpack'|'vite';
}

/** 自定义Webpack配置 */
export interface BuildConfig {
  /** 构建工具 */
  buildTool?: 'webpack'|'vite';
  /** 项目类型 react、vue3 */
  projectType: ProjectType;
  /** entry */
  entry: string;
  /** output.path */
  outputPath?: string;
  /** output.publicPath */
  outputPublicPath?: string;
  /** resolve.alias */
  resolveAlias?: Record<string, string>;
  /** 是否使用SourceMap */
  shouldUseSourceMap?: boolean;
  /** 额外的babel Presets */
  extraBabelPresets?: any[];
  /** fileSizeLimit 静态资源压缩为base64的大小限制 */
  fileSizeLimit?: number;
  /** html模板配置 */
  htmlPluginOpts?: {
    /** html模板路径 */
    template: string;
    /** html 模板插入数据 */
    inject?: Record<string, string>;
  };
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
  /** splitChunksLibary 对node_modules分包 */
  splitChunksLibary?: Record<string, Array<string>>;
  sassLoaderOptions?: any;
  lessLoaderOptions?: any;
  proxy?: Record<string, any>;
  /** 额外的babel pugin */
  extraBabelPlugins?: any[];
  /** vite其他构建参数 */
  viteExtraBuildOptions?: ViteExtraBuildOptions;
  /** vite其他插件 */
  viteExtraPlugins?: PluginOption;
}

export type IngetUserConfigRe = Promise<(env: ENV) => BuildConfig | BuildConfig>

export type ViteConfig = UserConfig

