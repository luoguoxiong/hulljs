import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import { WebpackPluginInstance, RuleSetRule } from 'webpack';
export type ENV = 'development' | 'production' | string

export type ProjectType = 'react' | 'vue' | false;

export type RunBuildOpts = IBuildOptions & SelfWebpackConfig


/** 构建参数配置 */
export interface IBuildOptions{
    /** 工作目录 */
    appDirectory:string;
    /** 环境变量 */
    env:ENV;
    /** port 服务端口号 */
    port?:number | string | any;
    /** 是否使用BundleAnalyzer打包分析器 */
    analyzer?:boolean;
}

/** 自定义Webpack配置 */
export interface SelfWebpackConfig {
    /** 项目类型 react、vue */
    projectType:ProjectType;
    /** entry */
    entry:any;
    /** output.path */
    outputPath:string;
    /** output.publicPath */
    outputPublicPath:string;
    /** resolve.modules */
    // resolveModules?:string[];
    /** resolve.extensions */
    // resolveExtensions?:string[];
    /** resolve.alias */
    resolveAlias?:Record<string, string>;
    /** 是否使用SourceMap */
    shouldUseSourceMap?:boolean;
    /** 额外的babel pugin */
    extraBabelPlugins?:any[];
    /** fileSizeLimit 静态资源压缩为base64的大小限制*/
    fileSizeLimit?:number;
    /** htmlPluginConfig HtmlWebpackPlugin配置参数*/
    htmlPluginConfig?:HtmlWebpackPlugin.Options;
    /** webpackDefinePluginOptions */
    definePluginOptions?:Record<string, any>;
    /** 是否使用BundleAnalyzer打包分析器 */
    isUseBundleAnalyzer?:boolean;
    /** WebpackDevServer 配置 */
    devServer?:WebpackDevServer.Configuration;
    /** extraWebpackPlugins */
    extraWebpackPlugins?:WebpackPluginInstance[];
    /** extraModuleRules */
    extraModuleRules?:RuleSetRule[];
}

export type IngetUserConfigRe = Promise<(env:ENV) => SelfWebpackConfig | SelfWebpackConfig>

