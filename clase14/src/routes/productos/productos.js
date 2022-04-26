const express = require('express');
const { ProductosController } = require('../../controller/productos');
const { validarAdmin } = require('../../middlewares/admin');

const router = express.Router();

router.get('/', async (req, res) => {
    const productos = await ProductosController.getAll();

    res.json({
        data: productos
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const producto = await ProductosController.getById(id);

    if (!producto) 
        return res.status(404).json({
            msg: 'El producto no existe'
    });

    res.json({
        data: producto
    });
});

router.post('/', validarAdmin, async (req, res) => {
    const { nombre, descripcion, imagen, precio, medida, stock } = req.body;

    if (!nombre || !descripcion || !imagen || !precio || !medida || !stock)
        return res.status(400).json({
            msg: 'Falta algun dato'
        });
    
    const nuevoProducto = {
        nombre,
        descripcion,
        imagen,
        precio,
        medida,
        stock
    };

    await ProductosController.save(nuevoProducto);

    res.json({
        msg: 'Producto agregado'
    });
});

router.put('/:id', validarAdmin, async (req, res) => {
    const { nombre, descripcion, imagen, precio, medida, stock } = req.body;
    const { id } = req.params;

    const producto = await ProductosController.getById(id);

    if (!producto) 
        return res.status(404).json({
            msg: "El producto no existe"
        });
    
    if (!nombre || !descripcion || !imagen || !precio || !medida || !stock)
        return res.status(400).json({
            msg: 'Falta algun dato'
        });

    const nuevoProducto = {
        nombre,
        descripcion,
        imagen,
        precio,
        medida,
        stock
    };

    const resultado = await ProductosController.upDate(id, nuevoProducto);

    res.json({
        data: resultado
    });
});

router.delete('/:id', validarAdmin, async (req, res) => {
    const { id } = req.params;

    await ProductosController.deleteById(id);

    res.json({
        msg: "Producto eliminado"
    });
});

module.exports = router;
