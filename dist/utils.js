"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeENV = exports.encodeENV = exports.SyncWait = exports.AsyncWait = exports.Sec = exports.Rnd = exports.Sfy = exports.Jfy = exports.Now = exports.Uid = exports.Delay = exports.Loop = exports.Exec = exports.moment = exports.lodash = exports.dateFormat = exports.isDev = exports.isProd = exports.env = exports.isNode = void 0;
const uuid_1 = require("uuid");
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
exports.isNode = typeof process === 'object';
exports.env = exports.isNode ? process.env || {} : {};
exports.isProd = exports.env.NODE_ENV === 'production';
exports.isDev = exports.env.NODE_ENV === 'development';
exports.dateFormat = "YYYY-MM-DD HH:mm:ss.SSS";
exports.lodash = lodash_1.default;
exports.moment = moment_1.default;
exports.Exec = setImmediate;
exports.Loop = setInterval;
exports.Delay = setTimeout;
const Uid = () => (0, uuid_1.v4)();
exports.Uid = Uid;
/**
 * @returns "YYYY-MM-DD HH:mm:ss.SSS"
 */
const Now = () => (0, exports.moment)().format(exports.dateFormat);
exports.Now = Now;
/**
 * Parses String -> JSON
 * @param e
 * @returns JSON
 */
const Jfy = (e) => typeof e === 'string' ? JSON.parse(e) : e;
exports.Jfy = Jfy;
/**
 * Parses JSON -> String
 * @param e
 * @returns String
 */
const Sfy = (e) => typeof e === 'string' ? e : JSON.stringify(e);
exports.Sfy = Sfy;
/**
 * Generates random numbers between 0 -> 100
 * Could possibly be Int or Float
 * @returns Number
 */
const Rnd = () => Math.ceil(Math.random() * 10);
exports.Rnd = Rnd;
/**
 * Useful for computing time complexity
 * Example: ???
 * @param hrtime
 * @returns
 */
const Sec = (hrtime) => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
exports.Sec = Sec;
/**
 * Waits Asynchronously [ Doesn't block Event-Loop ]
 * @param ms
 * @returns true<Boolean>
 */
const AsyncWait = (ms) => new Promise((res) => (0, exports.Delay)(() => res(true), ms));
exports.AsyncWait = AsyncWait;
/**
 * Waits Synchronously [ Blocks the Event-Loop ]
 * @param ms
 */
const SyncWait = (ms) => {
    let start = Date.now(), now = start;
    while (now - start < ms) {
        now = Date.now();
    }
};
exports.SyncWait = SyncWait;
/**
 * Encodes ENV
 * @param _env
 * @param key
 * @returns
 */
const encodeENV = (_env = {}, key = 'u_') => {
    const encode = {};
    for (const x in _env)
        encode[`u_${x}`] = _env[x];
    return encode;
};
exports.encodeENV = encodeENV;
/**
 * Decodes ENV from Process.ENV
 * @param key Starts String
 * @returns
 */
const decodeENV = (key = 'u_') => {
    const decode = {};
    for (const x in exports.env)
        if (x.indexOf(key) === 0)
            decode[x.replace(key, '')] = exports.env[x]?.indexOf(',') !== -1 ? exports.env[x]?.split(',') : exports.env[x];
    return decode;
};
exports.decodeENV = decodeENV;
//# sourceMappingURL=utils.js.map