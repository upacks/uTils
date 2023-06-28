/// <reference types="node" />
/// <reference types="node" />
import lodashi from "lodash";
import momenti from 'moment';
export declare const isNode: boolean;
export declare const env: NodeJS.ProcessEnv;
export declare const isProd: boolean;
export declare const isDev: boolean;
export declare const dateFormat: string;
export declare const lodash: lodashi.LoDashStatic;
export declare const moment: typeof momenti;
export declare const Jfy: (e: any) => {};
export declare const Sfy: (e: any) => string;
export declare const Now: () => string;
export declare const Sec: (hrtime: [number, number]) => string;
export declare const Uid: () => string;
export declare const Rnd: () => number;
export declare const Lag: (ms: number) => Promise<number>;
export declare const Exec: typeof setImmediate;
export declare const Loop: typeof setInterval;
export declare const Delay: typeof setTimeout;
//# sourceMappingURL=utils.d.ts.map