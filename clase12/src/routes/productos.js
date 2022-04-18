const express = require('express');
const productosController = require('../controller/productos');

const router = express.Router();

router.post('/agregar', (req, res) => {
    const body = req.body;

    res.redirect('/');
});

module.exports = router