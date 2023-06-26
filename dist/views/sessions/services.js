"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleUser = exports.getGoogleOAuthTokens = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
dotenv_1.default.config();
async function getGoogleOAuthTokens({ code }) {
    const URL = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: 'authorization_code'
    };
    try {
        const response = await axios_1.default.post(URL, qs_1.default.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response.data;
    }
    catch (error) {
        console.log(error, 'oauth');
        throw new Error(error.message);
    }
}
exports.getGoogleOAuthTokens = getGoogleOAuthTokens;
async function getGoogleUser({ id_token, access_token }) {
    const response = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`
        }
    });
    return response.data;
}
exports.getGoogleUser = getGoogleUser;
