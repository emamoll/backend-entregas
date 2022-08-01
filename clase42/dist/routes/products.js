"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
router.get('/', (0, express_async_handler_1.default)(products_1.ProductController.getProducts));
router.get('/:id', (0, express_async_handler_1.default)(products_1.ProductController.exists), (0, express_async_handler_1.default)(products_1.ProductController.getProductById));
router.post('/', products_1.ProductController.validate, (0, express_async_handler_1.default)(products_1.ProductController.addProducts));
router.put('/:id', products_1.ProductController.exists, products_1.ProductController.validate, (0, express_async_handler_1.default)(products_1.ProductController.updateProducts));
router.delete('/:id', products_1.ProductController.exists, (0, express_async_handler_1.default)(products_1.ProductController.deleteProducts));
exports.default = router;
