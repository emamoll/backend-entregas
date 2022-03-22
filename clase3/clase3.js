const fs = require('fs');
const path = require('path');

const pathProductos = 'productos.txt';

const ubicacionProductos = pathProductos;

class Contenedor {
    producto;
    precio;
    medida;
    static id = Contenedor.length;
    constructor (producto, precio, medida) {
        this.archivo = `${producto}-${precio}-${medida}.txt`

        try { 
            const data = this.leer();
            console.log('Archivo existe');
            this.producto = data.producto;
            this.precio = data.precio;
            this.medida = data.medida
        } catch(error) {
            console.log('No existe, creando uno nuevo');
            this.producto = producto;
            this.precio = precio;
            this.medida = medida;
            this.archivo = `${producto}-${precio}-${medida}.txt`

            const data = {
                producto: this.producto,
                precio: this.precio,
                medida: this.medida,
                id: Contenedor.length+1
            };

            fs.appendFileSync(this.archivo, JSON.stringify(data, null, '\t'));
        }
    }



    leer() {
        const data = fs.readFileSync(this.archivo, 'utf-8')
        return JSON.parse(data)
    }
    save() {
    }

    getById() {
    }
}


const contenedor1 = new Contenedor('criollo', 169.99, 'kg');

console.log(contenedor1.leer);

