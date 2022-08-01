"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = require("winston");
const { timestamp, combine, errors, json } = winston_1.format;
const logConfiguration = {
    transports: [
        new winston_1.transports.Console({ level: 'info' }),
        new winston_1.transports.File({
            filename: './logs/loggs.log',
            level: 'error',
        }),
    ],
    format: combine(timestamp(), errors({ stack: true }), json()),
};
exports.Logger = (0, winston_1.createLogger)(logConfiguration);
