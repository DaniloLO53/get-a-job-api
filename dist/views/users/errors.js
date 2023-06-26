"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordError = exports.noUserRegisteredError = exports.duplicatedEmailOauthError = exports.duplicatedEmailError = void 0;
function duplicatedEmailError() {
    console.log('duplicatedEmailError');
    return {
        name: 'DuplicatedEmailError',
        message: 'There is already an user with given email',
        code: 409,
    };
}
exports.duplicatedEmailError = duplicatedEmailError;
function duplicatedEmailOauthError() {
    console.log('duplicatedEmailOauthError');
    return {
        name: 'DuplicatedEmailOauthError',
        message: 'User registered with oauth',
        code: 409,
    };
}
exports.duplicatedEmailOauthError = duplicatedEmailOauthError;
function noUserRegisteredError() {
    console.log('noUserRegisteredError');
    return {
        name: 'NoUserRegisteredError',
        message: 'No user registered with given email or password',
        code: 403,
    };
}
exports.noUserRegisteredError = noUserRegisteredError;
function confirmPasswordError() {
    console.log('confirmPasswordError');
    return {
        name: 'ConfirmPasswordError',
        message: 'Password and confirm password must match',
        code: 409,
    };
}
exports.confirmPasswordError = confirmPasswordError;
