import {productQueries, productMutations} from '../controllers/graphql/products';
import { SchemaComposer } from "graphql-compose";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...productQueries
});

schemaComposer.Mutation.addFields({
  ...productMutations
});

export const graphqlMainSchema = schemaComposer.buildSchema()
