export type ENV = 'development' | 'production' | string

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
    env?:ENV;
    /** 构建配置 */
    buildArgs?:SelfWebpackConfig;
}

/** 自定义Webpack配置 */
export interface SelfWebpackConfig {
    /** 环境变量 */
    env?:ENV;
    /** output.path */
    outputPath:string;
    /** output.publicPath */
    outputPublicPath:string;
    /** resolve.modules */
    resolveModules?:string[];
    /** resolve.extensions */
    resolveExtensions?:string[];
    /** resolve.alias */
    resolveAlias?:Record<string, string>;
    /** 是否使用SourceMap */
    shouldUseSourceMap?:boolean;
}
