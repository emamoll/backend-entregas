const { Router } = require('express');
const {
    getAllCarritos,
    getCarritoById,
    createCarrito,
    updateCarrito,
    deleteCarrito
} = require('../controllers/carrito');
const { validarAdmin } = require('../middlewares/admin');

const router = Router();

router.get('/', getAllCarritos);

router.get('/:id', getCarritoById);

router.post('/',validarAdmin, createCarrito);

router.put('/:id',validarAdmin, updateCarrito);

router.delete('/:id',validarAdmin, deleteCarrito);

module.exports = router;


