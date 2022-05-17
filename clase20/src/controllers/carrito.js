const { CarritoModel } = require('../models/carritos');

const getAllCarritos = async (req, res) => {
    try {
        console.log(this);
        
        const items = await CarritoModel.find();

        res.json({
            data: items
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

const getCarritoById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await CarritoModel.findById(id);

        if (!item) 
            return res.status(404).json({
                msg: 'Carrito not found'
            });
        
        res.json({
            data: item
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

const createCarrito = async (req, res) => {
    try {
        const newCarrito = await CarritoModel.create({
        });
  
        res.json({
            data: newCarrito,
        });
        } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    };
};

const updateCarrito = async (req, res) => {
    try {
        const { id } = req.params;

        const carritoUpdated = await CarritoModel.findByIdAndUpdate(
            id,
        );

        res.json({
            msg: 'Carrito updated',
            category: carritoUpdated
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

const deleteCarrito = async (req, res) => {
    try {
        const { id } = req.params;

        await CarritoModel.findByIdAndDelete(id);

        res.json({
            msg: 'Carrito deleted'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

module.exports = {
    getAllCarritos,
    getCarritoById,
    createCarrito,
    updateCarrito,
    deleteCarrito
}