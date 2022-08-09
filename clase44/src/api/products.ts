import { ValidationResult } from 'joi';
import Config from '../config';
import { Logger } from '../services/logger';
import { ProductsFactoryDAO, ProductsDAO } from '../models/DAOs/products.factory';
import { ProductItem, ProductsDTO } from '../models/DTOs/products';
import { ProductJoiSchema } from '../models/products';

export default class ProductsAPI {
  private static instance: ProductsAPI;
  private products: ProductsDAO;

  private constructor(dao: ProductsDAO) {
    this.products = dao;
  }

  static async getInstance(): Promise<ProductsAPI> {
    if (!this.instance) {
      Logger.info('Inicializando API de productos');
      const dao = await ProductsFactoryDAO.get(Config.PERSISTENCIA);
      ProductsAPI.instance = new ProductsAPI(dao);
    }

    return ProductsAPI.instance;
  }

  validateSchema(data: any) {
    const result: ValidationResult = ProductJoiSchema.validate(data);

    if (result.error) {
      return {
        valid: false,
        errors: result.error.details,
      };
    }

    return {
      valid: true,
    };
  }

  getProduct(id?: string): Promise<ProductsDTO[] | ProductsDTO> {
    return this.products.get(id);
  }

  addProduct(data: ProductItem): Promise<ProductsDTO> {
    return this.products.add(data);
  }

  updateProduct(id: string, newProductData: ProductItem): Promise<ProductsDTO> {
    return this.products.update(id, newProductData);
  }

  deleteProduct(id: string): Promise<void> {
    return this.products.delete(id);
  }
}