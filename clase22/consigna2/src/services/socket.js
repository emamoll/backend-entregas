import socketIo from 'socket.io';
import { getAllMsg, addMsg } from '../controller/messages';

let io;

export const initWsServer = (server) => {
    io = socketIo(server);

    io.on('connection', async (socket) => {
        console.log('Llego conexion');

        let msgs = await getAllMsg();
        socket.emit('recibiMensaje', msgs);

        socket.on('newMessage', (obj) => {
            console.log('Llego mensaje');
            console.log(obj);
            addMsg(obj);
            io.emit('newMessage', obj);
        });
    });

    return io;
};