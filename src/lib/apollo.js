import { ApolloServer } from "apollo-server-express";
import schema from "../schema";
import resolvers from "../resolvers";
import models from "../models";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => {
    const { User } = models;
    const me = await User.findOne();
    return {
      models,
      me,
    };
  },
});

export default server;
