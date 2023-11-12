/// <reference types="node" />
import momenti from 'moment';
export declare const isNode: boolean;
export declare const dateFormat: string;
export declare const moment: typeof momenti;
export declare const Loop: typeof setInterval;
export declare const Delay: typeof setTimeout;
export declare const Exec: (cb: any) => NodeJS.Timeout;
export declare const Uid: () => string;
export declare const Win: Window | any;
export declare const Doc: Document | any;
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
 * Sync LocalStorage
 * @param key
 * @param value
 * @returns
 */
export declare const KeyValue: (key: string, value: any) => string;
//# sourceMappingURL=utils.d.ts.map