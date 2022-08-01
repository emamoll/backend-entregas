"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDTO = void 0;
class ProductsDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.precio = data.precio;
        this.stock = data.stock;
        this.id = data._id || '';
    }
}
exports.ProductsDTO = ProductsDTO;
