const express = require('express');
const path = require('path');
const http = require('http');
const io = require('socket.io');
const mainRouter = require('./routes');
const productosController = require('./controller/productos')
const productos = require('../productos.json');
const usuarios = [];
const messages = [];

// Configuro App y el puerto

const app = express();
const puerto = 8080;
const server = http.Server(app);

// Defino donde van a estar los archivos estaticos

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Defino donde van a estar las vistas

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

// Server up

server.listen(puerto, () => {
    console.log('Server up en puerto ', puerto);
});

app.get('/', (req, res) => {
    const productos = productosController.getAll();
    res.render('index', { productos });
});

app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

app.use('/api', mainRouter);

const myWSServer = io(server);

myWSServer.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
    console.log('ID del socket del cliente: ', socket.client.id);
    console.log('ID del socket del server: ', socket.id);

    socket.on('new-product', function (data) {
        const newProduct = {
          id: productos.length + 1,
          producto: data.producto,
          medida: data.medida,
          precio: data.precio
        };

        productos.push(newProduct);

        myWSServer.emit('products', productos);
    });

    socket.on('nuevoUsuario', function (data) {
        const nuevoUsuario = {
            id: usuarios.length + 1,
            usuario: data.usuario
        };

        usuarios.push(nuevoUsuario)
        console.log('usuarios',usuarios);
        myWSServer.emit('users', usuarios);
    })

    socket.on('new-message', function (data) {
        const newMessage = {
          socketId: socket.client.id,
          message: data,
        };
        console.log(newMessage);
        messages.push(newMessage);

        myWSServer.emit('messages', messages);
    });    

    socket.on('askData', (data) => {
        console.log('ME LLEGO DATA');
        socket.emit('products', productos);
        socket.emit('users', usuarios);
        socket.emit('messages', messages);
    });
});


        