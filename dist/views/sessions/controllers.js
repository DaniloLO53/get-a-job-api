"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOauthHandler = void 0;
const services_1 = require("./services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_2 = require("../users/services");
const dotenv_1 = __importDefault(require("dotenv"));
const repositories_1 = require("./repositories");
dotenv_1.default.config();
async function googleOauthHandler(request, response, next) {
    const code = request.query.code;
    try {
        const { id_token, access_token } = await (0, services_1.getGoogleOAuthTokens)({ code });
        // const googleUser = jwt.decode(id_token);
        const googleUser = await (0, services_1.getGoogleUser)({ id_token, access_token });
        const dbUser = await (0, services_2.createUser)({ email: googleUser.email });
        const session = await (0, repositories_1.insertSession)(dbUser.id);
        const accessToken = jsonwebtoken_1.default.sign({ dbUser, session: session.id }, process.env.JWT_SECRET);
        response.cookie("accessToken", accessToken);
        return response.redirect(process.env.ORIGIN);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.googleOauthHandler = googleOauthHandler;
