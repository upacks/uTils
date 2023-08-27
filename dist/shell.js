"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageExists = exports.CommandExists = exports.Shell = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
exports.Shell = shelljs_1.default;
const CommandExists = (command) => {
    return shelljs_1.default.which(command) ? true : false;
};
exports.CommandExists = CommandExists;
const PackageExists = (name) => {
    const version = shelljs_1.default.exec(`yarn list ${name} depth | grep "└─"`, { silent: true }).stdout;
    return version && version.indexOf(name) !== -1 ? true : false;
};
exports.PackageExists = PackageExists;
//# sourceMappingURL=shell.js.map