import Router from "koa-router";
import { ProductController } from "../controllers/products";

const router = new Router({
  prefix: '/products'
});

router.get('/', ProductController.getProducts);

router.get('/:id', ProductController.exists, ProductController.getProductById)

router.post('/', ProductController.validate, ProductController.addProducts);

router.put('/:id', ProductController.exists, ProductController.validate, ProductController.updateProducts);

router.delete('/:id', ProductController.exists, ProductController.deleteProducts);

export default router.routes();