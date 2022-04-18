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



document.getElementById('contenedorChat').style.display = 'none'

socket.on('users', function (usuarios) {
  console.log('RECIBI Usuario');
});

const usuarios = []

function ingresarUsuario(e) {
    const usuario = document.getElementById('usuario').value;

    socket.emit('nuevoUsuario', {
      usuario: usuario
    })

    document.getElementById('contenedorUsuarios').style.display = 'none'
    document.getElementById('contenedorChat').style.display = 'block'
}

function enviarMensaje(e) {
  const input = document.getElementById('mensaje');
  socket.emit('new-message', input.value);
}
