export type ENV = 'development' | 'production' | 'dev' | 'prod'

/** webpack构建配置 */
export interface IBundleOptions{
    /** devServer 端口 */
    port?:number;
}

/** 构建参数配置 */
export interface IBuildOptions{
    /** 工作目录 */
    cwd:string;
    /** 监听更新 */
    watch?:boolean;
    /** 环境变量 */
    env?:ENV;
    /** 构建配置 */
    buildArgs?:IBundleOptions;
}
