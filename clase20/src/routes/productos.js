const { Router } = require('express')
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    checkBodyProduct,
} = require('../controllers/productos');
const { validarAdmin } = require('../middlewares/admin');

const router = Router();

router.get('/', getAllProducts);

router.get('/:id',validarAdmin, getProductById);

router.post('/',validarAdmin, checkBodyProduct, createProduct);

router.put('/:id',validarAdmin, checkBodyProduct, updateProduct);

router.delete('/:id',validarAdmin, deleteProduct);

module.exports = router;