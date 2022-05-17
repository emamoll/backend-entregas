const mongoose = require('mongoose');

const connectionString = process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/emmoll';

const initMongoDB = async () => {
    try {
        console.log('Conectando a mi db');

        await mongoose.connect(connectionString);

        console.log('Estoy conectado');
    } catch (err) {
        console.log(`Error ==> ${err}`);
        return err;
    };
};

module.exports = { initMongoDB }