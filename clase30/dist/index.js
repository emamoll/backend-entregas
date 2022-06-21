"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const server_1 = __importDefault(require("./services/server"));
const arguments_1 = require("./arguments");
// Obtengo el numero de nucleos disponibles en mi PC
const numCPUs = os_1.default.cpus().length;
console.log(arguments_1.args);
const modoCluster = arguments_1.args._[0] == "cluster" ? true : false;
console.log(modoCluster);
if (modoCluster && cluster_1.default.isPrimary) {
    console.log(`NUMEROS DE CPUS => ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    ;
    cluster_1.default.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    // Workers
    const puerto = 8080;
    server_1.default.listen(puerto, () => {
        console.log(`Servidor escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`);
    });
}
;
