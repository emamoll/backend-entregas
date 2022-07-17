const knex = require('knex');
const dbConfig = require('../../knexfile');
const productApi = require('../api/productos');

class DB {
    constructor() {
        const environment = process.env.NODE_ENV || 'production';
        console.log(`Setting ${environment} DB`);
        const options = dbConfig[environment];
        this.connection = knex(options)
    };

    init () {productApi.init()};

    get() {productApi.getProducts()};
    
    create() {productApi.createProducts()}
    
    update() {productApi.update()} 
    
    delete() {productApi.deleteProducts()}
};

const DBService = new DB();

module.exports = DBService;