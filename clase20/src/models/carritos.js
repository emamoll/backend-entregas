const mongoose = require('mongoose');

const carritoCollectionName = 'carrito';

const carritoSchema = new mongoose.Schema({
    },
{timestamps: true,
versionKey: false} );

const CarritoModel = mongoose.model(carritoCollectionName, carritoSchema);

module.exports = { 
    CarritoModel, 
    carritoCollectionName
};