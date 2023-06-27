"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.Delay = exports.Loop = exports.Exec = exports.Lag = exports.Rnd = exports.Uid = exports.Sec = exports.Now = exports.Sfy = exports.Jfy = exports.moment = exports.lodash = exports.dateFormat = exports.isDev = exports.isProd = exports.env = exports.isNode = void 0;
const uuid_1 = require("uuid");
const cli_color_1 = __importDefault(require("cli-color"));
const os_1 = __importDefault(require("os"));
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
exports.isNode = typeof process === 'object';
exports.env = exports.isNode ? process.env || {} : {};
exports.isProd = exports.env.NODE_ENV === 'production';
exports.isDev = exports.env.NODE_ENV === 'development';
exports.dateFormat = "YYYY-MM-DD HH:mm:ss.SSS";
exports.lodash = lodash_1.default;
exports.moment = moment_1.default;
const Jfy = (e) => typeof e === 'string' ? JSON.parse(e) : e;
exports.Jfy = Jfy;
const Sfy = (e) => typeof e === 'string' ? e : JSON.stringify(e);
exports.Sfy = Sfy;
const Now = () => (0, exports.moment)().format(exports.dateFormat);
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
const js = (level, message) => {
    try {
        return JSON.stringify({
            pid: process.pid ?? '-',
            host: os_1.default.hostname() ?? '-',
            time: (0, exports.moment)().format('YYYY-MM-DD hh:mm:ss.SSS'),
            level,
            message,
        });
    }
    catch (err) {
        return `${level}: ${message} / ${err.message}`;
    }
};
exports.log = exports.isProd ? {
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
//# sourceMappingURL=utils.js.map