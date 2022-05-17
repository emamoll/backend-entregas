const mongoose = require('mongoose');
const { carritoCollectionName } = require('./carritos')

const productosCollectionName = 'productos';

const productosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    carritoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: carritoCollectionName,
        required: true
    }
},
{timestamps: true,
versionKey: false} );

const ProductosModel = mongoose.model(productosCollectionName, productosSchema);

module.exports = { ProductosModel };