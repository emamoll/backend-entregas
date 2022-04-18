const express = require('express');
const productos = require('../../productos.json');

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
 