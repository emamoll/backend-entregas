import mongoose from 'mongoose';
import { MongoClient } from '../../services/db';
import {
  ProductItem,
  ProductsDTO,
  ProductBaseClass,
} from '../DTOs/products';
import { ApiError, ErrorStatus } from '../../services/error';

export default class ProductDao implements ProductBaseClass {
  private static instance: ProductDao;
  private static client: MongoClient;
  private schema = new mongoose.Schema<ProductItem>(
    {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
    },
    { versionKey: false }
  );
  private productos = mongoose.model<ProductItem>('products', this.schema);

  static async getInstance(local: boolean = false) {
    if (!ProductDao.instance) {
      console.log('Iniciamos DAO Products');
      await MongoClient.getConnection(local);
      ProductDao.instance = new ProductDao();
      ProductDao.client = await MongoClient.getConnection();
    }
    return ProductDao.instance;
  }

  isValid(id: string): boolean {
    return ProductDao.client.isValidId(id);
  }

  async get(id?: string): Promise<ProductsDTO[] | ProductsDTO> {
    let output: ProductItem[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError('El producto no existe', ErrorStatus.NotFound);
      const document = await this.productos.findById(id);
      if (document) return new ProductsDTO(document);
      else throw new ApiError('El producto no existe', ErrorStatus.NotFound);
    }
    output = await this.productos.find();
    return output.map((aProduct) => new ProductsDTO(aProduct));
  }

  async add(data: ProductItem): Promise<ProductsDTO> {
    const newProduct = await this.productos.create(data);
    return new ProductsDTO(newProduct);
  }

  async update(id: string, newProductData: ProductItem): Promise<ProductsDTO> {
    const result = await this.productos.findByIdAndUpdate(id, newProductData, {
      new: true,
    });
    if (!result)
      throw new ApiError('El producto no existe', ErrorStatus.NotFound);
    return new ProductsDTO(result);
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

}