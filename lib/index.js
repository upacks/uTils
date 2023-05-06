"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Start = exports.Late = exports.Safe = exports.Delay = exports.Loop = exports.Exec = exports.Lag = exports.Rnd = exports.Uid = exports.Sec = exports.Now = exports.Sfy = exports.Jfy = exports.log = exports.lodash = exports.dateFormat = exports.isDev = exports.isProd = exports.env = exports.isNode = void 0;
const moment_1 = __importDefault(require("moment"));
const blocked_1 = __importDefault(require("blocked"));
const lodash_1 = __importDefault(require("lodash"));
const uuid_1 = require("uuid");
const log_1 = require("./log");
exports.isNode = typeof process === 'object';
exports.env = exports.isNode ? process.env || {} : {};
exports.isProd = exports.env.NODE_ENV === 'production';
exports.isDev = exports.env.NODE_ENV === 'development';
exports.dateFormat = "YYYY-MM-DD HH:mm:ss.SSS";
exports.lodash = lodash_1.default;
exports.log = log_1.log;
const Jfy = (e) => typeof e === 'string' ? JSON.parse(e) : e;
exports.Jfy = Jfy;
const Sfy = (e) => typeof e === 'string' ? e : JSON.stringify(e);
exports.Sfy = Sfy;
const Now = () => (0, moment_1.default)().format(exports.dateFormat);
exports.Now = Now;
const Sec = (hrtime) => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
exports.Sec = Sec;
const Uid = () => (0, uuid_1.v4)();
exports.Uid = Uid;
const Rnd = () => Math.ceil(Math.random() * 10);
exports.Rnd = Rnd;
const Lag = (ms) => new Promise((res) => (0, exports.Delay)(() => res(ms), ms));
exports.Lag = Lag;
exports.Exec = setImmediate;
exports.Loop = setInterval;
exports.Delay = setTimeout;
try {
    const ___ = require('./log');
}
catch (err) {
    exports.log.error(`Require doesn't support!`);
}
/** Executes callback in safe-mode */
const Safe = () => {
    return (cb) => {
        try {
            if (cb.constructor.name === "AsyncFunction") {
                cb().then(e => { }).catch(err => exports.log.error(`Safe Mode: ${err.message}`));
                return false;
            }
            else {
                cb();
                return true;
            }
        }
        catch (err) {
            exports.log.error(`Safe Mode: ${err.message}`);
            return false;
        }
    };
};
exports.Safe = Safe;
/** Executes callback in safe-mode after Immediate call */
const Late = () => {
    return (cb) => {
        (0, exports.Exec)(() => {
            try {
                if (cb.constructor.name === "AsyncFunction") {
                    cb().then(e => { }).catch(err => exports.log.error(`Safe Mode (Late): ${err.message}`));
                    return false;
                }
                else {
                    cb();
                    return true;
                }
            }
            catch (err) {
                exports.log.error(`Safe Mode (Late): ${err.message}`);
                return false;
            }
        });
    };
};
exports.Late = Late;
/** Process health management */
const Start = ({ onSuccess, onError }) => {
    if (!exports.isNode)
        return null;
    const store = {};
    try {
        /** Check event loop health **/
        (0, blocked_1.default)((ms) => {
            exports.log.warn(`Event-Loop is blocked for ${ms}.ms`);
            if (ms > 99) {
                onError(`Event loop is blocked!`);
            }
        }, { threshold: 10, interval: 100 });
        /** Fatal error handler **/
        process.on('uncaughtException', (err) => onError(`Uncaught Exception: ${err.message}`));
        process.on('unhandledRejection', (err) => onError(`Unhandled Rejection: ${err.message}`));
        /** Try start **/
        onSuccess(store);
    }
    catch (err) {
        onError(`While starting the process: ${err.message}`);
    }
};
exports.Start = Start;
