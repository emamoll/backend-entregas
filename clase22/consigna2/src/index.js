import Server from './services/server';
import { initWsServer } from './services/socket';

const puerto = 8080;

const init = async () => {
    const io = initWsServer(Server);
    Server.listen(puerto, () => console.log(`Escuchando en ${puerto}`));
};

init();