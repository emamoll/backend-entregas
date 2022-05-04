const knex = require('knex');
const dbConfig = require('../../knexfile')

class DB {
    constructor() {
        const environment = process.env.NODE_ENV || 'production';
        console.log(`Setting ${environment} DB`);
        const options = dbConfig[environment];
        this.connection = knex(options)
    };

     async init() {
        this.connection.schema.hasTable('productos').then((exists) => {
            if(exists) return;
            console.log('Creamos la tabla productos!');

            return this.connection.schema.createTable('productos', async (productosTable) => {
                productosTable.increment();
                productosTable.string('nombre').notNullable();
                productosTable.integer('precio').notNullable();
                productosTable.string('medida').notNullable();
            })
            
            const initProducts = [
                {
                    nombre: 'pan',
                    precio: 220,
                    medida: 'kg'
                },
                {
                    nombre: 'criollos',
                    precio: 320,
                    medida: 'kg'
                },
                {
                    nombre: 'facturas',
                    precio: 600,
                    medida: 'doc'
                }
            ];

            const createProducts = initProducts.map((elem) => {
                this.create('productos', elem);
            });

            Promise.all(createProducts);
        });
    };

    get(tableName, id) {
        if (id) return this.connection(tableName).where('id', id);
    
        return this.connection(tableName);
    };
    
    create(tableName, data) {
        return this.connection(tableName).insert(data);
    };
    
    update(tableName, id, data) {
        return this.connection(tableName).where('id', id).update(data);
    };
    
    delete(tableName, id) {
        return this.connection(tableName).where('id', id).del();
    };
};

const DBService = new DB();

module.exports = DBService;