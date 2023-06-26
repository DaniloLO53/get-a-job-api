"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const userRoute = (0, express_1.Router)();
userRoute.post('/api/sign-in', controllers_1.signIn);
userRoute.post('/api/sign-up', controllers_1.signUp);
exports.default = userRoute;
