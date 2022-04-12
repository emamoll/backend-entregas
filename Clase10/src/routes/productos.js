const express = require('express');
const productosController = require('../controller/productos');

const router = express.Router();

router.post('/agregar', (req, res) => {
    const body = req.body;

    const nuevoProducto = {
        id: productosController.lentgh + 1,
        producto: body.producto,
        medida: body.medida,
        precio: body.precio
    }

    productosController.save(nuevoProducto);

    res.redirect('/');
});

module.exports = router