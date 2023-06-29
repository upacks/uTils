"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
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
//# sourceMappingURL=log.js.map