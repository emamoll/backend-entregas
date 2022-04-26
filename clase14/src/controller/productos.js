const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Productos {
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

    async save(miObjeto) {
        const productos = await this.getData();
        let id;

        const productoNuevo = {
            id: uuidv4(),
            timestamp: new Date(),
            nombre: miObjeto.nombre,
            descripcion: miObjeto.descripcion,
            codigo: '0000' + (productos.length + 1),
            imagen: miObjeto.imagen,
            precio: miObjeto.precio,
            medida: miObjeto.medida,
            stock: miObjeto.stock
        };

        productos.push(productoNuevo);

        await this.saveData(productos);
    };

    async getById(numero) {
        const productos = await this.getData();

        const indice = productos.findIndex((elem) => {
            if (elem.id === numero) return true;
            else return false;
            });

        if (indice === -1) return null;

        return productos[indice];
    };

    async getAll() {
        const productos = await this.getData();

        return productos;
    };

    async deleteById(numero) {
        const productos = await this.getData();

        const nuevoArray = productos.filter((elem) => elem.id != numero);

        await this.saveData(nuevoArray);
    };

    async deleteAll() {
        const nuevo = [];

        await this.saveData(nuevo);
    };

    async upDate(id, nuevaData) {
        const productos = await this.getData();

        const indice = productos.findIndex((elem) => {
            elem.id === id
        });

        const productoActualizado = {
            id,
            ...nuevaData
        };

        productos.splice(indice, 1, productoActualizado);

        await this.saveData(productos);

        return productoActualizado;
    };
};

const ProductosController = new Productos('productos.json');

module.exports = {
    ProductosController: ProductosController
};