import Router from "koa-router";
import ProductsRouter from './products';
import { graphqlHTTP } from 'koa-graphql';
import {graphqlMainSchema} from '../services/graphql';

const router = new Router({
  prefix: '/api'
});

router.use(ProductsRouter);

router.all(
  '/graphql',
  graphqlHTTP({
    schema: graphqlMainSchema,
    graphiql: true
  })
)

export default router.routes()