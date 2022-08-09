import ProductsAPI from '../../api/products';
import {ProductItem} from '../../models/DTOs/products';
import { ProductModelGraphqlModel } from '../../models/products';

const getProductById = ProductModelGraphqlModel.getResolver('findById');

const getProducts = ProductModelGraphqlModel.getResolver('findMany');

const addProducts = ProductModelGraphqlModel.getResolver('createOne');

const updateProducts = ProductModelGraphqlModel.getResolver('updateById');

const deleteProducts = ProductModelGraphqlModel.getResolver('removeById');


export const productQueries = {
  getProductById,
  getProducts
};

export const productMutations = {
addProducts,
updateProducts,
deleteProducts,
}




