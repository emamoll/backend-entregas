import dotenv from 'dotenv';
dotenv.config();

export enum PersistenceType {
  LocalMongo = 'mongo-local',
  MongoAtlas = 'mongo-atlas',
  Test= 'test'
}

let mongoDBSRV = process.env.MONGO_ATLAS_SRV || 'mongosrv';

if (PersistenceType.Test) {
  console.log('Estamos realizando un test');
  mongoDBSRV = process.env.MONGO_ATLAS_TEST_SRV || 'testSRV';
}

export default {
  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_SRV: mongoDBSRV || 'mongosrv',
  MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
  PERSISTENCIA: PersistenceType.MongoAtlas,
};