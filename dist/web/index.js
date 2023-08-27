"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
__exportStar(require("./collectors"), exports);
__exportStar(require("./execution"), exports);
__exportStar(require("./utils"), exports);
__exportStar(require("./log"), exports);
const help = () => {
    Promise.resolve().then(() => __importStar(require('./log'))).then(({ log }) => {
        log.success(`log.success('***')`);
        log.info(`log.info('***')`);
        log.warn(`log.warn('***')`);
        log.error(`log.error('***')`);
        log.req(`log.req('***')`);
        log.res(`log.res('***')`);
    });
    Promise.resolve().then(() => __importStar(require('./utils'))).then(({ Now }) => {
        console.log(Now());
    });
};
exports.help = help;
if (typeof process !== 'undefined' && process.argv.includes('--debug')) {
    (0, exports.help)();
}
//# sourceMappingURL=index.js.map