"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.createUser = void 0;
const repositories_1 = require("./repositories");
const repositories_2 = require("../sessions/repositories");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = require("./errors");
dotenv_1.default.config();
function removeKeyFromObject(obj, key) {
    const { [key]: _, ...rest } = obj;
    return rest;
}
async function createUser({ email, passwords }) {
    const userAlreadyRegistered = await (0, repositories_1.findUser)(email);
    if (userAlreadyRegistered && passwords)
        throw (0, errors_1.duplicatedEmailError)();
    let hashedPassword;
    if (passwords) {
        const { password, confirmPassword } = passwords;
        if (password !== confirmPassword)
            throw (0, errors_1.confirmPasswordError)();
        hashedPassword = await bcrypt_1.default.hash(password, 12);
    }
    else if (userAlreadyRegistered)
        return userAlreadyRegistered;
    return await (0, repositories_1.insertUser)(email, hashedPassword || null);
}
exports.createUser = createUser;
async function signInUser({ email, password }) {
    const dbUser = await (0, repositories_1.findUser)(email);
    if (!dbUser)
        throw (0, errors_1.noUserRegisteredError)();
    if (!dbUser.password)
        throw (0, errors_1.duplicatedEmailOauthError)();
    const validatePassword = await bcrypt_1.default.compare(password, dbUser.password);
    if (!validatePassword)
        throw (0, errors_1.noUserRegisteredError)();
    const session = await (0, repositories_2.insertSession)(dbUser.id);
    const dbUserWithoutPassword = removeKeyFromObject(dbUser, 'password');
    return jsonwebtoken_1.default.sign({ dbUserWithoutPassword, session: session.id }, process.env.JWT_SECRET);
}
exports.signInUser = signInUser;
