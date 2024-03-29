const  productApi  = require('../api/productos');

const tableName = 'productos';

const checkBodyProduct = async (req, res, next) => {
    const {nombre, precio, medida} = req.body;

    if (!nombre || !precio || !medida)
        return res.status(400).json({
            msg: 'Missing body fields'
        });

    next();
};

const getAllProducts = async (req, res) => {
    try {
        const items = await productApi.get(tableName);

        res.json({
            data: items,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await productApi.get(tableName, id);
        
        if (!item.length)
            return res.status(404).json({
                msg: 'Product not found'
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

const createProduct = async (req, res) => {
    try {
        const {nombre, precio, medida} = req.body;

        const data = {
            nombre,
            precio,
            medida
        };

        const newId = await productApi.create(tableName, id);

        const newProduct = await productApi.get(tableName, newId);

        res.json({
            data: newProduct
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, medida } = req.body;

        let item = await productApi.get(tableName, id);

        if (!item.length)
            return res.status(404).json({
                msg: 'Product not found'
            });

        const data = {
            nombre,
            precio,
            medida
        };

        productApi.update(tableName, id, data);

        item = await productApi.get(tableName, id);

        res.json({
            msg: 'Product update',
            item
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        productApi.delete(tableName, id)

        res.json({
            msg: 'Product delete'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    }
}

module.exports = {
    checkBodyProduct,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}