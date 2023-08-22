"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const blog = (type, txt) => {
    console[type](txt);
    return true;
};
exports.log = {
    req: (message) => blog('log', ` ⇠ ${message}`),
    res: (message) => blog('log', ` ⇢ ${message}`),
    success: (message) => blog('log', ` ✩ ${message}`),
    info: (message) => blog('info', ` ✔ ${message}`),
    warn: (message) => blog('warn', ` ! ${message}`),
    error: (message) => blog('error', ` ✗ ${message}`),
};
//# sourceMappingURL=log.js.map