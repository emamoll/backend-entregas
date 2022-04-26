const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { ProductosController } = require('../controller/productos')

class Carrito {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
    };

    async getData() {
        const data = await fs.promises.readFile(this.archivo, 'utf-8');
        return JSON.parse(data);
    };

    async saveData(data) {
        await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'));
    };

    async save() {
        const carrito = await this.getData();
        const producto = await ProductosController.getData();
        let id;

        const carritoNuevo = {
            id: uuidv4(),
            timestamp: new Date(),
            productos: [
                ...producto
            ]
        };

        carrito.push(carritoNuevo);

        await this.saveData(carrito);
    };

    async getById(numero) {
        const carrito = await this.getData();

        const indice = carrito.findIndex((elem) => {
            if (elem.id === numero) return true;
            else return false;
            });

        if (indice === -1) return null;

        return carrito[indice];
    };

    async getAll() {
        const carrito = await this.getData();

        return carrito;
    };

    async getProduct(id) {
        const carrito = await this.getById(id);

        for (const elem in carrito) {
            return carrito.productos
          }
    }

    async deleteById(numero) {
        const carrito = await this.getData();

        const nuevoArray = carrito.filter((elem) => elem.id != numero);

        await this.saveData(nuevoArray);
    };

    async deleteAll() {
        const nuevo = [];

        await this.saveData(nuevo);
    };
};

const CarritoController = new Carrito('carrito.json');

module.exports = {
    CarritoController: CarritoController
}