const express = require('express');

let productos = [
    {
		"id": 1,
		"producto": "Pan",
		"precio": 129.99,
		"medida": "kg"
	},
	{
		"id": 2,
		"producto": "Factura",
		"precio": 59.99,
		"medida": "unidad"
	},
	{
		"id": 3,
		"producto": "Sandwich",
		"precio": 799.99,
		"medida": "docena"
	}
]

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        productos
    })
})

router.get('/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);

    if(idProducto < 1 || idProducto >= productos.length) {
        return res.status(400).json({
            error: "El producto no existe"
        });
    };

    res.json({
        data: productos[idProducto -1]
    });
});

router.post('/', (req, res) => {
    const body = req.body;

	const nuevoProducto = {
		id: productos.length + 1,
		producto: body.producto,
		precio: body.precio,
		medida: body.medida
	};

	productos.push(nuevoProducto);
	
	res.json({
		nuevoProducto
	});
});

router.patch('/:id', (req, res) => {
	const idProducto = parseInt(req.params.id);
	const {producto} = req.body;
	const {precio} = req.body;
	const {medida} = req.body

	if (idProducto < 1 || idProducto > productos.length) {
	  return res.status(400).json({
		error: 'El parámetro está fuera de rango',
	  });
	}
  
	const productoReemplazado = productos[idProducto - 1];
	productos[idProducto - 1] = {
		id: idProducto,
		producto: producto,
		precio: parseInt(precio),
		medida: medida
	}
  
	res.json({
	  actualizada: producto,
	  anterior: productoReemplazado,
	});
  });

router.delete('/:id', (req, res) => {
	const idProducto = parseInt(req.params.id) -1;
  
	if (idProducto < 0 || idProducto > productos.length) {
	  return res.status(400).json({
		error: 'El parámetro está fuera de rango',
	  });
	}
  
	productos.splice(idProducto, 1);
  
	res.json({
	  productos,
	});
  });

module.exports = router;