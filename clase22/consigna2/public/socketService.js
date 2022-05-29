import { denormalizeData } from "./normalizer.js";

export const socket = io();

const mensajesContenedor = document.getElementById('mensajesContenedor');

socket.on('recibiMensaje', (mensajes) => {
    console.log('Respuesta');
    console.log(mensajes);

    console.log('Data denormalizada');
    const denormalizedData = denormalizeData(mensajes);
    console.log(denormalizedData);

    denormalizedData.forEach(mensaje => {
        let divMsg = document.createElement('div');
        divMsg.innerHTML = `
            <p>${mensaje.author.email}</p>
            <p>${mensaje.author.nombre}</p>
            <p>${mensaje.text}</p>
        `;

        mensajesContenedor.appendChild(divMsg);
    });
});