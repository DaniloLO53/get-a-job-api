"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.insertUser = void 0;
const config_1 = require("@/config");
async function insertUser(email, password) {
    return await config_1.prisma.user.create({
        data: {
            email,
            password
        }
    });
}
exports.insertUser = insertUser;
async function findUser(email) {
    return await config_1.prisma.user.findFirst({
        where: {
            email,
        }
    });
}
exports.findUser = findUser;
