import moongose from "mongoose";
import Config from "../config";

export const connectDb = () => {
  return moongose.connect(Config.MONGO_ATLAS_SRV, { useNewUrlParser: true });
};
