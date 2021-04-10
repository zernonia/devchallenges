"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
exports.handleErrors = function (err) {
    console.log(err.message);
    var errors = { email: '', password: '' };
    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }
    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
    return errors;
};
