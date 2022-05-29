import { sendMessage } from './sendMessage.js';

const formMensaje = document.getElementById('formMensaje');

formMensaje.addEventListener('submit', sendMessage);