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
exports.ProductController = void 0;
const products_1 = __importDefault(require("../api/products"));
const error_1 = require("../services/error");
let productosDao;
products_1.default.getInstance().then((instance) => {
    productosDao = instance;
});
const exists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productosDao.getProduct(id);
    if (!result) {
        throw new error_1.ApiError('Producto no encontrado', error_1.ErrorStatus.NotFound);
    }
    next();
});
const validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = productosDao.validateSchema(req.body);
    if (result.errors) {
        throw new error_1.ApiError(`Body invalido. ${result.errors.map((a) => a.message)}`, error_1.ErrorStatus.BadRequest);
    }
    else
        next();
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id) {
    }
    res.json({
        data: yield productosDao.getProduct(id),
    });
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        data: yield productosDao.getProduct(),
    });
});
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = yield productosDao.addProduct(req.body);
    res.json({
        msg: 'Producto agregado',
        data: newItem,
    });
});
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedItem = yield productosDao.updateProduct(id, req.body);
    res.json({
        msg: 'Producto actualizado',
        data: updatedItem,
    });
});
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield productosDao.deleteProduct(id);
    res.json({
        msg: 'Producto eliminado',
    });
});
exports.ProductController = {
    exists,
    validate,
    getProductById,
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts,
};
