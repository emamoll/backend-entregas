import { socket } from './socketService.js';

export const sendMessage = (e) => {
    e.preventDefault();
    if(email.value && mensaje.value) {
        let data = {
            author: {
                email: email.value,
                nombre: nombre.value,
                apellido: apellido.value,
                alias: alias.value,
                edad: edad.value,
                avatar: avatar.value
            },
            text: mensaje.value
        };
        console.log('Emitiendo socket');

        socket.emit('newMessage', data);

        email.value = '';
        nombre.value = '';
        apellido.value = '';
        alias.value = '';
        edad.value = '';
        avatar.value = '';
        mensaje.value = '';
    };
};


