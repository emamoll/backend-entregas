const express = require('express');
const path = require('path')

const { prototype } = require('events');
const fs = require('fs/promises')

class Contenedor {
    constructor (nombreArchivo) {
        this.archivo = nombreArchivo
    }

    async getData() {
        const data = await fs.readFile(this.archivo, 'utf-8');
        return JSON.parse(data)
    }

    async saveData(data) {
        await fs.writeFile(this.archivo, JSON.stringify(data, null, '\t'))
    }

    async save(objeto) {
        const productos = await this.getData();
        let id;

        if(productos.length === 0) id = 1;
        else id = productos[productos.length - 1].id + 1;

        const productoNuevo = {
            id: id,
            nombre: objeto.nombre,
            precio: objeto.precio,
            medida: objeto.medida
        }

        productos.push(productoNuevo);

        await this.saveData(productos)
    }

    async getById(number) {
        const productos = await this.getData();
    
        const indice = productos.findIndex((unProducto) => {
          if (unProducto.id === number) return true;
          else return false;
        });
    
        if (indice === -1) return null;
    
        return productos[indice];
    }

    async getAll() {
        const productos = await this.getData();
    
        return productos;
    }
    
    async deleteById(number) {
        const productos = await this.getData();
    
        const nuevoArray = productos.filter((unProducto) => unProducto.id != number);
    
        await this.saveData(nuevoArray);
    }
    
    async deleteAll() {
        const nuevo = [];
    
        await this.saveData(nuevo);
    }
}

const miContenedor = new Contenedor('productos.json');

const app = express();

const puerto = 8080;

const servidor = app.listen(puerto, () => {
                    console.log(`Server listo. Escuchando en el puerto ${puerto}`);
                 })

servidor.on('Error' , (err) => {
    console.log('Hubo un error', err);
})

app.get('/', (request, response) => {
    response.send('Los porductos estan en /productos')
})

app.get('/productos', (request, response) => {
    const data = miContenedor.getAll();
    response.json({
        productos: data
    })
})

app.get('/productoRandom', (request, response) => {
    const randomId = function random(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const resultado = miContenedor.getById(randomId(0, miContenedor.length - 1));

    response.json(resultado);
})
