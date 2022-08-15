import ProductsAPI from '../api/products';
import { Context, Next } from 'koa';
import { ApiError, ErrorStatus } from '../services/error';

let productosDao: ProductsAPI;

ProductsAPI.getInstance().then((instance) => {
  productosDao = instance;
});

const exists = async (ctx: Context, next: Next) => {
  const { id } = ctx.params;

  const result = await productosDao.getProduct(id);
  if (!result) {
    throw new ApiError('Producto no encontrado', ErrorStatus.NotFound);
  }

  next();
};

const validate = async (ctx: Context, next: Next) => {
  const result = productosDao.validateSchema(ctx.body);

  if (result.errors) {
    throw new ApiError(
      `Body invalido. ${result.errors.map((a) => a.message)}`,
      ErrorStatus.BadRequest
    );
  } else next();
};

const getProductById = async (ctx: Context) => {
  const { id } = ctx.params;

  if (id) {
  }
  ctx.response.status = 200
  ctx.body = {
    data: await productosDao.getProduct(id),
  };
};

const getProducts = async (ctx: Context) => {
  ctx.response.status = 200
  ctx.body = {
    data: await productosDao.getProduct(),
  };
};

const addProducts = async (ctx: Context) => {
  const newItem = await productosDao.addProduct(ctx.request.body);

  ctx.response.status = 200
  ctx.body = {
    msg: 'Producto agregado',
    data: newItem,
  };
};

const updateProducts = async (ctx: Context) => {
  const {id} = ctx.params;

  const updatedItem = await productosDao.updateProduct(id, ctx.request.body);

  ctx.response.status = 200
  ctx.body = {
    msg: 'Producto actualizado',
    data: updatedItem,
  };
};

const deleteProducts = async (ctx: Context) => {
  const { id } = ctx.params;
  await productosDao.deleteProduct(id);
  ctx.response.status = 200
  ctx.body = {
    msg: 'Producto eliminado'
  };
};

export const ProductController = {
  exists,
  validate,
  getProductById,
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
};