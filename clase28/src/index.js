import Config from "./config";
import { connectDb } from "./services/db";
import Server from "./services/server";
import { args } from "./arguments";

const puerto = args._[0] || args.puerto;

const init = () => {
  connectDb();

  const server = Server.listen(puerto, () =>
    console.log(`Escuchando en puerto ${puerto}`)
  );

  server.on("error", (err) => console.log(`Error en el servidor: ${err}`));
};

init();
