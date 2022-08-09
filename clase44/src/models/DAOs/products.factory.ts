import ProductosAtlasDAO from './mongo';
import { Logger } from '../../services/logger';
import { PersistenceType } from '../../config';

export type ProductsDAO = ProductosAtlasDAO
export class ProductsFactoryDAO {
  static get(type: PersistenceType) {
    switch (type) {
      case PersistenceType.MongoAtlas:
        Logger.info('Instancia Productos Mongo Atlas');
        return ProductosAtlasDAO.getInstance();

      case PersistenceType.LocalMongo:
        Logger.info('Instancia Productos Mongo Local');
        return ProductosAtlasDAO.getInstance(true);

      default:
        Logger.info('Instancia Productos Default');
        return ProductosAtlasDAO.getInstance();
    }
  }
}