"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execution_1 = require("./execution");
const log_1 = require("./log");
(0, execution_1.Start)({
    onStart: (store) => log_1.log.success(`${process.pid} is started!`),
    onError: (message) => log_1.log.warn(`${process.pid} ${message}`),
    onExit: () => log_1.log.warn(`${process.pid} is stopped!`),
});
