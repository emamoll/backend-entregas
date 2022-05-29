import Config from './config';
import Server from "./services/server";
import { connectDB } from "./services/db";
import { initWsServer } from './services/socket';

const puerto = Config.PUERTO;

const init = async () => {
    await connectDB();
    const io = initWsServer(Server)
    Server.listen(puerto, () => console.log(`Escuchando en puerto ${puerto}`));
};

init();
