const express = require('express');
const mainRouter = require('./routes');
const path = require('path');

// Inicio API con Express

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log('Server up en puerto ', puerto);
});

server.on('error', (err) => {
    console.log('Error atajado', err);
});

const publicPath = path.resolve(__dirname, './public');

app.use(express.json());
app.use(express.static(publicPath));

app.use('/api', mainRouter);


