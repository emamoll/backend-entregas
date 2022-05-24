import socketIo from 'socket.io';
import { getAllMessages, addMessage } from '../controller/messages';

let io;

export const initWsServer = (server) => {
    io = socketIo(server);

    io.on('connection', async (socket) => {
        console.log('Llego la conexion');

        let msges = await getAllMessages();
        socket.emit('recibirMensajes', msges);

        socket.on('newMessage', (obj) => {
            console.log('Llego un mensaje');
            console.log(obj)
            addMessage(obj);
            io.emit('newMessage', obj);
        });
    });

    return io;
};