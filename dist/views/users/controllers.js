"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const services_1 = require("./services");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function signIn(request, response, next) {
    const { email, password } = request.body;
    try {
        const token = await (0, services_1.signInUser)({ email, password });
        response.cookie("accessToken", token);
        return response.status(201).send({ token });
    }
    catch (error) {
        console.log('Error', error);
        next(error);
    }
}
exports.signIn = signIn;
async function signUp(request, response, next) {
    const { email, password, confirmPassword } = request.body;
    const passwords = { password, confirmPassword };
    try {
        await (0, services_1.createUser)({ email, passwords });
        return response.sendStatus(201);
    }
    catch (error) {
        console.log('Error at controller', error);
        next(error);
    }
}
exports.signUp = signUp;
