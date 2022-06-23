import express from 'express';
import { numCPUs } from '..';
import { puerto } from '..';

const app = express();

app.get('/', (req, res) => {
    console.log('Resolving / endpoint');
    
    res.json({
        pid: process.pid,
        procesadores: numCPUs, 
        msg: `Hola desde puerto ${puerto}`,
    });
});

app.get('/api/randoms', (req, res) => {    
    res.json({
        pid: process.pid,
        msg: `Hola desde puerto ${puerto}`,
    });
});

app.get('/slow', (req, res) => {
    console.log(`PID => ${process.pid} will work slow`);
    
    let sum = 0;

    for (let i = 0; i < 6e9; i++) {
        sum += i;
    };

    res.json({
        pid: process.pid,
        sum,
    });
});

app.get('/muerte', (req, res) => {
    console.log(`PID => ${process.pid} will die`);
    
    res.json({
        msg: 'Ok',
    });

    process.exit(0);
});

export default app;