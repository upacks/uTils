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
    var _a, _b;
    try {
        return JSON.stringify({
            pid: (_a = process.pid) !== null && _a !== void 0 ? _a : '-',
            host: (_b = os_1.default.hostname()) !== null && _b !== void 0 ? _b : '-',
            time: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss.SSS'),
            level,
            message,
        });
    }
    catch (err) {
        return `${level}: ${message} / ${err.message}`;
    }
};
exports.log = isProd ? {
    req: (message) => console.log(js('info', message)),
    res: (message) => console.log(js('info', message)),
    success: (message) => console.log(js('info', message)),
    info: (message) => console.log(js('info', message)),
    warn: (message) => console.warn(js('warn', message)),
    error: (message) => console.error(js('error', message)),
} : {
    req: (message) => console.log(cli_color_1.default.blue(` ⇠ ${message}`)),
    res: (message) => console.log(cli_color_1.default.blue(` ⇢ ${message}`)),
    success: (message) => console.log(cli_color_1.default.green(` ✩ ${message}`)),
    info: (message) => console.log(cli_color_1.default.blue(` ✔ ${message}`)),
    warn: (message) => console.log(cli_color_1.default.yellow(` ! ${message}`)),
    error: (message) => console.log(cli_color_1.default.red(` ✗ ${message}`)),
};
