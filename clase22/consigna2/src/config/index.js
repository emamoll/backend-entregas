import dotenv from 'dotenv';

dotenv.config();

const connections = {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    PUERTO: process.env.PUERTO
};

export default connections;