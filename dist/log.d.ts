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
//# sourceMappingURL=log.d.ts.map