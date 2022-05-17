const  { Router }  = require('express');
const productosRouter = require('./productos');
const carritosRouter = require('./carritos');

const router = Router();

router.use('/productos', productosRouter);
router.use('/carritos', carritosRouter);

module.exports = router;