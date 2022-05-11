interface IGetBabelConfigOpts {
    target: 'browser' | 'node';
    type?: 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
    isTypeScript?: boolean;
    runtimeHelpers?: boolean;
    filePath?: string;
    browserFiles?: {
        [value: string]: any;
    };
    nodeVersion?: number;
    nodeFiles?: {
        [value: string]: any;
    };
    lazy?: boolean;
    lessInBabelMode?: boolean | {
        paths?: any[];
        plugins?: any[];
    };
}
interface PersentRe {
    presets: any[];
    plugins: any[];
}
declare const _default: (_context: any, options: IGetBabelConfigOpts) => PersentRe;
export default _default;
