import Config from './config';
import {connectDb} from './services/db';
import Server from './services/server';

const puerto = Config.PUERTO;

const init =  () => {
    connectDb();

    const server = Server.listen(puerto, () => console.log(`Escuchando en puerto ${puerto}`));

    server.on('error', (err) => console.log(`Error en el servidor: ${err}`));
};

init();