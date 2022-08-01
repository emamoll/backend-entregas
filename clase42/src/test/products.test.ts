import supertest from 'supertest';
import ProductDao from '../models/DAOs/mongo';
import Server from '../services/server';

describe('Test de Productos', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let daoTest: ProductDao;

  beforeAll(async () => {
    request = supertest(Server);
    daoTest = await ProductDao.getInstance();
    await daoTest.productos.deleteMany();
  });

  afterEach(async () => {
    console.log('Se borra todo lo creado en el test');
    await daoTest.productos.deleteMany();
  });

  afterAll(async () => {
    await daoTest.disconnect();
    Server.close();
  });

  it('Deberia traer una lista vacia de productos', async () => {
    const expectedResponse = {
      data: [],
    };

    const response = await request.get('/api/products');
    expect(response.body).toEqual(expectedResponse);
  });

  it('Deberia devolverme un error 404 si quiero buscar un producto que no existe', async () => {
    const expectedResponse = {
      data: 'Producto no encontrado',
    };

    const response = await request.get('/api/products/1234');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual(expectedResponse);
  });

  it('Deberia devolverme un error 400 si quiero crear un producto si no envio body', async () => {
    const expectedErrorMessage = 'Invalid Body Parameter'

    const body = {};
    let response = await request.post('/api/products');

    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual(expectedErrorMessage);
    expect(response.body.error).toBeDefined();

    response = await request.post('/api/products').send(body);
    expect(response.status).toEqual(400);
    expect(response.body.error).toBeDefined();
  });

  it("Deberia crear un objeto correctamente", async () => {
    const body = {
      nombre: 'Televisor',
      precio: 15000,
      stock: 8,
    };

    let response = await request.post('/api/products').send(body);

    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual('producto agregado con exito');
    expect(response.body.data).toBeDefined();

    const newProductId = response.body.data._id;

    const expectedResponse = {
      data: [
        { _id: newProductId, ...body }
      ]
    }
    response = await request.get(`/api/products/${newProductId}`);
    expect(response.status).toEqual(200);

    expect(response.body).toEqual(expectedResponse);

  })
});