/// <reference types="node" />
/** Collect and Calls back when size reaches **/
export declare class Stress {
    queSize: any;
    queue: any;
    size: number;
    callback: any;
    constructor(queueSize?: number);
    add: (item: any) => void;
    on: (cb: any) => any;
}
/** Collects data and sends to callback one by one / this can overflow when callback fails continuously */
export declare class Queue {
    size: number;
    isFree: boolean;
    queue: any;
    add: (item: any) => string;
    call: (cb: any, ms: any) => NodeJS.Timer;
}
/** Collects data corresponding to time / calls back when size reaches or dispose due to timeout */
export declare class Collect {
    size: any;
    store: {};
    callback: any;
    dispose: any;
    constructor(size?: number, timeout?: number);
    on: (cb: any, dispose: any) => void;
    add: (time: any, key: any, value: any) => void;
}
/** Triggers a call after N seconds **/
export declare class Since {
    last: number;
    cb: any;
    constructor(timeout?: number);
    add: () => void;
    call: (cb: any) => void;
}
//# sourceMappingURL=collectors.d.ts.map