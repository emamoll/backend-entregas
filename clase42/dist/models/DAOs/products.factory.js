"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsFactoryDAO = void 0;
const mongo_1 = __importDefault(require("../DAOs/mongo"));
const logger_1 = require("../../services/logger");
const config_1 = require("../../config");
class ProductsFactoryDAO {
    static get(type) {
        switch (type) {
            case config_1.PersistenceType.MongoAtlas:
                logger_1.Logger.info('Instancia Productos Mongo Atlas');
                return mongo_1.default.getInstance();
            case config_1.PersistenceType.LocalMongo:
                logger_1.Logger.info('Instancia Productos Mongo Local');
                return mongo_1.default.getInstance(true);
            default:
                logger_1.Logger.info('Instancia Productos Default');
                return mongo_1.default.getInstance();
        }
    }
}
exports.ProductsFactoryDAO = ProductsFactoryDAO;
