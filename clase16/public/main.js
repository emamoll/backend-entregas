const socket = io.connect('http://localhost:8080', { forceNew: true });

socket.emit('askData');


function enviarProducto(e) {
    const producto = document.getElementById('producto');
    const medida = document.getElementById('medida');
    const precio = document.getElementById('precio');

    socket.emit('new-product', {
        producto: producto.value,
        medida: medida.value,
        precio: precio.value
    });
}

function render(productos) {
    let html = productos
      .map(function (elem, index) {
        return `<tr>
                  <td>${elem.id}</td>
                  <td>${elem.producto}</td>
                  <td>${elem.medida}</td>
                  <td>${elem.precio}</td>
                </tr>`;
      })
      .join(" ")
  
    document.getElementById('productoNuevo').innerHTML = html;
}

socket.on('products', function (productos) {
    console.log('RECIBI MENSAJE');
    render(productos)
});

function ingresarUsuario(e) {
    const usuario = document.getElementById('usuario').value;

    socket.emit('nuevoUsuario', {
      usuario: usuario
    })
}

socket.on('users', function (usuarios) {
  console.log('RECIBI Usuario');
  console.log(usuarios);
});

let data = new Date();
reloj = data.getDate()+ "/" +data.getMonth()+1 + "/"+data.getFullYear()+ " " +data.toLocaleTimeString()

function enviarMensaje(e) {
  const input = document.getElementById('mensaje').value;
  const usuario = document.getElementById('usuario').value;

  socket.emit('new-message', {
    usuario: usuario,
    mensaje: input,
    hora: reloj
  });
}

socket.on('messages', function (messages) {
  console.log('RECIBI mensaje');
  console.log(messages);
  let htmlMensaje = messages
  .map(function (elem, index) {
    return `<p class="horaMensaje">${elem.message.hora}</p>
            <p class="usuarioMensaje">${elem.message.usuario}</p>
            <p>${elem.message.mensaje}</p>
          `;
  })
  .join(" ")

document.getElementById('mensajes').innerHTML = htmlMensaje;
});
