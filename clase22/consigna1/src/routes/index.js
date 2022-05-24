import { Router } from "express";
import { devolverProductos } from '../controllers/productos'

const router = Router();

router.get('/productos-test', devolverProductos)

export default router;