"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Start = exports.Run = exports.Late = exports.Safe = void 0;
const blocked_1 = __importDefault(require("blocked"));
const utils_1 = require("./utils");
const log_1 = require("./log");
/** Executes callback in safe-mode */
const Safe = (cb, alias = '[*]') => {
    try {
        if (cb.constructor.name === "AsyncFunction") {
            cb().then(e => { }).catch(err => log_1.log.error(`Safe Mode ${alias}: ${err.message}`));
            return false;
        }
        else {
            cb();
            return true;
        }
    }
    catch (err) {
        log_1.log.error(`Safe Mode ${alias}: ${err.message}`);
        return false;
    }
};
exports.Safe = Safe;
/** Executes callback in safe-mode after Immediate call */
const Late = (cb) => {
    (0, utils_1.Exec)(() => {
        try {
            if (cb.constructor.name === "AsyncFunction") {
                cb().then(e => { }).catch(err => log_1.log.error(`Safe Mode (Late): ${err.message}`));
                return false;
            }
            else {
                cb();
                return true;
            }
        }
        catch (err) {
            log_1.log.error(`Safe Mode (Late): ${err.message}`);
            return false;
        }
    });
};
exports.Late = Late;
const Run = ({ onStart, onError, onExit }) => {
    const alias = `PID_${process.pid}`;
    const store = {};
    let isExitCalled = false;
    try {
        /** 1. Event loop health **/
        (0, blocked_1.default)((ms) => { onError(store, `Event-Loop is blocked for ${ms}.ms`); }, { threshold: 99, interval: 100 });
        /** 2. Exit handler **/
        process.stdin.resume();
        const exitHandler = (options, exitCode) => {
            if (!isExitCalled) {
                console.log('');
                isExitCalled = true;
            }
            if (options.cleanup && typeof onExit !== 'undefined') {
                log_1.log.warn(`${alias}: Cleaning up before process exits`) && onExit(store, exitCode);
            }
            if (exitCode) {
                log_1.log.warn(`${alias}: About to exit with "${exitCode}"`);
            }
            if (exitCode === 0) {
                log_1.log.warn(`${alias}: Bye"\n`);
            }
            if (options.exit) {
                process.exit(0);
            }
        };
        process.on('uncaughtException', (err) => onError(store, `${alias}: Uncaught Exception / ${err.message}`));
        process.on('unhandledRejection', (err) => onError(store, `${alias}: Unhandled Rejection / ${err.message}`));
        process.on('SIGTERM', exitHandler.bind(null, { exit: true }));
        process.on('SIGINT', exitHandler.bind(null, { exit: true }));
        process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
        process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
        process.on('exit', exitHandler.bind(null, { cleanup: true }));
        /** 3. Execute onStart **/
        onStart(store);
    }
    catch (err) {
        onError(store, `${alias}: ${err.message}`);
    }
};
exports.Run = Run;
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
            if (options.cleanup && typeof onExit !== 'undefined') {
                log_1.log.warn(`Process [${process.pid}]: Cleaning up before process exits`);
                onExit(store, exitCode ?? 0)
                    .then(() => { process.exit(exitCode ?? 0); })
                    .catch((err) => { log_1.log.error(`Process [${process.pid}]: While exiting / ${err.message}`); });
            }
            if (exitCode || exitCode === 0) {
                log_1.log.warn(`Process [${process.pid}]: About to exit with "${exitCode}"`);
            }
            if (options.exit) {
                process.exit(0);
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
//# sourceMappingURL=execution.js.map