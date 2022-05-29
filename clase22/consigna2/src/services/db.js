import mongoose from 'mongoose';
import Config from '../config';

export const connectDB = async () => {
    try {
        console.log('Conectando a mi DB');

        await mongoose.connect(Config.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Ya estoy conectado');
        return 'Conexion establecida';
    } catch (err) {
        console.log(`Error => ${err}`);
        return err;
    };
};

