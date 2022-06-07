import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV,
  PUERTO: process.env.PUERTO,
};
