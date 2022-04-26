const express = require('express');
const { CarritoController } = require('../../controller/carrito');
const { ProductosController } = require('../../controller/productos');
const { validarAdmin } = require('../../middlewares/admin');

const router = express.Router();

router.get('/', async (req, res) => {
    const carrito = await CarritoController.getAll();

    res.json({
        data: carrito
    });
});

router.post('/', validarAdmin, async (req, res) => {
    const producto = req.body;
    const productos = await ProductosController.getAll();

    if (!producto)
        return res.status(400).json({
            msg: 'Falta algun dato'
        });
    
    const nuevoCarrito = {
        productos: [{
            nombre,
            descripcion,
            imagen,
            precio,
            medida,
            stock
        }]
    };

    await CarritoController.save(nuevoCarrito);

    res.json({
        msg: 'Carrito agregado'
    });
});

router.delete('/:id', validarAdmin, async (req, res) => {
    const { id } = req.params;

    await CarritoController.deleteById(id);

    res.json({
        msg: 'Carrito eliminado'
    });
});

router.get('/:id/productos', async (req ,res) => {
    const { id } = req.params;

    const productos = await CarritoController.getProduct(id)

    if (!productos) 
        return res.status(404).json({
            msg: "El producto no existe"
        });
    
    res.json({
        productos: productos
    });
});

router.post('/:id/productos', validarAdmin, async (req, res) => {
    const { nombre, descripcion, imagen, precio, medida, stock } = req.body;
    const { id } = req.params;
    const productos = await CarritoController.getProduct(id);

    if (!productos)
        return res.status(400).json({
            msg: 'Falta algun dato'
        });
    
    const nuevoCarrito = {
        productos: [{
            nombre,
            descripcion,
            imagen,
            precio,
            medida,
            stock
        }]
    };

    await CarritoController.save(nuevoCarrito);

    res.json({
        msg: 'Producto agregado'
    })
})

module.exports = router;
