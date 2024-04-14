export declare const log: {
    req: (message: string) => boolean;
    res: (message: string) => boolean;
    success: (message: string) => boolean;
    info: (message: string) => boolean;
    warn: (message: string) => boolean;
    error: (message: string) => boolean;
};
/** To solve the log spam **/
export declare class Log {
    private kv;
    private alias;
    private delay;
    constructor(alias?: string, delay?: number);
    private can;
    success: (message: string, group?: string) => boolean;
    info: (message: string, group?: string) => boolean;
    req: (message: string, group?: string) => boolean;
    res: (message: string, group?: string) => boolean;
    warn: (message: string, group?: string) => boolean;
    error: (message: string, group?: string) => boolean;
}
type tUlog = 'req' | 'res' | 'info' | 'then' | 'catch';
type tDirection = 'cloud' | 'vehicle' | 'user' | 'db';
export declare const ushort: () => string;
export declare const ulog: (key: string, type: tUlog, message: string, from?: tDirection, to?: tDirection) => boolean;
export {};
//# sourceMappingURL=log.d.ts.map