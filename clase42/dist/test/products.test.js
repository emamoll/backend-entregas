"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongo_1 = __importDefault(require("../models/DAOs/mongo"));
const server_1 = __importDefault(require("../services/server"));
describe('Test de Productos', () => {
    let request;
    let daoTest;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        request = (0, supertest_1.default)(server_1.default);
        daoTest = yield mongo_1.default.getInstance();
        yield daoTest.productos.deleteMany();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Se borra todo lo creado en el test');
        yield daoTest.productos.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield daoTest.disconnect();
        server_1.default.close();
    }));
    it('Deberia traer una lista vacia de productos', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            data: [],
        };
        const response = yield request.get('/api/products');
        expect(response.body).toEqual(expectedResponse);
    }));
    it('Deberia devolverme un error 404 si quiero buscar un producto que no existe', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            data: 'Producto no encontrado',
        };
        const response = yield request.get('/api/products/1234');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual(expectedResponse);
    }));
    it('Deberia devolverme un error 400 si quiero crear un producto si no envio body', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedErrorMessage = 'Invalid Body Parameter';
        const body = {};
        let response = yield request.post('/api/products');
        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual(expectedErrorMessage);
        expect(response.body.error).toBeDefined();
        response = yield request.post('/api/products').send(body);
        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    }));
    it("Deberia crear un objeto correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            nombre: 'Televisor',
            precio: 15000,
            stock: 8,
        };
        let response = yield request.post('/api/products').send(body);
        expect(response.status).toEqual(200);
        expect(response.body.msg).toEqual('producto agregado con exito');
        expect(response.body.data).toBeDefined();
        const newProductId = response.body.data._id;
        const expectedResponse = {
            data: [
                Object.assign({ _id: newProductId }, body)
            ]
        };
        response = yield request.get(`/api/products/${newProductId}`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedResponse);
    }));
});
