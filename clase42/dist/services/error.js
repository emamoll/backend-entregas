"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.ErrorStatus = void 0;
var ErrorStatus;
(function (ErrorStatus) {
    ErrorStatus[ErrorStatus["BadRequest"] = 400] = "BadRequest";
    ErrorStatus[ErrorStatus["NotFound"] = 404] = "NotFound";
})(ErrorStatus = exports.ErrorStatus || (exports.ErrorStatus = {}));
;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
