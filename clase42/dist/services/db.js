"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClient = void 0;
const config_1 = __importDefault(require("../config"));
const mongoose_1 = __importDefault(require("mongoose"));
class MongoClient {
    constructor() { }
    isValidId(id) {
        return mongoose_1.default.isValidObjectId(id);
    }
    static getConnection(local = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoClient.client) {
                console.log('Iniciamos la conexion');
                const srv = local ? config_1.default.MONGO_LOCAL_SRV : config_1.default.MONGO_ATLAS_SRV;
                yield mongoose_1.default.connect(srv, {});
                MongoClient.client = new MongoClient();
            }
            return MongoClient.client;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connection.close();
        });
    }
}
exports.MongoClient = MongoClient;
