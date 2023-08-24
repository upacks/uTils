"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Late = exports.Safe = void 0;
const utils_1 = require("./utils");
const log_1 = require("./log");
/** Executes callback in safe-mode */
const Safe = (cb) => {
    try {
        if (cb.constructor.name === "AsyncFunction") {
            cb().then(e => { }).catch(err => log_1.log.error(`Safe Mode: ${err.message}`));
            return false;
        }
        else {
            cb();
            return true;
        }
    }
    catch (err) {
        log_1.log.error(`Safe Mode: ${err.message}`);
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
//# sourceMappingURL=execution.js.map