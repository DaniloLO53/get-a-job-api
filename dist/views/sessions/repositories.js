"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSession = void 0;
const config_1 = require("@/config");
async function insertSession(db_user_id) {
    return await config_1.prisma.session.create({
        data: {
            db_user_id,
        }
    });
}
exports.insertSession = insertSession;
