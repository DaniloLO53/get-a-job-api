"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("@/config");
const routes_1 = __importDefault(require("./views/sessions/routes"));
const routes_2 = __importDefault(require("./views/users/routes"));
const errorHandler_1 = require("./utils/errorHandler");
(0, config_1.loadEnv)();
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .get('/health', (_req, res) => res.send('OK!'))
    .use('', routes_1.default)
    .use('', routes_2.default)
    .use(errorHandler_1.errorHandler);
function init() {
    (0, config_1.connectDb)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, config_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
