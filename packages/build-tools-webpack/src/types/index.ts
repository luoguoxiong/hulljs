import HtmlWebpackPlugin from 'html-webpack-plugin';

export type ENV = 'development' | 'production' | string

export type ProjectType = 'react' | 'vue' | false;

/** webpack构建配置 */
export interface IBundleOptions{
    /** devServer 端口 */
    port?:number;
}

/** 构建参数配置 */
export interface IBuildOptions{
    /** 工作目录 */
    appDirectory:string;
    /** 环境变量 */
    env:ENV;
    /** 构建配置 */
    buildArgs?:SelfWebpackConfig;
}

/** 自定义Webpack配置 */
export interface SelfWebpackConfig {
    /** 环境变量 */
    env?:ENV;
    /** 项目类型 react、vue */
    projectType:ProjectType;
    /** entry */
    entry:any;
    /** output.path */
    outputPath:string;
    /** output.publicPath */
    outputPublicPath:string;
    /** resolve.modules */
    resolveModules?:string[];
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
}

export type IngetUserConfigRe = Promise<(env:ENV) => SelfWebpackConfig | SelfWebpackConfig>

