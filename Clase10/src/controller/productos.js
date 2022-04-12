const express = require('express');

let productos = [
    {
		"id": 1,
		"producto": "Pan",
		"precio": 129.99,
		"medida": "kg"
	},
	{
		"id": 2,
		"producto": "Factura",
		"precio": 59.99,
		"medida": "unidad"
	},
	{
		"id": 3,
		"producto": "Sandwich",
		"precio": 799.99,
		"medida": "docena"
	}
]

class Productos {
    constructor() {
      this.productos = productos;
    }
  
    getAll() {
      return this.productos;
    }
  
    save(data) {
      const nuevoProducto = {
        id: productos.length + 1,
        producto: data.producto,
        medida: data.medida,
        precio: data.precio,
      };
      this.productos.push(nuevoProducto);
    }
  }
  
const productosController = new Productos();
  
module.exports = productosController
 