"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Since = exports.Collect = exports.Queue = exports.Stress = void 0;
const utils_1 = require("./utils");
/** Collect and Calls back when size reaches **/
class Stress {
    queSize;
    queue = [];
    size = 0;
    callback;
    constructor(queueSize = 5) {
        this.queSize = queueSize;
    }
    add = (item) => {
        this.queue.push(item);
        if (++this.size === this.queSize) {
            this.callback(this.queue);
            this.size = 0;
            this.queue = [];
        }
    };
    on = (cb) => this.callback = cb;
}
exports.Stress = Stress;
/** Collects data and sends to callback one by one / this can overflow when callback fails continuously */
class Queue {
    size = 0;
    isFree = true;
    queue = [];
    add = (item) => {
        ++this.size;
        this.queue.push(item);
        if (this.queue.length > 999) {
            return 'This is dangerous!';
        }
    };
    call = (cb, ms) => (0, utils_1.Loop)(async () => {
        if (this.queue.length > 0 && this.isFree) {
            try {
                this.isFree = false;
                const sent = await cb(this.queue[0]);
                sent === true && this.queue.shift();
                (0, utils_1.Delay)(() => { this.isFree = true; }, ms);
            }
            catch (error) {
                (0, utils_1.Delay)(() => { this.isFree = true; }, ms);
            }
        }
    }, 100);
}
exports.Queue = Queue;
/** Collects data corresponding to time / calls back when size reaches or dispose due to timeout */
class Collect {
    size;
    store = {};
    callback;
    dispose;
    constructor(size = 4, timeout = 2500) {
        this.size = size;
        (0, utils_1.Loop)(() => {
            Object.keys(this.store).forEach(time => {
                if ((Date.now() - this.store[time]._sign) > timeout) {
                    this.dispose(this.store[time]);
                    delete this.store[time];
                }
            });
        }, timeout);
    }
    on = (cb, dispose) => {
        this.callback = cb;
        this.dispose = dispose;
    };
    add = (time, key, value) => {
        if (!this.store[time]) {
            this.store[time] = {
                _size: 0,
                _sign: Date.now(),
            };
        }
        this.store[time][key] = value;
        if (++this.store[time]._size === this.size) {
            this.callback(this.store[time]);
            delete this.store[time];
        }
    };
}
exports.Collect = Collect;
/** Triggers a call after N seconds **/
class Since {
    last = 0;
    cb = null;
    constructor(timeout = 5000) {
        (0, utils_1.Loop)(() => {
            if (this.last !== 0 && Date.now() - this.last > timeout && this.cb) {
                this.last = 0;
                this.cb();
            }
        }, 250);
    }
    add = () => { this.last = this.last === 0 ? Date.now() : this.last; };
    call = (cb) => { this.cb = cb; };
}
exports.Since = Since;
