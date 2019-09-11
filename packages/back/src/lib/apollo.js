import { ApolloServer } from "apollo-server-express";
import schema from "../schema";
import resolvers from "../resolvers";
import models from "../models";
import loaders from "../loaders";
import paginators from "../paginators";
import config from "../config";
import { getCurrentUser, isBasicAuth } from "../helpers/auth";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getCurrentUser(req);
    const basicAuth = isBasicAuth(req);
    return {
      models,
      loaders,
      paginators,
      me,
      secret: config.jwtSecret,
      isBasicAuth: basicAuth,
    };
  },
});

export default server;
