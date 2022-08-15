import Config from "./config";
import Server from './services/server';
import { Logger } from './services/logger'

Server.listen(Config.PORT, () => {
  Logger.info(`Servidor escuchando en el puerto ${Config.PORT}`)
})