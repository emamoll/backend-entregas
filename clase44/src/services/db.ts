import Config from '../config';
import mongoose from 'mongoose';

export class MongoClient {
  private static client: MongoClient;

  private constructor() {}

  isValidId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  static async getConnection(local: boolean = false) {
    if (!MongoClient.client) {
      console.log('Iniciamos la conexion');
      const srv = local ? Config.MONGO_LOCAL_SRV : Config.MONGO_ATLAS_SRV;
      await mongoose.connect(srv, {});
      MongoClient.client = new MongoClient();
    }
    return MongoClient.client;
  }
}