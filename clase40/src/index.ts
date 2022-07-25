import Config from './config';
import Server from './services/server';

Server.listen(Config.PORT, () =>
  console.log(`Servidor escuchando en puerto ${Config.PORT}`)
);