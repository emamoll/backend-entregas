import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    PUERTO: process.env.PUERTO
};