const { ProductosModel } = require('../models/productos');
const { CarritoModel } = require('../models/carritos');

const checkBodyProduct = async (req, res, next) => {
    const { name, stock, price, carritoId } = req.body;

    if (!name || !stock || !price || !carritoId)
        return res.status(400).json({
        msg: 'missing Body fields',
        });

    const carrito = await CarritoModel.findById(carritoId);

    if (!carrito)
        return res.status(400).json({
        msg: 'Carrito does not exists',
        });

    next();
};

const getAllProducts = async (req, res) => {
    try {
        const { carritoId } = req.query;

        const query = {};

        if(carritoId)
        query.carritoId = carritoId;

        const items = await ProductosModel.find(query);

        res.json({
        data: items,
        });
    } catch (err) {
        res.status(500).json({
        error: err.message,
        stack: err.stack,
        });
    };
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await ProductosModel.findById(id);

        if (!item)
        return res.status(404).json({
            msgs: 'Product not found!',
        });

        res.json({
        data: item,
        });
    } catch (err) {
        res.status(500).json({
        error: err.message,
        stack: err.stack,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, stock, price, carritoId } = req.body;

        const newProducto = await ProductosModel.create({
        name,
        stock,
        price,
        carritoId,
        });

        res.json({
        data: newProducto,
        });
    } catch (err) {
        res.status(500).json({
        error: err.message,
        stack: err.stack,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stock, price, carritoId } = req.body;

        let item = await ProductosModel.findById(id);

        if (!item)
        return res.status(404).json({
            msgs: 'Product not found!',
        });

        const productUpdated = await ProductosModel.findByIdAndUpdate(
        id,
        { name, stock, price, carritoId },
        { new: true }
        );

        res.json({
        msg: 'Product updated',
        data: productUpdated,
        });
    } catch (err) {
        res.status(500).json({
        error: err.message,
        stack: err.stack,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await ProductosModel.findByIdAndDelete(id);

        res.json({
        msg: 'Product deleted',
        });
    } catch (err) {
        res.status(500).json({
        error: err.message,
        stack: err.stack,
        });
    }
};

module.exports = {
    checkBodyProduct,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}