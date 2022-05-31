import config from './config/index';
import app from './services/server'
const puerto = config.PUERTO;

app.listen(puerto, () => console.log(`Escuchando en puerto ${puerto}`));
