import dotenv from 'dotenv';

dotenv.config();

export enum PersistenceType {
  LocalMongo = 'mongo-local',
  MongoAtlas = 'mongo-atlas',
}

export default {
  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv',
  MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
  PERSISTENCIA: PersistenceType.MongoAtlas,
};