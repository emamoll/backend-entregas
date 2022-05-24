import { denormalizeData } from './normalizer';

export const socket = io();

const contenedorVistaMensaje = document.getElementById('contenedorVistaMensaje');

socket.on('recibirMensajes', (mensaje) => {
    console.log('Respuesta');
    console.log(mensaje);

    console.log('Data desnormalizada');
    
    const desnormalizedData = desnormalizeData(mensaje);
    console.log(desnormalizedData);

    desnormalizedData.forEach(msg => {
        let divMensajes = document.createElement('div');
        p.innerHTML= `
            <p class="horaMensaje">${msg.author.email}</p>
            <p class="usuarioMensaje">${msg.author.nombre}</p>
            <p>${msg.text}</p>
        `
        contenedorVistaMensaje.appendChild(divMensajes)
    });
})