"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceType = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PersistenceType;
(function (PersistenceType) {
    PersistenceType["LocalMongo"] = "mongo-local";
    PersistenceType["MongoAtlas"] = "mongo-atlas";
    PersistenceType["Test"] = "test";
})(PersistenceType = exports.PersistenceType || (exports.PersistenceType = {}));
let mongoDBSRV = process.env.MONGO_ATLAS_SRV || 'mongosrv';
if (PersistenceType.Test) {
    console.log('Estamos realizando un test');
    mongoDBSRV = process.env.MONGO_ATLAS_TEST_SRV || 'testSRV';
}
exports.default = {
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_SRV: mongoDBSRV || 'mongosrv',
    MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
    PERSISTENCIA: PersistenceType.MongoAtlas,
};
