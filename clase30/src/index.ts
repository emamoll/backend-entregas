import cluster from 'cluster';
import os from 'os';
import Server from './services/server';
import { args } from './arguments';

// Obtengo el numero de nucleos disponibles en mi PC

const numCPUs = os.cpus().length;

console.log(args);

const modoCluster = args._[0] =="cluster" ? true : false;

console.log(modoCluster);

if (modoCluster && cluster.isPrimary) {
    console.log(`NUMEROS DE CPUS => ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    };
    
    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        
        cluster.fork();
    });
} else {
    // Workers

    const puerto = 8080;

    Server.listen(puerto, () => {
        console.log(`Servidor escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`);        
    });
};