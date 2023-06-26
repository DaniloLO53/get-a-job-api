"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const sessionRoute = (0, express_1.Router)();
sessionRoute.get('/api/sessions/oauth/google', controllers_1.googleOauthHandler);
exports.default = sessionRoute;
