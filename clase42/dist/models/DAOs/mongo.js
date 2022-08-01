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
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../../services/db");
const products_1 = require("../DTOs/products");
const error_1 = require("../../services/error");
class ProductDao {
    constructor() {
        this.schema = new mongoose_1.default.Schema({
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
        }, { versionKey: false });
        this.productos = mongoose_1.default.model('products', this.schema);
    }
    static getInstance(local = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ProductDao.instance) {
                console.log('Iniciamos DAO Products');
                yield db_1.MongoClient.getConnection(local);
                ProductDao.instance = new ProductDao();
                ProductDao.client = yield db_1.MongoClient.getConnection();
            }
            return ProductDao.instance;
        });
    }
    isValid(id) {
        return ProductDao.client.isValidId(id);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            if (id) {
                if (!this.isValid(id))
                    throw new error_1.ApiError('El producto no existe', error_1.ErrorStatus.NotFound);
                const document = yield this.productos.findById(id);
                if (document)
                    return new products_1.ProductsDTO(document);
                else
                    throw new error_1.ApiError('El producto no existe', error_1.ErrorStatus.NotFound);
            }
            output = yield this.productos.find();
            return output.map((aProduct) => new products_1.ProductsDTO(aProduct));
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productos.create(data);
            return new products_1.ProductsDTO(newProduct);
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productos.findByIdAndUpdate(id, newProductData, {
                new: true,
            });
            if (!result)
                throw new error_1.ApiError('El producto no existe', error_1.ErrorStatus.NotFound);
            return new products_1.ProductsDTO(result);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.findByIdAndDelete(id);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductDao.client.disconnect();
        });
    }
}
exports.default = ProductDao;
