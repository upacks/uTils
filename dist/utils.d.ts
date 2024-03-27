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
export declare const Exec: typeof setImmediate;
export declare const Loop: typeof setInterval;
export declare const Delay: typeof setTimeout;
export declare const Uid: () => string;
/**
 * @returns "YYYY-MM-DD HH:mm:ss.SSS"
 */
export declare const Now: () => string;
/**
 * Parses String -> JSON
 * @param e
 * @returns JSON
 */
export declare const Jfy: (e: any) => {};
/**
 * Parses JSON -> String
 * @param e
 * @returns String
 */
export declare const Sfy: (e: any) => string;
/**
 * Generates random numbers between 0 -> 100
 * Could possibly be Int or Float
 * @returns Number
 */
export declare const Rnd: () => number;
/**
 * Useful for computing time complexity
 * Example: ???
 * @param hrtime
 * @returns
 */
export declare const Sec: (hrtime: [number, number]) => string;
/**
 * Waits Asynchronously [ Doesn't block Event-Loop ]
 * @param ms
 * @returns true<Boolean>
 */
export declare const AsyncWait: (ms: number) => Promise<boolean>;
/**
 * Waits Synchronously [ Blocks the Event-Loop ]
 * @param ms
 */
export declare const SyncWait: (ms: number) => void;
/**
 * Encodes ENV
 * @param _env
 * @param key
 * @returns
 */
export declare const encodeENV: (_env?: any, key?: string) => any;
/**
 * Decodes ENV from Process.ENV
 * @param key Starts String
 * @returns
 */
export declare const decodeENV: (key?: string) => any;
/**
 * JWT to JSON only works on NodeJS
 * @param token
 * @returns
 */
export declare const parseJwt: (token: string) => any;
//# sourceMappingURL=utils.d.ts.map