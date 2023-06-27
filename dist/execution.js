"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Start = exports.Late = exports.Safe = void 0;
const blocked_1 = __importDefault(require("blocked"));
const utils_1 = require("./utils");
/** Executes callback in safe-mode */
const Safe = (cb) => {
    try {
        if (cb.constructor.name === "AsyncFunction") {
            cb().then(e => { }).catch(err => utils_1.log.error(`Safe Mode: ${err.message}`));
            return false;
        }
        else {
            cb();
            return true;
        }
    }
    catch (err) {
        utils_1.log.error(`Safe Mode: ${err.message}`);
        return false;
    }
};
exports.Safe = Safe;
/** Executes callback in safe-mode after Immediate call */
const Late = (cb) => {
    (0, utils_1.Exec)(() => {
        try {
            if (cb.constructor.name === "AsyncFunction") {
                cb().then(e => { }).catch(err => utils_1.log.error(`Safe Mode (Late): ${err.message}`));
                return false;
            }
            else {
                cb();
                return true;
            }
        }
        catch (err) {
            utils_1.log.error(`Safe Mode (Late): ${err.message}`);
            return false;
        }
    });
};
exports.Late = Late;
/** Process health management */
const Start = ({ onStart, onError, onExit }) => {
    if (!utils_1.isNode)
        return null;
    const store = {};
    try {
        /** Check event loop health **/
        (0, blocked_1.default)((ms) => { if (ms > 99) {
            onError(store, `Event-Loop is blocked for ${ms}.ms`);
        } }, { threshold: 10, interval: 100 });
        //so the program will not close instantly
        process.stdin.resume();
        const exitHandler = (options, exitCode) => {
            if (options.cleanup)
                onExit(store, exitCode ?? 0);
            if (exitCode || exitCode === 0)
                utils_1.log.warn(`Process [${process.pid}]: Exit code is ${exitCode}`);
            if (options.exit) {
                if (typeof onExit === 'undefined') {
                    process.exit();
                }
                else {
                    onExit(store, exitCode ?? 0);
                }
            }
        };
        /** Fatal error handler **/
        process.on('uncaughtException', (err) => onError(store, `Uncaught Exception: ${err.message}`));
        process.on('unhandledRejection', (err) => onError(store, `Unhandled Rejection: ${err.message}`));
        // do something when app is closing
        process.on('exit', exitHandler.bind(null, { cleanup: true }));
        // catches ctrl+c event
        process.on('SIGINT', exitHandler.bind(null, { exit: true }));
        // catches "kill pid" (for example: nodemon restart)
        process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
        process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
        /** Try start **/
        onStart(store);
    }
    catch (err) {
        onError(store, `While starting the process: ${err.message}`);
    }
};
exports.Start = Start;
