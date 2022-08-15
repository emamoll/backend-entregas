import Joi from 'joi';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose from 'mongoose';

export const ProductJoiSchema = Joi.object({
  nombre: Joi.string().required(),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
}); 


interface ProductType {
  _id: string,
  nombre: string,
  precio: number,
  stock: number
}

const ProductSchema = new mongoose.Schema<ProductType>({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
},
  { versionKey: false }
);

export const ProductModel = mongoose.model('product', ProductSchema);

export const ProductModelGraphqlModel = composeWithMongoose(ProductModel);