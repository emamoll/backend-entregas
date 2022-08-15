export interface ProductItem {
  _id?: string;
  nombre: string;
  precio: number;
  stock: number;
}

export interface ProductBaseClass {
  get(id?: string): Promise<ProductsDTO[] | ProductsDTO>;
  add(data: ProductItem): Promise<ProductsDTO>;
  update(id: string, newProductData: ProductItem): Promise<ProductsDTO>;
  delete(id: string): Promise<void>;
}

export class ProductsDTO {
  id: string;
  nombre: string;
  precio: number;
  stock: number;

  constructor(data: ProductItem) {
    this.nombre = data.nombre;
    this.precio = data.precio;
    this.stock = data.stock;
    this.id = data._id || '';
  }
}