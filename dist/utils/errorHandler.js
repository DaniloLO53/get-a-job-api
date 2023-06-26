"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
async function errorHandler(error, request, response, next) {
    console.log('Error handler...');
    console.log('Error hadnler', error);
    console.log('Error name', error.name);
    if ("code" in error) {
        return response.status(error.code).send({
            message: error.message,
            code: error.code,
        });
    }
    return response.status(500).send({
        message: error.message,
    });
}
exports.errorHandler = errorHandler;
