import {faker} from '@faker-js/faker';

export const devolverProductos = (req, res) => {
    const respuesta = [];

    for(let i = 0; i < 5; i ++) {
        respuesta.push({
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.avatar()
        });
    };

    res.json({
        data: respuesta
    });
};