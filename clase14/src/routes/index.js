const express = require('express');
const productosRouter = require('./productos/productos');
const carritoRouter = require('./carrito/carrito');

const router = express.Router();

router.use('/productos', productosRouter);
router.use('/carrito', carritoRouter);

module.exports = router;