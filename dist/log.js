"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.log = void 0;
const moment_1 = __importDefault(require("moment"));
const cli_color_1 = __importDefault(require("cli-color"));
const os_1 = __importDefault(require("os"));
const env = process.env || {};
const isProd = env.NODE_ENV === 'production';
const js = (level, message) => {
    try {
        return JSON.stringify({
            pid: process.pid ?? '-',
            host: os_1.default.hostname() ?? '-',
            time: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss.SSS'),
            level,
            message,
        });
    }
    catch (err) {
        return `${level}: ${message} / ${err.message}`;
    }
};
const blog = (type, txt) => {
    console[type](txt);
    return true;
};
exports.log = isProd ? {
    req: (message) => blog('log', js('info', message)),
    res: (message) => blog('log', js('info', message)),
    success: (message) => blog('log', js('info', message)),
    info: (message) => blog('log', js('info', message)),
    warn: (message) => blog('warn', js('warn', message)),
    error: (message) => blog('error', js('error', message)),
} : {
    req: (message) => blog('log', cli_color_1.default.blue(` ⇠ ${message}`)),
    res: (message) => blog('log', cli_color_1.default.blue(` ⇢ ${message}`)),
    success: (message) => blog('log', cli_color_1.default.green(` ✩ ${message}`)),
    info: (message) => blog('log', cli_color_1.default.blue(` ✔ ${message}`)),
    warn: (message) => blog('log', cli_color_1.default.yellow(` ! ${message}`)),
    error: (message) => blog('log', cli_color_1.default.red(` ✗ ${message}`)),
};
/** To solve the log spam **/
class Log {
    kv = {};
    alias;
    delay;
    constructor(alias = '', delay = 2500) {
        this.alias = alias;
        this.delay = delay;
    }
    can = (type) => {
        if (this.kv.hasOwnProperty(type) /** O(1) **/) {
            if ((Date.now() - this.kv[type]) > this.delay) {
                this.kv[type] = Date.now();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            this.kv[type] = Date.now();
            return true;
        }
    };
    success = (message, group = '-') => {
        this.can(group) && console.log(cli_color_1.default.green(` ✩ [${this.alias}] ${message}`));
        return true;
    };
    info = (message, group = '-') => {
        this.can(group) && console.log(` ✔ [${this.alias}] ${message}`);
        return true;
    };
    req = (message, group = '-') => {
        this.can(group) && console.log(cli_color_1.default.blue(` ⇠ [${this.alias}] ${message}`));
        return true;
    };
    res = (message, group = '-') => {
        this.can(group) && console.log(cli_color_1.default.blue(` ⇢ [${this.alias}] ${message}`));
        return true;
    };
    warn = (message, group = '-') => {
        this.can(group) && console.log(cli_color_1.default.yellow(` ! [${this.alias}] ${message}`));
        return true;
    };
    error = (message, group = '-') => {
        this.can(group) && console.log(cli_color_1.default.red(` ✗ [${this.alias}] ${message}`));
        return true;
    };
}
exports.Log = Log;
//# sourceMappingURL=log.js.map