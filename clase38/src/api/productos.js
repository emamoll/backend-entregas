const init = () => {
  this.connection.schema.hasTable("productos").then((exists) => {
    if (exists) return;
    console.log("Creamos la tabla productos!");

    return this.connection.schema.createTable(
      "productos",
      async (productosTable) => {
        productosTable.increment();
        productosTable.string("nombre").notNullable();
        productosTable.integer("precio").notNullable();
        productosTable.string("medida").notNullable();
      }
    );

    const initProducts = [
      {
        nombre: "pan",
        precio: 220,
        medida: "kg",
      },
      {
        nombre: "criollos",
        precio: 320,
        medida: "kg",
      },
      {
        nombre: "facturas",
        precio: 600,
        medida: "doc",
      },
    ];

    const createProducts = initProducts.map((elem) => {
      this.create("productos", elem);
    });

    Promise.all(createProducts);
  });
};

const getProducts = (tableName, id) => {
  if (id) return this.connection(tableName).where("id", id);

  return this.connection(tableName);
};

const createProducts = (tableName, data) => {
  return this.connection(tableName).insert(data);
};

const updateProducts = (tableName, id, data) => {
  return this.connection(tableName).where("id", id).update(data);
};

const deleteProducts = (tableName, id) => {
  return this.connection(tableName).where("id", id).del();
};

const productApi = {
    init, 
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}

module.exports = productApi