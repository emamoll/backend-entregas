const express = require('express');
const path = require('path')
const mainRouter = require('./routes/index')

// Inicializamos API conn Express

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log('Server up en puerto', puerto);
});

server.on('error', (err) => {
    console.log('Error atajado' ,err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, './public');
console.log(publicPath);
app.use(express.static(publicPath))

app.use('/api', mainRouter);

